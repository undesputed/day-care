'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Sync theme class and color-scheme to <html> to avoid hydration mismatch
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    document.documentElement.setAttribute('class', theme);
    document.documentElement.style.colorScheme = theme;
  });
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
