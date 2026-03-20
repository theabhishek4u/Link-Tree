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
  User, Settings, Eye
} from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import AvatarUpload from "@/components/AvatarUpload";
import SocialLinkForm from "@/components/SocialLinkForm";

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
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;

  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLink.title.trim() || !newLink.url.trim()) return;
    try {
      await addLink.mutateAsync(newLink);
      setNewLink({ title: "", url: "", icon: "other", link_type: "link" });
      toast.success("Link added!");
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
          <div className="flex items-center gap-2">
            {profile?.username && (
              <Button variant="ghost" size="sm" onClick={() => navigate(`/${profile.username}`)}>
                <Eye className="w-4 h-4 mr-1" />
                View Page
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={copyLink}>
              <Copy className="w-4 h-4 mr-1" />
              Copy Link
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
            {/* Add Link Form */}
            <form onSubmit={handleAddLink} className="glass-card rounded-xl p-5 space-y-4">
              <h2 className="font-heading font-semibold text-lg">Add New Link</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-sm">Title</Label>
                  <Input
                    value={newLink.title}
                    onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                    placeholder="My Instagram"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm">URL</Label>
                  <Input
                    value={newLink.url}
                    onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                    placeholder="https://instagram.com/username"
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm">Type</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {ICON_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setNewLink({ ...newLink, icon: opt.value })}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          newLink.icon === opt.value
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
              <Button type="submit" disabled={addLink.isPending} className="h-10">
                <Plus className="w-4 h-4 mr-1" />
                {addLink.isPending ? "Adding..." : "Add Link"}
              </Button>
            </form>

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
              <div className="glass-card rounded-xl p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-3 text-2xl font-heading font-bold text-muted-foreground">
                      {profile?.display_name?.[0]?.toUpperCase() || "?"}
                    </div>
                    <h2 className="font-heading font-semibold text-lg">{profile?.display_name || "Your Name"}</h2>
                    <p className="text-sm text-muted-foreground">@{profile?.username || "username"}</p>
                    {profile?.bio && <p className="text-sm mt-2 text-foreground/80">{profile.bio}</p>}
                  </div>
                  <Button variant="outline" size="sm" onClick={startEditProfile}>
                    <Settings className="w-4 h-4 mr-1" /> Edit
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
