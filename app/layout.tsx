'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ThemeProvider, Header, Navbar } from 'panta_design_system';
import 'panta_design_system/styles.css';
import './globals.css'
// آیکون یکسان برای همه آیتم‌ها
const NavIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const navItems = [
  { link: '/', label: 'داشبورد', icon: <NavIcon />, access: '' },
  { link: '/panel/exchanges', label: 'لیست کارگزاری‌ها', icon: <NavIcon /> },
  { link: '/panel/reports', label: 'گزارشات', icon: <NavIcon /> },
  { link: '/panel/settings', label: 'تنظیمات', icon: <NavIcon /> },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  // تغییر وضعیت نوار ناوبری بر اساس اندازه صفحه
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    setIsNavbarOpen(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsNavbarOpen(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // توابع خروج و تغییر رمز (می‌توانید بعداً کامل کنید)
  const handleLogout = () => {
    window.location.href = '/login';
  };
  const handleChangePassword = () => {
    alert('تغییر رمز عبور');
  };

  return (
    <html lang="fa" suppressHydrationWarning dir="rtl">
      <body style={{ margin: 0 }}>
        <ThemeProvider>
          {/* نوار ناوبری (در دیزاین سیستم fixed است) */}
          <Navbar
            navItems={navItems}
            currentPath={pathname}
            isOpen={isNavbarOpen}
            setIsOpen={setIsNavbarOpen}
            isMobileOpen={isMobileOpen}
            setIsMobileOpen={setIsMobileOpen}
            userFullName="کاربر تست"
            userRole="ADMIN"
            onLogout={handleLogout}
            onChangePassword={handleChangePassword}
            brand={<img src="/bmi.png" style={{ width: '40px' }} alt="logo" />}
          />

          {/* محتوای اصلی با فاصله از راست (در دسکتاپ) */}
          <div 
            style={{
              marginRight:isNavbarOpen? "256px":"0px",
              padding:isNavbarOpen ? "0px 8px 0px 8px" :'0px'
            }}
          >
            {/* هدر ساده (فقط عنوان) - بدون پراپس اضافی */}
            <div className="">
              <Header title="سامانه نظارت بر کارگزاری‌های مبادله رمزارز ایران" />
            </div>
            <main className="p-6">{children}</main>
            <footer className="text-center text-sm text-gray-500 py-4">
              © طراحی و توسعه توسط محمد صالحی
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}