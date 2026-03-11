import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { API_BASE_URL } from "@/lib/config/env.config";
import getAuthHeaders from "@/lib/graphql/getAuthHeaders";
import pluginsOptions from "@/lib/options/plugins.options";

const MANIFEST_PLACEHOLDER = JSON.stringify(
  {
    steps: [
      {
        name: "my-step",
        description: "What this step does",
        inputs: { value: { type: "string" } },
        outputs: { result: { type: "string" } },
      },
    ],
  },
  null,
  2,
);

type UploadPluginDialogProps = {
  organizationId: string;
  onClose: () => void;
};

/** Dialog for uploading a WASM plugin with drag-drop file input and manifest JSON. */
function UploadPluginDialog({
  organizationId,
  onClose,
}: UploadPluginDialogProps) {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [wasmFile, setWasmFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [name, setName] = useState("");
  const [version, setVersion] = useState("");
  const [description, setDescription] = useState("");
  const [manifest, setManifest] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileSelect = (file: File) => {
    if (!file.name.endsWith(".wasm")) {
      setError("Only .wasm files are supported");
      return;
    }
    setWasmFile(file);
    setError(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const validateManifest = (): boolean => {
    if (!manifest.trim()) return true;
    try {
      JSON.parse(manifest);
      return true;
    } catch {
      setError("Manifest must be valid JSON");
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!wasmFile) {
      setError("A .wasm file is required");
      return;
    }

    if (!name.trim()) {
      setError("Plugin name is required");
      return;
    }

    if (!version.trim()) {
      setError("Version is required");
      return;
    }

    if (!validateManifest()) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("wasm", wasmFile);
      formData.append("name", name.trim());
      formData.append("version", version.trim());
      if (description.trim()) {
        formData.append("description", description.trim());
      }
      formData.append("manifest", manifest.trim() || "{}");

      const authHeaders = await getAuthHeaders();
      const response = await fetch(`${API_BASE_URL}/api/v1/plugins/upload`, {
        method: "POST",
        headers: authHeaders,
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text().catch(() => "Unknown error");
        throw new Error(text || `Upload failed with status ${response.status}`);
      }

      await queryClient.invalidateQueries({
        queryKey: pluginsOptions({ organizationId }).queryKey,
      });

      toast.success("Plugin uploaded", {
        description: `${name} has been installed successfully.`,
      });

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DialogRoot open onOpenChange={(e) => !e.open && onClose()}>
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent className="flex max-h-[85vh] max-w-lg flex-col overflow-hidden">
          <DialogHeader>
            <DialogTitle>Upload Plugin</DialogTitle>
            <DialogDescription>
              Upload a WebAssembly plugin to extend Vortex with custom workflow
              steps.
            </DialogDescription>
          </DialogHeader>
          <DialogCloseTrigger />

          <form
            onSubmit={handleSubmit}
            className="flex min-h-0 flex-1 flex-col overflow-hidden"
          >
            <div className="flex-1 space-y-4 overflow-y-auto px-1 pb-4">
              {/* Drag-drop WASM file zone */}
              <div className="space-y-2">
                <Label>WASM File</Label>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 transition-colors ${
                    isDragOver
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-muted/30"
                  }`}
                >
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  {wasmFile ? (
                    <div className="text-center">
                      <p className="font-medium text-sm">{wasmFile.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {(wasmFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="font-medium text-sm">
                        Drop a .wasm file here or click to browse
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Only .wasm files are supported
                      </p>
                    </div>
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".wasm"
                  className="hidden"
                  onChange={handleFileInputChange}
                />
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="plugin-name">
                  Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="plugin-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="my-custom-step"
                  required
                />
              </div>

              {/* Version */}
              <div className="space-y-2">
                <Label htmlFor="plugin-version">
                  Version <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="plugin-version"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  placeholder="1.0.0"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="plugin-description">Description</Label>
                <Input
                  id="plugin-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What this plugin does (optional)"
                />
              </div>

              {/* Manifest JSON */}
              <div className="space-y-2">
                <Label htmlFor="plugin-manifest">Manifest JSON</Label>
                <Textarea
                  id="plugin-manifest"
                  value={manifest}
                  onChange={(e) => setManifest(e.target.value)}
                  placeholder={MANIFEST_PLACEHOLDER}
                  rows={8}
                  className="font-mono text-sm"
                />
                <p className="text-muted-foreground text-xs">
                  Optional JSON describing the plugin's steps and I/O schema
                </p>
              </div>

              {error && (
                <div className="break-words rounded-md bg-destructive/10 p-3 text-destructive text-sm">
                  {error}
                </div>
              )}
            </div>

            <DialogFooter className="shrink-0 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Upload
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
}

export default UploadPluginDialog;
