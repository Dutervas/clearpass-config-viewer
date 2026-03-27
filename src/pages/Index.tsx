import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { ServiceViewer } from "@/components/ServiceViewer";
import { parseXml, type ParsedService } from "@/lib/parseXml";
import { Shield } from "lucide-react";

const Index = () => {
  const [data, setData] = useState<ParsedService | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (content: string) => {
    try {
      const parsed = parseXml(content);
      setData(parsed);
      setError(null);
    } catch (e) {
      setError("Failed to parse XML. Please ensure it's a valid ClearPass configuration file.");
      setData(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-6 py-3 no-print">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold text-foreground">
            ClearPass Config Viewer
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {!data && (
          <div className="no-print">
            <FileUpload onFileLoaded={handleFile} />
            {error && (
              <p className="mt-4 text-destructive text-sm text-center">{error}</p>
            )}
          </div>
        )}
        {data && <ServiceViewer data={data} onReset={() => setData(null)} />}
      </main>
    </div>
  );
};

export default Index;
