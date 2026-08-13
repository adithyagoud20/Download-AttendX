import { supabase } from './supabase';
import {
  defaultConfig,
  defaultFeatures,
  defaultScreenshots,
  defaultInstallationSteps,
  defaultFaqs,
} from './content';
import type { SiteContent } from './types';

export async function fetchContentServer(): Promise<SiteContent> {
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
    return {
      config: defaultConfig,
      features: defaultFeatures,
      screenshots: defaultScreenshots,
      installationSteps: defaultInstallationSteps,
      faqs: defaultFaqs,
    };
  }
}
