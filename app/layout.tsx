import { Metadata } from 'next';
import Centered from '../components/common/Centered';
import HorizontalLine from '../components/common/HorizontalLine';
import '../styles.css';

export const metadata: Metadata = {
  title: 'Image Gallery',
  description: 'Minimalist image gallery made with Next.js'
}

const Header = () => (
  <div style={{ width: '100%' }}>
    <Centered>
      <h1 style={{ margin: '16px 0px' }}>
        Image Gallery
      </h1>
      <HorizontalLine />
    </Centered>
    <br />
  </div>
);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
