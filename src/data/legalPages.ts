export type LegalLink = {
  label: string;
  href: string;
};

export type LegalNote = {
  label: string;
  text: string;
};

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  items?: string[];
  note?: LegalNote;
  links?: LegalLink[];
};

export type LegalPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
  relatedLinks: LegalLink[];
  cta?: {
    eyebrow: string;
    title: string;
    text: string;
    label: string;
    href: string;
  };
};

const legalReview: LegalNote = {
  label: 'Owner and legal review required',
  text: 'This section identifies an operational or legal detail that is not established in the current website. VOYA should confirm it with qualified counsel before publication.',
};

export const privacyPolicy: LegalPageContent = {
  eyebrow: 'Legal information',
  title: 'Privacy Policy',
  description: 'Your trust is at the heart of every extraordinary journey.',
  lastUpdated: 'October 26, 2026',
  sections: [
    {
      id: 'introduction',
      title: 'Introduction',
      paragraphs: [
        'This Privacy Policy explains how the current VOYA website handles information when you browse the site, explore travel inspiration, prepare a journey brief, or choose to contact the concierge.',
        'The website is presently an informational and planning experience. It does not provide user accounts, live bookings, or online payment processing. Where a future operating practice is not yet defined, this policy marks it for owner review rather than presenting it as an established practice.',
      ],
    },
    {
      id: 'information-we-collect',
      title: 'Information We Collect',
      paragraphs: [
        'Information is provided directly when you use the journey planner or newsletter form. Depending on what you enter, a journey brief can include destination and date preferences, traveler counts, trip interests, budget range, accommodation preferences, accessibility or dietary requests, and contact details such as name, email address, and phone number.',
        'Search terms may also appear in the page URL when you use the site search. The current newsletter form validates an email address and consent choice in the browser, but no newsletter delivery backend is connected in the inspected application.',
      ],
    },
    {
      id: 'how-we-use-information',
      title: 'How We Use Your Information',
      paragraphs: [
        'Journey details are used in the browser to assemble a readable travel brief. If you choose the email option, your own email application opens with that brief so you can review and send it to the VOYA concierge.',
        'Information may also be used to respond to enquiries, discuss a potential itinerary, improve the browsing experience, and protect the site. Any additional marketing, profiling, or automated decision-making practice would require separate review and disclosure.',
      ],
      note: legalReview,
    },
    {
      id: 'cookies-and-tracking',
      title: 'Cookies and Tracking Technologies',
      paragraphs: [
        'No first-party cookie-setting code was identified in the current application. The site does load external Rocket hosting and analytics scripts, which may process technical or usage information according to their configuration.',
        'The exact fields collected by those scripts, whether they set cookies, their retention settings, and the appropriate consent controls must be confirmed before this policy is published as final.',
      ],
      note: legalReview,
    },
    {
      id: 'booking-and-travel-information',
      title: 'Booking and Travel Information',
      paragraphs: [
        'The journey planner can include travel dates, destination preferences, traveler numbers, interests, budget, requested accommodation, and free-text notes. The current site saves a prepared brief to local storage on your device under the name “voya-journey-brief.”',
        'The website does not transmit that brief to VOYA automatically. It reaches VOYA only if you actively send it through your email application or communicate it through another channel.',
      ],
    },
    {
      id: 'payment-information',
      title: 'Payment Information',
      paragraphs: [
        'The current VOYA website does not collect card numbers, bank information, or other payment credentials, and it does not complete reservations online.',
        'If payment or booking technology is added later, this policy must be updated before launch to identify the payment provider, information flows, security responsibilities, and applicable terms.',
      ],
      note: legalReview,
    },
    {
      id: 'data-sharing',
      title: 'Data Sharing and Third-Party Services',
      paragraphs: [
        'Information you send by email is handled by your email provider and by the recipient’s email service. The site also relies on hosting, font, image, and analytics resources supplied by third parties, which may receive routine technical data such as an IP address, browser information, and request details.',
        'VOYA does not state that personal information is sold. A final policy should name relevant vendors and document their roles once the production service arrangements are confirmed.',
      ],
      note: legalReview,
    },
    {
      id: 'storage-and-security',
      title: 'Data Storage and Security',
      paragraphs: [
        'A prepared journey brief is stored in your browser’s local storage. It remains on that device until it is cleared by you, your browser, or site code. Avoid entering sensitive identity, health, financial, or passport information into free-text fields.',
        'Reasonable technical and organizational safeguards should be applied to any information received by VOYA, but no internet service or email transmission can be guaranteed completely secure.',
      ],
    },
    {
      id: 'data-retention',
      title: 'Data Retention',
      paragraphs: [
        'The locally saved journey brief has no automatic expiry in the current application. Email correspondence and any future customer records may be retained separately by VOYA, but no verified retention schedule is present in the project.',
      ],
      note: legalReview,
    },
    {
      id: 'privacy-rights',
      title: 'Your Privacy Rights',
      paragraphs: [
        'Depending on where you live, privacy law may give you rights to request access, correction, deletion, restriction, portability, or information about the use of your personal data. You may also have the right to object or withdraw consent where processing relies on consent.',
        'To ask a privacy question or make a request, contact VOYA using the details below. Identity may need to be verified before a request is completed. The exact procedure and legally required response process require owner review.',
      ],
      links: [{ label: 'Email the VOYA concierge', href: 'mailto:concierge@voya.travel' }],
      note: legalReview,
    },
    {
      id: 'international-transfers',
      title: 'International Data Transfers',
      paragraphs: [
        'Travel enquiries and the technical services supporting this website may involve providers or recipients in more than one country. The production locations of VOYA systems and vendors, and any safeguards used for international transfers, have not been established in the current project.',
      ],
      note: legalReview,
    },
    {
      id: 'childrens-privacy',
      title: 'Children’s Privacy',
      paragraphs: [
        'VOYA’s website is intended for adults planning travel. The planner allows an adult to include the number of children traveling, but it does not ask for a child’s name or direct contact details. Children should not submit information through the site without a parent or guardian.',
        'The minimum age and any process for handling information submitted by a child require confirmation before publication.',
      ],
      note: legalReview,
    },
    {
      id: 'policy-changes',
      title: 'Changes to This Privacy Policy',
      paragraphs: [
        'This policy may be revised as the website, services, or applicable requirements change. The “Last updated” date will be changed when a revised version is published. Material changes should be communicated through an appropriate notice on the site or through another suitable channel.',
      ],
    },
    {
      id: 'contact-information',
      title: 'Contact Information',
      paragraphs: [
        'Privacy questions may be directed to concierge@voya.travel. Before final publication, VOYA should confirm the legal entity responsible for personal information, its registered address, a dedicated privacy contact if applicable, and any required regulator information.',
      ],
      links: [
        { label: 'Contact the concierge', href: '/concierge' },
        { label: 'Email concierge@voya.travel', href: 'mailto:concierge@voya.travel' },
      ],
      note: legalReview,
    },
  ],
  relatedLinks: [
    { label: 'Terms of Service', href: '/terms-of-service' },
    { label: 'Cancellation Policy', href: '/cancellation-policy' },
    { label: 'Accessibility', href: '/accessibility' },
  ],
};

