import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link2, ArrowRight, Zap, Palette, Share2, BarChart3, Shield, Smartphone, Globe, Users } from "lucide-react";
import { useAuth } from "@/lib/auth";
import ThemeToggle from "@/components/ThemeToggle";

const features = [
  {
    icon: Link2,
    title: "All Your Links, One Place",
    desc: "Instagram, YouTube, shop, affiliate — share everything from a single, beautiful page.",
  },
  {
    icon: Palette,
    title: "Fully Customizable",
    desc: "Make your page truly yours with themes, colors, banners, and your personal brand identity.",
  },
  {
    icon: Share2,
    title: "One Link for Bio",
    desc: "Drop a single URL in your Instagram bio. Your audience discovers everything about you.",
  },
  {
    icon: BarChart3,
    title: "Track Performance",
    desc: "See who visits your page and which links get the most clicks. Data-driven decisions.",
  },
  {
    icon: Shield,
    title: "Verified Profiles",
    desc: "Get a blue verification badge to build trust with your audience and stand out.",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    desc: "Looks stunning on every device. Your audience gets a perfect experience, always.",
  },
];

const stats = [
  { label: "Active Users", value: "10K+" },
  { label: "Links Created", value: "50K+" },
  { label: "Monthly Clicks", value: "1M+" },
  { label: "Uptime", value: "99.9%" },
];

export default function Index() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl hero-gradient flex items-center justify-center shadow-md">
              <Link2 className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight">LinkFolio</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {user ? (
              <Button asChild size="sm" className="rounded-full px-5">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm" className="hidden sm:flex">
                  <Link to="/auth">Sign in</Link>
                </Button>
                <Button asChild size="sm" className="rounded-full px-5">
                  <Link to="/auth">Get Started Free</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-36 pb-20 px-4 sm:px-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-0 w-[300px] h-[300px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-8 animate-fade-up">
            <Zap className="w-3.5 h-3.5" />
            Free to use — launch in seconds
          </div>
          <h1
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-up stagger-1"
            style={{ lineHeight: "1.08" }}
          >
            Your entire online presence.{" "}
            <span className="hero-gradient-text">One link.</span>
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-xl mx-auto mb-10 animate-fade-up stagger-2 leading-relaxed">
            Share your social media, content, shop, and affiliate links from a single beautiful page.
            Perfect for your Instagram bio.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up stagger-3">
            <Button asChild size="lg" className="h-13 px-8 rounded-full text-base shadow-lg shadow-primary/20">
              <Link to="/auth">
                Create your page <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-13 px-8 rounded-full text-base">
              <Link to="/auth">See how it works</Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-2xl mx-auto mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fade-up stagger-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-2xl sm:text-3xl font-bold hero-gradient-text">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4 animate-fade-up">
              Everything you need to <span className="hero-gradient-text">stand out</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto animate-fade-up stagger-1">
              Professional features that help creators, influencers, and businesses grow their online presence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 animate-fade-up"
                style={{ animationDelay: `${(i + 1) * 80}ms`, opacity: 0 }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 sm:px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
              Get started in <span className="hero-gradient-text">3 simple steps</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Create Account", desc: "Sign up with Google or email in under 30 seconds.", icon: Users },
              { step: "02", title: "Add Your Links", desc: "Add your social media, website, shop, or any URL you want to share.", icon: Link2 },
              { step: "03", title: "Share Your Page", desc: "Copy your unique URL and paste it in your Instagram bio. Done!", icon: Globe },
            ].map((item, i) => (
              <div key={item.step} className="text-center animate-fade-up" style={{ animationDelay: `${(i + 1) * 120}ms`, opacity: 0 }}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-card border border-border shadow-sm mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="text-xs font-bold text-primary mb-2">{item.step}</div>
                <h3 className="font-heading font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4 animate-fade-up">
            Ready to create your page?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 animate-fade-up stagger-1">
            Join thousands of creators who use LinkFolio to share their online presence. It's free, forever.
          </p>
          <Button asChild size="lg" className="h-13 px-10 rounded-full text-base shadow-lg shadow-primary/20 animate-fade-up stagger-2">
            <Link to="/auth">
              Get Started Free <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md hero-gradient" />
            <span className="font-heading font-semibold">LinkFolio</span>
          </div>
          <p>&copy; {new Date().getFullYear()} LinkFolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
