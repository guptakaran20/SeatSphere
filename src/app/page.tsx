"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Play,
  Armchair,
  ShieldCheck,
  QrCode,
  CalendarDays,
  Users,
  Calendar,
  CheckCircle2,
  Box
} from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex flex-col">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 h-[100vh] w-full overflow-hidden select-none pointer-events-none">
        <Image
          src="/bg-auditorium.png"
          alt="Auditorium Background"
          fill
          priority
          className="object-cover object-center opacity-30 sm:opacity-85"
        />
        {/* Soft mobile-optimized gradient overlay that transitions to a simple overlay on desktop */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/85 to-black sm:hidden"></div>
        <div className="absolute inset-0 bg-black/50 hidden sm:block"></div>
      </div>

      <main className="relative z-10 flex-1 w-full pt-12 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Hero Section */}
          <div className="flex flex-col justify-center min-h-[60vh] pt-10 pb-15">
            {/* Left Content */}
            <motion.div
              className="max-w-3xl flex flex-col items-start gap-6 w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-900/30 px-4 py-1.5 text-sm font-medium text-purple-300">
                <ShieldCheck className="size-4" />
                <span>Smart. Secure. Seamless.</span>
              </div>

              <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                Book Your Seat.<br />
                <span className="">Experience</span> More.
              </h1>

              <p className="max-w-xl text-base sm:text-lg text-slate-300 leading-relaxed">
                SeatSphere is the all-in-one platform for auditorium booking, seat reservations, and hassle-free event management for colleges.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 w-full sm:w-auto">
                <Link href="/events" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto gradient-button rounded-full px-8 py-6 text-base font-semibold shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                    Explore Events <ArrowRight className="ml-2 size-5" />
                  </Button>
                </Link>
                <Link href="/how-it-works" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full border-white/20 bg-transparent px-8 py-6 text-base font-semibold text-white hover:bg-white/10 transition-colors">
                    How It Works <Play className="ml-2 size-5 text-white/70" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Features & Demo Bento */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 mb-24 items-stretch"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            {[
              { icon: Armchair, title: "Real-time Seat Selection", desc: "Choose your perfect seat in real time", color: "text-purple-400" },
              { icon: ShieldCheck, title: "Secure Booking", desc: "Advanced security with OTP & OAuth", color: "text-blue-400" },
              { icon: QrCode, title: "QR-based Entry", desc: "Quick & secure event check-ins", color: "text-sky-400" },
              { icon: CalendarDays, title: "Easy Event Management", desc: "Create, approve & manage events", color: "text-pink-400" },
            ].map((feature, i) => (
              <div key={i} className="col-span-1 flex flex-col gap-10 bg-[#0a0a0c]/50 px-6 py-12 rounded-3xl hover:bg-white/[0.02] transition-colors">
                <div className="size-12 rounded-2xl bg-[#141416] flex items-center justify-center shadow-lg">
                  <feature.icon className={`size-15 ${feature.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-lg text-slate-400 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Interactive Live Seat Banner */}
          <motion.div
            className="w-full mt-12 mb-24 bg-[#0e0e10] relative rounded-[2.5rem] min-h-[480px] lg:min-h-[520px] overflow-hidden shadow-2xl flex items-center select-none"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Seamless Background Image Integration */}
            <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[58%] h-full pointer-events-none select-none overflow-hidden rounded-[2.5rem] lg:rounded-l-none lg:rounded-r-[2.5rem] opacity-25 lg:opacity-100 transition-opacity duration-500 z-0">
              {/* Gradients to blend the image seamlessly into the card */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e10]/95 via-[#0e0e10]/40 to-[#0e0e10] lg:bg-gradient-to-r lg:from-[#0e0e10] lg:via-[#0e0e10]/20 lg:to-transparent z-10"></div>
              {/* Subtle inner orb glow */}
              <div className="absolute -right-20 -top-20 size-60 rounded-full bg-purple-500/10 blur-[80px] z-10"></div>
              <Image
                src="/seats-layout.png"
                alt="Interactive Seat Map"
                fill
                className="object-cover object-[20%_center] lg:object-left-center"
              />
            </div>

            {/* Ambient Background Glow behind the card (left side) */}
            <div className="absolute -left-20 -bottom-20 size-80 rounded-full bg-purple-600/5 blur-[100px] pointer-events-none z-0"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full relative z-10 p-8 sm:p-12 lg:pr-6">
              {/* Left Info Column */}
              <div className="lg:col-span-5 flex flex-col items-start text-left space-y-8 py-4">
                <div className="space-y-6">
                  <h3 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                    Experience<br />
                    <span>Live Seat</span><br />
                    Selection
                  </h3>
                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-sm">
                    Pick your seat from our interactive layout and book in just a few clicks.
                  </p>
                  
                  {/* Premium feature list to fill space & look attractive */}
                  <ul className="space-y-3 pt-2">
                    <li className="flex items-center gap-3 text-sm sm:text-base text-slate-400">
                      <span className="flex items-center justify-center size-5.5 rounded-full bg-purple-500/10 text-purple-400">
                        <CheckCircle2 className="size-3.5" />
                      </span>
                      <span>Instant real-time seat availability</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm sm:text-base text-slate-400">
                      <span className="flex items-center justify-center size-5.5 rounded-full bg-[#a855f7]/10 text-[#a855f7]">
                        <CheckCircle2 className="size-3.5" />
                      </span>
                      <span>Interactive visual layout mapping</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm sm:text-base text-slate-400">
                      <span className="flex items-center justify-center size-5.5 rounded-full bg-[#d946ef]/10 text-[#d946ef]">
                        <CheckCircle2 className="size-3.5" />
                      </span>
                      <span>One-click booking reservations</span>
                    </li>
                  </ul>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-between border border-purple-500/30 rounded-2xl bg-[#09090b] px-8 py-4.5 hover:bg-purple-900/20 hover:border-purple-500/60 transition-colors gap-6 group cursor-pointer shadow-xl shadow-purple-900/10"
                >
                  <div className="text-left font-bold text-base tracking-tight text-white leading-tight">
                    <div>Test It Out</div>
                  </div>
                  <div className="size-10 rounded-xl bg-purple-500/15 flex items-center justify-center group-hover:bg-purple-500/25 transition-colors">
                    <Box className="size-10 text-purple-400 group-hover:rotate-12 transition-transform" />
                  </div>
                </motion.button>
              </div>

              {/* Right Column (Intentionally empty space to let background image shine through on desktop) */}
              <div className="hidden lg:block lg:col-span-7 h-full min-h-[300px]"></div>
            </div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            className="mt-24 bg-[#141416] rounded-[2rem] p-8 sm:p-10 border border-white/5 shadow-2xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
              {[
                { icon: Users, val: "10K+", label: "Happy Users", color: "text-purple-400" },
                { icon: Calendar, val: "500+", label: "Events Hosted", color: "text-purple-500" },
                { icon: Armchair, val: "20K+", label: "Seats Booked", color: "text-purple-400" },
                { icon: CheckCircle2, val: "99.9%", label: "Booking Success", color: "text-purple-500" },
              ].map((stat, i) => (
                <div key={i} className={`flex items-center gap-5 justify-center lg:justify-start ${i !== 0 ? "lg:border-l lg:border-white/10 lg:pl-10" : ""} ${(i === 1 || i === 3) ? "border-l border-white/10 pl-6 lg:pl-10" : ""}`}>
                  <div className={`flex items-center justify-center size-12 rounded-2xl bg-white/5`}>
                    <stat.icon className={`size-6 ${stat.color}`} />
                  </div>
                  <div>
                    <div className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">{stat.val}</div>
                    <div className="text-xs lg:text-sm font-medium text-slate-400 mt-1">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
