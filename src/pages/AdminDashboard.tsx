import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from "recharts";
import {
  Users, Eye, Monitor, Smartphone, Tablet, Globe, TrendingUp,
  FileText, LogOut, Shield, Activity, MousePointer, ArrowUpRight,
  PenTool, Plus, Save, Trash2, Search, CheckCircle, AlertCircle,
  GraduationCap
} from "lucide-react";
import {
  getAnalyticsData, getLiveVisitors, getTodayVisits,
  getTopPages, getTrafficSources, getDailyVisitsChart, clearAnalytics, AnalyticsData
} from "@/lib/analyticsTracker";
import { blogPosts as defaultBlogPosts, BlogPost } from "@/lib/blogData";

const COLORS = [
  'hsl(198, 93%, 60%)', 'hsl(24, 95%, 53%)', 'hsl(142, 71%, 45%)',
  'hsl(280, 65%, 60%)', 'hsl(340, 82%, 52%)', 'hsl(45, 93%, 47%)',
];

const ADMIN_BLOGS_KEY = 'tm_admin_blogs';
const STUDENTS_KEY = 'tm_student_profiles';

interface AdminBlog {
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  keywords: string;
  status: 'draft' | 'published';
  createdAt: number;
  updatedAt: number;
  views: number;
}

const getAdminBlogs = (): AdminBlog[] => {
  try {
    const data = localStorage.getItem(ADMIN_BLOGS_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
};

const saveAdminBlogs = (blogs: AdminBlog[]) => {
  localStorage.setItem(ADMIN_BLOGS_KEY, JSON.stringify(blogs));
};

const getStudents = (): any[] => {
  try {
    const data = localStorage.getItem(STUDENTS_KEY);
    return data ? Object.values(JSON.parse(data)) : [];
  } catch { return []; }
};

const AdminDashboard = () => {
  const { user, logout, isAdmin, loading } = useAdmin();
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [liveVisitors, setLiveVisitors] = useState(0);
  const [todayVisits, setTodayVisits] = useState(0);
  const [adminBlogs, setAdminBlogs] = useState<AdminBlog[]>(getAdminBlogs());
  const [students, setStudents] = useState<any[]>(getStudents());

  // Blog editor state
  const [editingBlog, setEditingBlog] = useState<AdminBlog | null>(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogSlug, setBlogSlug] = useState("");
  const [blogDesc, setBlogDesc] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogKeywords, setBlogKeywords] = useState("");
  const [blogStatus, setBlogStatus] = useState<'draft' | 'published'>('draft');

  // SEO checker state
  const [seoUrl, setSeoUrl] = useState("");
  const [seoResults, setSeoResults] = useState<{label: string; status: 'good'|'warning'|'error'; message: string}[]>([]);

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate("/admin");
      return;
    }
    const loadData = () => {
      setAnalytics(getAnalyticsData());
      setLiveVisitors(getLiveVisitors());
      setTodayVisits(getTodayVisits());
      setStudents(getStudents());
    };
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, [isAdmin, loading, navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-foreground">Loading...</div>;
  if (!isAdmin) return null;

  const topPages = getTopPages(10);
  const trafficSources = getTrafficSources();
  const dailyChart = getDailyVisitsChart(30);
  const deviceData = analytics ? Object.entries(analytics.devices).map(([name, value]) => ({ name, value })) : [];
  const browserData = analytics ? Object.entries(analytics.browsers).map(([name, value]) => ({ name, value })) : [];
  const osData = analytics ? Object.entries(analytics.os).map(([name, value]) => ({ name, value })) : [];

  const handleLogout = async () => {
    await logout();
    navigate("/admin");
  };

  // Blog management
  const startNewBlog = () => {
    setEditingBlog(null);
    setBlogTitle(""); setBlogSlug(""); setBlogDesc(""); setBlogContent("");
    setBlogCategory(""); setBlogKeywords(""); setBlogStatus('draft');
  };

  const editBlog = (blog: AdminBlog) => {
    setEditingBlog(blog);
    setBlogTitle(blog.title); setBlogSlug(blog.slug); setBlogDesc(blog.description);
    setBlogContent(blog.content); setBlogCategory(blog.category);
    setBlogKeywords(blog.keywords); setBlogStatus(blog.status);
  };

  const saveBlog = () => {
    if (!blogTitle || !blogSlug) return;
    const now = Date.now();
    const blog: AdminBlog = {
      slug: blogSlug,
      title: blogTitle,
      description: blogDesc,
      content: blogContent,
      category: blogCategory,
      keywords: blogKeywords,
      status: blogStatus,
      createdAt: editingBlog?.createdAt || now,
      updatedAt: now,
      views: editingBlog?.views || 0,
    };
    const blogs = getAdminBlogs();
    const idx = blogs.findIndex(b => b.slug === editingBlog?.slug);
    if (idx >= 0) blogs[idx] = blog;
    else blogs.push(blog);
    saveAdminBlogs(blogs);
    setAdminBlogs(blogs);
    startNewBlog();
  };

  const deleteBlog = (slug: string) => {
    const blogs = getAdminBlogs().filter(b => b.slug !== slug);
    saveAdminBlogs(blogs);
    setAdminBlogs(blogs);
  };

  const titleToSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  // SEO checker
  const runSeoCheck = () => {
    const results: typeof seoResults = [];
    const page = defaultBlogPosts.find(p => p.slug === seoUrl) || adminBlogs.find(b => b.slug === seoUrl);
    
    if (!page) {
      results.push({ label: "Page Found", status: 'error', message: "Page not found. Enter a valid blog slug." });
      setSeoResults(results);
      return;
    }

    // Title length
    if (page.title.length >= 30 && page.title.length <= 60) {
      results.push({ label: "Title Length", status: 'good', message: `${page.title.length} chars (30-60 ideal)` });
    } else {
      results.push({ label: "Title Length", status: 'warning', message: `${page.title.length} chars (should be 30-60)` });
    }

    // Description
    if (page.description.length >= 120 && page.description.length <= 160) {
      results.push({ label: "Meta Description", status: 'good', message: `${page.description.length} chars (120-160 ideal)` });
    } else {
      results.push({ label: "Meta Description", status: 'warning', message: `${page.description.length} chars (should be 120-160)` });
    }

    // Content length
    const contentLen = page.content.length;
    if (contentLen > 2000) {
      results.push({ label: "Content Length", status: 'good', message: `${contentLen} chars - good length` });
    } else if (contentLen > 500) {
      results.push({ label: "Content Length", status: 'warning', message: `${contentLen} chars - consider adding more content` });
    } else {
      results.push({ label: "Content Length", status: 'error', message: `${contentLen} chars - too short` });
    }

    // Headings
    const h2Count = (page.content.match(/^## /gm) || []).length;
    if (h2Count >= 3) {
      results.push({ label: "Headings (H2)", status: 'good', message: `${h2Count} headings found` });
    } else {
      results.push({ label: "Headings (H2)", status: 'warning', message: `Only ${h2Count} headings - add more` });
    }

    // Internal links (check for / in content)
    const linkCount = (page.content.match(/\[.*?\]\(\/.*?\)/g) || []).length;
    if (linkCount >= 2) {
      results.push({ label: "Internal Links", status: 'good', message: `${linkCount} internal links` });
    } else {
      results.push({ label: "Internal Links", status: 'warning', message: `${linkCount} links - add more internal links` });
    }

    const score = Math.round((results.filter(r => r.status === 'good').length / results.length) * 100);
    results.unshift({ label: "SEO Score", status: score >= 80 ? 'good' : score >= 50 ? 'warning' : 'error', message: `${score} / 100` });

    setSeoResults(results);
  };

  const allBlogs = [...defaultBlogPosts.map(b => ({ ...b, status: 'published' as const, createdAt: new Date(b.date).getTime(), updatedAt: new Date(b.date).getTime(), views: 0, keywords: b.keywords.join(', ') })), ...adminBlogs];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              <ArrowUpRight className="h-4 w-4 mr-1" /> View Site
            </Button>
            <Button variant="destructive" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-green-500" /> Live Visitors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{liveVisitors}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-primary" /> Today's Visits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{todayVisits}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Users className="h-4 w-4" /> Total Visitors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{analytics?.uniqueVisitors || 0}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <MousePointer className="h-4 w-4" /> Page Views
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{analytics?.totalVisits || 0}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-primary" /> Students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{students.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid grid-cols-6 w-full max-w-2xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
            <TabsTrigger value="pages">Pages</TabsTrigger>
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-4">
            <Card className="border-border">
              <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" /> Daily Traffic (30 Days)</CardTitle></CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dailyChart}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={(v) => v.slice(5)} />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="visits" stroke="hsl(198, 93%, 60%)" fill="hsl(198, 93%, 60%)" fillOpacity={0.2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="border-border">
                <CardHeader><CardTitle className="text-base flex items-center gap-2"><Monitor className="h-4 w-4" /> Devices</CardTitle></CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={deviceData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                          {deviceData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader><CardTitle className="text-base flex items-center gap-2"><Globe className="h-4 w-4" /> Browsers</CardTitle></CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={browserData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="hsl(24, 95%, 53%)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Traffic Sources */}
            <Card className="border-border">
              <CardHeader><CardTitle className="text-base">Traffic Sources</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trafficSources.map((t, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm text-foreground">{t.source}</span>
                      <span className="text-sm font-medium text-foreground">{t.count}</span>
                    </div>
                  ))}
                  {trafficSources.length === 0 && <p className="text-sm text-muted-foreground">No traffic data yet</p>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audience */}
          <TabsContent value="audience" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="border-border">
                <CardHeader><CardTitle className="text-base">Operating Systems</CardTitle></CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={osData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                          {osData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader><CardTitle className="text-base">Recent Sessions</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {analytics?.sessions.slice(-30).reverse().map((s, i) => (
                      <div key={i} className="flex items-center justify-between text-sm border-b border-border pb-1">
                        <div className="flex items-center gap-2">
                          {s.device === 'Mobile' ? <Smartphone className="h-3 w-3" /> :
                            s.device === 'Tablet' ? <Tablet className="h-3 w-3" /> :
                              <Monitor className="h-3 w-3" />}
                          <span className="text-muted-foreground truncate max-w-[120px]">{s.page}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{s.browser}</span>
                          <span>{s.os}</span>
                          <span>{new Date(s.timestamp).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    ))}
                    {(!analytics?.sessions.length) && <p className="text-sm text-muted-foreground">No sessions yet</p>}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Hourly Distribution */}
            <Card className="border-border">
              <CardHeader><CardTitle className="text-base">Hourly Traffic</CardTitle></CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={Array.from({ length: 24 }, (_, i) => ({
                      hour: `${i}:00`,
                      visits: analytics?.hourlyVisits[i.toString()] || 0
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="hour" tick={{ fontSize: 10 }} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="visits" fill="hsl(142, 71%, 45%)" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pages */}
          <TabsContent value="pages" className="space-y-4">
            <Card className="border-border">
              <CardHeader><CardTitle className="text-base flex items-center gap-2"><FileText className="h-4 w-4" /> Top Pages</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topPages.map((p, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm text-foreground truncate max-w-[60%]">{p.page || '/'}</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 bg-primary/20 rounded-full w-24">
                          <div className="h-2 bg-primary rounded-full" style={{ width: `${topPages.length > 0 ? (p.views / topPages[0].views) * 100 : 0}%` }} />
                        </div>
                        <span className="text-sm font-medium text-foreground w-12 text-right">{p.views}</span>
                      </div>
                    </div>
                  ))}
                  {topPages.length === 0 && <p className="text-sm text-muted-foreground">No page data yet</p>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blog Management */}
          <TabsContent value="blogs" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">Blog Management</h3>
              <Button size="sm" onClick={startNewBlog}><Plus className="h-4 w-4 mr-1" /> New Post</Button>
            </div>

            {/* Blog Editor */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <PenTool className="h-4 w-4" /> {editingBlog ? 'Edit Post' : 'New Post'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Title</Label>
                    <Input value={blogTitle} onChange={e => { setBlogTitle(e.target.value); if (!editingBlog) setBlogSlug(titleToSlug(e.target.value)); }} placeholder="Blog post title" />
                  </div>
                  <div>
                    <Label>URL Slug</Label>
                    <Input value={blogSlug} onChange={e => setBlogSlug(e.target.value)} placeholder="url-slug" />
                  </div>
                </div>
                <div>
                  <Label>Meta Description</Label>
                  <Input value={blogDesc} onChange={e => setBlogDesc(e.target.value)} placeholder="SEO description (120-160 chars)" />
                  <span className="text-xs text-muted-foreground">{blogDesc.length}/160</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Category</Label>
                    <Input value={blogCategory} onChange={e => setBlogCategory(e.target.value)} placeholder="e.g. Tips & Tricks" />
                  </div>
                  <div>
                    <Label>Keywords (comma separated)</Label>
                    <Input value={blogKeywords} onChange={e => setBlogKeywords(e.target.value)} placeholder="keyword1, keyword2" />
                  </div>
                </div>
                <div>
                  <Label>Content (Markdown)</Label>
                  <Textarea 
                    value={blogContent} onChange={e => setBlogContent(e.target.value)} 
                    placeholder="Write your blog content in markdown..." 
                    className="min-h-[300px] font-mono text-sm"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Button onClick={() => { setBlogStatus('published'); saveBlog(); }} className="gap-1">
                    <CheckCircle className="h-4 w-4" /> Publish
                  </Button>
                  <Button variant="outline" onClick={() => { setBlogStatus('draft'); saveBlog(); }} className="gap-1">
                    <Save className="h-4 w-4" /> Save Draft
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Blog List */}
            <Card className="border-border">
              <CardHeader><CardTitle className="text-base">All Posts ({allBlogs.length})</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {allBlogs.map((b, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-border pb-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{b.title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge variant={b.status === 'published' ? 'default' : 'secondary'} className="text-[10px]">
                            {b.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{b.category}</span>
                          <span className="text-xs text-muted-foreground">/{b.slug}</span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {adminBlogs.find(ab => ab.slug === b.slug) && (
                          <>
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => editBlog(b as AdminBlog)}>
                              <PenTool className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteBlog(b.slug)}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO Checker */}
          <TabsContent value="seo" className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2"><Search className="h-4 w-4" /> SEO Checker</CardTitle>
                <CardDescription>Enter a blog slug to analyze SEO</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input value={seoUrl} onChange={e => setSeoUrl(e.target.value)} placeholder="e.g. how-to-increase-typing-speed" />
                  <Button onClick={runSeoCheck}>Analyze</Button>
                </div>
                {seoResults.length > 0 && (
                  <div className="space-y-2">
                    {seoResults.map((r, i) => (
                      <div key={i} className="flex items-center justify-between border-b border-border pb-2">
                        <div className="flex items-center gap-2">
                          {r.status === 'good' ? <CheckCircle className="h-4 w-4 text-green-500" /> :
                           r.status === 'warning' ? <AlertCircle className="h-4 w-4 text-yellow-500" /> :
                           <AlertCircle className="h-4 w-4 text-destructive" />}
                          <span className="text-sm font-medium text-foreground">{r.label}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{r.message}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students */}
          <TabsContent value="students" className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" /> Registered Students ({students.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {students.length > 0 ? (
                  <div className="space-y-2">
                    {students.map((s: any, i) => (
                      <div key={i} className="flex items-center justify-between border-b border-border pb-2">
                        <div>
                          <p className="text-sm font-medium text-foreground">{s.displayName}</p>
                          <p className="text-xs text-muted-foreground">{s.email}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-mono text-primary">{s.studentId}</p>
                          <p className="text-xs text-muted-foreground">
                            {s.plan === 'premium' ? '⭐ Premium' : 'Free'} • {s.completedLessons?.length || 0} lessons
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No students registered yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={() => { clearAnalytics(); window.location.reload(); }}>
            Clear Analytics Data
          </Button>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
