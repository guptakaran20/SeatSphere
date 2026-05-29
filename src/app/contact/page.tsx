"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  HelpCircle,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Wrench,
  Handshake,
  Navigation,
  CheckCircle2,
  Sparkles
} from "lucide-react";

const faqData = [
  {
    q: "How do I book a seat?",
    a: "Booking a seat is simple! Navigate to our Events section, select the active event you want to attend, choose your exact seat row and number directly from the real-time visual seat map grid, and confirm your reservation. Your unique entry pass will be generated instantly."
  },
  {
    q: "Can I organize my own event?",
    a: "Yes! If you are a registered student club coordinator or society head, you can request slot approvals from your organizer dashboard. Once approved by the college administrator, your event page will go live on the SeatSphere calendar, enabling real-time registrations."
  },
  {
    q: "How does QR entry work?",
    a: "Once your booking is confirmed, a secure encrypted QR pass is issued to your dashboard account. At the auditorium entrance, the security team scans your QR ticket via the SeatSphere validation tool to confirm your seat instantly and check you in."
  },
  {
    q: "Is SeatSphere secure?",
    a: "Absolutely. SeatSphere uses high-grade industry protocols, incorporating OTP verification for ticket claims, OAuth college Single-Sign-On integrations, and restricted role-based user hierarchies to guarantee absolute data protection."
  },
  {
    q: "Can colleges customize the platform?",
    a: "Yes. SeatSphere offers flexible administrative setups. Colleges can map their custom auditorium blueprints, assign custom seating capacities, configure approval policies, and manage specific club coordinators from our unified college console."
  }
];

const supportCards = [
  {
    icon: Mail,
    title: "General Support",
    desc: "Have general questions, account issues, or basic user inquiries?",
    email: "support@seatsphere.com",
    color: "text-purple-400"
  },
  {
    icon: Wrench,
    title: "Technical Help",
    desc: "Encountered a system bug, seat map lag, or authentication failure?",
    email: "tech@seatsphere.com",
    color: "text-blue-400"
  },
  {
    icon: Handshake,
    title: "Partnerships",
    desc: "Interested in deploying SeatSphere at your educational campus or college?",
    email: "partner@seatsphere.com",
    color: "text-pink-400"
  }
];

