"use client";

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AlertCircle } from "lucide-react";

// Define form validation schema
const loginFormSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const AccountPage: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [wrongPassword, setWrongPassword] = useState(false);

  // Set up form with zod validation
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setWrongPassword(false);

    try {
      const response = await fetch("http://localhost:8080/api/public/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
        credentials: "include",
      });

      if (response.ok) {
        setIsAuthenticated(true);
        router.push("/account");
      }

      if (response.status === 401) {
        setWrongPassword(true);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  async function handleLogout() {
    setIsAuthenticated(false);
    router.push("/account");
  }

  return (
    <div className="container mx-auto py-10">
      {isAuthenticated ? (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Your Account</h1>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="text-gray-700">You are currently logged in.</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="w-full"
            >
              Logout
            </Button>
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {wrongPassword && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-medium">
                      Invalid username and/or password
                    </p>
                    <div className="text-sm flex items-center justify-between flex-wrap gap-2">
                      <span>Forgot your password?</span>
                      <Button size="sm" variant="outline">
                        Reset Password
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-gray-600">Don't have an account?</p>
              <Button
                onClick={() => router.push("/registration")}
                variant="outline"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
