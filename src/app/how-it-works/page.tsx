"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Search,
  Building,
  Armchair,
  CheckCircle2,
  QrCode,
  Sparkles,
  Users,
  Calendar,
  Lock,
  Smartphone,
  Key,
  ShieldCheck,
  CreditCard,
  Settings,
  ChevronRight
} from "lucide-react";

const timelineSteps = [
  {
    icon: Search,
    title: "Browse Events",
    desc: "Discover active college events, seminars, and cultural fests easily.",
    color: "text-purple-400"
  },
  {
    icon: Building,
    title: "Select Auditorium",
    desc: "Choose from multiple campuses and state-of-the-art halls.",
    color: "text-blue-400"
  },
  {
    icon: Armchair,
    title: "Choose Seat",
    desc: "Pick your exact seat in real-time from our detailed 3D mapping layout.",
    color: "text-sky-400"
  },
  {
    icon: CheckCircle2,
    title: "Confirm Booking",
    desc: "Complete checkout securely and reserve your seat instantly.",
    color: "text-emerald-400"
  },
  {
    icon: QrCode,
    title: "Get QR Ticket",
    desc: "Receive your unique encrypted entry pass directly on your dashboard.",
    color: "text-pink-400"
  },
  {
    icon: Sparkles,
    title: "Attend Event",
    desc: "Skip long lines by scanning your ticket code at the entrance.",
    color: "text-amber-400"
  }
];

const studentFeatures = [
  "Browse campus events in a visual calendar",
  "Book premium or general seats in real-time",
  "View active tickets and reservations offline",
  "Scan QR tickets for rapid seamless entry"
];

const organizerFeatures = [
  "Create and schedule auditorium events",
  "Review and approve student booking requests",
  "Manage attendee lists and event capacity",
  "Monitor real-time reservations and booking stats"
];

const securityFeatures = [
  {
    icon: Smartphone,
    title: "OTP Verification",
    desc: "Prevent spam bookings with secure dynamic telephone OTP validation."
  },
  {
    icon: Key,
    title: "OAuth Login",
    desc: "Single-Sign-On utilizing reliable college email accounts."
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    desc: "Encrypted transactions with modern gateways and billing security."
  },
  {
    icon: QrCode,
    title: "QR Validation",
    desc: "Unique encrypted visual passes to ensure zero fraud or duplicate entry."
  },
  {
    icon: ShieldCheck,
    title: "Role-based Access",
    desc: "Segment permissions perfectly between students, clubs, and college admins."
  }
];

