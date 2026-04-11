'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Images, ImagePlus, RefreshCw, Pencil, Trash2, Loader2 } from 'lucide-react';
import { useGallery, useGalleryActions } from '@/store';
import { useToast } from '@/components/admin/AdminToast';
import GalleryDrawer, { GALLERY_EMPTY_FORM, type GalleryForm } from '@/components/admin/GalleryDrawer';
import ConfirmModal from '@/components/admin/ConfirmModal';

export default function GalleryManager() {
    const { items, loading, uploading } = useGallery();
    const { fetchGallery, uploadImage, updateItem, deleteItem } = useGalleryActions();
    const { showToast, ToastHost } = useToast();

    // Drawer state
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [drawerMode, setDrawerMode] = useState<'add' | 'edit'>('add');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<GalleryForm>(GALLERY_EMPTY_FORM);

    // File state
    const [preview, setPreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Delete state
    const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => { fetchGallery(); }, [fetchGallery]);

    // ── Drawer helpers ──────────────────────────────────────────────────────────
    const openAdd = () => {
        setDrawerMode('add');
        setForm(GALLERY_EMPTY_FORM);
        setPreview(null);
        setSelectedFile(null);
        setFileError(null);
        setDrawerOpen(true);
    };

    const openEdit = (item: typeof items[number]) => {
        setDrawerMode('edit');
        setEditingId(item._id);
        setForm({
            title: item.title || '',
            description: item.description || '',
            time: item.time || '',
            venue: item.venue || '',
        });
        setPreview(item.imageUrl);
        setSelectedFile(null);
        setFileError(null);
        setDrawerOpen(true);
    };

    const closeDrawer = () => { setDrawerOpen(false); setEditingId(null); setFileError(null); };

    const handleFormChange = (key: keyof GalleryForm, val: string) =>
        setForm((p) => ({ ...p, [key]: val }));

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
        setFileError(null);
    };

    // ── Submit ──────────────────────────────────────────────────────────────────
    const handleSubmit = async () => {
        if (drawerMode === 'add') {
            if (!selectedFile) { setFileError('Please select an image first'); return; }
            try {
                await uploadImage(selectedFile, form);
                showToast('Image uploaded successfully!', 'success');
                closeDrawer();
            } catch (err: any) {
                showToast(err.message || 'Upload failed', 'error');
            }
        } else {
            try {
                await updateItem(editingId!, form, selectedFile || undefined);
                showToast('Updated successfully!', 'success');
                closeDrawer();
            } catch {
                showToast('Failed to update', 'error');
            }
        }
    };

    // ── Delete ──────────────────────────────────────────────────────────────────
    const confirmDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            await deleteItem(deleteTarget);
            showToast('Deleted successfully!', 'success');
        } catch {
            showToast('Failed to delete', 'error');
        } finally {
            setDeleting(false);
            setDeleteTarget(null);
        }
    };

    return (
        <div className="space-y-6">
            {/* Toast (fixed-position, self-managed) */}
            <ToastHost />

            {/* Drawer */}
            <GalleryDrawer
                open={drawerOpen}
                mode={drawerMode}
                form={form}
                preview={preview}
                saving={uploading}
                onClose={closeDrawer}
                onFormChange={handleFormChange}
                onFileChange={handleFileChange}
                onSubmit={handleSubmit}
                fileInputRef={fileInputRef}
                fileError={fileError}
            />

            {/* Delete confirm modal */}
            <ConfirmModal
                open={!!deleteTarget}
                loading={deleting}
                title="Delete Image?"
                description="This will permanently remove the image from Cloudinary and the database. This action cannot be undone."
                confirmText="Delete"
                icon={Trash2}
                variant="danger"
                onConfirm={confirmDelete}
                onCancel={() => setDeleteTarget(null)}
            />

            {/* ── Table card ── */}
            <div className="glass-card rounded-2xl overflow-hidden">

                {/* Header bar */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center">
                            <Images className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-base leading-none">Gallery</h3>
                            <p className="text-xs text-slate-500 mt-0.5">
                                {items.length} image{items.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={fetchGallery}
                            disabled={loading}
                            title="Refresh"
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-all disabled:opacity-50"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                        <button
                            onClick={openAdd}
                            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-emerald-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-emerald-900/20"
                        >
                            <ImagePlus className="w-4 h-4" /> Add Image
                        </button>
                    </div>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    </div>
                )}

                {/* Empty state */}
                {!loading && items.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
                            <Images className="w-8 h-8 text-slate-600" />
                        </div>
                        <div className="text-center">
                            <p className="text-slate-400 font-medium">No images yet</p>
                            <p className="text-slate-600 text-sm mt-1">Click "Add Image" to upload your first photo.</p>
                        </div>
                        <button
                            onClick={openAdd}
                            className="mt-2 flex items-center gap-2 px-5 py-2.5 bg-primary/15 hover:bg-primary/25 border border-primary/30 text-primary text-sm font-bold rounded-xl transition-all"
                        >
                            <ImagePlus className="w-4 h-4" /> Add Image
                        </button>
                    </div>
                )}

                {/* Data table */}
                {!loading && items.length > 0 && (
                    <div className="overflow-x-auto scrollbar-hide">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/8 bg-white/3">
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-16">Photo</th>
                                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</th>
                                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Venue</th>
                                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Date</th>
                                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden xl:table-cell">Description</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {items.map((item, index) => (
                                    <motion.tr
                                        key={item._id}
                                        onClick={() => openEdit(item)}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.03 }}
                                        className="group hover:bg-white/3 transition-colors cursor-pointer"
                                    >
                                        {/* Thumbnail */}
                                        <td className="px-6 py-3">
                                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/5 border border-white/8 flex-shrink-0">
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.title || 'Gallery image'}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                            </div>
                                        </td>

                                        {/* Title */}
                                        <td className="px-4 py-3">
                                            {item.title
                                                ? <span className="font-medium text-white">{item.title}</span>
                                                : <span className="text-slate-600 italic text-xs">No title</span>
                                            }
                                        </td>

                                        {/* Venue */}
                                        <td className="px-4 py-3">
                                            {item.venue
                                                ? <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/15">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                                                    {item.venue}
                                                  </span>
                                                : <span className="text-slate-600 text-xs">—</span>
                                            }
                                        </td>

                                        {/* Date */}
                                        <td className="px-4 py-3 hidden lg:table-cell">
                                            {item.time
                                                ? <span className="text-slate-400 text-xs">{item.time}</span>
                                                : <span className="text-slate-600 text-xs">—</span>
                                            }
                                        </td>

                                        {/* Description */}
                                        <td className="px-4 py-3 hidden xl:table-cell max-w-[220px]">
                                            {item.description
                                                ? <p className="text-slate-400 text-xs truncate">{item.description}</p>
                                                : <span className="text-slate-600 text-xs">—</span>
                                            }
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-3">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); openEdit(item); }}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-primary/15 border border-white/8 hover:border-primary/30 text-slate-400 hover:text-primary text-xs font-medium transition-all"
                                                >
                                                    <Pencil className="w-3.5 h-3.5" /> Edit
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setDeleteTarget(item._id); }}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/8 hover:bg-red-500/18 border border-red-500/15 hover:border-red-500/35 text-red-500 hover:text-red-400 text-xs font-medium transition-all"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" /> Delete
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
