// app/layout.tsx

import { TailwindIndicator } from '@/components/TailwindIndicator';

import { cn } from '@/lib/utils';

import { Inter, Mina } from 'next/font/google';
import { PropsWithChildren } from 'react';
import { Providers } from './Providers';
import './globals.css';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans' });

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <html lang="en" className="h-full" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            'h-full bg-background font-sans antialiased',
            fontSans.variable
          )}
        >
          <Providers>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
            <TailwindIndicator />
          </Providers>
        </body>
      </html>
    </>
  );
}
