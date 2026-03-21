import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useProfile, useUpdateProfile } from "@/hooks/useProfile";
import { useLinks, useAddLink, useUpdateLink, useDeleteLink } from "@/hooks/useLinks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Link2, Trash2, ExternalLink, LogOut, Copy, GripVertical,
  Instagram, Facebook, Linkedin, Twitter, Youtube, Globe, ShoppingBag,
  User, Eye, Settings, Mail, Phone, BadgeCheck,
} from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import AvatarUpload from "@/components/AvatarUpload";
import BannerUpload from "@/components/BannerUpload";
import SocialLinkForm from "@/components/SocialLinkForm";
import ThemeToggle from "@/components/ThemeToggle";

const ICON_OPTIONS = [
  { value: "instagram", label: "Instagram", icon: Instagram },
  { value: "facebook", label: "Facebook", icon: Facebook },
  { value: "linkedin", label: "LinkedIn", icon: Linkedin },
  { value: "twitter", label: "X / Twitter", icon: Twitter },
  { value: "youtube", label: "YouTube", icon: Youtube },
  { value: "website", label: "Website", icon: Globe },
  { value: "shop", label: "Shop / Affiliate", icon: ShoppingBag },
  { value: "other", label: "Other", icon: Link2 },
];

function getIconComponent(iconName: string | null) {
  const found = ICON_OPTIONS.find((i) => i.value === iconName);
  return found ? found.icon : Link2;
}

