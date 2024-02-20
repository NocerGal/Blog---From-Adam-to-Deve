// import { TailwindIndicator } from '@/components/TailwindIndicator';

import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';
import { PropsWithChildren } from 'react';
import { Providers } from './Providers';
import './globals.css';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

import { Metadata } from 'next';

const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'titre',
  description: 'description?',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="h-full bg-background" suppressHydrationWarning>
      <body
        className={cn(
          'h-full bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers>
          <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1 h-full px-4 bg-background border-solid border-red border-t-2">
              <div className="flex-1 w-full max-w-4xl mx-auto pt-6 ">
                {children}
              </div>
            </main>
            <Footer />
          </div>
          {/* <TailwindIndicator /> */}
        </Providers>
      </body>
    </html>
  );
}
