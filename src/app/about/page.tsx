"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  ArrowRight,
  Target,
  ShieldCheck,
  QrCode,
  CalendarDays,
  Armchair,
  Users,
  Calendar,
  CheckCircle2,
  GraduationCap,
  Sparkle,
  Bookmark,
  Heart,
  Globe,
} from "lucide-react";

const whyFeatures = [
  {
    icon: Armchair,
    title: "Smart Booking",
    desc: "Real-time interactive seat reservations to completely prevent auditorium booking conflicts.",
    color: "text-purple-400"
  },
  {
    icon: ShieldCheck,
    title: "Secure Access",
    desc: "Dual-layer OTP and college single-sign-on OAuth logins for total user authenticity.",
    color: "text-blue-400"
  },
  {
    icon: QrCode,
    title: "QR Entry",
    desc: "Lightning-fast, queue-free check-ins powered by unique encrypted secure ticket passes.",
    color: "text-pink-400"
  },
  {
    icon: CalendarDays,
    title: "Event Management",
    desc: "End-to-end administration panel for clubs to schedule fests and administrators to approve slots.",
    color: "text-emerald-400"
  }
];

const whoUses = [
  { icon: GraduationCap, title: "Universities", desc: "For centralized auditorium management and academic events." },
  { icon: Sparkle, title: "Student Clubs", desc: "For hosting fests, speaker series, and dynamic hackathons." },
  { icon: Bookmark, title: "Technical Societies", desc: "For streamlined workshops, coding fests, and tech talks." },
  { icon: Heart, title: "Cultural Organizations", desc: "For coordinating theater plays, musical nights, and dance shows." },
  { icon: Globe, title: "Event Committees", desc: "For college-wide event logistics and automated registration checks." }
];

const stats = [
  { icon: Users, val: "10K+", label: "Happy Users", color: "text-purple-400" },
  { icon: Calendar, val: "500+", label: "Events Hosted", color: "text-purple-500" },
  { icon: Armchair, val: "20K+", label: "Seats Booked", color: "text-purple-400" },
  { icon: CheckCircle2, val: "99.9%", label: "Booking Success", color: "text-purple-500" }
];


