'use client';

import { ThemeProvider, Header } from 'panta_design_system';
import 'panta_design_system/styles.css';
import { ReactNode, useState } from 'react';
import { Navbar } from 'panta_design_system';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
export const DashboardIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ExchangeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const navItems = [
  { link: '/', label: 'داشبورد', icon: <DashboardIcon />, access: '' },
  { link: '/panel/exchanges', label: 'لیست کارگزاری‌ها', icon: <ExchangeIcon /> },
  { link: '/panel/exchanges', label: 'لیست کارگزاری‌ها', icon: <ExchangeIcon /> },
  { link: '/panel/exchanges', label: 'لیست کارگزاری‌ها', icon: <ExchangeIcon /> },
  { link: '/panel/exchanges', label: 'لیست کارگزاری‌ها', icon: <ExchangeIcon /> },
  { link: '/panel/exchanges', label: 'لیست کارگزاری‌ها', icon: <ExchangeIcon /> },
];

export default function RootLayout({ children }: { children: ReactNode }) {

  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };

  const handleChangePassword = () => {
    alert('تغییر رمز');
  };

  const pathname = usePathname();
  return (
    <html lang="fa" suppressHydrationWarning style={{ direction: 'rtl' }}>
      <body style={{ margin: "0px" }}>
        <ThemeProvider>
          <Header title="سامانه نظارت بر کارگزاری‌های مبادله رمزارز ایران" />
          <Navbar
            navItems={navItems}
            currentPath={pathname}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isMobileOpen={isMobileOpen}
            setIsMobileOpen={setIsMobileOpen}
            userFullName="کاربر تست"
            userRole="ADMIN"
            onLogout={() => { /* logout logic */ }}
            onChangePassword={() => { /* open modal */ }}
          />
          <main className="p-6">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}