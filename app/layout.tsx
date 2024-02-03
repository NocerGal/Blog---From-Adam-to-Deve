import { TailwindIndicator } from '@/components/TailwindIndicator';

import { cn } from '@/lib/utils';

import { Inter, Mina } from 'next/font/google';
import { PropsWithChildren } from 'react';
import { Providers } from './Providers';
import './globals.css';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import Head from 'next/head';
import { Metadata } from 'next';

const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'titre',
  description: 'description?',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={cn(
          'h-full bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 px-4">
              <div className="w-full max-w-4xl mx-auto pt-6">{children}</div>
            </main>
            <Footer />
          </div>
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  );
}
