"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Mail, Lock, User, Phone, CheckCircle2, Armchair, QrCode, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function GlassCard({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] backdrop-blur-[24px] border border-white/[0.08]"
    >
      <div className="size-10 rounded-full bg-purple-500/20 flex items-center justify-center">
        <Icon className="size-5 text-purple-400" />
      </div>
      <span className="text-sm font-medium text-slate-200">{text}</span>
    </motion.div>
  );
}

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 mr-3" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export default function SignUpPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  
  // Step 1 State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Step 2 State
  const [emailOtp, setEmailOtp] = useState(["", "", "", "", "", ""]);
  const [phoneOtp, setPhoneOtp] = useState(["", "", "", "", "", ""]);
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [otpError, setOtpError] = useState("");

  let strength = 0;
  if (password.length > 0) {
    if (password.length < 6 || (password.length >= 6 && !/[A-Z]/.test(password) && !/[0-9]/.test(password))) {
      strength = 1; // Weak
    } else if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password)) {
      strength = 3; // Strong
    } else {
      strength = 2; // Medium
    }
  }

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phoneNumber: phone, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to create account");
        setLoading(false);
        return;
      }

      // Fire off OTPs
      await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email, type: "EMAIL" }),
      });
      await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: phone, type: "PHONE" }),
      });

      setStep(2);
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (type: "EMAIL" | "PHONE", otpArray: string[]) => {
    const otpString = otpArray.join("");
    if (otpString.length !== 6) {
      setOtpError(`Please enter complete 6-digit ${type.toLowerCase()} OTP`);
      return;
    }

    setLoading(true);
    setOtpError("");

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          identifier: type === "EMAIL" ? email : phone, 
          otp: otpString, 
          type 
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setOtpError(data.message || `Failed to verify ${type.toLowerCase()} OTP`);
      } else {
        if (type === "EMAIL") setEmailVerified(true);
        if (type === "PHONE") setPhoneVerified(true);
      }
    } catch {
      setOtpError("An unexpected error occurred during verification");
    } finally {
      setLoading(false);
    }
  };

  const updateOtpState = (setter: (value: string[]) => void, index: number, value: string, current: string[]) => {
    if (!/^[0-9]*$/.test(value)) return;
    const newArr = [...current];
    newArr[index] = value;
    setter(newArr);

    // Auto focus next
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${setter === setEmailOtp ? 'email' : 'phone'}-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="relative min-h-screen bg-[#09090b] flex flex-col lg:flex-row overflow-x-hidden font-sans">
      
      {/* Left Panel (Branding) */}
       <div className="absolute inset-0 z-0 overflow-hidden">
                <Image 
                  src="/login.png" 
                  alt="Auditorium" 
                  fill 
                  className="object-cover object-center opacity-80" 
                  priority
                />
                <div className="absolute inset-0 bg-black/40"></div>
                
                {/* Purple Ambient Lighting */}
                <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#7c3aed] opacity-[0.18] blur-[150px] rounded-full pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#a855f7] opacity-[0.12] blur-[150px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#d946ef] opacity-[0.08] blur-[150px] rounded-full pointer-events-none"></div>
              </div>
            {/* Left Panel (Branding) - 45% Desktop, Auto Mobile */}
            <div className="relative w-full lg:w-[45%] flex flex-col justify-center p-8 lg:p-12 pb-12 lg:h-screen lg:sticky lg:top-0 border-b lg:border-b-0 border-white/10 lg:border-transparent z-10 mt-8 lg:mt-0">
              
              {/* Center Content */}
              <div className="relative z-10 flex flex-col gap-8 items-center lg:items-start text-center lg:text-left">
                
                {/* Headline & Description */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h1 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight lg:leading-tight">
                   Join the Future of<br/>Smart Event<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Booking.</span>
                  </h1>
                  <p className="mt-10 text-slate-400 text-sm lg:text-base leading-relaxed max-w-sm mx-auto lg:mx-0">
                    Create an account to reserve seats, manage your college events, and get QR-based entry in seconds.
                  </p>
                </motion.div>
              </div>
      </div>

      {/* Right Panel (Form) */}
      <div className="relative w-full lg:w-[55%] flex flex-col items-center justify-center p-6 sm:p-12 min-h-[60vh] lg:min-h-screen">
        
        {/* Radial gradient glow behind form */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-purple-500/12 blur-[100px] sm:blur-[150px] rounded-full pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[520px] relative z-10 bg-white/[0.04] backdrop-blur-[24px] border border-white/[0.08] rounded-[32px] p-8 sm:p-[48px] shadow-[0_0_60px_rgba(124,58,237,0.15)]"
        >
          {error && step === 1 && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
              {error}
            </div>
          )}
          {otpError && step === 2 && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
              {otpError}
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">Create an account</h2>
                  <p className="text-slate-400 text-sm">Fill in your details below to get started.</p>
                </div>

                <form className="space-y-5" onSubmit={handleSignupSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="name" className="text-slate-300 text-sm font-medium">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                        <Input 
                          id="name" 
                          required
                          value={name}
                          onChange={e => setName(e.target.value)}
                          placeholder="John Doe" 
                          className="w-full h-16 bg-white/[0.03] border-white/[0.08] text-white placeholder-slate-500 pl-12 rounded-2xl focus:border-[#A855F7] focus:shadow-[0_0_20px_rgba(168,85,247,0.25)] outline-none transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-300 text-sm font-medium">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                        <Input 
                          id="email" 
                          type="email" 
                          required
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="you@college.edu" 
                          className="w-full h-16 bg-white/[0.03] border-white/[0.08] text-white placeholder-slate-500 pl-12 rounded-2xl focus:border-[#A855F7] focus:shadow-[0_0_20px_rgba(168,85,247,0.25)] outline-none transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-slate-300 text-sm font-medium">Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                        <Input 
                          id="phone" 
                          type="tel" 
                          required
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          placeholder="9876543210" 
                          className="w-full h-16 bg-white/[0.03] border-white/[0.08] text-white placeholder-slate-500 pl-12 rounded-2xl focus:border-[#A855F7] focus:shadow-[0_0_20px_rgba(168,85,247,0.25)] outline-none transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-slate-300 text-sm font-medium">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                        <Input 
                          id="password" 
                          type="password" 
                          required
                          placeholder="Create password" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full h-16 bg-white/[0.03] border-white/[0.08] text-white placeholder-slate-500 pl-12 rounded-2xl focus:border-[#A855F7] focus:shadow-[0_0_20px_rgba(168,85,247,0.25)] outline-none transition-all duration-300"
                        />
                      </div>
                      <div className="pt-1">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((i) => {
                            let color = "bg-white/10";
                            if (strength === 1 && i <= 2) color = "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]";
                            else if (strength === 2 && i <= 3) color = "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]";
                            else if (strength === 3 && i <= 5) color = "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]";
                            return <motion.div key={i} layout className={`h-1 w-full rounded-full transition-colors duration-300 ${color}`} />;
                          })}
                        </div>
                        <div className="flex justify-end mt-1 text-[10px] font-medium uppercase tracking-wider">
                          {strength === 0 && <span className="text-slate-500">None</span>}
                          {strength === 1 && <span className="text-red-400">Weak</span>}
                          {strength === 2 && <span className="text-yellow-400">Medium</span>}
                          {strength === 3 && <span className="text-green-400">Strong</span>}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-slate-300 text-sm font-medium">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                        <Input 
                          id="confirmPassword" 
                          type="password" 
                          required
                          value={confirmPassword}
                          onChange={e => setConfirmPassword(e.target.value)}
                          placeholder="Confirm password" 
                          className="w-full h-16 bg-white/[0.03] border-white/[0.08] text-white placeholder-slate-500 pl-12 rounded-2xl focus:border-[#A855F7] focus:shadow-[0_0_20px_rgba(168,85,247,0.25)] outline-none transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>

                  <Button disabled={loading} className="w-full h-16 mt-4 rounded-2xl text-base font-bold text-white shadow-[0_0_40px_rgba(168,85,247,0.35)] transition-all duration-300 hover:-translate-y-[2px] hover:scale-[1.01] border-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100" style={{ background: 'linear-gradient(90deg, #7C3AED, #A855F7, #D946EF)' }}>
                    {loading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>

                <div className="relative py-8">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase tracking-widest text-slate-500">
                    <span className="bg-[#0f0f11] px-4 rounded-full border border-white/5">Or sign up with</span>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <Button type="button" onClick={() => signIn("google", { callbackUrl: "/dashboard" })} variant="outline" className="w-full h-16 bg-white/[0.03] border-white/[0.08] text-white hover:bg-white/[0.08] hover:text-white rounded-2xl transition-colors">
                    <GoogleIcon />
                    Continue with Google
                  </Button>
                </div>

                <p className="mt-8 text-center text-sm text-slate-400">
                  Already have an account?{" "}
                  <Link href="/signin" className="font-semibold text-purple-400 hover:text-purple-300 transition-colors">
                    Sign in
                  </Link>
                </p>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">Verify Account</h2>
                  <p className="text-slate-400 text-sm">Please enter the verification codes sent to your email and phone.</p>
                </div>

                <div className="space-y-6">
                  {/* Email OTP Card */}
                  <div className={`p-6 rounded-2xl border ${emailVerified ? 'bg-green-500/5 border-green-500/20' : 'bg-white/[0.02] border-white/10'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <Label className="text-slate-300 text-sm font-medium flex items-center gap-2">
                        <Mail className="size-4 text-purple-400" />
                        Email Verification
                      </Label>
                      {emailVerified && <span className="text-xs font-semibold text-green-400 bg-green-400/10 px-2 py-1 rounded-full uppercase tracking-wider">Verified</span>}
                    </div>
                    
                    {!emailVerified && (
                      <>
                        <div className="flex justify-between sm:justify-start sm:gap-2 mb-4">
                          {[0, 1, 2, 3, 4, 5].map((i) => (
                            <input 
                              key={i} 
                              id={`otp-email-${i}`}
                              type="text" 
                              maxLength={1} 
                              value={emailOtp[i]}
                              onChange={(e) => updateOtpState(setEmailOtp, i, e.target.value, emailOtp)}
                              className="w-10 h-12 sm:w-12 sm:h-14 bg-white/[0.03] border border-white/10 rounded-xl text-center text-white text-lg focus:border-[#A855F7] focus:shadow-[0_0_15px_rgba(168,85,247,0.25)] transition-all duration-300 focus:outline-none" 
                              placeholder="-" 
                            />
                          ))}
                        </div>
                        <Button disabled={loading || emailOtp.join("").length !== 6} onClick={() => handleVerifyOtp("EMAIL", emailOtp)} variant="ghost" className="w-full bg-white/5 hover:bg-white/10 text-white border-0">
                          Verify Email
                        </Button>
                      </>
                    )}
                  </div>

                  {/* Phone OTP Card */}
                  <div className={`p-6 rounded-2xl border ${phoneVerified ? 'bg-green-500/5 border-green-500/20' : 'bg-white/[0.02] border-white/10'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <Label className="text-slate-300 text-sm font-medium flex items-center gap-2">
                        <Phone className="size-4 text-purple-400" />
                        Phone Verification
                      </Label>
                      {phoneVerified && <span className="text-xs font-semibold text-green-400 bg-green-400/10 px-2 py-1 rounded-full uppercase tracking-wider">Verified</span>}
                    </div>

                    {!phoneVerified && (
                      <>
                        <div className="flex justify-between sm:justify-start sm:gap-2 mb-4">
                          {[0, 1, 2, 3, 4, 5].map((i) => (
                            <input 
                              key={i} 
                              id={`otp-phone-${i}`}
                              type="text" 
                              maxLength={1} 
                              value={phoneOtp[i]}
                              onChange={(e) => updateOtpState(setPhoneOtp, i, e.target.value, phoneOtp)}
                              className="w-10 h-12 sm:w-12 sm:h-14 bg-white/[0.03] border border-white/10 rounded-xl text-center text-white text-lg focus:border-[#A855F7] focus:shadow-[0_0_15px_rgba(168,85,247,0.25)] transition-all duration-300 focus:outline-none" 
                              placeholder="-" 
                            />
                          ))}
                        </div>
                        <Button disabled={loading || phoneOtp.join("").length !== 6} onClick={() => handleVerifyOtp("PHONE", phoneOtp)} variant="ghost" className="w-full bg-white/5 hover:bg-white/10 text-white border-0">
                          Verify Phone
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {emailVerified && phoneVerified && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 text-center">
                    <div className="inline-flex items-center gap-2 text-green-400 font-bold mb-6">
                      <CheckCircle2 className="size-5" />
                      Account Fully Verified
                    </div>
                    <Button onClick={() => router.push("/signin")} className="w-full h-16 rounded-2xl text-base font-bold text-white shadow-[0_0_40px_rgba(168,85,247,0.35)] transition-all duration-300 hover:-translate-y-[2px] hover:scale-[1.01] border-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100" style={{ background: 'linear-gradient(90deg, #7C3AED, #A855F7, #D946EF)' }}>
                      Continue to Login
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
