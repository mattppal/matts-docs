"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { fetchCallback } from "@/lib/utils";

function LoginForm({ mode = "signin" }: { mode?: "signin" | "signup" }) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const priceId = searchParams.get("priceId");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <main className="flex flex-1 items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {mode === "signin" ? "Welcome back" : "Create account"}
          </CardTitle>
          <CardDescription>
            {mode === "signin" 
              ? "Sign in to your account to continue" 
              : "Create a new account to get started"
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                onChange={(e) => setName(e.currentTarget.value)}
                value={name}
                required
                maxLength={50}
                placeholder="Enter your full name"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              type="email"
              autoComplete="email"
              required
              maxLength={50}
              placeholder="Enter your email address"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {mode === "signin" && (
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                >
                  Forgot password?
                </Link>
              )}
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              required
              minLength={8}
              maxLength={100}
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
              {error}
            </div>
          )}

          <div className="space-y-3">
            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
              onClick={async () => {
                if (mode === "signin") {
                  await authClient.signIn.email(
                    {
                      email,
                      password,
                      callbackURL: "/dashboard",
                    },
                    fetchCallback({ setIsPending })
                  );
                } else {
                  await authClient.signUp.email(
                    {
                      email,
                      password,
                      name,
                      callbackURL: "/dashboard",
                    },
                    fetchCallback({ setIsPending })
                  );
                }
              }}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : mode === "signin" ? (
                "Sign in"
              ) : (
                "Create account"
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-fd-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-fd-background px-2 text-fd-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={async () => {
                await authClient.signIn.social({
                  provider: "google",
                  callbackURL: "/dashboard",
                });
              }}
            >
              <svg
                className="mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h240z"
                ></path>
              </svg>
              Continue with Google
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-fd-muted-foreground">
            {mode === "signin" ? "Don't have an account?" : "Already have an account?"}
            {" "}
            <Link
              href={`${mode === "signin" ? "/sign-up" : "/sign-in"}${
                redirect ? `?redirect=${redirect}` : ""
              }${priceId ? `&priceId=${priceId}` : ""}`}
              className="font-medium text-fd-primary hover:text-fd-primary/80 transition-colors"
            >
              {mode === "signin" ? "Sign up" : "Sign in"}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}

export function Login({ mode = "signin" }: { mode?: "signin" | "signup" }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm mode={mode} />
    </Suspense>
  );
}
