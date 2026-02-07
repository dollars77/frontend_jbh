import './globals.css';

export const metadata = {
  title: 'JBH-Studio',
  description: 'ขายธีมเว็บพนัน รับออกแบบเว็บไซต์ครบวงจร รองรับทุกอุปกรณ์ สร้างเว็บไซต์ที่สวยงาม ใช้งานง่าย โหลดเร็ว',
  icons: {
    icon: '/jbh_512x512.ico',
    shortcut: '/jbh_512x512.ico',
    apple: '/jbh_512x512.ico',
  },
};

export default function RootLayout({children}) {
  return (
    <html data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
