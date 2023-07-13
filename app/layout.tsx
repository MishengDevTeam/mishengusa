import './globals.css';
import { Nunito_Sans } from 'next/font/google';
import type { Metadata } from 'next';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

const font = Nunito_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '米生 - 海外租房、美国生活、',
  description: '海外租房/美国生活/',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      />
      <body className={font.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
