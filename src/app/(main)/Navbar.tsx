"use client";

import logo from "@/assets/logo.png";
import ThemeToggle from "@/components/ThemeToggle";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { theme } = useTheme();
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/resumes", label: "Resumes" },
    { href: "/editor", label: "Editor" },
    { href: "/billing", label: "Billing" },
  ];

  return (
    <header className="shadow-sm border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 p-4">
        {/* Logo and Branding (Left) */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-2xl font-bold tracking-tight">
            The Resume Lab
          </span>
        </Link>
        
        {/* Navigation Links (Center) */}
        <nav className="flex items-center gap-2 rounded-full border px-4 py-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <div key={link.href}>
                {isActive ? (
                  <span className="cursor-default px-3 py-1 rounded-full text-white bg-primary">
                    {link.label}
                  </span>
                ) : (
                  <Link
                    href={link.href}
                    className="px-3 py-1 rounded-full hover:bg-muted transition-colors"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* User Actions and Theme Toggle (Right) */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <UserButton
            appearance={{
              baseTheme: theme === "dark" ? dark : undefined,
              elements: {
                avatarBox: {
                  width: 40,
                  height: 40,
                },
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}