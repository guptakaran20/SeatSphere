import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUpPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-180px)] max-w-7xl items-center justify-center px-4 py-14 sm:px-6 lg:px-8">
      <Card className="w-full max-w-lg border-slate-200 bg-white shadow-lg">
        <CardHeader>
          <CardTitle>Create Your SeatSphere Account</CardTitle>
          <CardDescription>Sign up to reserve seats and manage your event experiences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <form className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your full name" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@college.edu" />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" placeholder="+91 9876543210" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Create a strong password" />
            </div>

            <div className="sm:col-span-2 rounded-xl border border-slate-200 bg-sky-50/70 p-3 text-sm text-slate-700">
              OTP verification placeholder: show email/phone OTP input and verify action in final implementation.
            </div>

            <div className="sm:col-span-2">
              <Button className="w-full">Create Account</Button>
            </div>
          </form>

          <div className="relative py-1">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest text-slate-500">
              <span className="bg-white px-2">or</span>
            </div>
          </div>

          <Button variant="outline" className="w-full bg-white">Sign up with Google</Button>

          <p className="text-center text-sm text-slate-600">
            Already have an account? <Link href="/signin" className="font-semibold text-sky-600">Sign in</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