export const termsOfService: LegalPageContent = {
  eyebrow: 'Legal information',
  title: 'Terms of Service',
  description: 'Thoughtful guidance for using VOYA and planning a journey with confidence.',
  lastUpdated: 'October 26, 2026',
  sections: [
    {
      id: 'acceptance',
      title: 'Introduction and Acceptance',
      paragraphs: [
        'These Terms describe the conditions for using the VOYA website. By accessing the site, you agree to use it lawfully and in accordance with these Terms. If you do not agree, please discontinue use of the site.',
        'These draft Terms reflect the current website experience. They are not a substitute for the separate terms that may apply to a specific itinerary, supplier, reservation, or payment arrangement.',
      ],
    },
    {
      id: 'services',
      title: 'Description of VOYA Services',
      paragraphs: [
        'VOYA presents travel inspiration, destinations, stays, experiences, editorial content, and tools for preparing an enquiry. The current site does not display live inventory, create confirmed bookings, process payments, or automatically submit journey briefs.',
        'A concierge may use information you choose to send to discuss a tailored itinerary. The scope of any professional travel-planning service must be confirmed directly before you rely on it.',
      ],
    },
    {
      id: 'eligibility',
      title: 'Eligibility to Use the Platform',
      paragraphs: [
        'You should use the site only if you are able to enter into the arrangements you request and are authorized to provide information for the travelers included in an enquiry. A specific minimum age and contracting standard have not been confirmed.',
      ],
      note: legalReview,
    },
    {
      id: 'accounts',
      title: 'Account Registration',
      paragraphs: [
        'The current website does not offer customer accounts or passwords. If account functionality is introduced, these Terms and the Privacy Policy must be updated to explain account security, suspension, and closure.',
      ],
    },
    {
      id: 'responsibilities',
      title: 'User Responsibilities',
      paragraphs: [
        'You are responsible for providing accurate information, reviewing a journey brief before sending it, safeguarding your device, and checking travel documents, entry requirements, health guidance, insurance, and personal circumstances before travel.',
        'Do not submit passport numbers, payment credentials, detailed medical records, or other highly sensitive information through the website’s free-text fields or ordinary email.',
      ],
    },
    {
      id: 'travel-information',
      title: 'Travel Listings and Information',
      paragraphs: [
        'Images, descriptions, suggested durations, and other travel content are provided for inspiration and general planning. Conditions, facilities, schedules, access, and availability can change. Details should be reconfirmed before a reservation or travel decision.',
      ],
    },
    {
      id: 'booking-conditions',
      title: 'Booking and Reservation Conditions',
      paragraphs: [
        'No reservation is formed by browsing the website, saving a journey brief, or opening an email to the concierge. A booking should become binding only after the traveler receives and accepts the applicable itinerary, supplier conditions, price, cancellation terms, and confirmation process.',
        'VOYA’s final contracting workflow, acceptance point, traveler documentation, and booking terms require business and legal approval.',
      ],
      note: legalReview,
    },
    {
      id: 'prices-fees',
      title: 'Prices, Taxes, and Fees',
      paragraphs: [
        'The current website does not present a live checkout or binding final prices. Any estimate should be reconfirmed and should clearly identify currency, taxes, supplier charges, service fees, and items not included before the traveler commits.',
      ],
      note: legalReview,
    },
    {
      id: 'payments',
      title: 'Payments',
      paragraphs: [
        'The website does not currently process payments. Payment methods, schedules, security responsibilities, charge handling, and the identity of any payment provider must be documented in the applicable booking terms before payment functionality is offered.',
      ],
      note: legalReview,
    },
    {
      id: 'changes-cancellations',
      title: 'Changes and Cancellations',
      paragraphs: [
        'Changes and cancellations may depend on the selected accommodation, experience, dates, rate type, and supplier conditions. Review the applicable terms supplied for your booking and contact the concierge as soon as your plans change.',
      ],
      links: [{ label: 'Read the Cancellation Policy', href: '/cancellation-policy' }],
    },
    {
      id: 'third-party-providers',
      title: 'Third-Party Travel Providers',
      paragraphs: [
        'Hotels, transport operators, guides, experience hosts, insurers, and other travel providers may deliver parts of a journey under their own terms. Their identity, role, and applicable conditions should be disclosed before a booking is accepted.',
        'The allocation of responsibility between VOYA and each supplier has not been established in the current website and requires legal review.',
      ],
      note: legalReview,
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property',
      paragraphs: [
        'The site’s design, original text, branding, arrangement, and software may be protected by intellectual property laws. You may use the site for personal travel research, but should not reproduce, sell, scrape, or commercially exploit protected material without permission.',
        'Third-party photographs, marks, and content remain subject to the rights of their respective owners.',
      ],
    },
    {
      id: 'prohibited-activities',
      title: 'Prohibited Activities',
      paragraphs: [
        'You must not misuse the site, attempt unauthorized access, interfere with its operation, introduce malicious code, impersonate another person, submit unlawful content, infringe rights, or use automated methods that place an unreasonable load on the service.',
      ],
    },
    {
      id: 'availability',
      title: 'Service Availability',
      paragraphs: [
        'VOYA may update, suspend, or remove website features as the service evolves. Continuous, uninterrupted, or error-free availability is not guaranteed, and displayed travel content may be corrected when inaccuracies are identified.',
      ],
    },
    {
      id: 'disclaimers-liability',
      title: 'Disclaimers and Liability',
      paragraphs: [
        'Travel involves risks and circumstances outside a website operator’s control. Any disclaimer or limitation of liability must be reasonable, transparent, and compatible with mandatory consumer law; these Terms do not exclude rights that cannot lawfully be excluded.',
        'VOYA’s final warranties, liability allocation, force-majeure approach, and any financial limits require qualified legal review and are intentionally not invented here.',
      ],
      note: legalReview,
    },
    {
      id: 'governing-law',
      title: 'Governing Law and Dispute Resolution',
      paragraphs: [
        'The current project does not establish VOYA’s contracting legal entity, governing jurisdiction, venue, complaint process, arbitration terms, or mandatory consumer protections. These matters must be completed by the owner with qualified counsel before these Terms are published as final.',
      ],
      note: legalReview,
    },
    {
      id: 'terms-changes',
      title: 'Changes to These Terms',
      paragraphs: [
        'These Terms may be updated as VOYA’s services and legal requirements change. The “Last updated” date will identify the current version. Changes should not be applied retroactively where doing so would conflict with applicable law or agreed booking terms.',
      ],
    },
    {
      id: 'contact',
      title: 'Contact Information',
      paragraphs: [
        'Questions about these Terms can be sent to concierge@voya.travel. VOYA should add the full contracting entity, registered address, company details, and formal notice method after owner and legal review.',
      ],
      links: [
        { label: 'Contact the concierge', href: '/concierge' },
        { label: 'Read the Privacy Policy', href: '/privacy-policy' },
      ],
      note: legalReview,
    },
  ],
  relatedLinks: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Cancellation Policy', href: '/cancellation-policy' },
    { label: 'Concierge', href: '/concierge' },
  ],
};

