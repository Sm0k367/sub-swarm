import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: 'EchoCodex • 2026 Multimedia Polymath Mastery Studio',
  description: 'The living implementation of the Multimedia Polymath Mastery Codex 2026. Echo Fusion Lab • Real-time WebXR • Authenticity Engine • Master Everything.',
  keywords: ['2026', 'AI', 'XR', 'React Three Fiber', 'generative art', 'authenticity', 'creative studio'],
  authors: [{ name: 'Pioneer Sub-Agents' }],
  openGraph: {
    title: 'EchoCodex — Master Everything',
    description: 'Where AI generates at lightspeed and human imperfection becomes luxury.',
    images: [{ url: 'https://placehold.co/1200x630/0a0a0a/00ff9f?text=ECHO+CODEX' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="hero-bg min-h-screen antialiased overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster 
            position="top-center" 
            richColors 
            closeButton 
            className="sonner-toast"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
