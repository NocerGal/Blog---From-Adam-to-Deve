'use client';

import { PropsWithChildren } from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { ToastProvider } from '@radix-ui/react-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const Providers = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="systeme" enableSystem>
        <ToastProvider>
          <Toaster />
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ToastProvider>
      </ThemeProvider>
    </>
  );
};
