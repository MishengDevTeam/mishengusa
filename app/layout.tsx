import './globals.css';
import { Nunito_Sans } from 'next/font/google';
import type { Metadata } from 'next';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import ToasterProvider from './components/ToasterProvider';
import ReportModal from './components/modal/ReportModal';

const font = Nunito_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '米生 - 纽约租房、美国生活、留学咨询',
  description: '纽约租房/美国生活/留学咨询',
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
        <ToasterProvider />
        <ReportModal />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
