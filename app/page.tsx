import Navbar from '@/components/site/Navbar';
import Hero from '@/components/site/Hero';
import FeatureGrid from '@/components/site/FeatureGrid';
import HowItWorks from '@/components/site/HowItWorks';
import ScreenshotGallery from '@/components/site/ScreenshotGallery';
import VideoSection from '@/components/site/VideoSection';
import DownloadCTA from '@/components/site/DownloadCTA';
import InstallationGuide from '@/components/site/InstallationGuide';
import FAQ from '@/components/site/FAQ';
import LogoDownload from '@/components/site/LogoDownload';
import Footer from '@/components/site/Footer';
import { fetchContentServer } from '@/lib/content-server';

export const revalidate = 60;

export default async function Home() {
  const content = await fetchContentServer();
  const { config } = content;

  return (
    <>
      <Navbar appName={config.app_name} apkUrl={config.apk_url} />
      <main>
        <Hero config={config} />
        <FeatureGrid features={content.features} />
        <HowItWorks />
        <ScreenshotGallery screenshots={content.screenshots} />
        <VideoSection config={config} />
        <DownloadCTA config={config} />
        <InstallationGuide steps={content.installationSteps} />
        <FAQ faqs={content.faqs} />
        <LogoDownload />
      </main>
      <Footer appName={config.app_name} tagline={config.tagline} apkUrl={config.apk_url} />
    </>
  );
}
