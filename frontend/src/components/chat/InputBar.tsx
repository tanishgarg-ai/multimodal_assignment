import { useState, useRef, type KeyboardEvent } from "react";
import { Send, Paperclip, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onSend: (text: string, files?: File[]) => void;
  disabled?: boolean;
}

const InputBar = ({ onSend, disabled }: Props) => {
  const [text, setText] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!text.trim() && files.length === 0) return;
    onSend(text.trim(), files.length ? files : undefined);
    setText("");
    setFiles([]);
  };

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const addFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    setFiles((prev) => [...prev, ...Array.from(newFiles)]);
  };

  return (
    <div className="border-t border-border bg-card/80 backdrop-blur-xl p-4">
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5 text-xs">
              <span className="max-w-[120px] truncate">{f.name}</span>
              <button onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}>
                <X size={12} className="text-muted-foreground hover:text-foreground" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-end gap-2">
        <button
          onClick={() => fileRef.current?.click()}
          className="p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Attach file"
        >
          <Paperclip size={18} />
        </button>
        <input
          ref={fileRef}
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx"
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask about Ingenium 2026..."
          rows={1}
          className="flex-1 resize-none bg-muted border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring min-h-[42px] max-h-[120px]"
          style={{ height: "auto", overflow: "auto" }}
          disabled={disabled}
        />

        <Button
          onClick={handleSend}
          disabled={disabled || (!text.trim() && files.length === 0)}
          size="icon"
          className="gradient-primary text-primary-foreground rounded-xl h-[42px] w-[42px] shrink-0"
        >
          <Send size={16} />
        </Button>
      </div>
    </div>
  );
};

export default InputBar;
