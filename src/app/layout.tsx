import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Analytics from '@/components/analytics';

export const metadata: Metadata = {
  title: 'UrbanWiz Communications | Giving Vision Solid Ground',
  description: 'We help visionary leaders translate big ideas into simple, actionable messages for their teams and stakeholders.',
  keywords: ['communication strategy', 'leadership', 'team alignment', 'vision translation', 'stakeholder messaging'],
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
      </body>
    </html>
  );
}
