import { useParams } from "react-router-dom";
import { useProfileByUsername } from "@/hooks/useProfile";
import { useLinksByUserId } from "@/hooks/useLinks";
import {
  Link2, Instagram, Facebook, Linkedin, Twitter, Youtube, Globe, ShoppingBag, ExternalLink,
  Mail, Phone, BadgeCheck,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

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

const PLATFORM_COLORS: Record<string, string> = {
  instagram: "from-pink-500 to-purple-500",
  facebook: "from-blue-600 to-blue-500",
  linkedin: "from-blue-700 to-blue-500",
  twitter: "from-sky-500 to-blue-400",
  youtube: "from-red-600 to-red-500",
  website: "from-emerald-500 to-teal-500",
  shop: "from-amber-500 to-orange-500",
  other: "from-gray-500 to-gray-400",
};

export default function PublicProfile() {
  const { username } = useParams<{ username: string }>();
  const { data: profile, isLoading: profileLoading, error: profileError } = useProfileByUsername(username || "");
  const { data: links, isLoading: linksLoading } = useLinksByUserId(profile?.user_id || "");

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-primary/20 rounded-full" />
          <div className="absolute inset-0 w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (profileError || !profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6 animate-fade-up">
          <Link2 className="w-8 h-8 text-muted-foreground" />
        </div>
        <h1 className="font-heading text-2xl font-bold mb-2 animate-fade-up stagger-1">Page not found</h1>
        <p className="text-muted-foreground text-sm animate-fade-up stagger-2">This profile doesn't exist yet.</p>
        <a href="/" className="mt-6 text-primary text-sm font-medium hover:underline animate-fade-up stagger-3">
          Create your own →
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-lg mx-auto pb-16">
        {/* Banner */}
        <div className="relative animate-fade-up">
          <div className="w-full h-44 sm:h-56 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 overflow-hidden">
            {profile.banner_url ? (
              <img src={profile.banner_url} alt="Banner" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full hero-gradient opacity-30" />
            )}
          </div>

          {/* Avatar overlapping banner */}
          <div className="absolute -bottom-14 left-1/2 -translate-x-1/2">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-background p-1 shadow-xl">
                <div className="w-full h-full rounded-full bg-muted overflow-hidden flex items-center justify-center text-4xl font-heading font-bold text-foreground/60">
                  {profile.avatar_url ? (
                    <img src={profile.avatar_url} alt={profile.display_name || ""} className="w-full h-full object-cover" />
                  ) : (
                    profile.display_name?.[0]?.toUpperCase() || "?"
                  )}
                </div>
              </div>
              {profile.is_verified && (
                <div className="absolute -bottom-1 right-1 w-8 h-8 bg-background rounded-full flex items-center justify-center shadow-lg">
                  <BadgeCheck className="w-6 h-6 text-blue-500 fill-blue-500" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="text-center mt-18 px-6 pt-16 animate-fade-up stagger-1">
          <div className="flex items-center justify-center gap-2">
            <h1 className="font-heading text-2xl font-bold" style={{ lineHeight: "1.2" }}>
              {profile.display_name || profile.username}
            </h1>
          </div>
          <p className="text-muted-foreground text-sm mt-1 font-medium">@{profile.username}</p>
          {profile.bio && (
            <p className="text-sm mt-3 text-foreground/80 max-w-sm mx-auto leading-relaxed">
              {profile.bio}
            </p>
          )}

          {/* Contact Info */}
          {(profile.email_contact || profile.phone) && (
            <div className="flex items-center justify-center gap-4 mt-4">
              {profile.email_contact && (
                <a
                  href={`mailto:${profile.email_contact}`}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  {profile.email_contact}
                </a>
              )}
              {profile.phone && (
                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  {profile.phone}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Links */}
        <div className="px-6 mt-8 space-y-3">
          {linksLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 rounded-2xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : links && links.length > 0 ? (
            links.map((link, index) => {
              const Icon = ICON_MAP[link.icon || "other"] || Link2;
              const gradient = PLATFORM_COLORS[link.icon || "other"] || PLATFORM_COLORS.other;
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/30 active:scale-[0.98] animate-fade-up"
                  style={{ animationDelay: `${(index + 1) * 80}ms`, opacity: 0 }}
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 shadow-sm`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="flex-1 font-medium text-sm">{link.title}</span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5" />
                </a>
              );
            })
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-sm">No links yet</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
          >
            <div className="w-4 h-4 rounded hero-gradient" />
            Made with LinkFolio
          </a>
        </div>
      </div>
    </div>
  );
}
