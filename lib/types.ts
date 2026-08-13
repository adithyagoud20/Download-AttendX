export type SiteConfig = {
  id: number;
  app_name: string;
  tagline: string;
  version: string;
  hero_headline: string;
  hero_description: string;
  hero_image_url: string;
  apk_url: string;
  apk_version: string;
  apk_release_date: string | null;
  apk_size: string;
  apk_release_notes: string;
  youtube_url: string;
  youtube_title: string;
  updated_at: string;
};

export type Feature = {
  id: string;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
  created_at: string;
};

export type Screenshot = {
  id: string;
  label: string;
  caption: string;
  image_url: string;
  sort_order: number;
  created_at: string;
};

export type InstallationStep = {
  id: string;
  step_number: number;
  text: string;
  created_at: string;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  created_at: string;
};

export type SiteContent = {
  config: SiteConfig;
  features: Feature[];
  screenshots: Screenshot[];
  installationSteps: InstallationStep[];
  faqs: Faq[];
};
