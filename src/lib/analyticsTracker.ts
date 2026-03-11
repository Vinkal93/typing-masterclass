// Client-side analytics tracker using localStorage
export interface VisitorSession {
  id: string;
  timestamp: number;
  page: string;
  referrer: string;
  device: string;
  browser: string;
  os: string;
  screenSize: string;
  language: string;
  country?: string;
  city?: string;
  sessionDuration?: number;
  isNewUser: boolean;
}

export interface AnalyticsData {
  totalVisits: number;
  uniqueVisitors: number;
  sessions: VisitorSession[];
  pageViews: Record<string, number>;
  dailyVisits: Record<string, number>;
  hourlyVisits: Record<string, number>;
  devices: Record<string, number>;
  browsers: Record<string, number>;
  os: Record<string, number>;
  referrers: Record<string, number>;
  countries: Record<string, number>;
  cities: Record<string, number>;
}

const STORAGE_KEY = 'tm_analytics';
const VISITOR_KEY = 'tm_visitor_id';

const getVisitorId = (): string => {
  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = 'v_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
};

const detectDevice = (): string => {
  const ua = navigator.userAgent;
  if (/tablet|ipad/i.test(ua)) return 'Tablet';
  if (/mobile|android|iphone/i.test(ua)) return 'Mobile';
  return 'Desktop';
};

const detectBrowser = (): string => {
  const ua = navigator.userAgent;
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Edg')) return 'Edge';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Safari')) return 'Safari';
  if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
  return 'Other';
};

const detectOS = (): string => {
  const ua = navigator.userAgent;
  if (ua.includes('Windows')) return 'Windows';
  if (ua.includes('Mac')) return 'macOS';
  if (ua.includes('Linux')) return 'Linux';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
  return 'Other';
};

export const getAnalyticsData = (): AnalyticsData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  return {
    totalVisits: 0,
    uniqueVisitors: 0,
    sessions: [],
    pageViews: {},
    dailyVisits: {},
    hourlyVisits: {},
    devices: {},
    browsers: {},
    os: {},
    referrers: {},
    countries: {},
    cities: {},
  };
};

const saveAnalyticsData = (data: AnalyticsData) => {
  // Keep only last 1000 sessions to prevent storage overflow
  if (data.sessions.length > 1000) {
    data.sessions = data.sessions.slice(-1000);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const trackPageView = (page: string) => {
  const data = getAnalyticsData();
  const visitorId = getVisitorId();
  const now = Date.now();
  const today = new Date().toISOString().split('T')[0];
  const hour = new Date().getHours().toString();

  const isNewUser = !data.sessions.some(s => s.id === visitorId);

  const session: VisitorSession = {
    id: visitorId,
    timestamp: now,
    page,
    referrer: document.referrer || 'Direct',
    device: detectDevice(),
    browser: detectBrowser(),
    os: detectOS(),
    screenSize: `${screen.width}x${screen.height}`,
    language: navigator.language,
    isNewUser,
  };

  data.totalVisits++;
  if (isNewUser) data.uniqueVisitors++;
  data.sessions.push(session);

  // Page views
  data.pageViews[page] = (data.pageViews[page] || 0) + 1;

  // Daily visits
  data.dailyVisits[today] = (data.dailyVisits[today] || 0) + 1;

  // Hourly visits
  data.hourlyVisits[hour] = (data.hourlyVisits[hour] || 0) + 1;

  // Device tracking
  data.devices[session.device] = (data.devices[session.device] || 0) + 1;

  // Browser tracking
  data.browsers[session.browser] = (data.browsers[session.browser] || 0) + 1;

  // OS tracking
  data.os[session.os] = (data.os[session.os] || 0) + 1;

  // Referrer tracking
  const referrerDomain = session.referrer === 'Direct' ? 'Direct' : 
    (() => { try { return new URL(session.referrer).hostname; } catch { return 'Unknown'; } })();
  data.referrers[referrerDomain] = (data.referrers[referrerDomain] || 0) + 1;

  saveAnalyticsData(data);
};

export const getTodayVisits = (): number => {
  const data = getAnalyticsData();
  const today = new Date().toISOString().split('T')[0];
  return data.dailyVisits[today] || 0;
};

export const getLiveVisitors = (): number => {
  const data = getAnalyticsData();
  const fiveMinAgo = Date.now() - 5 * 60 * 1000;
  return data.sessions.filter(s => s.timestamp > fiveMinAgo).length;
};

export const getTopPages = (limit = 10): { page: string; views: number }[] => {
  const data = getAnalyticsData();
  return Object.entries(data.pageViews)
    .map(([page, views]) => ({ page, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
};

export const getTrafficSources = (): { source: string; count: number }[] => {
  const data = getAnalyticsData();
  return Object.entries(data.referrers)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count);
};

export const getDailyVisitsChart = (days = 30): { date: string; visits: number }[] => {
  const data = getAnalyticsData();
  const result: { date: string; visits: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    result.push({ date: key, visits: data.dailyVisits[key] || 0 });
  }
  return result;
};

export const clearAnalytics = () => {
  localStorage.removeItem(STORAGE_KEY);
};
