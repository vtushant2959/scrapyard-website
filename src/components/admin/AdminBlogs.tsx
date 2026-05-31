"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit3, Eye, EyeOff, RefreshCw, X, Save, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  status: "draft" | "published";
  views: number;
  createdAt: string;
  updatedAt: string;
}

const BLOG_CATEGORIES = ["General", "Recycling", "Metal Prices", "Industrial Waste", "Sustainability", "E-Waste", "Business Recycling"];

const blank: Partial<Blog> = {
  title: "", slug: "", excerpt: "", content: "", category: "General",
  author: "SCRAPYARD Team", status: "draft",
};

export function AdminBlogs() {
  const [blogs, setBlogs]     = useState<Blog[]>([]);
  const [total, setTotal]     = useState(0);
  const [page, setPage]       = useState(1);
  const [pages, setPages]     = useState(1);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState("All");
  const [editing, setEditing] = useState<Partial<Blog> | null>(null);
  const [saving, setSaving]   = useState(false);
  const [isNew, setIsNew]     = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "15" });
      if (filter !== "All") params.set("status", filter);
      const res  = await fetch(`/api/admin/blogs?${params}`);
      const data = await res.json();
      setBlogs(Array.isArray(data.blogs) ? data.blogs : []);
      setTotal(data.total);
      setPages(data.pages);
    } catch { toast.error("Failed to load"); }
    setLoading(false);
  }, [page, filter]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(1); }, [filter]);

  const openNew = () => {
    setEditing({ ...blank });
    setIsNew(true);
  };

  const openEdit = async (id: string) => {
    try {
      const res  = await fetch(`/api/admin/blogs/${id}`);
      const data = await res.json();
      setEditing(data);
      setIsNew(false);
    } catch { toast.error("Failed to load post"); }
  };

  const save = async () => {
    if (!editing?.title) { toast.error("Title is required"); return; }
    setSaving(true);
    try {
      const method = isNew ? "POST" : "PATCH";
      const url    = isNew ? "/api/admin/blogs" : `/api/admin/blogs/${editing._id}`;
      const res    = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      if (!res.ok) throw new Error();
      toast.success(isNew ? "Post created!" : "Post updated!");
      setEditing(null);
      load();
    } catch { toast.error("Failed to save"); }
    setSaving(false);
  };

  const togglePublish = async (blog: Blog) => {
    const newStatus = blog.status === "published" ? "draft" : "published";
    try {
      await fetch(`/api/admin/blogs/${blog._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      toast.success(newStatus === "published" ? "Published!" : "Moved to draft");
      load();
    } catch { toast.error("Failed"); }
  };

  const deleteBlog = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
      toast.success("Deleted");
      load();
    } catch { toast.error("Failed"); }
  };

  // Auto-generate slug from title
  const handleTitleChange = (title: string) => {
    const slug = title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
    setEditing((prev) => ({ ...prev, title, slug }));
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-white" style={{ fontFamily: "var(--font-syne)" }}>Blog Posts</h2>
          <p className="text-xs text-text-muted">{total} posts</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="p-2 rounded-xl text-text-muted border border-dark-border hover:text-accent-glow hover:border-accent-glow/30 transition-all">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button onClick={openNew} className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold btn-primary">
            <Plus className="w-3.5 h-3.5" /> New Post
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {["All", "published", "draft"].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all capitalize ${filter === f ? "bg-accent-glow text-background" : "bg-white/5 text-text-muted border border-dark-border hover:text-white"}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-border bg-white/2">
                {["Title", "Category", "Author", "Views", "Status", "Updated", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs text-text-muted font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? [...Array(6)].map((_, i) => (
                    <tr key={i} className="border-b border-dark-border/50">
                      {[...Array(7)].map((__, j) => (
                        <td key={j} className="px-4 py-3"><div className="h-3 bg-white/5 rounded animate-pulse" /></td>
                      ))}
                    </tr>
                  ))
                : blogs.map((blog) => (
                    <tr key={blog._id} className="border-b border-dark-border/50 hover:bg-white/2 transition-colors">
                      <td className="px-4 py-3 max-w-xs">
                        <p className="text-xs font-medium text-white truncate">{blog.title}</p>
                        <p className="text-xs text-text-muted font-mono truncate mt-0.5">/blog/{blog.slug}</p>
                      </td>
                      <td className="px-4 py-3 text-xs text-silver">{blog.category}</td>
                      <td className="px-4 py-3 text-xs text-text-muted">{blog.author}</td>
                      <td className="px-4 py-3 text-xs text-text-muted">{blog.views}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${blog.status === "published" ? "bg-green-500/15 text-green-400" : "bg-white/8 text-text-muted"}`}>
                          {blog.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-text-muted">{new Date(blog.updatedAt).toLocaleDateString("en-IN")}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button onClick={() => openEdit(blog._id)} className="p-1.5 text-text-muted hover:text-accent-glow rounded-lg hover:bg-accent-glow/10 transition-all">
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => togglePublish(blog)} className="p-1.5 text-text-muted hover:text-blue-400 rounded-lg hover:bg-blue-400/10 transition-all">
                            {blog.status === "published" ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                          <button onClick={() => deleteBlog(blog._id, blog.title)} className="p-1.5 text-text-muted hover:text-red-400 rounded-lg hover:bg-red-400/10 transition-all">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        {pages > 1 && (
          <div className="px-4 py-3 border-t border-dark-border flex items-center justify-between">
            <span className="text-xs text-text-muted">Page {page} of {pages}</span>
            <div className="flex gap-2">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                className="p-1.5 rounded-lg border border-dark-border text-text-muted hover:text-white disabled:opacity-40">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page === pages}
                className="p-1.5 rounded-lg border border-dark-border text-text-muted hover:text-white disabled:opacity-40">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Editor drawer */}
      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex"
            style={{ background: "rgba(8,16,24,0.85)", backdropFilter: "blur(6px)" }}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="ml-auto w-full max-w-2xl h-full flex flex-col overflow-hidden"
              style={{ background: "#0d1825", borderLeft: "1px solid rgba(255,255,255,0.06)" }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-dark-border flex-shrink-0">
                <h3 className="text-sm font-black text-white" style={{ fontFamily: "var(--font-syne)" }}>
                  {isNew ? "New Blog Post" : "Edit Post"}
                </h3>
                <div className="flex items-center gap-2">
                  <button onClick={save} disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-accent-glow text-background disabled:opacity-60">
                    <Save className="w-3.5 h-3.5" />
                    {saving ? "Saving…" : "Save Post"}
                  </button>
                  <button onClick={() => setEditing(null)} className="p-2 text-text-muted hover:text-white rounded-lg hover:bg-white/5">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Drawer body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div>
                  <label className="text-xs text-text-muted mb-1.5 block">Title *</label>
                  <input value={editing.title ?? ""} onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Post title…" className="form-input w-full" />
                </div>
                <div>
                  <label className="text-xs text-text-muted mb-1.5 block">Slug (auto-generated)</label>
                  <input value={editing.slug ?? ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                    className="form-input w-full font-mono text-xs text-accent-glow" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-text-muted mb-1.5 block">Category</label>
                    <select value={editing.category ?? "General"} onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                      className="form-input w-full">
                      {BLOG_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-text-muted mb-1.5 block">Status</label>
                    <select value={editing.status ?? "draft"} onChange={(e) => setEditing({ ...editing, status: e.target.value as "draft" | "published" })}
                      className="form-input w-full">
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-text-muted mb-1.5 block">Author</label>
                  <input value={editing.author ?? ""} onChange={(e) => setEditing({ ...editing, author: e.target.value })}
                    className="form-input w-full" />
                </div>
                <div>
                  <label className="text-xs text-text-muted mb-1.5 block">Excerpt (shown in blog list)</label>
                  <textarea value={editing.excerpt ?? ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                    rows={3} placeholder="Short description…" className="form-input w-full resize-none" />
                </div>
                <div>
                  <label className="text-xs text-text-muted mb-1.5 block">Content (Markdown supported)</label>
                  <textarea value={editing.content ?? ""} onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                    rows={14} placeholder="Write your blog content here…" className="form-input w-full resize-none font-mono text-xs" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
