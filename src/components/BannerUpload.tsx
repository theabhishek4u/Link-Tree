import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { ImagePlus, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface BannerUploadProps {
  currentUrl: string | null;
  onUploaded: (url: string) => void;
}

export default function BannerUpload({ currentUrl, onUploaded }: BannerUploadProps) {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be under 10MB");
      return;
    }

    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${user.id}/banner.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("banners")
        .upload(path, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("banners").getPublicUrl(path);
      const url = `${data.publicUrl}?t=${Date.now()}`;
      onUploaded(url);
      toast.success("Banner updated!");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      className="relative w-full h-32 sm:h-40 rounded-xl bg-muted border-2 border-dashed border-border hover:border-primary/50 transition-all overflow-hidden group"
    >
      {currentUrl ? (
        <img src={currentUrl} alt="Banner" className="w-full h-full object-cover" />
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
          <ImagePlus className="w-6 h-6 mb-1" />
          <span className="text-xs">Upload Banner</span>
        </div>
      )}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        {uploading ? (
          <Loader2 className="w-6 h-6 text-white animate-spin" />
        ) : (
          <ImagePlus className="w-6 h-6 text-white" />
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
        disabled={uploading}
      />
    </button>
  );
}
