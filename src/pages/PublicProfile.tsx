import { useParams } from "react-router-dom";
import { useProfileByUsername } from "@/hooks/useProfile";
import { useLinksByUserId } from "@/hooks/useLinks";
import { useEffect, useRef, useState } from "react";
import {
  Link2, Instagram, Facebook, Linkedin, Twitter, Youtube, Globe, ShoppingBag, ExternalLink,
  Mail, Phone, BadgeCheck, MapPin, ShoppingCart, Play, Send,
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
  whatsapp: Phone,
  telegram: Send,
  other: Link2,
};

const PLATFORM_COLORS: Record<string, string> = {
  instagram: "from-pink-500 to-purple-500",
  facebook: "from-blue-600 to-blue-500",
  linkedin: "from-blue-700 to-blue-500",
  twitter: "from-gray-800 to-gray-700 dark:from-gray-200 dark:to-gray-100",
  youtube: "from-red-600 to-red-500",
  website: "from-emerald-500 to-teal-500",
  shop: "from-amber-500 to-orange-500",
  whatsapp: "from-green-500 to-green-400",
  telegram: "from-sky-500 to-blue-500",
  other: "from-gray-500 to-gray-400",
};

function AnimatedCounter({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current || target <= 0) return;
    started.current = true;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

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

  // Categorize links
  const socialLinks = links?.filter(l => l.link_type === "link" || l.link_type === "social") || [];
  const youtubeVideos = links?.filter(l => l.link_type === "youtube_video") || [];
  const affiliateProducts = links?.filter(l => l.link_type === "affiliate_product") || [];
  const regularLinks = links?.filter(l => l.link_type === "resource") || [];

  // Social stats from social links
  const socialStats = socialLinks.filter(l => l.description && !isNaN(Number(l.description)));

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
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-background p-1.5 shadow-2xl ring-4 ring-primary/20">
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
        <div className="text-center mt-20 px-6 animate-fade-up stagger-1">
          <h1 className="font-heading text-2xl font-bold" style={{ lineHeight: "1.2" }}>
            {profile.display_name || profile.username}
          </h1>
          <p className="text-muted-foreground text-sm mt-1 font-medium">@{profile.username}</p>
          {profile.bio && (
            <p className="text-sm mt-3 text-foreground/80 max-w-sm mx-auto leading-relaxed">
              {profile.bio}
            </p>
          )}
          {(profile as any).location && (
            <p className="flex items-center justify-center gap-1 text-xs text-muted-foreground mt-2">
              <MapPin className="w-3.5 h-3.5" />
              {(profile as any).location}
            </p>
          )}

          {/* Contact */}
          {(profile.email_contact || profile.phone) && (
            <div className="flex items-center justify-center gap-4 mt-3">
              {profile.email_contact && (
                <a href={`mailto:${profile.email_contact}`} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="w-3.5 h-3.5" /> {profile.email_contact}
                </a>
              )}
              {profile.phone && (
                <a href={`tel:${profile.phone}`} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="w-3.5 h-3.5" /> {profile.phone}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Social Stats */}
        {socialStats.length > 0 && (
          <div className="px-6 mt-6 animate-fade-up stagger-2">
            <div className="flex justify-center gap-6">
              {socialStats.map((stat) => {
                const Icon = ICON_MAP[stat.icon || "other"] || Link2;
                const gradient = PLATFORM_COLORS[stat.icon || "other"] || PLATFORM_COLORS.other;
                const followerCount = Number(stat.description) || 0;
                return (
                  <a
                    key={stat.id}
                    href={stat.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 group"
                  >
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-heading font-bold">
                      <AnimatedCounter target={followerCount} />
                    </span>
                    <a
                      href={stat.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                      {stat.title}
                    </a>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Regular / Resource Links */}
        {regularLinks.length > 0 && (
          <div className="px-6 mt-8 space-y-3 animate-fade-up stagger-3">
            {regularLinks.map((link, index) => {
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
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-sm block">{link.title}</span>
                    {link.description && (
                      <span className="text-xs text-muted-foreground">{link.description}</span>
                    )}
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-200" />
                </a>
              );
            })}
          </div>
        )}

        {/* Social Links (non-stat ones) */}
        {socialLinks.filter(l => !l.description || isNaN(Number(l.description))).length > 0 && (
          <div className="px-6 mt-6 space-y-3 animate-fade-up stagger-3">
            {socialLinks.filter(l => !l.description || isNaN(Number(l.description))).map((link, index) => {
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
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-200" />
                </a>
              );
            })}
          </div>
        )}

        {/* YouTube Videos */}
        {youtubeVideos.length > 0 && (
          <div className="px-6 mt-8 space-y-4 animate-fade-up stagger-4">
            {youtubeVideos.map((video) => {
              const ytId = extractYouTubeId(video.url);
              return (
                <div key={video.id} className="rounded-2xl overflow-hidden border border-border bg-card shadow-md">
                  {ytId ? (
                    <div className="aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${ytId}`}
                        title={video.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <a href={video.url} target="_blank" rel="noopener noreferrer" className="block aspect-video bg-muted flex items-center justify-center">
                      <Play className="w-12 h-12 text-muted-foreground" />
                    </a>
                  )}
                  {video.title && (
                    <div className="p-3">
                      <p className="font-heading font-semibold text-sm">{video.title}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Affiliate Products */}
        {affiliateProducts.length > 0 && (
          <div className="px-6 mt-8 animate-fade-up stagger-5">
            <h2 className="font-heading font-bold text-center text-lg mb-1">Recommended Products</h2>
            <p className="text-center text-xs text-muted-foreground mb-4">Check out our favorite picks!</p>
            <div className="grid grid-cols-2 gap-3">
              {affiliateProducts.map((product) => (
                <a
                  key={product.id}
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-[0.97]"
                >
                  <div className="aspect-square bg-muted overflow-hidden">
                    {(product as any).image_url ? (
                      <img
                        src={(product as any).image_url}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="w-10 h-10 text-muted-foreground/40" />
                      </div>
                    )}
                  </div>
                  <div className="p-3 text-center">
                    <p className="font-heading font-semibold text-xs uppercase tracking-wide truncate">{product.title}</p>
                    <span className="inline-flex items-center gap-1 mt-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-[10px] font-bold uppercase tracking-wider">
                      <ShoppingCart className="w-3 h-3" /> Buy
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Fallback if no links at all */}
        {linksLoading ? (
          <div className="px-6 mt-8 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : (!links || links.length === 0) && (
          <div className="text-center py-12 mt-8">
            <p className="text-muted-foreground text-sm">No links yet</p>
          </div>
        )}

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
