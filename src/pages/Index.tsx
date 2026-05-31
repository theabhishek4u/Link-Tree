import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Link2, ArrowRight, Zap, Palette, Share2, BarChart3, Shield,
  Smartphone, Globe, Users, BadgeCheck, Instagram, Youtube,
  ShoppingBag, Mail, Play, Sparkles
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import ThemeToggle from "@/components/ThemeToggle";

const features = [
  {
    icon: Link2,
    color: "from-emerald-500 to-teal-400",
    title: "All Your Links, One Place",
    desc: "Instagram, YouTube, shop, affiliate — share everything from a single, beautiful link-in-bio page.",
  },
  {
    icon: Palette,
    color: "from-pink-500 to-rose-400",
    title: "Fully Customizable",
    desc: "Express your identity. Customize themes, colors, button styles, custom banners, and fonts in seconds.",
  },
  {
    icon: Share2,
    color: "from-blue-500 to-sky-400",
    title: "Optimized for Social Bio",
    desc: "Drop a single URL in your social media bios. Your audience discovers everything you do in one click.",
  },
  {
    icon: BarChart3,
    color: "from-amber-500 to-orange-400",
    title: "Advanced Analytics",
    desc: "Track page views, click-through rates, and link performance with beautiful, intuitive charts.",
  },
  {
    icon: Shield,
    color: "from-indigo-500 to-violet-400",
    title: "Verified Creator Profiles",
    desc: "Get a blue verification badge to build immediate trust with your audience and stand out.",
  },
  {
    icon: Smartphone,
    color: "from-purple-500 to-fuchsia-400",
    title: "Blazing Fast & Responsive",
    desc: "Engineered for speed. Perfect rendering on every mobile device and browser.",
  },
];

const stats = [
  { label: "Active Creators", value: "10K+", desc: "Sharing their passion daily" },
  { label: "Links Shared", value: "50K+", desc: "Reaching global audiences" },
  { label: "Monthly Clicks", value: "1M+", desc: "High engagement rates" },
  { label: "Server Uptime", value: "99.9%", desc: "Reliable & fast redirecting" },
];

