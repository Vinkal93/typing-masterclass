import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area
} from "recharts";
import {
  Users, Eye, Monitor, Smartphone, Tablet, Globe, TrendingUp,
  FileText, LogOut, Shield, Clock, Activity, MousePointer, ArrowUpRight
} from "lucide-react";
import {
  getAnalyticsData, getLiveVisitors, getTodayVisits,
  getTopPages, getTrafficSources, getDailyVisitsChart, clearAnalytics, AnalyticsData
} from "@/lib/analyticsTracker";

const COLORS = [
  'hsl(198, 93%, 60%)', 'hsl(24, 95%, 53%)', 'hsl(142, 71%, 45%)',
  'hsl(280, 65%, 60%)', 'hsl(340, 82%, 52%)', 'hsl(45, 93%, 47%)',
];

const AdminDashboard = () => {
  const { user, logout, isAdmin, loading } = useAdmin();
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [liveVisitors, setLiveVisitors] = useState(0);
  const [todayVisits, setTodayVisits] = useState(0);

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate("/admin");
      return;
    }
    const loadData = () => {
      setAnalytics(getAnalyticsData());
      setLiveVisitors(getLiveVisitors());
      setTodayVisits(getTodayVisits());
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

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-green-500" /> Live Visitors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{liveVisitors}</p>
              <p className="text-xs text-muted-foreground">Last 5 minutes</p>
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
              <p className="text-xs text-muted-foreground">{new Date().toLocaleDateString()}</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Users className="h-4 w-4 text-secondary" /> Total Visitors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{analytics?.uniqueVisitors || 0}</p>
              <p className="text-xs text-muted-foreground">Unique visitors</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <MousePointer className="h-4 w-4 text-accent" /> Total Page Views
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{analytics?.totalVisits || 0}</p>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full max-w-lg">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
            <TabsTrigger value="pages">Pages</TabsTrigger>
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" /> Daily Traffic (Last 30 Days)
                </CardTitle>
              </CardHeader>
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
              {/* Device Distribution */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Monitor className="h-4 w-4" /> Devices
                  </CardTitle>
                </CardHeader>
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

              {/* Browser Distribution */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Globe className="h-4 w-4" /> Browsers
                  </CardTitle>
                </CardHeader>
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
          </TabsContent>

          {/* Audience Tab */}
          <TabsContent value="audience" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-base">Operating Systems</CardTitle>
                </CardHeader>
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
                <CardHeader>
                  <CardTitle className="text-base">Recent Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-[250px] overflow-y-auto">
                    {analytics?.sessions.slice(-20).reverse().map((s, i) => (
                      <div key={i} className="flex items-center justify-between text-sm border-b border-border pb-1">
                        <div className="flex items-center gap-2">
                          {s.device === 'Mobile' ? <Smartphone className="h-3 w-3" /> :
                            s.device === 'Tablet' ? <Tablet className="h-3 w-3" /> :
                              <Monitor className="h-3 w-3" />}
                          <span className="text-muted-foreground truncate max-w-[150px]">{s.page}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{s.browser}</span>
                          <span>{new Date(s.timestamp).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    ))}
                    {(!analytics?.sessions.length) && <p className="text-sm text-muted-foreground">No sessions recorded yet</p>}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Pages Tab */}
          <TabsContent value="pages" className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="h-4 w-4" /> Top Pages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topPages.map((p, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm text-foreground truncate max-w-[60%]">{p.page || '/'}</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 bg-primary/20 rounded-full w-24">
                          <div
                            className="h-2 bg-primary rounded-full"
                            style={{ width: `${topPages.length > 0 ? (p.views / topPages[0].views) * 100 : 0}%` }}
                          />
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

          {/* Traffic Tab */}
          <TabsContent value="traffic" className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Traffic Sources</CardTitle>
              </CardHeader>
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

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Hourly Distribution</CardTitle>
              </CardHeader>
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
        </Tabs>

        {/* Clear Analytics */}
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
