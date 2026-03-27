import { useCallback, useState } from "react";
import { Upload } from "lucide-react";

interface FileUploadProps {
  onFileLoaded: (content: string) => void;
  isBlocked?: boolean;
  onBlockedAttempt?: () => void;
}

export function FileUpload({ onFileLoaded, isBlocked, onBlockedAttempt }: FileUploadProps) {
  const [dragOver, setDragOver] = useState(false);

  const handleIntercept = (e: React.MouseEvent | React.DragEvent) => {
    if (isBlocked && onBlockedAttempt) {
      e.preventDefault();
      e.stopPropagation();
      onBlockedAttempt();
      return true; // was blocked
    }
    return false; // not blocked
  };

  const handleFile = useCallback(
    (file: File) => {
      if (!file.name.endsWith(".xml")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        if (text) onFileLoaded(text);
      };
      reader.readAsText(file);
    },
    [onFileLoaded]
  );

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-16 transition-colors cursor-pointer ${
        dragOver
          ? "border-primary bg-accent"
          : "border-dropzone-border bg-dropzone-bg"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        if (isBlocked) return;
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        if (handleIntercept(e)) {
          setDragOver(false);
          return;
        }
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
      }}
      onClick={(e) => {
        if (handleIntercept(e)) return;
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".xml";
        input.onchange = () => {
          const file = input.files?.[0];
          if (file) handleFile(file);
        };
        input.click();
      }}
    >
      <Upload className="h-12 w-12 text-muted-foreground mb-4" />
      <p className="text-lg font-medium text-foreground">
        Drop ClearPass XML file here
      </p>
      <p className="text-sm text-muted-foreground mt-1">
        or click to browse (.xml)
      </p>
    </div>
  );
}