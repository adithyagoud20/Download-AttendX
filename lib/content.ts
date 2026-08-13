import { supabase } from './supabase';
import type {
  SiteConfig,
  Feature,
  Screenshot,
  InstallationStep,
  Faq,
  SiteContent,
} from './types';

export const defaultConfig: SiteConfig = {
  id: 1,
  app_name: 'AttendX',
  tagline: 'Smart Attendance, Built Around Your Timetable',
  version: '1.0.0',
  hero_headline: 'Smart Attendance, Built Around Your Timetable',
  hero_description:
    'Track attendance, manage your timetable, and understand your attendance at a glance.',
  hero_image_url: '',
  apk_url: '',
  apk_version: '1.0.0',
  apk_release_date: null,
  apk_size: '',
  apk_release_notes: '',
  youtube_url: '',
  youtube_title: '',
  updated_at: new Date().toISOString(),
};

export const defaultFeatures: Feature[] = [
  { id: 'f1', title: 'Timetable-based tracking', description: 'Mark attendance straight from your timetable — no manual setup each day.', icon: 'CalendarCheck', sort_order: 1, created_at: '' },
  { id: 'f2', title: 'Attendance calendar', description: 'See every class and its attendance status on a clean monthly calendar.', icon: 'CalendarDays', sort_order: 2, created_at: '' },
  { id: 'f3', title: 'Attendance statistics', description: 'Understand your attendance at a glance with per-subject stats and totals.', icon: 'BarChart3', sort_order: 3, created_at: '' },
  { id: 'f4', title: 'Multiple timetables', description: 'Create separate timetables for different semesters, terms, or routines.', icon: 'LayoutGrid', sort_order: 4, created_at: '' },
  { id: 'f5', title: 'Flexible subjects', description: 'Add, rename, and organize subjects to match exactly how you study.', icon: 'BookOpen', sort_order: 5, created_at: '' },
  { id: 'f6', title: 'Custom attendance start dates', description: 'Set when attendance tracking begins for each timetable.', icon: 'CalendarPlus', sort_order: 6, created_at: '' },
  { id: 'f7', title: 'Cloud synchronization', description: 'Sign in to keep your timetables and attendance synced across devices.', icon: 'Cloud', sort_order: 7, created_at: '' },
  { id: 'f8', title: 'Community timetables', description: 'Share and reuse timetables created by other students.', icon: 'Users', sort_order: 8, created_at: '' },
  { id: 'f9', title: 'Light, Dark & System themes', description: 'Choose a theme that fits your style — or let your system decide.', icon: 'SunMoon', sort_order: 9, created_at: '' },
  { id: 'f10', title: 'Simple student-focused interface', description: 'A clean, distraction-free UI built for fast everyday use.', icon: 'Sparkles', sort_order: 10, created_at: '' },
];

export const defaultScreenshots: Screenshot[] = [
  { id: 's1', label: 'Home', caption: 'Your attendance overview at a glance', image_url: '', sort_order: 1, created_at: '' },
  { id: 's2', label: 'Timetable', caption: 'Your weekly timetable in one view', image_url: '', sort_order: 2, created_at: '' },
  { id: 's3', label: 'Calendar', caption: 'A monthly attendance calendar', image_url: '', sort_order: 3, created_at: '' },
  { id: 's4', label: 'Statistics', caption: 'Per-subject attendance statistics', image_url: '', sort_order: 4, created_at: '' },
  { id: 's5', label: 'Profile', caption: 'Manage your account and settings', image_url: '', sort_order: 5, created_at: '' },
];

export const defaultInstallationSteps: InstallationStep[] = [
  { id: 'i1', step_number: 1, text: 'Tap “Download APK” on the AttendX website.', created_at: '' },
  { id: 'i2', step_number: 2, text: 'Open the downloaded APK file on your phone.', created_at: '' },
  { id: 'i3', step_number: 3, text: 'If Android asks for permission to install apps from your browser, allow it.', created_at: '' },
  { id: 'i4', step_number: 4, text: 'Install AttendX.', created_at: '' },
  { id: 'i5', step_number: 5, text: 'Open AttendX and sign in or create your account.', created_at: '' },
];

export const defaultFaqs: Faq[] = [
  { id: 'q1', question: 'Is AttendX free?', answer: 'Yes. AttendX is free to download and use for tracking your attendance.', sort_order: 1, created_at: '' },
  { id: 'q2', question: 'Is AttendX available on Android?', answer: 'AttendX is currently distributed directly as an Android APK. It is not on Google Play yet.', sort_order: 2, created_at: '' },
  { id: 'q3', question: 'How do I install the APK?', answer: 'Download the APK from the website, open it on your phone, allow installs from your browser if asked, and install. See the installation guide above.', sort_order: 3, created_at: '' },
  { id: 'q4', question: 'Does AttendX support multiple timetables?', answer: 'Yes. You can create and switch between multiple timetables for different semesters or routines.', sort_order: 4, created_at: '' },
  { id: 'q5', question: 'Can I change my attendance tracking start date?', answer: 'Yes. Each timetable has its own attendance tracking start date that you can set.', sort_order: 5, created_at: '' },
  { id: 'q6', question: 'Does AttendX sync my data?', answer: 'Yes. Sign in to your account to sync timetables and attendance across your devices with cloud sync.', sort_order: 6, created_at: '' },
  { id: 'q7', question: 'Is an account required?', answer: 'You can explore AttendX without an account, but signing in is needed for cloud sync and keeping your data safe.', sort_order: 7, created_at: '' },
];

export const defaultContent: SiteContent = {
  config: defaultConfig,
  features: defaultFeatures,
  screenshots: defaultScreenshots,
  installationSteps: defaultInstallationSteps,
  faqs: defaultFaqs,
};

export async function fetchSiteContent(): Promise<SiteContent> {
  try {
    const [configRes, featuresRes, screenshotsRes, stepsRes, faqsRes] =
      await Promise.all([
        supabase.from('site_config').select('*').eq('id', 1).maybeSingle(),
        supabase.from('features').select('*').order('sort_order', { ascending: true }),
        supabase.from('screenshots').select('*').order('sort_order', { ascending: true }),
        supabase
          .from('installation_steps')
          .select('*')
          .order('step_number', { ascending: true }),
        supabase.from('faqs').select('*').order('sort_order', { ascending: true }),
      ]);

    return {
      config: configRes.data ?? defaultConfig,
      features:
        featuresRes.data && featuresRes.data.length > 0
          ? featuresRes.data
          : defaultFeatures,
      screenshots:
        screenshotsRes.data && screenshotsRes.data.length > 0
          ? screenshotsRes.data
          : defaultScreenshots,
      installationSteps:
        stepsRes.data && stepsRes.data.length > 0
          ? stepsRes.data
          : defaultInstallationSteps,
      faqs: faqsRes.data && faqsRes.data.length > 0 ? faqsRes.data : defaultFaqs,
    };
  } catch {
    return defaultContent;
  }
}
