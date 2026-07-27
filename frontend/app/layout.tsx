import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import AudioPlayer from '@/components/AudioPlayer'; // Assuming you kept the previous AudioPlayer code

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ weight: ['400', '600', '700'], subsets: ['latin'], variable: '--font-poppins' });

export const metadata: Metadata = {
  title: 'OmniKnowledge | Learn & Grow',
  description: 'AI-Powered General Knowledge Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark:bg-slate-900">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased text-slate-900 dark:text-slate-100`}>
        <Navbar />
        {children}
        {/* The Audio Player logic should be connected to Zustand store here to render globally */}
      </body>
    </html>
  );
}
