import Link from "next/link";
import Image from "next/image";

const trustedLogos = [
  "/logo.png", // Placholders for the logos
  "/logo.png",
  "/logo.png",
  "/logo.png",
  "/logo.png",
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/80">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-12 sm:px-6 lg:px-8">

        <div className="flex flex-col items-center gap-4">
          <p className="text-sm font-medium text-slate-400">Trusted by Students, Clubs & Institutions</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
            {trustedLogos.map((logo, idx) => (
              <Image
                key={idx}
                src={logo}
                alt={`Trusted Institution ${idx + 1}`}
                width={40}
                height={40}
                className="object-contain opacity-50"
              />
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} SeatSphere. All rights reserved.</p>
          <div className="flex items-center gap-5 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
