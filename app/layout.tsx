import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

const SITE_URL = 'https://attendx.app';
const TITLE = 'AttendX — Smart Attendance, Built Around Your Timetable';
const DESCRIPTION =
  'AttendX is a flexible student attendance tracker built around your timetable. Track attendance, manage subjects, view statistics, and stay organized.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: 'AttendX',
  keywords: [
    'AttendX',
    'attendance tracker',
    'student attendance',
    'timetable',
    'attendance app',
    'Android APK',
    'student planner',
  ],
  authors: [{ name: 'AttendX' }],
  creator: 'AttendX',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: 'AttendX',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'AttendX — Smart Attendance, Built Around Your Timetable',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.svg'],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3b82f6',
} as const;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-[#f8fafc] text-[#0f172a] antialiased">{children}</body>
    </html>
  );
}
