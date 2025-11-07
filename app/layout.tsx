import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Holy Grail Chat',
  description: 'Omniscient AI brain system - understands everything about your application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
