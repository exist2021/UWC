import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Analytics from '@/components/analytics';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'ClarityLink Communications',
  description: 'We help visionary leaders translate big ideas into simple, actionable messages for their teams and stakeholders.',
  keywords: ['communication strategy', 'leadership', 'team alignment', 'vision translation', 'stakeholder messaging'],
  icons: {
    icon: 'https://i.postimg.cc/bYWFJnc6/B879608-F-5122-4-E4-C-8-AEB-A371190-DC011.png',
  },
  alternates: {
    types: {
      'application/rss+xml': [{ url: 'rss.xml', title: 'ClarityLink Communications RSS Feed' }],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <Analytics />
      </head>
      <body className="font-body antialiased text-gray-800">
        {children}
        <Toaster />
        <Script id="lfeeder-tracker">
          {`
            (function(ss,ex){ window.ldfdr=window.ldfdr||function(){(ldfdr._q=ldfdr._q||[]).push([].slice.call(arguments));}; (function(d,s){ fs=d.getElementsByTagName(s)[0]; function ce(src){ var cs=d.createElement(s); cs.src=src; cs.async=1; fs.parentNode.insertBefore(cs,fs); }; ce('https://sc.lfeeder.com/lftracker_v1_'+ss+(ex?'_'+ex:'')+'.js'); })(document,'script'); })('3P1w24dmd3lamY5n');
          `}
        </Script>
      </body>
    </html>
  );
}
