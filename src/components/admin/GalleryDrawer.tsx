'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Check, Loader2 } from 'lucide-react';
import CanvasWrapper from '../3d/CanvasWrapper';
import FloatingParticles from '../3d/FloatingParticles';

// ─── Types ─────────────────────────────────────────────────────────────────────
export const GALLERY_EMPTY_FORM = { title: '', description: '', time: '', venue: '' };
export type GalleryForm = typeof GALLERY_EMPTY_FORM;

export interface GalleryDrawerProps {
    open: boolean;
    mode: 'add' | 'edit';
    form: GalleryForm;
    preview: string | null;
    saving: boolean;
    onClose: () => void;
    onFormChange: (key: keyof GalleryForm, val: string) => void;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    fileError?: string | null;
}

const FIELDS = [
    { key: 'title', label: 'Title', placeholder: 'e.g. Graduation Ceremony 2024' },
    { key: 'venue', label: 'Venue', placeholder: 'e.g. Main Hall' },
    { key: 'time', label: 'Date / Time', placeholder: 'e.g. March 2024' },
    { key: 'description', label: 'Description', placeholder: 'Brief description of the event…' },
] as const;

export default function GalleryDrawer({
    open, mode, form, preview, saving,
    onClose, onFormChange, onFileChange, onSubmit, fileInputRef, fileError
}: GalleryDrawerProps) {
    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm h-screen"
                        onClick={onClose}
                    />

                    {/* Slide-in panel */}
                    <motion.aside
                        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md z-50 bg-starry-dark border-l border-white/10 flex flex-col shadow-2xl overflow-hidden"
                    >
                        {/* 3D Background Layer */}
                        <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
                            <CanvasWrapper cameraPosition={[0, 0, 20]} fov={60}>
                                <FloatingParticles count={200} />
                            </CanvasWrapper>
                        </div>

                        {/* Header */}
                        <div className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-white/10">
                            <div>
                                <h2 className="text-lg font-bold text-white">
                                    {mode === 'add' ? 'Add New Image' : 'Edit Image'}
                                </h2>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    {mode === 'add' ? 'Upload a photo and fill in details' : 'Update the image metadata'}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="relative z-10 flex-1 overflow-y-auto px-6 py-6 space-y-5 scrollbar-hide">
                            {/* Image upload */}
                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                                        Image {mode === 'add' && '*'}
                                    </label>
                                    {fileError && (
                                        <span className="text-[10px] text-red-400 font-bold tracking-tight animate-bounce">
                                            {fileError}
                                        </span>
                                    )}
                                </div>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`relative border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all min-h-[180px] group overflow-hidden ${fileError
                                        ? 'border-red-500/50 bg-red-500/5 hover:border-red-400 hover:bg-red-500/10'
                                        : 'border-white/15 hover:border-primary/60'
                                        }`}
                                >
                                    {preview ? (
                                        <>
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-80"
                                            />
                                            <div className="relative z-10 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs text-white">
                                                <Check className="w-3 h-3 text-emerald-400" />
                                                {mode === 'edit' ? 'Click to change image' : 'Image selected — click to change'}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                                <Upload className="w-6 h-6 text-slate-500 group-hover:text-primary transition-colors" />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">
                                                    Click to browse
                                                </p>
                                                <p className="text-xs text-slate-600 mt-0.5">JPG, PNG, WebP — Max 10 MB</p>
                                            </div>
                                        </>
                                    )}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={onFileChange}
                                    />
                                </div>
                            </div>

                            {/* Metadata fields */}
                            {FIELDS.map(({ key, label, placeholder }) => (
                                <div key={key}>
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                                        {label}
                                    </label>
                                    {key === 'description' ? (
                                        <textarea
                                            value={form[key]}
                                            onChange={(e) => onFormChange(key, e.target.value)}
                                            placeholder={placeholder}
                                            rows={3}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary/60 transition-all resize-none"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={form[key]}
                                            onChange={(e) => onFormChange(key, e.target.value)}
                                            placeholder={placeholder}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary/60 transition-all"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="relative z-10 px-6 py-5 border-t border-white/10 flex gap-3">
                            <button
                                onClick={onClose}
                                className="flex-1 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 hover:text-white text-sm font-medium transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onSubmit}
                                disabled={saving}
                                className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30"
                            >
                                {saving
                                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
                                    : <><Check className="w-4 h-4" /> {mode === 'add' ? 'Upload' : 'Save Changes'}</>
                                }
                            </button>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}
