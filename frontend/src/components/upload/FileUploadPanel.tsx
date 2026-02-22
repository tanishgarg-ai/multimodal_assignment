import { useState, useRef, type DragEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, File, X, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import type { UploadedDocument } from "@/types/chat";

const FileUploadPanel = () => {
  const [docs, setDocs] = useState<UploadedDocument[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const simulateUpload = (file: globalThis.File) => {
    const doc: UploadedDocument = {
      id: crypto.randomUUID(),
      name: file.name,
      type: file.type,
      size: file.size,
      uploadedAt: new Date(),
      status: "uploading",
      progress: 0,
    };
    setDocs((prev) => [doc, ...prev]);

    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 25 + 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setDocs((prev) =>
          prev.map((d) => (d.id === doc.id ? { ...d, progress: 100, status: "ready" } : d))
        );
      } else {
        setDocs((prev) =>
          prev.map((d) => (d.id === doc.id ? { ...d, progress: Math.min(progress, 95) } : d))
        );
      }
    }, 400);
  };

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    Array.from(fileList).forEach(simulateUpload);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeDoc = (id: string) => setDocs((prev) => prev.filter((d) => d.id !== id));

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center gap-3 px-6 py-4 border-b border-border bg-card/80 backdrop-blur-xl">
        <Link to="/chat" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="font-display text-sm font-semibold tracking-wider">UPLOAD DOCUMENTS</h1>
          <p className="text-xs text-muted-foreground">Add files for the AI to reference</p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-200 ${
            dragging
              ? "border-primary bg-primary/5 scale-[1.01]"
              : "border-border hover:border-muted-foreground bg-card/50"
          }`}
        >
          <Upload className="mx-auto mb-4 text-muted-foreground" size={40} />
          <p className="text-foreground font-medium mb-1">
            {dragging ? "Drop files here" : "Drag & drop files here"}
          </p>
          <p className="text-muted-foreground text-sm">or click to browse • PDF, Images, Documents</p>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx,.txt"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        {/* File list */}
        <div className="mt-8 space-y-3">
          <AnimatePresence>
            {docs.map((doc) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-3 bg-card border border-border rounded-xl p-4"
              >
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <File size={18} className="text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{formatSize(doc.size)}</p>
                  {doc.status === "uploading" && (
                    <Progress value={doc.progress} className="h-1.5 mt-1.5" />
                  )}
                </div>
                <div className="shrink-0">
                  {doc.status === "ready" && <CheckCircle size={18} className="text-green-500" />}
                  {doc.status === "error" && <AlertCircle size={18} className="text-destructive" />}
                  {doc.status === "uploading" && (
                    <span className="text-xs text-muted-foreground">{Math.round(doc.progress)}%</span>
                  )}
                </div>
                <button onClick={() => removeDoc(doc.id)} className="text-muted-foreground hover:text-foreground">
                  <X size={16} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {docs.length > 0 && (
          <div className="mt-6 text-center">
            <Button className="gradient-primary text-primary-foreground px-8">
              Process All Documents
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadPanel;
