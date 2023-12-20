'use client';

import { PropsWithChildren } from 'react';
import { ThemeProvider } from 'next-themes';
import { ToastProvider } from '@radix-ui/react-toast';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="systeme" enableSystem>
        {/* <ToastProvider>{children}</ToastProvider> */}
        {children}
      </ThemeProvider>
    </>
  );
};
