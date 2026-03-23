import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Link2, Plus, Instagram, Facebook, Linkedin, Twitter, Youtube, Globe, ShoppingBag, Phone, Send,
} from "lucide-react";

const SOCIAL_OPTIONS = [
  { value: "instagram", label: "Instagram", icon: Instagram, prefix: "https://instagram.com/", placeholder: "username" },
  { value: "facebook", label: "Facebook", icon: Facebook, prefix: "https://facebook.com/", placeholder: "username or page" },
  { value: "linkedin", label: "LinkedIn", icon: Linkedin, prefix: "https://linkedin.com/in/", placeholder: "username" },
  { value: "twitter", label: "X / Twitter", icon: Twitter, prefix: "https://x.com/", placeholder: "username" },
  { value: "youtube", label: "YouTube", icon: Youtube, prefix: "https://youtube.com/@", placeholder: "channel" },
  { value: "whatsapp", label: "WhatsApp", icon: Phone, prefix: "https://wa.me/", placeholder: "phone number" },
  { value: "telegram", label: "Telegram", icon: Send, prefix: "https://t.me/", placeholder: "username" },
  { value: "website", label: "Website", icon: Globe, prefix: "", placeholder: "https://yoursite.com" },
  { value: "shop", label: "Shop / Affiliate", icon: ShoppingBag, prefix: "", placeholder: "https://amazon.com/..." },
  { value: "other", label: "Other", icon: Link2, prefix: "", placeholder: "https://..." },
];

interface SocialLinkFormProps {
  onSubmit: (link: { title: string; url: string; icon: string; link_type: string }) => Promise<void>;
  isPending: boolean;
}

export default function SocialLinkForm({ onSubmit, isPending }: SocialLinkFormProps) {
  const [selected, setSelected] = useState(SOCIAL_OPTIONS[0]);
  const [handle, setHandle] = useState("");
  const [title, setTitle] = useState("");
  const [followers, setFollowers] = useState("");
  const [linkType, setLinkType] = useState<"link" | "social" | "resource">("link");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle.trim()) return;

    const url = selected.prefix ? `${selected.prefix}${handle.trim().replace(/^@/, "")}` : handle.trim();
    const linkTitle = title.trim() || selected.label;

    await onSubmit({
      title: linkTitle,
      url,
      icon: selected.value,
      link_type: linkType,
    });
    setHandle("");
    setTitle("");
    setFollowers("");
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-xl p-5 space-y-4">
      <h2 className="font-heading font-semibold text-lg">Add New Link</h2>

      {/* Link Type */}
      <div>
        <Label className="text-sm">Link Type</Label>
        <div className="flex gap-2 mt-2">
          {[
            { value: "link", label: "Social Link" },
            { value: "resource", label: "Resource / Pack" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setLinkType(opt.value as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                linkType === opt.value
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/40"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Platform Selection */}
      <div>
        <Label className="text-sm">Platform</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {SOCIAL_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => { setSelected(opt); setHandle(""); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all active:scale-[0.97] ${
                  selected.value === opt.value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Username / URL Input */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <Label className="text-sm">{selected.prefix ? "Username / Handle" : "URL"}</Label>
          <div className="flex items-center mt-1">
            {selected.prefix && (
              <span className="text-xs text-muted-foreground bg-muted px-2 py-2.5 rounded-l-md border border-r-0 border-input whitespace-nowrap">
                {selected.prefix}
              </span>
            )}
            <Input
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder={selected.placeholder}
              className={selected.prefix ? "rounded-l-none" : ""}
            />
          </div>
        </div>
        <div>
          <Label className="text-sm">Display Title (optional)</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={selected.label}
            className="mt-1"
          />
        </div>
      </div>

      <Button type="submit" disabled={isPending || !handle.trim()} className="h-10">
        <Plus className="w-4 h-4 mr-1" />
        {isPending ? "Adding..." : "Add Link"}
      </Button>
    </form>
  );
}