export default function Index() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden selection:bg-primary/30">
      {/* Decorative Background Glowing Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/10 dark:bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-accent/5 dark:bg-accent/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-primary/5 dark:bg-primary/3 blur-[120px] pointer-events-none" />

      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-40 bg-background/70 backdrop-blur-xl border-b border-border/40 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-9 h-9 rounded-xl hero-gradient flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
              <Link2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight bg-gradient-to-r from-foreground to-foreground/80">
              LinkFolio
            </span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {user ? (
              <Button asChild size="sm" className="rounded-full px-6 bg-primary hover:bg-primary/95 transition-all shadow-md shadow-primary/10">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm" className="hidden sm:flex rounded-full text-muted-foreground hover:text-foreground">
                  <Link to="/auth">Sign in</Link>
                </Button>
                <Button asChild size="sm" className="rounded-full px-6 bg-primary hover:bg-primary/95 hover:shadow-lg hover:shadow-primary/20 transition-all">
                  <Link to="/auth">Get Started Free</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Copy */}
          <div className="lg:col-span-7 text-left flex flex-col items-start relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6 animate-fade-up">
              <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
              Free to use — launch your page in seconds
            </div>
            <h1
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-up stagger-1 text-foreground"
              style={{ lineHeight: "1.1" }}
            >
              Your entire online presence.{" "}
              <span className="hero-gradient-text">One beautiful link.</span>
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-xl mb-8 animate-fade-up stagger-2 leading-relaxed">
              Create a stunning, fully-customized page to share your social media, online shop, youtube channel, or affiliate links. Drop a single URL in your bio.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto animate-fade-up stagger-3">
              <Button asChild size="lg" className="h-13 px-8 rounded-full text-base font-semibold shadow-xl shadow-primary/20 bg-primary hover:bg-primary/95 transition-all">
                <Link to="/auth" className="flex items-center justify-center gap-2">
                  Create your page <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-13 px-8 rounded-full text-base font-medium border-border/80 hover:bg-muted/50 transition-all">
                <Link to="/auth">See how it works</Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Premium Live Mobile Phone Mockup */}
          <div className="lg:col-span-5 flex justify-center items-center relative z-10 animate-fade-up stagger-3">
            {/* Ambient glow behind phone */}
            <div className="absolute w-72 h-72 rounded-full bg-primary/20 dark:bg-primary/10 blur-[60px] pointer-events-none" />
            
            {/* Phone Container */}
            <div className="w-[290px] h-[580px] sm:w-[310px] sm:h-[620px] rounded-[44px] border-[10px] border-zinc-900 dark:border-zinc-800 bg-zinc-950 shadow-2xl relative overflow-hidden transition-all duration-500 hover:rotate-2 hover:scale-[1.02] hover:shadow-primary/10">
              
              {/* Notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-4 bg-zinc-900 rounded-full z-30 flex items-center justify-between px-2">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                <div className="w-10 h-1 bg-zinc-800 rounded-full" />
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
              </div>

              {/* Status Bar */}
              <div className="absolute top-8 inset-x-0 px-6 flex justify-between items-center text-[10px] font-semibold text-zinc-400 z-20">
                <span>9:41</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-2.5 rounded-sm border border-zinc-500 flex items-center p-0.5"><div className="w-full h-full bg-zinc-400 rounded-2xs" /></div>
                </div>
              </div>

              {/* Phone Content Screen */}
              <div className="h-full overflow-y-auto pb-8 pt-12 flex flex-col items-center relative scrollbar-none">
                {/* Micro Ambient Glow inside screen */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-emerald-500/10 blur-xl pointer-events-none" />
                <div className="absolute bottom-10 left-0 w-32 h-32 rounded-full bg-indigo-500/10 blur-xl pointer-events-none" />

                {/* Banner */}
                <div className="w-full h-24 bg-gradient-to-tr from-emerald-600 via-teal-500 to-indigo-600 shrink-0 relative">
                  <div className="absolute inset-0 bg-black/10" />
                </div>

                {/* Avatar overlapping banner */}
                <div className="w-18 h-18 rounded-full bg-zinc-900 p-1 shrink-0 -mt-9 relative z-10 shadow-lg">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-400 to-emerald-400 flex items-center justify-center font-heading font-extrabold text-lg text-white">
                    AC
                  </div>
                </div>

                {/* Profile info */}
                <div className="text-center mt-3 px-4 shrink-0">
                  <h3 className="font-heading font-bold text-sm text-zinc-100 flex items-center justify-center gap-1">
                    Alex Creator
                    <BadgeCheck className="w-4 h-4 text-blue-400 fill-blue-400 shrink-0" />
                  </h3>
                  <p className="text-[10px] text-zinc-400 mt-0.5 font-medium">@alex_creator</p>
                  <p className="text-[11px] text-zinc-300 mt-2 max-w-[200px] leading-relaxed">
                    Digital Designer & Content Specialist. Crafting premium assets for creators.
                  </p>
                </div>

                {/* Phone mockup Links list */}
                <div className="w-full px-5 mt-5 space-y-2.5 shrink-0">
                  {[
                    { title: "Subscribe to Youtube", icon: Youtube, color: "hover:text-red-400" },
                    { title: "Latest Instagram Reels", icon: Instagram, color: "hover:text-pink-400" },
                    { title: "My Design Assets & Templates", icon: ShoppingBag, color: "hover:text-amber-400" },
                    { title: "Weekly Tech Newsletter", icon: Mail, color: "hover:text-emerald-400" },
                  ].map((link, idx) => (
                    <div
                      key={idx}
                      className="group flex items-center justify-between rounded-xl bg-zinc-900/90 border border-zinc-800/80 px-3.5 py-2.5 hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-300 cursor-pointer shadow-sm active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center group-hover:bg-zinc-700 shrink-0 transition-colors">
                          <link.icon className="w-4 h-4 text-zinc-200" />
                        </div>
                        <span className="text-[11px] font-semibold text-zinc-200 truncate">{link.title}</span>
                      </div>
                      <ArrowRight className="w-3 h-3 text-zinc-500 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </div>
                  ))}
                </div>

                {/* Micro product card */}
                <div className="w-[88%] bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-2.5 mt-5 shrink-0 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center shrink-0">
                    <Play className="w-5 h-5 text-white fill-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] font-bold text-accent uppercase tracking-wider block">Featured Asset</span>
                    <span className="text-[10px] font-semibold text-zinc-200 truncate block mt-0.5">Creator Video Masterclass</span>
                  </div>
                  <div className="text-[10px] font-bold text-emerald-400 px-2 py-1 bg-emerald-500/10 rounded-lg shrink-0">
                    $19
                  </div>
                </div>

                {/* Footer badge */}
                <div className="mt-auto pt-6 flex items-center gap-1 text-[9px] text-zinc-500 select-none">
                  <div className="w-3.5 h-3.5 rounded bg-gradient-to-br from-primary to-accent" />
                  <span>Made with LinkFolio</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 relative border-y border-border/30 bg-muted/20 dark:bg-muted/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                className="group relative rounded-2xl border border-border/40 bg-card/40 backdrop-blur-md p-5 text-center hover:shadow-lg hover:border-primary/20 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${(idx + 1) * 80}ms` }}
              >
                <p className="font-heading text-3xl sm:text-4xl font-extrabold hero-gradient-text">
                  {stat.value}
                </p>
                <p className="text-sm font-semibold text-foreground/90 mt-2">{stat.label}</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-[150px] mx-auto leading-relaxed">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] font-bold uppercase tracking-wider mb-4 animate-fade-up">
              Complete Feature Suite
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4 text-foreground animate-fade-up">
              Everything you need to <span className="hero-gradient-text">stand out</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-lg mx-auto animate-fade-up stagger-1 leading-relaxed">
              Professional creator features designed to boost engagement, capture sales, and grow your digital audience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group relative rounded-2xl border border-border/50 bg-card/60 backdrop-blur-md p-6 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${(i + 1) * 80}ms` }}
              >
                {/* Ambient glow behind card on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 shrink-0 shadow-md shadow-primary/5 text-white group-hover:scale-105 transition-transform duration-300`}>
                  <f.icon className="w-5.5 h-5.5" />
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 sm:px-6 bg-muted/40 dark:bg-muted/10 relative">
        {/* Background glow lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-wider mb-4 animate-fade-up">
              Quick Setup
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4 text-foreground animate-fade-up">
              Get started in <span className="hero-gradient-text">3 simple steps</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Visual connector lines on larger screens */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 z-0 pointer-events-none" />
            
            {[
              { step: "01", title: "Create Account", desc: "Sign up with Google or email in under 30 seconds.", icon: Users },
              { step: "02", title: "Add Your Links", desc: "Add your social media, website, shop, or any URL you want to share.", icon: Link2 },
              { step: "03", title: "Share Your Page", desc: "Copy your unique URL and paste it in your Instagram bio. Done!", icon: Globe },
            ].map((item, i) => (
              <div
                key={item.step}
                className="text-center bg-card/70 backdrop-blur-md border border-border/40 hover:border-primary/20 rounded-2xl p-6 transition-all duration-300 relative z-10 animate-fade-up hover:shadow-lg"
                style={{ animationDelay: `${(i + 1) * 120}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 shadow-sm mb-5 group-hover:scale-105 transition-transform duration-300">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-primary/80 mb-2">{item.step}</div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="group relative rounded-[32px] border border-border/60 bg-gradient-to-br from-card/80 to-card/40 p-8 sm:p-12 text-center overflow-hidden shadow-2xl transition-all duration-500 hover:border-primary/30">
            {/* Ambient Background blur inside CTA */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-primary/20 dark:bg-primary/10 blur-[80px] pointer-events-none" />
            
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold mb-6 animate-fade-up text-foreground relative z-10">
              Ready to create your page?
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-lg mx-auto animate-fade-up stagger-1 leading-relaxed relative z-10">
              Join thousands of creators who trust LinkFolio to curate their online presence. It's fully featured, beautiful, and free forever.
            </p>
            <Button
              asChild
              size="lg"
              className="h-13 px-10 rounded-full text-base font-semibold shadow-xl shadow-primary/25 animate-fade-up stagger-2 bg-primary hover:bg-primary/95 transition-all relative z-10"
            >
              <Link to="/auth" className="inline-flex items-center gap-2">
                Get Started Free <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 px-4 sm:px-6 bg-card/20 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-6 h-6 rounded-lg hero-gradient flex items-center justify-center group-hover:rotate-6 transition-transform">
              <Link2 className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-foreground hover:text-primary transition-colors">LinkFolio</span>
          </div>
          <div className="flex items-center gap-6 text-xs font-medium">
            <a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="mailto:support@linkfolio.app" className="hover:text-foreground transition-colors">Contact Support</a>
          </div>
          <p className="text-xs">&copy; {new Date().getFullYear()} LinkFolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
