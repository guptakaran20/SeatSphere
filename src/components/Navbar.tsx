"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "About", href: "/about" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="SeatSphere Logo" width={32} height={32} className="object-contain" />
          <span className="text-xl font-extrabold tracking-tight text-white">SeatSphere</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-sm font-medium transition-colors hover:text-white ${
                  isActive
                    ? "text-white after:absolute after:-bottom-1.5 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-4 after:bg-purple-500"
                    : "text-slate-400"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link href="/signin">
            <Button variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10 rounded-full px-6">
              Log In
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="gradient-button rounded-full px-6 font-semibold shadow-[0_0_15px_rgba(124,58,237,0.5)]">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-300 hover:bg-white/10 lg:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-white/10 bg-black/95 px-4 py-6 lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-base font-semibold transition-colors ${
                    isActive ? "text-purple-400" : "text-slate-300 hover:text-white"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="mt-4 flex flex-col gap-3">
              <Link href="/signin" onClick={() => setIsOpen(false)} className="w-full">
                <Button variant="outline" className="w-full border-white/20 bg-transparent text-white rounded-full">
                  Log In
                </Button>
              </Link>
              <Link href="/signup" onClick={() => setIsOpen(false)} className="w-full">
                <Button className="w-full gradient-button rounded-full">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
