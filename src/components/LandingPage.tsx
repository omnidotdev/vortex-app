"use client";

import {
  ArrowRight,
  Check,
  Clock,
  Eye,
  EyeOff,
  Github,
  Globe,
  Loader2,
  Mail,
  Shield,
  Star,
  Twitter,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

import type React from "react";

const features = [
  {
    icon: Workflow,
    title: "Visual Workflow Builder",
    description:
      "Drag and drop interface to create complex automation workflows with ease.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Execute workflows in milliseconds with our optimized runtime engine.",
  },
  {
    icon: Globe,
    title: "API Integrations",
    description:
      "Connect to any REST API, webhook, or third-party service seamlessly.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-grade encryption and compliance with SOC 2 Type II standards.",
  },
  {
    icon: Clock,
    title: "24/7 Monitoring",
    description:
      "Real-time monitoring and alerting to keep your workflows running smoothly.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Share workflows, collaborate in real-time, and manage team permissions.",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO at TechFlow",
    content:
      "Vortex revolutionized our automation. We reduced manual work by 80% in just 2 months.",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format",
  },
  {
    name: "Marcus Rodriguez",
    role: "Operations Director",
    content:
      "The visual workflow builder is incredibly intuitive. Our team was productive from day one.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format",
  },
  {
    name: "Emily Watson",
    role: "Product Manager",
    content:
      "Integration with our existing tools was seamless. Vortex just works beautifully.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for small teams and personal projects",
    features: [
      "Up to 10 workflows",
      "1,000 executions/month",
      "Basic integrations",
      "Community support",
    ],
  },
  {
    name: "Professional",
    price: "$29",
    period: "/month",
    description: "Ideal for growing businesses",
    features: [
      "Unlimited workflows",
      "50,000 executions/month",
      "Advanced integrations",
      "Priority support",
      "Team collaboration",
      "Analytics dashboard",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with specific needs",
    features: [
      "Everything in Professional",
      "Unlimited executions",
      "Custom integrations",
      "Dedicated support",
      "On-premise deployment",
      "Advanced security",
    ],
  },
];

export function LandingPage() {
  const { login, isLoading } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    const success = await login(email, password);

    if (success) {
      toast.success("Welcome to Vortex!");
      setLoginOpen(false);
    } else {
      toast.error("Invalid credentials. Try password: 'demo'");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <Workflow className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">Vortex</span>
          </div>

          <nav className="hidden space-x-8 md:flex">
            <a
              href="#features"
              className="text-sm transition-colors hover:text-primary"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-sm transition-colors hover:text-primary"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="text-sm transition-colors hover:text-primary"
            >
              Pricing
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <DialogRoot
              open={loginOpen}
              onOpenChange={({ open }) => setLoginOpen(open)}
            >
              <DialogTrigger asChild>
                <Button>Sign In</Button>
              </DialogTrigger>
              <DialogBackdrop />
              <DialogPositioner>
                <DialogContent className="sm:max-w-md">
                  <DialogTitle>Welcome back</DialogTitle>
                  <DialogDescription>
                    Sign in to your account to continue building workflows.
                  </DialogDescription>
                  <DialogCloseTrigger />
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="alex@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter 'demo' to sign in"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <p className="text-muted-foreground text-xs">
                        Use password "demo" to try the app
                      </p>
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>
                </DialogContent>
              </DialogPositioner>
            </DialogRoot>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 inline-flex items-center rounded-full border px-4 py-2 text-sm">
              <Zap className="mr-2 h-4 w-4 text-primary" />
              Now with AI-powered workflow suggestions
            </div>

            <h1 className="mb-6 font-bold text-4xl tracking-tight lg:text-6xl">
              Build powerful workflows
              <span className="block text-primary">without writing code</span>
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-muted-foreground text-xl">
              Create, automate, and scale your business processes with our
              intuitive visual workflow builder. Connect any API, trigger
              actions, and watch your productivity soar.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="px-8 py-6 text-lg"
                onClick={() => setLoginOpen(true)}
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-3xl lg:text-4xl">
              Everything you need to automate
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground text-xl">
              Powerful features that scale with your business, from simple
              automations to complex workflows.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-md transition-shadow hover:shadow-lg"
              >
                <CardHeader>
                  <feature.icon className="mb-4 h-12 w-12 text-primary" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-3xl lg:text-4xl">
              Loved by thousands of teams
            </h2>
            <div className="mb-4 flex items-center justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="ml-2 text-muted-foreground text-sm">
                4.9/5 from 2,341 reviews
              </span>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <p className="mb-4 text-muted-foreground">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-muted-foreground text-sm">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-3xl lg:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="text-muted-foreground text-xl">
              Choose the plan that's right for your team
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative border-0 shadow-md ${plan.popular ? "ring-2 ring-primary" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
                    <span className="rounded-full bg-primary px-3 py-1 font-medium text-primary-foreground text-sm">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="font-bold text-3xl">
                    {plan.price}
                    {plan.period && (
                      <span className="font-normal text-base text-muted-foreground">
                        {plan.period}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center space-x-3"
                      >
                        <Check className="h-5 w-5 shrink-0 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => setLoginOpen(true)}
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 font-bold text-3xl lg:text-4xl">
              Ready to transform your workflow?
            </h2>
            <p className="mb-8 text-muted-foreground text-xl">
              Join thousands of teams already using Vortex to automate their
              processes and boost productivity.
            </p>
            <Button
              size="lg"
              className="px-8 py-6 text-lg"
              onClick={() => setLoginOpen(true)}
            >
              Start Building Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                  <Workflow className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl">Vortex</span>
              </div>
              <p className="text-muted-foreground text-sm">
                The most intuitive workflow automation platform for modern
                teams.
              </p>
            </div>

            <div>
              <h3 className="mb-4 font-medium">Product</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>
                  <a
                    href="#"
                    className="transition-colors hover:text-foreground"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors hover:text-foreground"
                  >
                    Integrations
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors hover:text-foreground"
                  >
                    Templates
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors hover:text-foreground"
                  >
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-medium">Company</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>
                  <a
                    href="#"
                    className="transition-colors hover:text-foreground"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors hover:text-foreground"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors hover:text-foreground"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors hover:text-foreground"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-medium">Connect</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t pt-8 text-center text-muted-foreground text-sm">
            © 2024 Vortex. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