export const cancellationPolicy: LegalPageContent = {
  eyebrow: 'Booking information',
  title: 'Cancellation Policy',
  description: 'Clear information to help you plan your journey with confidence.',
  lastUpdated: 'October 26, 2026',
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      paragraphs: [
        'This page explains the approach to changes and cancellations reflected by the current VOYA website. The site does not create live reservations, and no universal cancellation deadline, refund percentage, or processing period is established in the project.',
      ],
      note: legalReview,
    },
    {
      id: 'booking-conditions',
      title: 'Understanding Your Booking Conditions',
      paragraphs: [
        'The rules that apply to a proposed journey may vary. Before confirming any booking, review the conditions shown in the final proposal and those supplied by each relevant provider.',
      ],
      items: [
        'The accommodation provider and selected room or rate type.',
        'The experience, guide, transport, or other travel service selected.',
        'Travel dates, season, availability, and lead time.',
        'Supplier-specific deposits, prepayments, and amendment rules.',
        'Any separately agreed VOYA planning or service terms.',
      ],
    },
    {
      id: 'cancellation-requests',
      title: 'Cancellation Requests',
      paragraphs: [
        'Contact the VOYA concierge in writing as soon as you wish to cancel. Include enough information to identify the enquiry or booking, but do not send payment credentials or sensitive identity documents through ordinary email.',
        'A request is not treated as completed merely because it was drafted or because a locally saved journey brief was changed. VOYA should confirm receipt and explain the next steps under the applicable booking conditions.',
      ],
      links: [{ label: 'Contact the concierge', href: '/concierge' }],
    },
    {
      id: 'refund-eligibility',
      title: 'Refund Eligibility',
      paragraphs: [
        'Any refund depends on the terms accepted for the booking, amounts already paid, supplier rules, recoverable costs, and applicable consumer law. VOYA does not promise a refund through this website and should provide the relevant conditions before commitment.',
      ],
      note: legalReview,
    },
    {
      id: 'non-refundable',
      title: 'Non-Refundable Services',
      paragraphs: [
        'Some suppliers or rate types may be described as non-refundable or may become non-refundable after a stated point. Such a restriction should be clearly disclosed before booking. The current website does not define which services fall into this category.',
      ],
      note: legalReview,
    },
    {
      id: 'modifications',
      title: 'Modifications and Rescheduling',
      paragraphs: [
        'Date, traveler, destination, room, and experience changes may be treated as amendments or as a cancellation and new booking. Availability and prices can change. The concierge should confirm any supplier charge, fare difference, or VOYA fee before a requested change is finalized.',
      ],
    },
    {
      id: 'no-shows',
      title: 'No-Shows',
      paragraphs: [
        'Missing a service without advance notice may result in loss of amounts paid under supplier terms. The definition of a no-show, any grace period, and any remaining itinerary impact must be taken from the confirmed booking documents rather than assumed from this page.',
      ],
      note: legalReview,
    },
    {
      id: 'supplier-conditions',
      title: 'Supplier-Specific Conditions',
      paragraphs: [
        'Hotels, airlines, transport operators, guides, and experience hosts may apply different cancellation and amendment rules. If supplier terms conflict or are unclear, ask the concierge for clarification before accepting the booking.',
      ],
    },
    {
      id: 'exceptional-circumstances',
      title: 'Exceptional Circumstances',
      paragraphs: [
        'Weather, public-health events, strikes, border restrictions, natural events, safety concerns, or supplier disruption may affect a journey. Available remedies depend on the circumstances, supplier terms, travel insurance, and mandatory law. No automatic force-majeure refund or rebooking guarantee is stated here.',
      ],
      note: legalReview,
    },
    {
      id: 'refund-processing',
      title: 'Refund Processing',
      paragraphs: [
        'Where a refund is approved, the method, currency, deductions, recipient, and expected timing should be communicated in writing. The current project contains no payment system or verified processing timetable, so no fixed period is promised.',
      ],
      note: legalReview,
    },
    {
      id: 'request-cancellation',
      title: 'How to Request a Cancellation',
      paragraphs: [
        'Use the concierge page or email concierge@voya.travel with your name, the relevant journey or booking reference if one exists, the service you wish to cancel, and a reliable contact method. Wait for written confirmation and keep a copy of the applicable booking conditions and correspondence.',
      ],
      links: [
        { label: 'Open the Concierge page', href: '/concierge' },
        { label: 'Email concierge@voya.travel', href: 'mailto:concierge@voya.travel' },
      ],
    },
    {
      id: 'contact-concierge',
      title: 'Contact Our Concierge',
      paragraphs: [
        'The concierge can help identify the conditions attached to your travel plans and explain the available next steps. Final business rules, escalation routes, and formal complaint details require owner review before publication.',
      ],
      links: [{ label: 'Contact Our Concierge', href: '/concierge' }],
      note: legalReview,
    },
  ],
  relatedLinks: [
    { label: 'Terms of Service', href: '/terms-of-service' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Concierge', href: '/concierge' },
  ],
  cta: {
    eyebrow: 'Personal assistance',
    title: 'Need to Change Your Plans?',
    text: 'Speak with the concierge to review the conditions attached to your journey and the options available.',
    label: 'Contact Our Concierge',
    href: '/concierge',
  },
};

