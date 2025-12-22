"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  Zap,
  Workflow,
  Globe,
  Shield,
  Clock,
  Users,
  ArrowRight,
  Check,
  Star,
  Github,
  Twitter,
  Mail,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/theme-toggle";

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
              <Workflow className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Vortex</span>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="text-sm hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-sm hover:text-primary transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="text-sm hover:text-primary transition-colors"
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
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
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
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center rounded-full border px-4 py-2 text-sm mb-8">
              <Zap className="mr-2 h-4 w-4 text-primary" />
              Now with AI-powered workflow suggestions
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
              Build powerful workflows
              <span className="text-primary block">without writing code</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Create, automate, and scale your business processes with our
              intuitive visual workflow builder. Connect any API, trigger
              actions, and watch your productivity soar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6"
                onClick={() => setLoginOpen(true)}
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Everything you need to automate
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features that scale with your business, from simple
              automations to complex workflows.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-md hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
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
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Loved by thousands of teams
            </h2>
            <div className="flex justify-center items-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                4.9/5 from 2,341 reviews
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">
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
                      <div className="text-sm text-muted-foreground">
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
      <section id="pricing" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose the plan that's right for your team
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`border-0 shadow-md relative ${plan.popular ? "ring-2 ring-primary" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="text-3xl font-bold">
                    {plan.price}
                    {plan.period && (
                      <span className="text-base font-normal text-muted-foreground">
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
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
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
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to transform your workflow?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of teams already using Vortex to automate their
              processes and boost productivity.
            </p>
            <Button
              size="lg"
              className="text-lg px-8 py-6"
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
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
                  <Workflow className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">Vortex</span>
              </div>
              <p className="text-muted-foreground text-sm">
                The most intuitive workflow automation platform for modern
                teams.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Integrations
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Templates
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 Vortex. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
