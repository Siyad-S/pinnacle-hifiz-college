'use client';
import { useState, useEffect } from "react";
import { Copy, LayoutDashboard, FileText, Settings, Users, LogOut, Save, RefreshCw } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SiteContent } from "@/types";

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("content");
    const [content, setContent] = useState<SiteContent | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [jsonString, setJsonString] = useState("");

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        }
    }, [status, router]);

    useEffect(() => {
        if (status === "authenticated") {
            fetchContent();
        }
    }, [status]);

    const fetchContent = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/content');
            const data = await res.json();
            setContent(data);
            // Remove mongoose specific fields for editing
            const { _id, createdAt, updatedAt, __v, ...editable } = data;
            setJsonString(JSON.stringify(editable, null, 2));
        } catch (error) {
            console.error("Failed to fetch content", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const body = JSON.parse(jsonString);
            const res = await fetch('/api/content', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (res.ok) {
                alert("Content updated successfully!");
                fetchContent(); // Refresh
            } else {
                alert("Failed to update content");
            }
        } catch (e) {
            alert("Invalid JSON format");
        } finally {
            setIsSaving(false);
        }
    };

    if (status === "loading" || !session) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;

    return (
        <div className="min-h-screen bg-slate-900 flex font-sans text-white">
            {/* Sidebar */}
            <aside className="w-64 glass border-r border-white/10 flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <h2 className="font-heading text-2xl font-bold text-accent">Pinnacle Admin</h2>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <button onClick={() => setActiveTab("dashboard")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-primary text-white shadow-lg shadow-emerald-900/20' : 'hover:bg-white/5 text-slate-300'}`}>
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </button>
                    <button onClick={() => setActiveTab("content")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'content' ? 'bg-primary text-white shadow-lg shadow-emerald-900/20' : 'hover:bg-white/5 text-slate-300'}`}>
                        <FileText className="w-5 h-5" />
                        Content Manager
                    </button>
                </nav>
                <div className="p-4 border-t border-white/10">
                    <button onClick={() => signOut()} className="flex items-center gap-3 text-red-400 hover:text-red-300 transition-colors w-full px-4 py-2 hover:bg-white/5 rounded-lg">
                        <LogOut className="w-5 h-5" /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold font-heading capitalize">{activeTab}</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-400">Welcome, {session.user?.name || "Admin"}</span>
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-bold">A</div>
                    </div>
                </header>

                {activeTab === 'content' && (
                    <div className="glass-card rounded-xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="font-bold text-xl mb-1">JSON Editor</h3>
                                <p className="text-gray-400 text-sm">Modify site content directly. Be careful with structure.</p>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={fetchContent} className="text-sm bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-2 rounded-lg flex items-center gap-2 transition-all">
                                    <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} /> Refresh
                                </button>
                            </div>
                        </div>

                        <div className="relative">
                            <textarea
                                value={jsonString}
                                onChange={(e) => setJsonString(e.target.value)}
                                className="w-full h-[600px] bg-black/30 border border-white/10 rounded-lg p-4 font-mono text-sm text-green-400 focus:outline-none focus:border-primary resize-none"
                                spellCheck={false}
                            />
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-emerald-600 shadow-lg shadow-emerald-900/20 flex items-center gap-2 disabled:opacity-50 transition-all"
                            >
                                <Save className="w-4 h-4" /> {isSaving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
