import { useParams } from "react-router-dom";
import { useProfileByUsername } from "@/hooks/useProfile";
import { useLinksByUserId } from "@/hooks/useLinks";
import {
  Link2, Instagram, Facebook, Linkedin, Twitter, Youtube, Globe, ShoppingBag, ExternalLink,
} from "lucide-react";

const ICON_MAP: Record<string, any> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  twitter: Twitter,
  youtube: Youtube,
  website: Globe,
  shop: ShoppingBag,
  other: Link2,
};

export default function PublicProfile() {
  const { username } = useParams<{ username: string }>();
  const { data: profile, isLoading: profileLoading, error: profileError } = useProfileByUsername(username || "");
  const { data: links, isLoading: linksLoading } = useLinksByUserId(profile?.user_id || "");

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (profileError || !profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
        <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4">
          <Link2 className="w-6 h-6 text-muted-foreground" />
        </div>
        <h1 className="font-heading text-xl font-bold mb-1">Page not found</h1>
        <p className="text-muted-foreground text-sm">This profile doesn't exist yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Profile Header */}
        <div className="text-center mb-8 animate-fade-up">
          <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center text-3xl font-heading font-bold text-foreground/70 overflow-hidden">
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt={profile.display_name || ""} className="w-full h-full object-cover" />
            ) : (
              profile.display_name?.[0]?.toUpperCase() || "?"
            )}
          </div>
          <h1 className="font-heading text-xl font-bold" style={{ lineHeight: "1.2" }}>
            {profile.display_name || profile.username}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">@{profile.username}</p>
          {profile.bio && (
            <p className="text-sm mt-3 text-foreground/75 max-w-xs mx-auto overflow-wrap-break-word">
              {profile.bio}
            </p>
          )}
        </div>

        {/* Links */}
        <div className="space-y-3">
          {linksLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-14 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : links && links.length > 0 ? (
            links.map((link, index) => {
              const Icon = ICON_MAP[link.icon || "other"] || Link2;
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card flex items-center gap-3 group animate-fade-up"
                  style={{ animationDelay: `${(index + 1) * 80}ms`, opacity: 0 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                    <Icon className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="flex-1 font-medium text-sm">{link.title}</span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              );
            })
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground text-sm">No links yet</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <div className="w-4 h-4 rounded hero-gradient" />
            LinkFolio
          </a>
        </div>
      </div>
    </div>
  );
}
