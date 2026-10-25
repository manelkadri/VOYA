import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';

// Inline brand icons (lucide-react no longer exports brand icons)
const Instagram = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Youtube = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const Linkedin = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const columns = [
  {
    id: 'col-explore',
    title: 'Explore',
    links: [
      { id: 'f-destinations', label: 'Destinations', href: '/destinations' },
      { id: 'f-experiences', label: 'Experiences', href: '/experiences' },
      { id: 'f-stays', label: 'Luxury Stays', href: '/stays' },
      { id: 'f-journal', label: 'Travel Journal', href: '/journal' },
    ],
  },
  {
    id: 'col-journeys',
    title: 'Journeys',
    links: [
      { id: 'f-romantic', label: 'Romantic Escapes', href: '/experiences?category=Romantic%20Escapes' },
      { id: 'f-wellness', label: 'Wellness Retreats', href: '/experiences?category=Wellness%20%26%20Spa' },
      { id: 'f-yacht', label: 'Private Yachts', href: '/experiences?category=Private%20Yacht%20Experiences' },
      { id: 'f-culture', label: 'Cultural Discovery', href: '/experiences?category=Cultural%20Immersion' },
    ],
  },
  {
    id: 'col-voya',
    title: 'VOYA',
    links: [
      { id: 'f-story', label: 'Our Story', href: '/#our-story' },
      { id: 'f-concierge', label: 'Concierge', href: '/concierge' },
      { id: 'f-press', label: 'The Journal', href: '/journal' },
      { id: 'f-careers', label: 'Plan a Journey', href: '/concierge#planner' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-screen-2xl px-6 py-20 lg:px-10 2xl:px-16">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 xl:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <AppLogo size={44} />
              <span className="font-display text-3xl font-semibold tracking-[0.18em]">VOYA</span>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-foreground/70">
              Curated journeys to the world’s most remarkable places, designed by people who have
              slept in every room we recommend.
            </p>
            <div className="mt-7 flex gap-3">
              <a
                href="#"
                aria-label="VOYA on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-foreground/20 transition-all duration-200 hover:border-primary hover:text-primary"
              >
                <Instagram size={17} />
              </a>
              <a
                href="#"
                aria-label="VOYA on YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-foreground/20 transition-all duration-200 hover:border-primary hover:text-primary"
              >
                <Youtube size={17} />
              </a>
              <a
                href="#"
                aria-label="VOYA on LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-foreground/20 transition-all duration-200 hover:border-primary hover:text-primary"
              >
                <Linkedin size={17} />
              </a>
            </div>
          </div>

          {columns?.map((col) => (
            <nav key={col?.id} aria-label={col?.title}>
              <h3 className="eyebrow text-primary">{col?.title}</h3>
              <ul className="mt-6 space-y-3.5">
                {col?.links?.map((link) => (
                  <li key={link?.id}>
                    <Link
                      href={link.href}
                      className="link-underline pb-0.5 text-sm text-ink-foreground/75 transition-colors hover:text-ink-foreground"
                    >
                      {link?.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="eyebrow text-primary">Speak to a human</h3>
            <ul className="mt-6 space-y-4 text-sm text-ink-foreground/75">
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-primary" />
                <span className="tabular">+1 (212) 555-0148</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 shrink-0 text-primary" />
                <span>concierge@voya.travel</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                <span>
                  41 Greene Street, Floor 6
                  <br />
                  New York, NY 10012
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-ink-foreground/10 pt-8 text-xs text-ink-foreground/55 md:flex-row md:items-center">
          <p>© 2026 VOYA Travel Group, Inc. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            <li><Link href="/" className="hover:text-ink-foreground">Privacy Policy</Link></li>
            <li><Link href="/" className="hover:text-ink-foreground">Terms of Service</Link></li>
            <li><Link href="/" className="hover:text-ink-foreground">Cancellation Policy</Link></li>
            <li><Link href="/" className="hover:text-ink-foreground">Accessibility</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
