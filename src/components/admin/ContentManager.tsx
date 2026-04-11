'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, Save, Loader2 } from 'lucide-react';
import { useContent, useContentActions } from '@/store';

export default function ContentManager() {
    const { data: contentData, loading, saving } = useContent();
    const { fetchContent, saveContent } = useContentActions();
    const [jsonString, setJsonString] = useState('');

    // Initial load
    useEffect(() => { fetchContent(); }, [fetchContent]);

    // Sync editor whenever store data refreshes
    useEffect(() => {
        if (contentData) {
            const { _id, createdAt, updatedAt, __v, ...editable } = contentData as any;
            setJsonString(JSON.stringify(editable, null, 2));
        }
    }, [contentData]);

    const handleSave = async () => {
        try {
            const body = JSON.parse(jsonString);
            await saveContent(body);
            alert('Content updated successfully!');
        } catch (err: any) {
            if (err instanceof SyntaxError) {
                alert('Invalid JSON format');
            } else {
                alert(err.message || 'Failed to update content');
            }
        }
    };

    return (
        <div className="glass-card rounded-xl p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="font-bold text-xl mb-1 text-white">JSON Editor</h3>
                    <p className="text-gray-400 text-sm">Modify site content directly. Be careful with structure.</p>
                </div>
                <button
                    onClick={fetchContent}
                    disabled={loading}
                    className="text-sm bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-2 rounded-lg flex items-center gap-2 transition-all disabled:opacity-50"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
                </button>
            </div>

            {/* Loading overlay */}
            {loading && !contentData ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
            ) : (
                <>
                    <textarea
                        value={jsonString}
                        onChange={(e) => setJsonString(e.target.value)}
                        className="w-full scrollbar-hide h-[600px] bg-black/30 border border-white/10 rounded-lg p-4 font-mono text-sm text-green-400 focus:outline-none focus:border-primary resize-none"
                        spellCheck={false}
                    />
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-emerald-600 shadow-lg shadow-emerald-900/20 flex items-center gap-2 disabled:opacity-50 transition-all"
                        >
                            {saving
                                ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
                                : <><Save className="w-4 h-4" /> Save Changes</>
                            }
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