export const accessibilityStatement: LegalPageContent = {
  eyebrow: 'Our commitment',
  title: 'Accessibility',
  description: 'Extraordinary journeys should begin with an experience everyone can navigate.',
  lastUpdated: 'October 26, 2026',
  sections: [
    {
      id: 'approach',
      title: 'Our Approach to Accessibility',
      paragraphs: [
        'VOYA aims to make its digital travel experience clear, usable, and welcoming across a wide range of devices and ways of navigating. Accessibility is treated as an ongoing design and engineering responsibility.',
        'This statement describes features present in the current application. It does not claim certification or full compliance with any accessibility standard, because no independent accessibility audit is documented in the project.',
      ],
    },
    {
      id: 'features',
      title: 'Accessibility Features',
      paragraphs: [
        'The website uses semantic page regions, structured headings, descriptive controls, form labels, status and error messaging, image alternative text, responsive layouts, visible keyboard focus styles, and a global reduced-motion mode. Decorative images are generally given empty alternative text so they are skipped by assistive technology.',
      ],
    },
    {
      id: 'keyboard',
      title: 'Keyboard Navigation',
      paragraphs: [
        'Links, buttons, form fields, filters, accordions, menus, and gallery controls are built with native interactive elements and can be reached by keyboard. Focused controls receive a visible gold outline. This page also provides a skip link and keyboard-accessible table of contents.',
        'Focus order and focus management should continue to be tested whenever interactive overlays, menus, or new controls are added.',
      ],
    },
    {
      id: 'screen-readers',
      title: 'Screen Reader Compatibility',
      paragraphs: [
        'Landmarks and accessible names help describe navigation, forms, dialogs, and controls. Current-page links and expanded states are exposed where relevant. Compatibility can vary by browser and assistive technology, and the site has not yet been documented as tested against a formal browser and screen-reader matrix.',
      ],
      note: legalReview,
    },
    {
      id: 'readability',
      title: 'Text Readability and Contrast',
      paragraphs: [
        'VOYA uses a restrained ivory, charcoal, and champagne-gold palette with generous line spacing and responsive type. Core reading text uses dark charcoal on ivory or light text on charcoal. Gold is used mainly as an accent rather than for long passages.',
        'Contrast should be rechecked whenever brand colors, imagery overlays, or component states change.',
      ],
    },
    {
      id: 'responsive-design',
      title: 'Responsive Design',
      paragraphs: [
        'The site is designed to reflow across mobile, tablet, and desktop widths without requiring horizontal scrolling. Navigation, content grids, forms, galleries, and this page’s table of contents adapt to smaller screens. Browser zoom and enlarged text should remain usable within the practical limits of each device.',
      ],
    },
    {
      id: 'motion',
      title: 'Motion and Animation Preferences',
      paragraphs: [
        'Animations are decorative and do not carry essential information. The application checks the operating system’s “prefers-reduced-motion” setting before running its GSAP entrance and scroll effects, and global styles reduce CSS animation, transitions, and smooth scrolling when that preference is enabled.',
      ],
    },
    {
      id: 'forms',
      title: 'Forms and Error Messages',
      paragraphs: [
        'Form fields use visible labels or programmatic labels, meaningful input types, and descriptive validation messages. Error text is associated with relevant controls where implemented, and status messages use appropriate live semantics.',
        'The journey planner currently saves a prepared brief in the browser and then lets the traveler open an email. It does not silently submit the form or create a booking.',
      ],
    },
    {
      id: 'limitations',
      title: 'Known Limitations',
      paragraphs: [
        'VOYA has not documented an independent accessibility audit or formal conformance claim. Third-party images, scripts, maps, linked services, and email applications may present experiences outside VOYA’s control. Complex menu, dialog, gallery, and multi-step form interactions should receive continued assistive-technology testing.',
        'If a part of the website prevents you from accessing information or completing a task, please contact the team so an alternative can be discussed.',
      ],
    },
    {
      id: 'reporting',
      title: 'Reporting Accessibility Issues',
      paragraphs: [
        'When reporting an issue, it is helpful to include the page address, a short description of the problem, the device and browser used, and any assistive technology involved. Do not include sensitive personal or payment information.',
        'You can use the Concierge page or email concierge@voya.travel. A formal accessibility response target has not been established and should be confirmed by the owner.',
      ],
      links: [
        { label: 'Contact our team', href: '/concierge' },
        { label: 'Email concierge@voya.travel', href: 'mailto:concierge@voya.travel' },
      ],
      note: legalReview,
    },
    {
      id: 'improvements',
      title: 'Continuous Improvements',
      paragraphs: [
        'Accessibility considerations are included in VOYA’s shared styles and components, and improvements should be reviewed alongside future design, content, and technology changes. Testing with disabled people and representative assistive technologies would provide the strongest basis for future priorities and any conformance statement.',
      ],
    },
    {
      id: 'contact',
      title: 'Contact Information',
      paragraphs: [
        'For accessibility assistance or feedback, contact concierge@voya.travel or visit the Concierge page. VOYA should confirm a dedicated accessibility contact, response process, and postal contact details before final publication.',
      ],
      links: [{ label: 'Contact Our Team', href: '/concierge' }],
      note: legalReview,
    },
  ],
  relatedLinks: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
    { label: 'Cancellation Policy', href: '/cancellation-policy' },
  ],
  cta: {
    eyebrow: 'Accessibility support',
    title: 'Need Assistance?',
    text: 'Tell us what would make the VOYA experience easier to use and our team will help you find an accessible way forward.',
    label: 'Contact Our Team',
    href: '/concierge',
  },
};
