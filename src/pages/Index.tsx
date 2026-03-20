import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link2, ArrowRight, Zap, Palette, Share2, BarChart3 } from "lucide-react";
import { useAuth } from "@/lib/auth";

const features = [
  {
    icon: Link2,
    title: "All your links",
    desc: "Instagram, YouTube, shop, affiliate — everything in one clean page.",
  },
  {
    icon: Palette,
    title: "Make it yours",
    desc: "Customize your page with themes, colors, and your personal brand.",
  },
  {
    icon: Share2,
    title: "One link for bio",
    desc: "Drop one URL in your Instagram bio. Your audience finds everything.",
  },
  {
    icon: BarChart3,
    title: "See who visits",
    desc: "Track clicks and visitors. Know what resonates with your audience.",
  },
];

export default function Index() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-40 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg hero-gradient flex items-center justify-center">
              <Link2 className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="font-heading font-semibold text-lg tracking-tight">LinkFolio</span>
          </div>
          <div className="flex items-center gap-2">
            {user ? (
              <Button asChild size="sm">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/auth">Sign in</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/auth">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6 animate-fade-up">
            <Zap className="w-3 h-3" />
            Free to use — launch in seconds
          </div>
          <h1
            className="font-heading text-4xl sm:text-5xl font-bold tracking-tight mb-4 animate-fade-up stagger-1"
            style={{ lineHeight: "1.05" }}
          >
            Your entire online presence.{" "}
            <span className="hero-gradient-text">One link.</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-lg mx-auto mb-8 animate-fade-up stagger-2">
            Share your social media, content, shop, and affiliate links from a single beautiful page.
            Perfect for your Instagram bio.
          </p>
          <div className="flex items-center justify-center gap-3 animate-fade-up stagger-3">
            <Button asChild size="lg" className="h-12 px-6">
              <Link to="/auth">
                Create your page <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="pb-24 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="glass-card rounded-xl p-6 animate-fade-up"
              style={{ animationDelay: `${(i + 1) * 100}ms`, opacity: 0 }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-base mb-1">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded hero-gradient" />
            <span>LinkFolio</span>
          </div>
          <p>&copy; {new Date().getFullYear()} LinkFolio</p>
        </div>
      </footer>
    </div>
  );
}