export default function Dashboard() {
  const { user, loading: authLoading, signOut } = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: links, isLoading: linksLoading } = useLinks();
  const updateProfile = useUpdateProfile();
  const addLink = useAddLink();
  const updateLink = useUpdateLink();
  const deleteLink = useDeleteLink();
  const navigate = useNavigate();

  const [tab, setTab] = useState<"links" | "profile">("links");
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    display_name: "",
    bio: "",
    username: "",
    email_contact: "",
    phone: "",
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;

  const handleAddLink = async (link: { title: string; url: string; icon: string; link_type: string }) => {
    try {
      await addLink.mutateAsync(link);
      toast.success("Link added!");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleAvatarUploaded = async (url: string) => {
    try {
      await updateProfile.mutateAsync({ avatar_url: url });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleBannerUploaded = async (url: string) => {
    try {
      await updateProfile.mutateAsync({ banner_url: url });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile.mutateAsync(profileForm);
      setEditingProfile(false);
      toast.success("Profile updated!");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const startEditProfile = () => {
    setProfileForm({
      display_name: profile?.display_name || "",
      bio: profile?.bio || "",
      username: profile?.username || "",
      email_contact: profile?.email_contact || "",
      phone: profile?.phone || "",
    });
    setEditingProfile(true);
  };

  const copyLink = () => {
    if (profile?.username) {
      navigator.clipboard.writeText(`${window.location.origin}/${profile.username}`);
      toast.success("Link copied!");
    }
  };

  if (profileLoading || linksLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg hero-gradient flex items-center justify-center">
              <Link2 className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="font-heading font-semibold">LinkFolio</span>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            {profile?.username && (
              <Button variant="ghost" size="sm" onClick={() => navigate(`/${profile.username}`)}>
                <Eye className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">View Page</span>
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={copyLink}>
              <Copy className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Copy Link</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={signOut}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* URL Banner */}
        {profile?.username && (
          <div className="glass-card rounded-xl p-4 mb-8 flex items-center justify-between animate-fade-up">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Your public page</p>
              <p className="font-medium text-sm font-heading">
                {window.location.origin}/{profile.username}
              </p>
            </div>
            <Button size="sm" onClick={copyLink}>
              <Copy className="w-3.5 h-3.5 mr-1" /> Copy
            </Button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-muted rounded-lg p-1">
          <button
            onClick={() => setTab("links")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-sm font-medium transition-all ${
              tab === "links" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Link2 className="w-4 h-4" /> Links
          </button>
          <button
            onClick={() => setTab("profile")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-sm font-medium transition-all ${
              tab === "profile" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <User className="w-4 h-4" /> Profile
          </button>
        </div>

        {tab === "links" && (
          <div className="space-y-6 animate-fade-up">
            <SocialLinkForm onSubmit={handleAddLink} isPending={addLink.isPending} />

            {/* Links List */}
            <div className="space-y-2">
              {links && links.length > 0 ? (
                links.map((link) => {
                  const Icon = getIconComponent(link.icon);
                  return (
                    <div key={link.id} className="link-card flex items-center gap-3">
                      <GripVertical className="w-4 h-4 text-muted-foreground/40 cursor-grab" />
                      <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{link.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{link.url}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={link.is_active}
                          onCheckedChange={(checked) =>
                            updateLink.mutate({ id: link.id, is_active: checked })
                          }
                        />
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => deleteLink.mutate(link.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12">
                  <div className="w-12 h-12 rounded-full bg-muted mx-auto mb-3 flex items-center justify-center">
                    <Link2 className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-sm">No links yet. Add your first link above!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "profile" && (
          <div className="animate-fade-up">
            {editingProfile ? (
              <form onSubmit={handleUpdateProfile} className="glass-card rounded-xl p-5 space-y-4">
                <h2 className="font-heading font-semibold text-lg">Edit Profile</h2>

                {/* Banner */}
                <div>
                  <Label className="text-sm">Banner Image</Label>
                  <div className="mt-1">
                    <BannerUpload
                      currentUrl={profile?.banner_url || null}
                      onUploaded={handleBannerUploaded}
                    />
                  </div>
                </div>

                {/* Avatar */}
                <div className="flex justify-center">
                  <AvatarUpload
                    currentUrl={profile?.avatar_url || null}
                    displayName={profile?.display_name || null}
                    onUploaded={handleAvatarUploaded}
                  />
                </div>

                <div>
                  <Label className="text-sm">Username</Label>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-muted-foreground mr-1">{window.location.host}/</span>
                    <Input
                      value={profileForm.username}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, username: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "") })
                      }
                      placeholder="yourname"
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-sm">Display Name</Label>
                  <Input
                    value={profileForm.display_name}
                    onChange={(e) => setProfileForm({ ...profileForm, display_name: e.target.value })}
                    placeholder="Your Name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm">Bio</Label>
                  <Textarea
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    placeholder="Tell people about yourself..."
                    className="mt-1"
                    rows={3}
                  />
                </div>

                {/* Contact Info */}
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-heading font-semibold text-sm mb-3 flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Contact Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <Label className="text-sm">Email (public)</Label>
                      <Input
                        type="email"
                        value={profileForm.email_contact}
                        onChange={(e) => setProfileForm({ ...profileForm, email_contact: e.target.value })}
                        placeholder="hello@example.com"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Phone (public)</Label>
                      <Input
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Verification Badge Info */}
                <div className="border-t pt-4 mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <BadgeCheck className={`w-5 h-5 ${profile?.is_verified ? "text-blue-500 fill-blue-500" : "text-muted-foreground"}`} />
                    <span className="font-medium">
                      {profile?.is_verified ? "Verified Profile ✓" : "Not Verified"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Verification badges are granted by LinkFolio admins.
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={updateProfile.isPending}>
                    {updateProfile.isPending ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setEditingProfile(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="glass-card rounded-xl overflow-hidden">
                {/* Banner Preview */}
                <div className="w-full h-32 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 overflow-hidden">
                  {profile?.banner_url ? (
                    <img src={profile.banner_url} alt="Banner" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full hero-gradient opacity-20" />
                  )}
                </div>

                <div className="p-5 -mt-10">
                  <div className="flex items-end justify-between mb-4">
                    <div className="flex items-end gap-4">
                      <div className="relative">
                        <div className="ring-4 ring-card rounded-full">
                          <AvatarUpload
                            currentUrl={profile?.avatar_url || null}
                            displayName={profile?.display_name || null}
                            onUploaded={handleAvatarUploaded}
                          />
                        </div>
                        {profile?.is_verified && (
                          <BadgeCheck className="absolute -bottom-1 -right-1 w-6 h-6 text-blue-500 fill-blue-500" />
                        )}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={startEditProfile}>
                      <Settings className="w-4 h-4 mr-1" /> Edit
                    </Button>
                  </div>

                  <h2 className="font-heading font-semibold text-lg">{profile?.display_name || "Your Name"}</h2>
                  <p className="text-sm text-muted-foreground">@{profile?.username || "username"}</p>
                  {profile?.bio && <p className="text-sm mt-2 text-foreground/80">{profile.bio}</p>}

                  {(profile?.email_contact || profile?.phone) && (
                    <div className="flex flex-wrap gap-3 mt-3">
                      {profile?.email_contact && (
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Mail className="w-3.5 h-3.5" /> {profile.email_contact}
                        </span>
                      )}
                      {profile?.phone && (
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Phone className="w-3.5 h-3.5" /> {profile.phone}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
