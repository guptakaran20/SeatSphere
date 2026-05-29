"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";

export function HeroOverlay() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 360], [1, 0.68]);
  const y = useTransform(scrollY, [0, 360], [0, -26]);

  return (
    <motion.section
      style={{ opacity, y }}
      className="relative flex min-h-[88vh] items-center justify-center px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-4xl rounded-3xl border border-white/70 bg-white/66 p-8 text-center shadow-xl backdrop-blur-md sm:p-12">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-sky-700"
        >
          Smart College Events
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.06 }}
          className="text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl"
        >
          Smart Auditorium Booking Made Simple
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg"
        >
          SeatSphere blends live seat availability, frictionless reservations, and QR-powered entry into one premium booking experience.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link href="/signup">
            <Button size="lg">Start Booking</Button>
          </Link>
          <Link href="/signin">
            <Button size="lg" variant="outline">Sign In</Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
