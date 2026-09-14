import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Linkedin, Twitter, Instagram, Mail } from "lucide-react";

import ScrollReveal from "./components/ScrollReveal";
import Reveal from "./components/Reveal";
import NavItem from "./components/NavItem";
import Logo from "./components/Logo";
import CtaButton from "./components/CtaButton";
import Globe from "./components/Globe";

const VIDEO_URL = "/videos/hero-bg.mp4";

const NAV_LINKS = [
  { label: "Assessments", href: "#assessments" },
  { label: "Coding Tests", href: "#assessments" },
  { label: "Internships", href: "#opportunities" },
  { label: "Hackathons", href: "#opportunities" },
  { label: "Resources", href: "#footer" },
];

const SERVICES = ["Practice Assessments", "Coding Challenges", "Hackathons", "Internships & Jobs"];
const COMPANY = ["About Us", "Careers", "Blog", "Contact"];

export default function App() {
  const [arrowCycle, setArrowCycle] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const screen3Ref = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 500, 800], [0, 0, -150]);

  // --- Scroll-driven video scrubbing -------------------------------------
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const scrubToScroll = () => {
      const footer = screen3Ref.current;
      if (!video || !footer || !video.duration || Number.isNaN(video.duration)) return;
      // Guard: skip if a previous seek hasn't resolved yet, otherwise rapid
      // scroll events queue up competing currentTime writes and the frame tears.
      if (video.seeking) return;

      const viewportH = window.innerHeight;
      const footerTop = footer.getBoundingClientRect().top + window.scrollY;
      const targetScrollEnd = footerTop - viewportH * 0.2;
      const maxScroll = Math.max(targetScrollEnd, 1);

      const fraction = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      const targetTime = fraction * video.duration;

      if (Math.abs(video.currentTime - targetTime) > 0.02) {
        video.currentTime = targetTime;
      }
    };

    const handleLoaded = () => {
      setIsLoaded(true);
      scrubToScroll();
    };

    video.addEventListener("loadedmetadata", handleLoaded);
    window.addEventListener("scroll", scrubToScroll, { passive: true });
    window.addEventListener("resize", scrubToScroll);

    if (video.readyState >= 1) handleLoaded();

    return () => {
      video.removeEventListener("loadedmetadata", handleLoaded);
      window.removeEventListener("scroll", scrubToScroll);
      window.removeEventListener("resize", scrubToScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* LAYER 1 — fixed video background */}
      <div ref={videoContainerRef} className="fixed inset-0 z-0 bg-black">
        <video
          ref={videoRef}
          className="h-full w-full object-cover transition-opacity duration-1000"
          style={{ opacity: isLoaded ? 0.55 : 0 }}
          src={VIDEO_URL}
          muted
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* LAYER 2 — fixed header */}
      <motion.header
        style={{ y: headerY }}
        className="fixed inset-x-0 top-0 z-20 pointer-events-none"
      >
        <div className="mx-auto flex w-[90%] items-center justify-between py-6 pointer-events-auto">
          <a href="#top" className="text-white">
            <Logo />
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <NavItem key={link.label} label={link.label} href={link.href} />
            ))}
          </nav>

          <CtaButton label="Get started" variant="solid" size="sm" />
        </div>
      </motion.header>

      {/* LAYER 3 — scrollable content */}
      <main className="relative z-10 pointer-events-none">
        {/* ---------------------------------------------------------------- */}
        {/* SECTION 1 — HERO                                                  */}
        {/* ---------------------------------------------------------------- */}
        <section id="top" className="grid min-h-screen w-[90%] mx-auto grid-cols-12 items-end gap-6 pb-[9vh] pt-[16vh]">
          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <h1
                className="font-sans font-medium leading-[0.95] tracking-tight text-white"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                Where
                <br />
                Preparation
                <br />
                Becomes
                <br />
                Proof
              </h1>
            </Reveal>
          </div>

          <div className="col-span-12 md:col-start-8 md:col-span-5 self-center pointer-events-auto">
            <Reveal delay={0.15}>
              <p className="max-w-[460px] text-[15px] leading-relaxed text-white/60">
                Every mock test, coding round, and hackathon you complete builds one
                verified record — the kind recruiters actually trust.{" "}
                <span className="font-semibold text-white">500+ practice assessments</span>{" "}
                and a direct line into live roles, from day one.
              </p>
            </Reveal>
            <Reveal delay={0.3} className="mt-8">
              <CtaButton
                label="Start your assessment"
                cycle={arrowCycle}
                onHoverStart={() => setArrowCycle((c) => c + 1)}
              />
            </Reveal>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* SECTION 2 — WHAT THE PLATFORM GIVES CANDIDATES                    */}
        {/* ---------------------------------------------------------------- */}
        <section id="assessments" className="w-[90%] mx-auto py-[14vh]">
          <ScrollReveal
            containerClassName="max-w-4xl font-sans font-medium leading-[1.15] tracking-tight"
            wordClassName="text-[clamp(1.75rem,3.4vw,3rem)] text-white"
          >
            Ten million candidates prepare here — every score, every challenge, every
            ranked result building the kind of proof that gets you shortlisted, not
            just seen.
          </ScrollReveal>

          <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 pointer-events-auto">
            <Reveal>
              <div className="flex h-16 w-16 items-center justify-center">
                <Globe className="h-16 w-16" />
              </div>
              <div className="mt-6">
                <Logo markOnly={false} className="mb-3" />
                <p className="text-[13px] leading-relaxed text-white/40">
                  10M+ candidates &middot; 4,000+ colleges &middot; 500+ hiring partners
                  live on the platform right now.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="text-xl font-medium leading-snug text-white">
                Assessments &amp;
                <br />
                Practice Tests
              </h3>
              <p id="opportunities-anchor" className="mt-4 text-[13px] leading-relaxed text-white/40">
                500+ mock tests across competitive exams, company-specific rounds,
                and full domain assessments — plus coding challenges and psychometric
                tests that mirror what recruiters actually screen for.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <h3 className="text-xl font-medium leading-snug text-white">
                Opportunities &amp;
                <br />
                Upskilling
              </h3>
              <p className="mt-4 text-[13px] leading-relaxed text-white/40">
                A direct line into live job and internship openings, ranked by
                fit — plus hackathons and training tracks that keep you
                interview-ready before the offer comes in.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* SECTION 3 — GLASSMORPHISM FOOTER                                  */}
        {/* ---------------------------------------------------------------- */}
        <section id="footer" ref={screen3Ref} className="w-[90%] mx-auto pb-[6vh] pointer-events-auto">
          <div
            className="rounded-[32px] border p-[5%]"
            style={{
              background: "rgba(26,26,26,0.6)",
              backdropFilter: "blur(80px)",
              WebkitBackdropFilter: "blur(80px)",
              borderColor: "rgba(255,255,255,0.1)",
            }}
          >
            <Reveal>
              <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-14 md:flex-row md:items-end">
                <h2
                  className="font-sans font-medium leading-[0.95] tracking-tight text-white"
                  style={{ fontSize: "clamp(2rem, 4.6vw, 3.75rem)" }}
                >
                  Ready To Prove
                  <br />
                  What You Can Do?
                </h2>
                <CtaButton label="Create your free profile" />
              </div>
            </Reveal>

            <div className="grid grid-cols-2 gap-10 py-14 md:grid-cols-4">
              <Reveal>
                <Logo className="mb-4" />
                <p className="max-w-[220px] text-[13px] leading-relaxed text-white/40">
                  Built for candidates who&rsquo;d rather show their work than
                  talk about it.
                </p>
              </Reveal>

              <Reveal delay={0.05}>
                <h4 className="mb-4 text-[13px] font-medium text-white/64">Company</h4>
                <ul className="space-y-3">
                  {COMPANY.map((item) => (
                    <li key={item}>
                      <a href="#" className="text-[13px] text-white/40 transition-colors hover:text-white">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.1}>
                <h4 className="mb-4 text-[13px] font-medium text-white/64">Services</h4>
                <ul className="space-y-3">
                  {SERVICES.map((item) => (
                    <li key={item}>
                      <a href="#" className="text-[13px] text-white/40 transition-colors hover:text-white">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.15}>
                <h4 className="mb-4 text-[13px] font-medium text-white/64">Connect</h4>
                <div className="flex items-center gap-4">
                  <a href="#" aria-label="LinkedIn" className="text-white/40 transition-colors hover:text-white">
                    <Linkedin size={17} />
                  </a>
                  <a href="#" aria-label="Twitter" className="text-white/40 transition-colors hover:text-white">
                    <Twitter size={17} />
                  </a>
                  <a href="#" aria-label="Instagram" className="text-white/40 transition-colors hover:text-white">
                    <Instagram size={17} />
                  </a>
                  <a href="#" aria-label="Email" className="text-white/40 transition-colors hover:text-white">
                    <Mail size={17} />
                  </a>
                </div>
              </Reveal>
            </div>

            <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-[12px] text-white/25 md:flex-row md:items-center">
              <span>&copy; 2026 MyAnatomy. All rights reserved.</span>
              <div className="flex gap-6">
                <a href="#" className="transition-colors hover:text-white/60">Privacy</a>
                <a href="#" className="transition-colors hover:text-white/60">Terms</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
