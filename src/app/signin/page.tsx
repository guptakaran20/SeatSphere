import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignInPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-180px)] max-w-7xl items-center justify-center px-4 py-14 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md border-slate-200 bg-white shadow-lg">
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Sign in to continue booking your campus events.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <form className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@college.edu" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <Button className="w-full">Sign In</Button>
          </form>

          <div className="relative py-1">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest text-slate-500">
              <span className="bg-white px-2">or</span>
            </div>
          </div>

          <Button variant="outline" className="w-full bg-white">Continue with Google</Button>

          <p className="text-center text-sm text-slate-600">
            No account? <Link href="/signup" className="font-semibold text-sky-600">Create one</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
