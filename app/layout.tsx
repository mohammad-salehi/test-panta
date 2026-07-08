'use client';
import { usePathname } from 'next/navigation';
import {AppShell } from 'panta_design_system';
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
  const pathname = usePathname();

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
        <AppShell
          navItems={navItems}
          currentPath={pathname}
          title="P.D.S"
          headerTitle="سامانه نظارت بر کارگزاری‌های مبادله رمزارز ایران"
          userFullName="کاربر تست"
          userRole="ADMIN"
          onLogout={handleLogout}
          onChangePassword={handleChangePassword}
          brand={<img src="/bmi.png" style={{ width: "40px" }} alt="logo" />}
        >
          {children}
        </AppShell>
      </body>
    </html>
  );
}