export default function ContactPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex flex-col">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 h-[85vh] w-full overflow-hidden select-none pointer-events-none">
        <Image
          src="/bg-auditorium.png"
          alt="Auditorium Background"
          fill
          priority
          className="object-cover object-center opacity-30 sm:opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/85 to-black sm:hidden"></div>
        <div className="absolute inset-0 bg-black/55 hidden sm:block"></div>
      </div>

      <main className="relative z-10 flex-1 w-full pt-12 pb-24">
        <div className="mx-auto max-w-[1500px] w-full px-4 sm:px-6 lg:px-8">

          {/* Hero Section */}
          <div className="flex flex-col justify-center min-h-[50vh] pt-10 pb-16">
            <motion.div
              className="max-w-3xl flex flex-col items-start gap-6 w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-900/30 px-4 py-1.5 text-sm font-medium text-purple-300">
                <HelpCircle className="size-4 text-purple-400" />
                <span>Contact & Support</span>
              </div>

              <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-7.5xl font-extrabold tracking-tight text-white leading-[1.1]">
                Get In<br />
                <span className="gradient-text">Touch</span>
              </h1>

              <p className="max-w-xl text-base sm:text-lg text-slate-300 leading-relaxed">
                Questions, support requests, partnerships, or feedback — we would love to hear from you.
              </p>
            </motion.div>
          </div>

          {/* Contact Layout Grid */}
          <section className="py-8 select-none">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              
              {/* Left Side (40% Info) */}
              <motion.div
                className="lg:col-span-5 bg-[#0e0e10]/90 rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-between gap-10 border border-white/5 relative overflow-hidden"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Glowing radial orb */}
                <div className="absolute size-80 rounded-full bg-purple-500/5 blur-[80px] pointer-events-none -left-20 -bottom-20"></div>

                <div className="space-y-8 relative z-10">
                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Contact Information</h3>
                    <p className="text-slate-400 text-xs sm:text-sm font-medium leading-relaxed">
                      Reach out directly and our administrative team will assist you within our operational hours.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-2xl bg-white/5 flex items-center justify-center text-purple-400">
                        <Mail className="size-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Email Address</div>
                        <Link href="mailto:support@seatsphere.com" className="text-sm sm:text-base font-bold text-white hover:text-purple-400 transition-colors">
                          support@seatsphere.com
                        </Link>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-2xl bg-white/5 flex items-center justify-center text-purple-400">
                        <Phone className="size-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Phone Line</div>
                        <div className="text-sm sm:text-base font-bold text-white">
                          +91 98765 43210
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-2xl bg-white/5 flex items-center justify-center text-purple-400">
                        <MapPin className="size-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Campus Location</div>
                        <div className="text-sm sm:text-base font-bold text-white">
                          Punjab, India
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Support Indicators */}
                <div className="pt-8 border-t border-white/10 relative z-10 space-y-4">
                  <div className="flex items-center gap-3 text-slate-300 text-xs sm:text-sm">
                    <Clock className="size-4 text-purple-400" />
                    <span>Support Hours: 09:00 AM - 06:00 PM IST</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300 text-xs sm:text-sm">
                    <CheckCircle2 className="size-4 text-purple-400" />
                    <span>Response Time: Guaranteed under 24 hours</span>
                  </div>
                </div>
              </motion.div>

              {/* Right Side (60% Form) */}
              <motion.div
                className="lg:col-span-7 bg-[#0e0e10]/95 rounded-[2.5rem] p-8 sm:p-10 border border-white/5 flex flex-col justify-between"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white tracking-tight">Send a Message</h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                      Fill out the support form below and our campus team will review your query instantly.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-400">Full Name *</Label>
                      <Input
                        id="name"
                        required
                        placeholder="John Doe"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="bg-white/[0.02] border-white/10 rounded-2xl p-4 text-sm font-medium text-white placeholder-slate-600 focus:border-purple-500/50 transition-colors focus:ring-0 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="bg-white/[0.02] border-white/10 rounded-2xl p-4 text-sm font-medium text-white placeholder-slate-600 focus:border-purple-500/50 transition-colors focus:ring-0 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-slate-400">Subject / Category</Label>
                    <Input
                      id="subject"
                      placeholder="Auditorium booking, ticket issue..."
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="bg-white/[0.02] border-white/10 rounded-2xl p-4 text-sm font-medium text-white placeholder-slate-600 focus:border-purple-500/50 transition-colors focus:ring-0 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-slate-400">Your Message *</Label>
                    <Textarea
                      id="message"
                      required
                      placeholder="Write your details here..."
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="bg-white/[0.02] border-white/10 rounded-2xl p-4 text-sm font-medium text-white placeholder-slate-600 focus:border-purple-500/50 transition-colors focus:ring-0 focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      disabled={isSubmitted}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`inline-flex items-center justify-center gap-3 w-full sm:w-auto rounded-full py-4 px-8 text-base font-semibold transition-all duration-300 ${
                        isSubmitted
                          ? "bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                          : "gradient-button shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                      }`}
                    >
                      {isSubmitted ? (
                        <>
                          Message Received! <CheckCircle2 className="size-5" />
                        </>
                      ) : (
                        <>
                          Send Message <Send className="size-4 ml-1" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </div>
          </section>

          {/* Interactive FAQ Section */}
          <section className="py-20 select-none">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Frequently Asked Questions</h2>
              <p className="text-slate-400 text-sm sm:text-base">Find quick, structured answers to common queries regarding bookings and events.</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {faqData.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-[#0e0e10] rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/10"
                  >
                    <button
                      type="button"
                      className="w-full flex items-center justify-between p-6 text-left cursor-pointer focus:outline-none"
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                    >
                      <span className="text-sm sm:text-base font-bold text-white tracking-tight">{faq.q}</span>
                      <span className="size-7 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors shrink-0 ml-4">
                        {isOpen ? <Minus className="size-4 text-purple-400" /> : <Plus className="size-4" />}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-6 pt-2 border-t border-white/5">
                            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
                              {faq.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Support Channels Section */}
          <section className="py-16 select-none">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Direct Support Channels</h2>
              <p className="text-slate-400 text-sm sm:text-base">Get in touch directly with our dedicated technical, commercial, or administrative divisions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {supportCards.map((card, idx) => (
                <motion.div
                  key={idx}
                  className="bg-[#0e0e10] p-8 rounded-[2rem] hover:bg-white/[0.01] transition-all duration-300 border border-white/5 flex flex-col justify-between min-h-[250px]"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                >
                  <div className="space-y-4">
                    <div className="size-12 rounded-2xl bg-[#18181b] border border-white/10 flex items-center justify-center shadow-lg">
                      <card.icon className={`size-5.5 ${card.color}`} />
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight">{card.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">{card.desc}</p>
                  </div>

                  <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between">
                    <Link href={`mailto:${card.email}`} className="text-xs font-extrabold text-purple-400 hover:text-purple-300 flex items-center gap-1.5 transition-colors uppercase tracking-wider">
                      Contact division <ArrowRight className="size-3.5" />
                    </Link>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Division</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Map Section Map Design Placeholder */}
          <section className="py-12 select-none">
            <motion.div
              className="w-full bg-[#0e0e10]/90 rounded-[2.5rem] min-h-[380px] border border-white/5 relative overflow-hidden flex flex-col items-center justify-center p-8 text-center shadow-2xl"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -4 }}
            >
              {/* Dynamic abstract grid pattern in CSS background */}
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
              {/* Radial glow background */}
              <div className="absolute size-96 rounded-full bg-purple-500/10 blur-[80px] pointer-events-none"></div>

              <div className="relative z-10 space-y-6 max-w-md">
                <div className="size-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 mx-auto shadow-lg shadow-purple-500/5">
                  <Navigation className="size-6 animate-bounce" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Punjab Headquarters</h3>
                  <p className="text-xs sm:text-sm text-slate-400 font-semibold leading-relaxed">
                    Centrally based in Punjab, India. Developing high-fidelity ticketing and auditorium reservation platforms for colleges worldwide.
                  </p>
                </div>
                
                <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-900/30 px-4 py-1.5 text-xs font-semibold text-purple-300">
                  <ShieldCheck className="size-3.5 text-purple-400" />
                  <span>Administrative Campus Center</span>
                </div>
              </div>
            </motion.div>
          </section>

        </div>
      </main>
    </div>
  );
}
