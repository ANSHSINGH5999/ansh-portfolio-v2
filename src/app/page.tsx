import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { TerminalDrawer } from "@/components/terminal-drawer";
import { HireChip } from "@/components/hire-chip";
import { Hero } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about-section";
import { TocSection } from "@/components/sections/toc-section";
import { StackSection } from "@/components/sections/stack-section";
import { LedgerSection } from "@/components/sections/ledger-section";
import { DeployedSection } from "@/components/sections/deployed-section";
import { SignalSection } from "@/components/sections/signal-section";
import { OriginSection } from "@/components/sections/origin-section";
import { ConnectSection } from "@/components/sections/connect-section";
import { ThanksSection } from "@/components/sections/thanks-section";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SectionRail } from "@/components/section-rail";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <SectionRail />
      <main>
        <Hero />
        <AboutSection />
        <TocSection />
        <StackSection />
        <LedgerSection />
        <DeployedSection />
        <SignalSection />
        <OriginSection />
        <ConnectSection />
        <ThanksSection />
      </main>
      <SiteFooter />
      <HireChip />
      <ScrollToTop />
      <TerminalDrawer />
    </>
  );
}