export default function HowItWorksPage() {
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
                <Sparkles className="size-4 text-purple-400" />
                <span>Simplicity Redefined</span>
              </div>

              <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                How SeatSphere<br />
                <span className="gradient-text">Works</span>
              </h1>

              <p className="max-w-xl text-base sm:text-lg text-slate-300 leading-relaxed">
                Book seats, manage events, and streamline auditorium operations in minutes with our college-focused event management ecosystem.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 w-full sm:w-auto">
                <Link href="/events" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto gradient-button rounded-full px-8 py-6 text-base font-semibold shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                    Explore Events <ArrowRight className="ml-2 size-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Process Timeline Section */}
          <section className="py-10 sm:py-20 lg:py-24">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">The Event Journey</h2>
              <p className="text-slate-400 text-sm sm:text-base">Six quick steps to guide you from event exploration to your auditorium seat.</p>
            </div>
            <div className="absolute top-[1px] left-10 right-10 h-[2px] bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 opacity-30 z-0"></div>
            {/* Desktop Timeline Layout (lg and above) */}
            <div className="hidden lg:relative lg:flex lg:justify-between lg:items-stretch lg:gap-6 lg:mt-12 select-none">
              {/* Neon Connector Line */}
              <div className="absolute left-10 right-10 h-[2px] bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 opacity-30 z-0"></div>

              {timelineSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  className="flex-1 flex flex-col justify-between p-10  hover:bg-white/[0.02] transition-colors duration-300 min-h-[280px] relative z-10 select-none"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                >
                  <div>
                    <div className="size-16 rounded-2xl bg-[#18181b] border border-white/10 flex items-center justify-center shadow-lg mb-6 group-hover:scale-105 transition-transform">
                      <step.icon className={`size-10 ${step.color}`} />
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight mb-2">{step.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">{step.desc}</p>
                  </div>
                  <div className="text-2xl font-extrabold text-white/10 select-none text-right">0{idx + 1}</div>
                </motion.div>
              ))}
            </div>
            

            {/* Mobile/Tablet Timeline Layout (Stack) */}
            <div className="lg:hidden flex flex-col gap-6 relative select-none">
              {/* Vertical neon trail line */}
              <div className="absolute left-[30px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-purple-500 via-blue-500 to-pink-500 opacity-20 z-0"></div>

              {timelineSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  className="flex gap-6 items-start bg-[#0e0e10] p-6 rounded-3xl z-10 border border-white/5"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="size-14 shrink-0 rounded-2xl bg-[#18181b] border border-white/10 flex items-center justify-center shadow-lg relative z-10 pt-5">
                    <step.icon className={`size-6 ${step.color}`} />
                  </div>
                  <div className="space-y-10">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-purple-400">0{idx + 1}</span>
                      <h3 className="text-lg font-bold text-white tracking-tight">{step.title}</h3>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          <div className="hidden lg:relative lg:flex lg:justify-between lg:items-stretch lg:gap-2 lg:mt-12 select-none">
          <div className="absolute left-10 right-10 h-[2px] bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 opacity-30 z-0"></div>
          </div>
          </section>

          {/* Interactive Seat Selection Section */}
          <section className="py-20 relative">
            <motion.div
              className="w-full bg-[#0e0e10] relative rounded-[2.5rem] min-h-[480px] lg:min-h-[520px] overflow-hidden shadow-2xl flex items-center select-none"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Seamless Background Image Integration */}
              <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[58%] h-full pointer-events-none select-none overflow-hidden rounded-[2.5rem] lg:rounded-l-none lg:rounded-r-[2.5rem] opacity-20 lg:opacity-100 transition-opacity duration-500 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e10]/95 via-[#0e0e10]/40 to-[#0e0e10] lg:bg-gradient-to-r lg:from-[#0e0e10] lg:via-[#0e0e10]/20 lg:to-transparent z-10"></div>
                <div className="absolute -right-20 -top-20 size-60 rounded-full bg-purple-500/10 blur-[80px] z-10"></div>
                <Image
                  src="/seats-layout.png"
                  alt="Interactive Seat Map"
                  fill
                  className="object-cover object-[20%_center] lg:object-left-center"
                />
              </div>

              {/* Ambient Glow */}
              <div className="absolute -left-20 -bottom-20 size-80 rounded-full bg-purple-600/5 blur-[100px] pointer-events-none z-0"></div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full relative z-10 p-8 sm:p-12 lg:pr-6">
                {/* Left Info Column */}
                <div className="lg:col-span-5 flex flex-col items-start text-left space-y-8 py-4">
                  <div className="space-y-6">
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-[1.15]">
                      Smart Dynamic<br />
                      <span className="gradient-text">Interactive Layout</span>
                    </h3>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-sm">
                      SeatSphere implements dynamic lock-ins and real-time mapping for auditorium views.
                    </p>

                    <ul className="space-y-3 pt-2">
                      <li className="flex items-center gap-3 text-sm sm:text-base text-slate-400">
                        <span className="flex items-center justify-center size-5.5 rounded-full bg-purple-500/10 text-purple-400">
                          <CheckCircle2 className="size-3.5" />
                        </span>
                        <span>Real-time seat availability matching</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm sm:text-base text-slate-400">
                        <span className="flex items-center justify-center size-5.5 rounded-full bg-[#a855f7]/10 text-[#a855f7]">
                          <CheckCircle2 className="size-3.5" />
                        </span>
                        <span>Instant database lock seat updates</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm sm:text-base text-slate-400">
                        <span className="flex items-center justify-center size-5.5 rounded-full bg-[#d946ef]/10 text-[#d946ef]">
                          <CheckCircle2 className="size-3.5" />
                        </span>
                        <span>No double bookings or inventory lag</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Right Column (Transparent placeholder) */}
                <div className="hidden lg:block lg:col-span-7 h-full min-h-[300px]"></div>
              </div>
            </motion.div>
          </section>

          {/* Event Management Section */}
          <section className="py-16">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Tailored Interfaces</h2>
              <p className="text-slate-400 text-sm sm:text-base">Separate tailored dashboards crafted specifically for student attendees and auditorium organizers.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch select-none">
              {/* Student Side */}
              <motion.div
                className="bg-[#0e0e10] p-8 sm:p-10 rounded-[2rem] flex flex-col justify-between hover:bg-white/[0.01] transition-all duration-300 border border-white/5"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -4 }}
              >
                <div className="space-y-6">
                  <div className="size-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                    <Users className="size-6" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-white tracking-tight">Student Experience</h3>
                    <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                      Enjoy a friction-free booking journey on any mobile phone or browser.
                    </p>
                  </div>

                  <ul className="space-y-3.5 pt-2">
                    {studentFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-slate-300 text-sm sm:text-base">
                        <ChevronRight className="size-4 text-purple-400" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-8 text-xs font-semibold text-slate-500 tracking-wider uppercase select-none">Attendee Dashboard</div>
              </motion.div>

              {/* Organizer Side */}
              <motion.div
                className="bg-[#0e0e10] p-8 sm:p-10 rounded-[2rem] flex flex-col justify-between hover:bg-white/[0.01] transition-all duration-300 border border-white/5"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -4 }}
              >
                <div className="space-y-6">
                  <div className="size-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <Calendar className="size-6" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-white tracking-tight">Organizer Control Center</h3>
                    <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                      Powerful operational modules for college administrators and student club leaders.
                    </p>
                  </div>

                  <ul className="space-y-3.5 pt-2">
                    {organizerFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-slate-300 text-sm sm:text-base">
                        <ChevronRight className="size-4 text-blue-400" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-8 text-xs font-semibold text-slate-500 tracking-wider uppercase select-none">Administrator Dashboard</div>
              </motion.div>
            </div>
          </section>

          {/* Security Section */}
          <section className="py-20">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">SaaS Security Standards</h2>
              <p className="text-slate-400 text-sm sm:text-base">SeatSphere utilizes high-grade cybersecurity policies to secure auditorium inventory, transactions, and campus data.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch select-none">
              {securityFeatures.map((feat, idx) => (
                <div key={idx} className="bg-[#0e0e10] p-6 rounded-3xl hover:bg-white/[0.01] transition-all duration-300 border border-white/5 flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <div className="size-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 shadow-md">
                      <feat.icon className="size-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight">{feat.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">{feat.desc}</p>
                  </div>
                  <div className="text-slate-600 font-extrabold text-[10px] uppercase tracking-wider">Secured</div>
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-16">
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
                Ready to Experience <br />
                <span className="gradient-text">Smart Auditorium</span> Booking?
              </h2>
              <p className="text-sm sm:text-base text-slate-400 max-w-md relative z-10 leading-relaxed">
                Skip long event entry lines, reserve the best seats in real-time, and get smart QR validation.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 w-full sm:w-auto relative z-10">
                <Link href="/events" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto gradient-button rounded-full px-8 py-6 text-base font-semibold shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                    Explore Events <ArrowRight className="ml-2 size-5" />
                  </Button>
                </Link>
                <Link href="/signup" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full border-white/20 bg-transparent px-8 py-6 text-base font-semibold text-white hover:bg-white/10 transition-all">
                    Create Event
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