export default function AboutPage() {
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
          <div className="flex flex-col justify-center min-h-[40vh] sm:min-h-[50vh] lg:min-h-[60vh] pt-10 pb-15">
            <motion.div
              className="max-w-3xl flex flex-col items-start gap-6 w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-900/30 px-4 py-1.5 text-sm font-medium text-purple-300">
                <Target className="size-4 text-purple-400" />
                <span>Our Story</span>
              </div>

              <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                Reimagining Auditorium<br />
                <span className="gradient-text">Management</span>
              </h1>

              <p className="max-w-xl text-base sm:text-lg text-slate-300 leading-relaxed">
                SeatSphere makes event organization, auditorium booking, and seat management effortless for modern colleges and institutions.
              </p>
            </motion.div>
          </div>

          {/* Mission Section */}
          <section className="pt-10 sm:pt-20 lg:pt-32">
            <motion.div
              className="bg-[#0e0e10] rounded-[2.5rem] p-8 sm:p-12 overflow-hidden shadow-2xl border border-white/5 flex flex-col lg:flex-row gap-12 items-center select-none"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {/* Left Column (Text) */}
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 text-purple-400 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
                  The Mission
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Seamless College Events <br />From Start to Finish
                </h2>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
                  Our mission is to simplify event experiences by combining auditorium management, seat reservations, and attendance systems into a single platform.
                </p>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  Colleges host hundreds of vital events every semester, yet coordinating them is traditionally hindered by scattered spreadsheets and chaotic ticketing. We build smart, state-of-the-art tools to let student committees shine and give college administrators complete structural control.
                </p>
              </div>

              {/* Right Column (Custom Interactive Dashboard Mockup Illustration in HTML/CSS) */}
              <div className="flex-1 w-full flex items-center justify-center lg:justify-end relative">
                {/* Glowing radial backdrop inside card */}
                <div className="absolute size-80 rounded-full bg-purple-500/10 blur-[60px] pointer-events-none -right-10 -top-10"></div>
                
                <motion.div
                  className="w-full max-w-lg aspect-auto sm:aspect-[1.3/1] bg-[#070709] rounded-2xl border border-white/10 p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between gap-4 sm:gap-0"
                  whileHover={{ y: -6, scale: 1.015 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Mock dashboard top bar */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="size-3 rounded-full bg-red-500/80"></div>
                      <div className="size-3 rounded-full bg-yellow-500/80"></div>
                      <div className="size-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">SeatSphere Admin</div>
                  </div>

                  {/* Mock stats grid inside mockup */}
                  <div className="grid grid-cols-3 gap-3 my-4">
                    <div className="bg-[#0f0f12] rounded-xl p-3 border border-white/5 space-y-1">
                      <div className="text-[9px] font-bold text-slate-500">Event Approval</div>
                      <div className="text-xs font-bold text-purple-400 flex items-center gap-1">
                        <span className="size-1.5 rounded-full bg-purple-500 animate-pulse"></span>
                        9 Pending
                      </div>
                    </div>
                    <div className="bg-[#0f0f12] rounded-xl p-3 border border-white/5 space-y-1">
                      <div className="text-[9px] font-bold text-slate-500">Total Bookings</div>
                      <div className="text-xs font-bold text-emerald-400">12,480 seats</div>
                    </div>
                    <div className="bg-[#0f0f12] rounded-xl p-3 border border-white/5 space-y-1">
                      <div className="text-[9px] font-bold text-slate-500">QR Scans / Min</div>
                      <div className="text-xs font-bold text-blue-400">82 sc/m</div>
                    </div>
                  </div>

                  {/* Mock visual seat selection block inside mockup */}
                  <div className="bg-[#0f0f12] rounded-xl p-4 border border-white/5 flex-1 flex flex-col justify-between">
                    <div className="text-[10px] font-extrabold text-white flex items-center gap-2">
                      <Armchair className="size-3 text-purple-400" />
                      Visual Seating Grid
                    </div>
                    
                    <div className="grid grid-cols-8 gap-1.5 my-2">
                      {Array.from({ length: 24 }).map((_, idx) => (
                        <div
                          key={idx}
                          className={`aspect-square rounded-sm ${
                            idx === 7 || idx === 11 || idx === 12
                              ? "bg-purple-500 shadow-[0_0_5px_#a855f7]"
                              : idx % 3 === 0
                              ? "bg-slate-700"
                              : "bg-green-500 shadow-[0_0_5px_#22c55e]"
                          }`}
                        ></div>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 text-[7px] font-bold uppercase tracking-wider text-slate-400 mt-2">
                      <div className="flex items-center gap-1"><span className="size-1.5 bg-green-500 rounded-sm"></span> Available</div>
                      <div className="flex items-center gap-1"><span className="size-1.5 bg-purple-500 rounded-sm"></span> Reserved</div>
                      <div className="flex items-center gap-1"><span className="size-1.5 bg-slate-700"></span> Taken</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* Why SeatSphere Section */}
          <section className="py-16">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Why Colleges Choose SeatSphere</h2>
              <p className="text-slate-400 text-sm sm:text-base">Modern solutions constructed specifically for the logistics of university campus networks.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch select-none">
              {whyFeatures.map((feat, idx) => (
                <motion.div
                  key={idx}
                  className="bg-[#0e0e10] p-8 rounded-[2rem] hover:bg-white/[0.01] transition-all duration-300 border border-white/5 flex flex-col justify-between min-h-[260px]"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                >
                  <div className="space-y-4">
                    <div className="size-12 rounded-2xl bg-[#18181b] border border-white/10 flex items-center justify-center shadow-lg">
                      <feat.icon className={`size-5.5 ${feat.color}`} />
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight">{feat.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">{feat.desc}</p>
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Platform Core</div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Statistics Section */}
          <section className="py-16">
            <motion.div
              className="bg-[#0e0e10] rounded-[2.5rem] p-8 sm:p-10 shadow-2xl border border-white/5 select-none"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
                {stats.map((stat, i) => (
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
          </section>

          {/* Who Uses SeatSphere Section */}
          <section className="py-16">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Who Uses SeatSphere?</h2>
              <p className="text-slate-400 text-sm sm:text-base">Trusted across campus ecosystems by students, clubs, and college administrators alike.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch select-none">
              {whoUses.map((item, idx) => (
                <div key={idx} className="bg-[#0e0e10] p-6 rounded-3xl hover:bg-white/[0.01] transition-all duration-300 border border-white/5 flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <div className="size-11 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 shadow-md">
                      <item.icon className="size-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight">{item.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                  <div className="text-slate-600 font-extrabold text-[9px] uppercase tracking-wider">Campus Slot</div>
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-12">
            <motion.div
              className="bg-[#0e0e10] relative rounded-[2.5rem] p-8 sm:p-16 overflow-hidden text-center flex flex-col items-center gap-6 shadow-2xl border border-white/5 select-none"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Glowing orbs */}
              <div className="absolute size-96 rounded-full bg-purple-500/10 blur-[100px] -top-12 -left-12 pointer-events-none"></div>
              <div className="absolute size-96 rounded-full bg-fuchsia-500/5 blur-[100px] -bottom-12 -right-12 pointer-events-none"></div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-2xl relative z-10">
                Join the Future of <br />
                <span className="gradient-text">Auditorium Booking</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-400 max-w-md relative z-10 leading-relaxed">
                Connect your campus fests and streamline student reservations with our smart dashboard software.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 w-full sm:w-auto relative z-10">
                <Link href="/signup" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto gradient-button rounded-full px-8 py-6 text-base font-semibold shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                    Get Started <ArrowRight className="ml-2 size-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </section>

        </div>
      </main>
    </div>
  );
}
