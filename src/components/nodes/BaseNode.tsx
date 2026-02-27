import { Trash2 } from "lucide-react";
import { memo } from "react";
import { Handle } from "reactflow";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { Position } from "reactflow";

/** Node color theme configuration */
interface NodeTheme {
  border: string;
  bg: string;
  iconBg: string;
  iconText: string;
  accent: string;
  handleColor: string;
  glow?: string;
}

/** Pre-defined node themes - gemstone-inspired with glows */
export const nodeThemes = {
  // Sapphire - triggers
  trigger: {
    border: "border-blue-300/60 dark:border-blue-600/40",
    bg: "bg-gradient-to-br from-blue-50 via-blue-50/80 to-sky-50 dark:from-blue-950 dark:via-blue-950/80 dark:to-sky-950",
    iconBg:
      "bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700",
    iconText: "text-white",
    accent: "text-blue-600 dark:text-blue-400",
    handleColor: "!bg-blue-500",
    glow: "shadow-[0_0_15px_rgba(59,130,246,0.15)] dark:shadow-[0_0_20px_rgba(59,130,246,0.25)]",
  },
  // Amber/Topaz - actions
  action: {
    border: "border-amber-300/60 dark:border-amber-600/40",
    bg: "bg-gradient-to-br from-amber-50 via-orange-50/50 to-yellow-50 dark:from-amber-950 dark:via-orange-950/50 dark:to-yellow-950",
    iconBg:
      "bg-gradient-to-br from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600",
    iconText: "text-white",
    accent: "text-amber-600 dark:text-amber-400",
    handleColor: "!bg-amber-500",
    glow: "shadow-[0_0_15px_rgba(245,158,11,0.15)] dark:shadow-[0_0_20px_rgba(245,158,11,0.25)]",
  },
  // Citrine - conditions
  condition: {
    border: "border-yellow-300/60 dark:border-yellow-600/40",
    bg: "bg-gradient-to-br from-yellow-50 via-amber-50/50 to-orange-50 dark:from-yellow-950 dark:via-amber-950/50 dark:to-orange-950",
    iconBg:
      "bg-gradient-to-br from-yellow-500 to-amber-500 dark:from-yellow-600 dark:to-amber-600",
    iconText: "text-white",
    accent: "text-yellow-600 dark:text-yellow-400",
    handleColor: "!bg-yellow-500",
    glow: "shadow-[0_0_15px_rgba(234,179,8,0.15)] dark:shadow-[0_0_20px_rgba(234,179,8,0.25)]",
  },
  // Emerald - plugins/integrations
  plugin: {
    border: "border-emerald-300/60 dark:border-emerald-600/40",
    bg: "bg-gradient-to-br from-emerald-50 via-green-50/50 to-teal-50 dark:from-emerald-950 dark:via-green-950/50 dark:to-teal-950",
    iconBg:
      "bg-gradient-to-br from-emerald-500 to-green-600 dark:from-emerald-600 dark:to-green-700",
    iconText: "text-white",
    accent: "text-emerald-600 dark:text-emerald-400",
    handleColor: "!bg-emerald-500",
    glow: "shadow-[0_0_15px_rgba(16,185,129,0.15)] dark:shadow-[0_0_20px_rgba(16,185,129,0.25)]",
  },
  // Aquamarine - delay/timing
  delay: {
    border: "border-cyan-300/60 dark:border-cyan-600/40",
    bg: "bg-gradient-to-br from-cyan-50 via-sky-50/50 to-blue-50 dark:from-cyan-950 dark:via-sky-950/50 dark:to-blue-950",
    iconBg:
      "bg-gradient-to-br from-cyan-500 to-sky-500 dark:from-cyan-600 dark:to-sky-600",
    iconText: "text-white",
    accent: "text-cyan-600 dark:text-cyan-400",
    handleColor: "!bg-cyan-500",
    glow: "shadow-[0_0_15px_rgba(6,182,212,0.15)] dark:shadow-[0_0_20px_rgba(6,182,212,0.25)]",
  },
  // Tanzanite - loops
  loop: {
    border: "border-indigo-300/60 dark:border-indigo-600/40",
    bg: "bg-gradient-to-br from-indigo-50 via-violet-50/50 to-purple-50 dark:from-indigo-950 dark:via-violet-950/50 dark:to-purple-950",
    iconBg:
      "bg-gradient-to-br from-indigo-500 to-violet-500 dark:from-indigo-600 dark:to-violet-600",
    iconText: "text-white",
    accent: "text-indigo-600 dark:text-indigo-400",
    handleColor: "!bg-indigo-500",
    glow: "shadow-[0_0_15px_rgba(99,102,241,0.15)] dark:shadow-[0_0_20px_rgba(99,102,241,0.25)]",
  },
  // Amethyst - parallel
  parallel: {
    border: "border-violet-300/60 dark:border-violet-600/40",
    bg: "bg-gradient-to-br from-violet-50 via-purple-50/50 to-fuchsia-50 dark:from-violet-950 dark:via-purple-950/50 dark:to-fuchsia-950",
    iconBg:
      "bg-gradient-to-br from-violet-500 to-purple-600 dark:from-violet-600 dark:to-purple-700",
    iconText: "text-white",
    accent: "text-violet-600 dark:text-violet-400",
    handleColor: "!bg-violet-500",
    glow: "shadow-[0_0_15px_rgba(139,92,246,0.15)] dark:shadow-[0_0_20px_rgba(139,92,246,0.25)]",
  },
  // Fire Opal - gate
  gate: {
    border: "border-orange-300/60 dark:border-orange-600/40",
    bg: "bg-gradient-to-br from-orange-50 via-red-50/30 to-amber-50 dark:from-orange-950 dark:via-red-950/30 dark:to-amber-950",
    iconBg:
      "bg-gradient-to-br from-orange-500 to-red-500 dark:from-orange-600 dark:to-red-600",
    iconText: "text-white",
    accent: "text-orange-600 dark:text-orange-400",
    handleColor: "!bg-orange-500",
    glow: "shadow-[0_0_15px_rgba(249,115,22,0.15)] dark:shadow-[0_0_20px_rgba(249,115,22,0.25)]",
  },
  // Purple Sapphire - switch
  switch: {
    border: "border-purple-300/60 dark:border-purple-600/40",
    bg: "bg-gradient-to-br from-purple-50 via-fuchsia-50/50 to-pink-50 dark:from-purple-950 dark:via-fuchsia-950/50 dark:to-pink-950",
    iconBg:
      "bg-gradient-to-br from-purple-500 to-fuchsia-500 dark:from-purple-600 dark:to-fuchsia-600",
    iconText: "text-white",
    accent: "text-purple-600 dark:text-purple-400",
    handleColor: "!bg-purple-500",
    glow: "shadow-[0_0_15px_rgba(168,85,247,0.15)] dark:shadow-[0_0_20px_rgba(168,85,247,0.25)]",
  },
  // Ruby - MCP
  mcp: {
    border: "border-rose-300/60 dark:border-rose-600/40",
    bg: "bg-gradient-to-br from-rose-50 via-pink-50/50 to-red-50 dark:from-rose-950 dark:via-pink-950/50 dark:to-red-950",
    iconBg:
      "bg-gradient-to-br from-rose-500 to-red-500 dark:from-rose-600 dark:to-red-600",
    iconText: "text-white",
    accent: "text-rose-600 dark:text-rose-400",
    handleColor: "!bg-rose-500",
    glow: "shadow-[0_0_15px_rgba(244,63,94,0.15)] dark:shadow-[0_0_20px_rgba(244,63,94,0.25)]",
  },
  // Pink Tourmaline - LLM/AI
  llm: {
    border: "border-pink-300/60 dark:border-pink-600/40",
    bg: "bg-gradient-to-br from-pink-50 via-rose-50/50 to-fuchsia-50 dark:from-pink-950 dark:via-rose-950/50 dark:to-fuchsia-950",
    iconBg:
      "bg-gradient-to-br from-pink-500 to-rose-500 dark:from-pink-600 dark:to-rose-600",
    iconText: "text-white",
    accent: "text-pink-600 dark:text-pink-400",
    handleColor: "!bg-pink-500",
    glow: "shadow-[0_0_15px_rgba(236,72,153,0.15)] dark:shadow-[0_0_20px_rgba(236,72,153,0.25)]",
  },
  // Obsidian - code
  code: {
    border: "border-slate-300/60 dark:border-slate-600/40",
    bg: "bg-gradient-to-br from-slate-50 via-gray-50/50 to-zinc-50 dark:from-slate-950 dark:via-gray-950/50 dark:to-zinc-950",
    iconBg:
      "bg-gradient-to-br from-slate-600 to-slate-700 dark:from-slate-500 dark:to-slate-600",
    iconText: "text-white",
    accent: "text-slate-600 dark:text-slate-400",
    handleColor: "!bg-slate-500",
    glow: "shadow-[0_0_15px_rgba(100,116,139,0.1)] dark:shadow-[0_0_20px_rgba(100,116,139,0.15)]",
  },
  // Jade - database
  database: {
    border: "border-teal-300/60 dark:border-teal-600/40",
    bg: "bg-gradient-to-br from-teal-50 via-emerald-50/50 to-cyan-50 dark:from-teal-950 dark:via-emerald-950/50 dark:to-cyan-950",
    iconBg:
      "bg-gradient-to-br from-teal-500 to-emerald-500 dark:from-teal-600 dark:to-emerald-600",
    iconText: "text-white",
    accent: "text-teal-600 dark:text-teal-400",
    handleColor: "!bg-teal-500",
    glow: "shadow-[0_0_15px_rgba(20,184,166,0.15)] dark:shadow-[0_0_20px_rgba(20,184,166,0.25)]",
  },
  // Sapphire variant - subworkflow
  subworkflow: {
    border: "border-blue-300/60 dark:border-blue-600/40",
    bg: "bg-gradient-to-br from-blue-50 via-indigo-50/50 to-violet-50 dark:from-blue-950 dark:via-indigo-950/50 dark:to-violet-950",
    iconBg:
      "bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500",
    iconText: "text-white",
    accent: "text-blue-600 dark:text-blue-400",
    handleColor: "!bg-blue-600",
    glow: "shadow-[0_0_15px_rgba(37,99,235,0.15)] dark:shadow-[0_0_20px_rgba(37,99,235,0.25)]",
  },
  // Aquamarine variant - wait
  wait: {
    border: "border-cyan-300/60 dark:border-cyan-600/40",
    bg: "bg-gradient-to-br from-cyan-50 via-teal-50/50 to-emerald-50 dark:from-cyan-950 dark:via-teal-950/50 dark:to-emerald-950",
    iconBg:
      "bg-gradient-to-br from-cyan-500 to-teal-500 dark:from-cyan-600 dark:to-teal-600",
    iconText: "text-white",
    accent: "text-cyan-600 dark:text-cyan-400",
    handleColor: "!bg-cyan-500",
    glow: "shadow-[0_0_15px_rgba(6,182,212,0.15)] dark:shadow-[0_0_20px_rgba(6,182,212,0.25)]",
  },
  // Peridot - event
  event: {
    border: "border-lime-300/60 dark:border-lime-600/40",
    bg: "bg-gradient-to-br from-lime-50 via-green-50/50 to-emerald-50 dark:from-lime-950 dark:via-green-950/50 dark:to-emerald-950",
    iconBg:
      "bg-gradient-to-br from-lime-500 to-green-500 dark:from-lime-600 dark:to-green-600",
    iconText: "text-white",
    accent: "text-lime-600 dark:text-lime-400",
    handleColor: "!bg-lime-500",
    glow: "shadow-[0_0_15px_rgba(132,204,22,0.15)] dark:shadow-[0_0_20px_rgba(132,204,22,0.25)]",
  },
  // Kunzite - aggregate
  aggregate: {
    border: "border-fuchsia-300/60 dark:border-fuchsia-600/40",
    bg: "bg-gradient-to-br from-fuchsia-50 via-pink-50/50 to-purple-50 dark:from-fuchsia-950 dark:via-pink-950/50 dark:to-purple-950",
    iconBg:
      "bg-gradient-to-br from-fuchsia-500 to-pink-500 dark:from-fuchsia-600 dark:to-pink-600",
    iconText: "text-white",
    accent: "text-fuchsia-600 dark:text-fuchsia-400",
    handleColor: "!bg-fuchsia-500",
    glow: "shadow-[0_0_15px_rgba(217,70,239,0.15)] dark:shadow-[0_0_20px_rgba(217,70,239,0.25)]",
  },
  // Amber variant - cache
  cache: {
    border: "border-amber-300/60 dark:border-amber-600/40",
    bg: "bg-gradient-to-br from-amber-50 via-yellow-50/50 to-orange-50 dark:from-amber-950 dark:via-yellow-950/50 dark:to-orange-950",
    iconBg:
      "bg-gradient-to-br from-amber-500 to-yellow-500 dark:from-amber-600 dark:to-yellow-600",
    iconText: "text-white",
    accent: "text-amber-600 dark:text-amber-400",
    handleColor: "!bg-amber-500",
    glow: "shadow-[0_0_15px_rgba(245,158,11,0.15)] dark:shadow-[0_0_20px_rgba(245,158,11,0.25)]",
  },
  // Indigo - merge (deep blue-violet)
  merge: {
    border: "border-indigo-300/60 dark:border-indigo-600/40",
    bg: "bg-gradient-to-br from-indigo-50 via-violet-50/50 to-blue-50 dark:from-indigo-950 dark:via-violet-950/50 dark:to-blue-950",
    iconBg:
      "bg-gradient-to-br from-indigo-500 to-violet-500 dark:from-indigo-600 dark:to-violet-600",
    iconText: "text-white",
    accent: "text-indigo-600 dark:text-indigo-400",
    handleColor: "!bg-indigo-500",
    glow: "shadow-[0_0_15px_rgba(99,102,241,0.15)] dark:shadow-[0_0_20px_rgba(99,102,241,0.25)]",
  },
  // Alexandrite - split (violet-purple)
  split: {
    border: "border-violet-300/60 dark:border-violet-600/40",
    bg: "bg-gradient-to-br from-violet-50 via-purple-50/50 to-indigo-50 dark:from-violet-950 dark:via-purple-950/50 dark:to-indigo-950",
    iconBg:
      "bg-gradient-to-br from-violet-500 to-purple-500 dark:from-violet-600 dark:to-purple-600",
    iconText: "text-white",
    accent: "text-violet-600 dark:text-violet-400",
    handleColor: "!bg-violet-500",
    glow: "shadow-[0_0_15px_rgba(139,92,246,0.15)] dark:shadow-[0_0_20px_rgba(139,92,246,0.25)]",
  },
  // Rhodolite - filter (fuchsia-pink)
  filter: {
    border: "border-fuchsia-300/60 dark:border-fuchsia-600/40",
    bg: "bg-gradient-to-br from-fuchsia-50 via-pink-50/50 to-purple-50 dark:from-fuchsia-950 dark:via-pink-950/50 dark:to-purple-950",
    iconBg:
      "bg-gradient-to-br from-fuchsia-500 to-pink-500 dark:from-fuchsia-600 dark:to-pink-600",
    iconText: "text-white",
    accent: "text-fuchsia-600 dark:text-fuchsia-400",
    handleColor: "!bg-fuchsia-500",
    glow: "shadow-[0_0_15px_rgba(217,70,239,0.15)] dark:shadow-[0_0_20px_rgba(217,70,239,0.25)]",
  },
  // Moonstone - set (gray-slate)
  set: {
    border: "border-slate-300/60 dark:border-slate-600/40",
    bg: "bg-gradient-to-br from-slate-50 via-gray-50/50 to-zinc-50 dark:from-slate-950 dark:via-gray-950/50 dark:to-zinc-950",
    iconBg:
      "bg-gradient-to-br from-slate-500 to-gray-500 dark:from-slate-600 dark:to-gray-600",
    iconText: "text-white",
    accent: "text-slate-600 dark:text-slate-400",
    handleColor: "!bg-slate-500",
    glow: "shadow-[0_0_15px_rgba(100,116,139,0.15)] dark:shadow-[0_0_20px_rgba(100,116,139,0.25)]",
  },
  // Garnet - error (red)
  error: {
    border: "border-red-300/60 dark:border-red-600/40",
    bg: "bg-gradient-to-br from-red-50 via-rose-50/50 to-pink-50 dark:from-red-950 dark:via-rose-950/50 dark:to-pink-950",
    iconBg:
      "bg-gradient-to-br from-red-500 to-rose-500 dark:from-red-600 dark:to-rose-600",
    iconText: "text-white",
    accent: "text-red-600 dark:text-red-400",
    handleColor: "!bg-red-500",
    glow: "shadow-[0_0_15px_rgba(239,68,68,0.15)] dark:shadow-[0_0_20px_rgba(239,68,68,0.25)]",
  },
  // Carnelian - retry (orange-red)
  retry: {
    border: "border-orange-300/60 dark:border-orange-600/40",
    bg: "bg-gradient-to-br from-orange-50 via-red-50/30 to-amber-50 dark:from-orange-950 dark:via-red-950/30 dark:to-amber-950",
    iconBg:
      "bg-gradient-to-br from-orange-500 to-red-500 dark:from-orange-600 dark:to-red-600",
    iconText: "text-white",
    accent: "text-orange-600 dark:text-orange-400",
    handleColor: "!bg-orange-500",
    glow: "shadow-[0_0_15px_rgba(249,115,22,0.15)] dark:shadow-[0_0_20px_rgba(249,115,22,0.25)]",
  },
  // Citrine variant - timeout (yellow-amber)
  timeout: {
    border: "border-yellow-300/60 dark:border-yellow-600/40",
    bg: "bg-gradient-to-br from-yellow-50 via-amber-50/50 to-orange-50 dark:from-yellow-950 dark:via-amber-950/50 dark:to-orange-950",
    iconBg:
      "bg-gradient-to-br from-yellow-500 to-amber-500 dark:from-yellow-600 dark:to-amber-600",
    iconText: "text-white",
    accent: "text-yellow-600 dark:text-yellow-400",
    handleColor: "!bg-yellow-500",
    glow: "shadow-[0_0_15px_rgba(234,179,8,0.15)] dark:shadow-[0_0_20px_rgba(234,179,8,0.25)]",
  },
  // Turquoise - email (sky-cyan)
  email: {
    border: "border-sky-300/60 dark:border-sky-600/40",
    bg: "bg-gradient-to-br from-sky-50 via-cyan-50/50 to-blue-50 dark:from-sky-950 dark:via-cyan-950/50 dark:to-blue-950",
    iconBg:
      "bg-gradient-to-br from-sky-500 to-cyan-500 dark:from-sky-600 dark:to-cyan-600",
    iconText: "text-white",
    accent: "text-sky-600 dark:text-sky-400",
    handleColor: "!bg-sky-500",
    glow: "shadow-[0_0_15px_rgba(14,165,233,0.15)] dark:shadow-[0_0_20px_rgba(14,165,233,0.25)]",
  },
  // Chrysoprase - webhookResponse (lime-green)
  webhookResponse: {
    border: "border-lime-300/60 dark:border-lime-600/40",
    bg: "bg-gradient-to-br from-lime-50 via-green-50/50 to-emerald-50 dark:from-lime-950 dark:via-green-950/50 dark:to-emerald-950",
    iconBg:
      "bg-gradient-to-br from-lime-500 to-green-500 dark:from-lime-600 dark:to-green-600",
    iconText: "text-white",
    accent: "text-lime-600 dark:text-lime-400",
    handleColor: "!bg-lime-500",
    glow: "shadow-[0_0_15px_rgba(132,204,22,0.15)] dark:shadow-[0_0_20px_rgba(132,204,22,0.25)]",
  },
  // Tiger's Eye - file (stone-brown)
  file: {
    border: "border-stone-300/60 dark:border-stone-600/40",
    bg: "bg-gradient-to-br from-stone-50 via-amber-50/30 to-orange-50/30 dark:from-stone-950 dark:via-amber-950/30 dark:to-orange-950/30",
    iconBg:
      "bg-gradient-to-br from-stone-500 to-amber-600 dark:from-stone-600 dark:to-amber-700",
    iconText: "text-white",
    accent: "text-stone-600 dark:text-stone-400",
    handleColor: "!bg-stone-500",
    glow: "shadow-[0_0_15px_rgba(120,113,108,0.15)] dark:shadow-[0_0_20px_rgba(120,113,108,0.25)]",
  },
  // Morganite - queue (pink-rose)
  queue: {
    border: "border-pink-300/60 dark:border-pink-600/40",
    bg: "bg-gradient-to-br from-pink-50 via-rose-50/50 to-fuchsia-50 dark:from-pink-950 dark:via-rose-950/50 dark:to-fuchsia-950",
    iconBg:
      "bg-gradient-to-br from-pink-500 to-rose-500 dark:from-pink-600 dark:to-rose-600",
    iconText: "text-white",
    accent: "text-pink-600 dark:text-pink-400",
    handleColor: "!bg-pink-500",
    glow: "shadow-[0_0_15px_rgba(236,72,153,0.15)] dark:shadow-[0_0_20px_rgba(236,72,153,0.25)]",
  },
  // Tsavorite - embedding (emerald-green)
  embedding: {
    border: "border-emerald-300/60 dark:border-emerald-600/40",
    bg: "bg-gradient-to-br from-emerald-50 via-green-50/50 to-teal-50 dark:from-emerald-950 dark:via-green-950/50 dark:to-teal-950",
    iconBg:
      "bg-gradient-to-br from-emerald-500 to-green-500 dark:from-emerald-600 dark:to-green-600",
    iconText: "text-white",
    accent: "text-emerald-600 dark:text-emerald-400",
    handleColor: "!bg-emerald-500",
    glow: "shadow-[0_0_15px_rgba(16,185,129,0.15)] dark:shadow-[0_0_20px_rgba(16,185,129,0.25)]",
  },
  // Tourmaline - vectorSearch (teal-cyan)
  vectorSearch: {
    border: "border-teal-300/60 dark:border-teal-600/40",
    bg: "bg-gradient-to-br from-teal-50 via-cyan-50/50 to-emerald-50 dark:from-teal-950 dark:via-cyan-950/50 dark:to-emerald-950",
    iconBg:
      "bg-gradient-to-br from-teal-500 to-cyan-500 dark:from-teal-600 dark:to-cyan-600",
    iconText: "text-white",
    accent: "text-teal-600 dark:text-teal-400",
    handleColor: "!bg-teal-500",
    glow: "shadow-[0_0_15px_rgba(20,184,166,0.15)] dark:shadow-[0_0_20px_rgba(20,184,166,0.25)]",
  },
  // Chalcedony - log (gray-blue)
  log: {
    border: "border-gray-300/60 dark:border-gray-600/40",
    bg: "bg-gradient-to-br from-gray-50 via-slate-50/50 to-blue-50/30 dark:from-gray-950 dark:via-slate-950/50 dark:to-blue-950/30",
    iconBg:
      "bg-gradient-to-br from-gray-500 to-slate-500 dark:from-gray-600 dark:to-slate-600",
    iconText: "text-white",
    accent: "text-gray-600 dark:text-gray-400",
    handleColor: "!bg-gray-500",
    glow: "shadow-[0_0_15px_rgba(107,114,128,0.15)] dark:shadow-[0_0_20px_rgba(107,114,128,0.25)]",
  },
  // Spinel - assert (rose-red)
  assert: {
    border: "border-rose-300/60 dark:border-rose-600/40",
    bg: "bg-gradient-to-br from-rose-50 via-red-50/50 to-pink-50 dark:from-rose-950 dark:via-red-950/50 dark:to-pink-950",
    iconBg:
      "bg-gradient-to-br from-rose-500 to-red-500 dark:from-rose-600 dark:to-red-600",
    iconText: "text-white",
    accent: "text-rose-600 dark:text-rose-400",
    handleColor: "!bg-rose-500",
    glow: "shadow-[0_0_15px_rgba(244,63,94,0.15)] dark:shadow-[0_0_20px_rgba(244,63,94,0.25)]",
  },
  // Larimar - sleep (light blue-sky)
  sleep: {
    border: "border-sky-300/60 dark:border-sky-600/40",
    bg: "bg-gradient-to-br from-sky-50 via-blue-50/50 to-cyan-50 dark:from-sky-950 dark:via-blue-950/50 dark:to-cyan-950",
    iconBg:
      "bg-gradient-to-br from-sky-500 to-blue-500 dark:from-sky-600 dark:to-blue-600",
    iconText: "text-white",
    accent: "text-sky-600 dark:text-sky-400",
    handleColor: "!bg-sky-500",
    glow: "shadow-[0_0_15px_rgba(14,165,233,0.15)] dark:shadow-[0_0_20px_rgba(14,165,233,0.25)]",
  },
  // Additional core nodes - Data Transformation
  map: {
    border: "border-sky-300/60 dark:border-sky-600/40",
    bg: "bg-gradient-to-br from-sky-50 via-cyan-50/50 to-blue-50 dark:from-sky-950 dark:via-cyan-950/50 dark:to-blue-950",
    iconBg:
      "bg-gradient-to-br from-sky-500 to-cyan-500 dark:from-sky-600 dark:to-cyan-600",
    iconText: "text-white",
    accent: "text-sky-600 dark:text-sky-400",
    handleColor: "!bg-sky-500",
    glow: "shadow-[0_0_15px_rgba(14,165,233,0.15)] dark:shadow-[0_0_20px_rgba(14,165,233,0.25)]",
  },
  reduce: {
    border: "border-blue-300/60 dark:border-blue-600/40",
    bg: "bg-gradient-to-br from-blue-50 via-sky-50/50 to-indigo-50 dark:from-blue-950 dark:via-sky-950/50 dark:to-indigo-950",
    iconBg:
      "bg-gradient-to-br from-blue-500 to-sky-500 dark:from-blue-600 dark:to-sky-600",
    iconText: "text-white",
    accent: "text-blue-600 dark:text-blue-400",
    handleColor: "!bg-blue-500",
    glow: "shadow-[0_0_15px_rgba(59,130,246,0.15)] dark:shadow-[0_0_20px_rgba(59,130,246,0.25)]",
  },
  sort: {
    border: "border-violet-300/60 dark:border-violet-600/40",
    bg: "bg-gradient-to-br from-violet-50 via-purple-50/50 to-indigo-50 dark:from-violet-950 dark:via-purple-950/50 dark:to-indigo-950",
    iconBg:
      "bg-gradient-to-br from-violet-500 to-purple-500 dark:from-violet-600 dark:to-purple-600",
    iconText: "text-white",
    accent: "text-violet-600 dark:text-violet-400",
    handleColor: "!bg-violet-500",
    glow: "shadow-[0_0_15px_rgba(139,92,246,0.15)] dark:shadow-[0_0_20px_rgba(139,92,246,0.25)]",
  },
  unique: {
    border: "border-purple-300/60 dark:border-purple-600/40",
    bg: "bg-gradient-to-br from-purple-50 via-fuchsia-50/50 to-violet-50 dark:from-purple-950 dark:via-fuchsia-950/50 dark:to-violet-950",
    iconBg:
      "bg-gradient-to-br from-purple-500 to-fuchsia-500 dark:from-purple-600 dark:to-fuchsia-600",
    iconText: "text-white",
    accent: "text-purple-600 dark:text-purple-400",
    handleColor: "!bg-purple-500",
    glow: "shadow-[0_0_15px_rgba(168,85,247,0.15)] dark:shadow-[0_0_20px_rgba(168,85,247,0.25)]",
  },
  template: {
    border: "border-cyan-300/60 dark:border-cyan-600/40",
    bg: "bg-gradient-to-br from-cyan-50 via-teal-50/50 to-sky-50 dark:from-cyan-950 dark:via-teal-950/50 dark:to-sky-950",
    iconBg:
      "bg-gradient-to-br from-cyan-500 to-teal-500 dark:from-cyan-600 dark:to-teal-600",
    iconText: "text-white",
    accent: "text-cyan-600 dark:text-cyan-400",
    handleColor: "!bg-cyan-500",
    glow: "shadow-[0_0_15px_rgba(6,182,212,0.15)] dark:shadow-[0_0_20px_rgba(6,182,212,0.25)]",
  },
  // Additional core nodes - AI/ML
  prompt: {
    border: "border-pink-300/60 dark:border-pink-600/40",
    bg: "bg-gradient-to-br from-pink-50 via-rose-50/50 to-fuchsia-50 dark:from-pink-950 dark:via-rose-950/50 dark:to-fuchsia-950",
    iconBg:
      "bg-gradient-to-br from-pink-500 to-rose-500 dark:from-pink-600 dark:to-rose-600",
    iconText: "text-white",
    accent: "text-pink-600 dark:text-pink-400",
    handleColor: "!bg-pink-500",
    glow: "shadow-[0_0_15px_rgba(236,72,153,0.15)] dark:shadow-[0_0_20px_rgba(236,72,153,0.25)]",
  },
  chat: {
    border: "border-fuchsia-300/60 dark:border-fuchsia-600/40",
    bg: "bg-gradient-to-br from-fuchsia-50 via-pink-50/50 to-purple-50 dark:from-fuchsia-950 dark:via-pink-950/50 dark:to-purple-950",
    iconBg:
      "bg-gradient-to-br from-fuchsia-500 to-pink-500 dark:from-fuchsia-600 dark:to-pink-600",
    iconText: "text-white",
    accent: "text-fuchsia-600 dark:text-fuchsia-400",
    handleColor: "!bg-fuchsia-500",
    glow: "shadow-[0_0_15px_rgba(217,70,239,0.15)] dark:shadow-[0_0_20px_rgba(217,70,239,0.25)]",
  },
  summarize: {
    border: "border-rose-300/60 dark:border-rose-600/40",
    bg: "bg-gradient-to-br from-rose-50 via-pink-50/50 to-red-50 dark:from-rose-950 dark:via-pink-950/50 dark:to-red-950",
    iconBg:
      "bg-gradient-to-br from-rose-500 to-pink-500 dark:from-rose-600 dark:to-pink-600",
    iconText: "text-white",
    accent: "text-rose-600 dark:text-rose-400",
    handleColor: "!bg-rose-500",
    glow: "shadow-[0_0_15px_rgba(244,63,94,0.15)] dark:shadow-[0_0_20px_rgba(244,63,94,0.25)]",
  },
  classify: {
    border: "border-orange-300/60 dark:border-orange-600/40",
    bg: "bg-gradient-to-br from-orange-50 via-amber-50/50 to-yellow-50 dark:from-orange-950 dark:via-amber-950/50 dark:to-yellow-950",
    iconBg:
      "bg-gradient-to-br from-orange-500 to-amber-500 dark:from-orange-600 dark:to-amber-600",
    iconText: "text-white",
    accent: "text-orange-600 dark:text-orange-400",
    handleColor: "!bg-orange-500",
    glow: "shadow-[0_0_15px_rgba(249,115,22,0.15)] dark:shadow-[0_0_20px_rgba(249,115,22,0.25)]",
  },
  // Additional core nodes - Human-in-the-Loop
  approval: {
    border: "border-green-300/60 dark:border-green-600/40",
    bg: "bg-gradient-to-br from-green-50 via-emerald-50/50 to-teal-50 dark:from-green-950 dark:via-emerald-950/50 dark:to-teal-950",
    iconBg:
      "bg-gradient-to-br from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600",
    iconText: "text-white",
    accent: "text-green-600 dark:text-green-400",
    handleColor: "!bg-green-500",
    glow: "shadow-[0_0_15px_rgba(34,197,94,0.15)] dark:shadow-[0_0_20px_rgba(34,197,94,0.25)]",
  },
  input: {
    border: "border-teal-300/60 dark:border-teal-600/40",
    bg: "bg-gradient-to-br from-teal-50 via-cyan-50/50 to-emerald-50 dark:from-teal-950 dark:via-cyan-950/50 dark:to-emerald-950",
    iconBg:
      "bg-gradient-to-br from-teal-500 to-cyan-500 dark:from-teal-600 dark:to-cyan-600",
    iconText: "text-white",
    accent: "text-teal-600 dark:text-teal-400",
    handleColor: "!bg-teal-500",
    glow: "shadow-[0_0_15px_rgba(20,184,166,0.15)] dark:shadow-[0_0_20px_rgba(20,184,166,0.25)]",
  },
  notification: {
    border: "border-amber-300/60 dark:border-amber-600/40",
    bg: "bg-gradient-to-br from-amber-50 via-yellow-50/50 to-orange-50 dark:from-amber-950 dark:via-yellow-950/50 dark:to-orange-950",
    iconBg:
      "bg-gradient-to-br from-amber-500 to-yellow-500 dark:from-amber-600 dark:to-yellow-600",
    iconText: "text-white",
    accent: "text-amber-600 dark:text-amber-400",
    handleColor: "!bg-amber-500",
    glow: "shadow-[0_0_15px_rgba(245,158,11,0.15)] dark:shadow-[0_0_20px_rgba(245,158,11,0.25)]",
  },
  // Additional core nodes - Utility
  parse: {
    border: "border-slate-300/60 dark:border-slate-600/40",
    bg: "bg-gradient-to-br from-slate-50 via-gray-50/50 to-zinc-50 dark:from-slate-950 dark:via-gray-950/50 dark:to-zinc-950",
    iconBg:
      "bg-gradient-to-br from-slate-500 to-gray-500 dark:from-slate-600 dark:to-gray-600",
    iconText: "text-white",
    accent: "text-slate-600 dark:text-slate-400",
    handleColor: "!bg-slate-500",
    glow: "shadow-[0_0_15px_rgba(100,116,139,0.15)] dark:shadow-[0_0_20px_rgba(100,116,139,0.25)]",
  },
  validate: {
    border: "border-emerald-300/60 dark:border-emerald-600/40",
    bg: "bg-gradient-to-br from-emerald-50 via-green-50/50 to-teal-50 dark:from-emerald-950 dark:via-green-950/50 dark:to-teal-950",
    iconBg:
      "bg-gradient-to-br from-emerald-500 to-green-500 dark:from-emerald-600 dark:to-green-600",
    iconText: "text-white",
    accent: "text-emerald-600 dark:text-emerald-400",
    handleColor: "!bg-emerald-500",
    glow: "shadow-[0_0_15px_rgba(16,185,129,0.15)] dark:shadow-[0_0_20px_rgba(16,185,129,0.25)]",
  },
  format: {
    border: "border-indigo-300/60 dark:border-indigo-600/40",
    bg: "bg-gradient-to-br from-indigo-50 via-blue-50/50 to-violet-50 dark:from-indigo-950 dark:via-blue-950/50 dark:to-violet-950",
    iconBg:
      "bg-gradient-to-br from-indigo-500 to-blue-500 dark:from-indigo-600 dark:to-blue-600",
    iconText: "text-white",
    accent: "text-indigo-600 dark:text-indigo-400",
    handleColor: "!bg-indigo-500",
    glow: "shadow-[0_0_15px_rgba(99,102,241,0.15)] dark:shadow-[0_0_20px_rgba(99,102,241,0.25)]",
  },
  hash: {
    border: "border-zinc-300/60 dark:border-zinc-600/40",
    bg: "bg-gradient-to-br from-zinc-50 via-gray-50/50 to-stone-50 dark:from-zinc-950 dark:via-gray-950/50 dark:to-stone-950",
    iconBg:
      "bg-gradient-to-br from-zinc-500 to-gray-500 dark:from-zinc-600 dark:to-gray-600",
    iconText: "text-white",
    accent: "text-zinc-600 dark:text-zinc-400",
    handleColor: "!bg-zinc-500",
    glow: "shadow-[0_0_15px_rgba(113,113,122,0.15)] dark:shadow-[0_0_20px_rgba(113,113,122,0.25)]",
  },
  // Advanced core nodes - Array Operations
  group: {
    border: "border-lime-300/60 dark:border-lime-600/40",
    bg: "bg-gradient-to-br from-lime-50 via-green-50/50 to-emerald-50 dark:from-lime-950 dark:via-green-950/50 dark:to-emerald-950",
    iconBg:
      "bg-gradient-to-br from-lime-500 to-green-500 dark:from-lime-600 dark:to-green-600",
    iconText: "text-white",
    accent: "text-lime-600 dark:text-lime-400",
    handleColor: "!bg-lime-500",
    glow: "shadow-[0_0_15px_rgba(132,204,22,0.15)] dark:shadow-[0_0_20px_rgba(132,204,22,0.25)]",
  },
  flatten: {
    border: "border-teal-300/60 dark:border-teal-600/40",
    bg: "bg-gradient-to-br from-teal-50 via-emerald-50/50 to-cyan-50 dark:from-teal-950 dark:via-emerald-950/50 dark:to-cyan-950",
    iconBg:
      "bg-gradient-to-br from-teal-500 to-emerald-500 dark:from-teal-600 dark:to-emerald-600",
    iconText: "text-white",
    accent: "text-teal-600 dark:text-teal-400",
    handleColor: "!bg-teal-500",
    glow: "shadow-[0_0_15px_rgba(20,184,166,0.15)] dark:shadow-[0_0_20px_rgba(20,184,166,0.25)]",
  },
  chunk: {
    border: "border-cyan-300/60 dark:border-cyan-600/40",
    bg: "bg-gradient-to-br from-cyan-50 via-sky-50/50 to-blue-50 dark:from-cyan-950 dark:via-sky-950/50 dark:to-blue-950",
    iconBg:
      "bg-gradient-to-br from-cyan-500 to-sky-500 dark:from-cyan-600 dark:to-sky-600",
    iconText: "text-white",
    accent: "text-cyan-600 dark:text-cyan-400",
    handleColor: "!bg-cyan-500",
    glow: "shadow-[0_0_15px_rgba(6,182,212,0.15)] dark:shadow-[0_0_20px_rgba(6,182,212,0.25)]",
  },
  zip: {
    border: "border-sky-300/60 dark:border-sky-600/40",
    bg: "bg-gradient-to-br from-sky-50 via-blue-50/50 to-indigo-50 dark:from-sky-950 dark:via-blue-950/50 dark:to-indigo-950",
    iconBg:
      "bg-gradient-to-br from-sky-500 to-blue-500 dark:from-sky-600 dark:to-blue-600",
    iconText: "text-white",
    accent: "text-sky-600 dark:text-sky-400",
    handleColor: "!bg-sky-500",
    glow: "shadow-[0_0_15px_rgba(14,165,233,0.15)] dark:shadow-[0_0_20px_rgba(14,165,233,0.25)]",
  },
  // Advanced core nodes - Security
  encrypt: {
    border: "border-red-300/60 dark:border-red-600/40",
    bg: "bg-gradient-to-br from-red-50 via-rose-50/50 to-pink-50 dark:from-red-950 dark:via-rose-950/50 dark:to-pink-950",
    iconBg:
      "bg-gradient-to-br from-red-500 to-rose-500 dark:from-red-600 dark:to-rose-600",
    iconText: "text-white",
    accent: "text-red-600 dark:text-red-400",
    handleColor: "!bg-red-500",
    glow: "shadow-[0_0_15px_rgba(239,68,68,0.15)] dark:shadow-[0_0_20px_rgba(239,68,68,0.25)]",
  },
  decrypt: {
    border: "border-orange-300/60 dark:border-orange-600/40",
    bg: "bg-gradient-to-br from-orange-50 via-amber-50/50 to-yellow-50 dark:from-orange-950 dark:via-amber-950/50 dark:to-yellow-950",
    iconBg:
      "bg-gradient-to-br from-orange-500 to-amber-500 dark:from-orange-600 dark:to-amber-600",
    iconText: "text-white",
    accent: "text-orange-600 dark:text-orange-400",
    handleColor: "!bg-orange-500",
    glow: "shadow-[0_0_15px_rgba(249,115,22,0.15)] dark:shadow-[0_0_20px_rgba(249,115,22,0.25)]",
  },
  sign: {
    border: "border-amber-300/60 dark:border-amber-600/40",
    bg: "bg-gradient-to-br from-amber-50 via-yellow-50/50 to-lime-50 dark:from-amber-950 dark:via-yellow-950/50 dark:to-lime-950",
    iconBg:
      "bg-gradient-to-br from-amber-500 to-yellow-500 dark:from-amber-600 dark:to-yellow-600",
    iconText: "text-white",
    accent: "text-amber-600 dark:text-amber-400",
    handleColor: "!bg-amber-500",
    glow: "shadow-[0_0_15px_rgba(245,158,11,0.15)] dark:shadow-[0_0_20px_rgba(245,158,11,0.25)]",
  },
  jwt: {
    border: "border-yellow-300/60 dark:border-yellow-600/40",
    bg: "bg-gradient-to-br from-yellow-50 via-amber-50/50 to-orange-50 dark:from-yellow-950 dark:via-amber-950/50 dark:to-orange-950",
    iconBg:
      "bg-gradient-to-br from-yellow-500 to-amber-500 dark:from-yellow-600 dark:to-amber-600",
    iconText: "text-white",
    accent: "text-yellow-600 dark:text-yellow-400",
    handleColor: "!bg-yellow-500",
    glow: "shadow-[0_0_15px_rgba(234,179,8,0.15)] dark:shadow-[0_0_20px_rgba(234,179,8,0.25)]",
  },
  // Advanced core nodes - AI Extensions
  agent: {
    border: "border-violet-300/60 dark:border-violet-600/40",
    bg: "bg-gradient-to-br from-violet-50 via-purple-50/50 to-fuchsia-50 dark:from-violet-950 dark:via-purple-950/50 dark:to-fuchsia-950",
    iconBg:
      "bg-gradient-to-br from-violet-500 to-purple-500 dark:from-violet-600 dark:to-purple-600",
    iconText: "text-white",
    accent: "text-violet-600 dark:text-violet-400",
    handleColor: "!bg-violet-500",
    glow: "shadow-[0_0_15px_rgba(139,92,246,0.15)] dark:shadow-[0_0_20px_rgba(139,92,246,0.25)]",
  },
  rag: {
    border: "border-purple-300/60 dark:border-purple-600/40",
    bg: "bg-gradient-to-br from-purple-50 via-fuchsia-50/50 to-pink-50 dark:from-purple-950 dark:via-fuchsia-950/50 dark:to-pink-950",
    iconBg:
      "bg-gradient-to-br from-purple-500 to-fuchsia-500 dark:from-purple-600 dark:to-fuchsia-600",
    iconText: "text-white",
    accent: "text-purple-600 dark:text-purple-400",
    handleColor: "!bg-purple-500",
    glow: "shadow-[0_0_15px_rgba(168,85,247,0.15)] dark:shadow-[0_0_20px_rgba(168,85,247,0.25)]",
  },
  vision: {
    border: "border-fuchsia-300/60 dark:border-fuchsia-600/40",
    bg: "bg-gradient-to-br from-fuchsia-50 via-pink-50/50 to-rose-50 dark:from-fuchsia-950 dark:via-pink-950/50 dark:to-rose-950",
    iconBg:
      "bg-gradient-to-br from-fuchsia-500 to-pink-500 dark:from-fuchsia-600 dark:to-pink-600",
    iconText: "text-white",
    accent: "text-fuchsia-600 dark:text-fuchsia-400",
    handleColor: "!bg-fuchsia-500",
    glow: "shadow-[0_0_15px_rgba(217,70,239,0.15)] dark:shadow-[0_0_20px_rgba(217,70,239,0.25)]",
  },
  audio: {
    border: "border-pink-300/60 dark:border-pink-600/40",
    bg: "bg-gradient-to-br from-pink-50 via-rose-50/50 to-red-50 dark:from-pink-950 dark:via-rose-950/50 dark:to-red-950",
    iconBg:
      "bg-gradient-to-br from-pink-500 to-rose-500 dark:from-pink-600 dark:to-rose-600",
    iconText: "text-white",
    accent: "text-pink-600 dark:text-pink-400",
    handleColor: "!bg-pink-500",
    glow: "shadow-[0_0_15px_rgba(236,72,153,0.15)] dark:shadow-[0_0_20px_rgba(236,72,153,0.25)]",
  },

  // Brand themes for integrations
  linkedin: {
    border: "border-[#0A66C2]/40 dark:border-[#0A66C2]/50",
    bg: "bg-gradient-to-br from-[#0A66C2]/10 via-[#0A66C2]/5 to-blue-50 dark:from-[#0A66C2]/20 dark:via-[#0A66C2]/10 dark:to-blue-950",
    iconBg: "bg-[#0A66C2]",
    iconText: "text-white",
    accent: "text-[#0A66C2] dark:text-[#0A66C2]",
    handleColor: "!bg-[#0A66C2]",
    glow: "shadow-[0_0_15px_rgba(10,102,194,0.2)] dark:shadow-[0_0_20px_rgba(10,102,194,0.3)]",
  },
  slack: {
    border: "border-[#4A154B]/40 dark:border-[#4A154B]/50",
    bg: "bg-gradient-to-br from-[#4A154B]/10 via-[#4A154B]/5 to-purple-50 dark:from-[#4A154B]/20 dark:via-[#4A154B]/10 dark:to-purple-950",
    iconBg: "bg-[#4A154B]",
    iconText: "text-white",
    accent: "text-[#4A154B] dark:text-[#E01E5A]",
    handleColor: "!bg-[#4A154B]",
    glow: "shadow-[0_0_15px_rgba(74,21,75,0.2)] dark:shadow-[0_0_20px_rgba(74,21,75,0.3)]",
  },
  discord: {
    border: "border-[#5865F2]/40 dark:border-[#5865F2]/50",
    bg: "bg-gradient-to-br from-[#5865F2]/10 via-[#5865F2]/5 to-indigo-50 dark:from-[#5865F2]/20 dark:via-[#5865F2]/10 dark:to-indigo-950",
    iconBg: "bg-[#5865F2]",
    iconText: "text-white",
    accent: "text-[#5865F2] dark:text-[#5865F2]",
    handleColor: "!bg-[#5865F2]",
    glow: "shadow-[0_0_15px_rgba(88,101,242,0.2)] dark:shadow-[0_0_20px_rgba(88,101,242,0.3)]",
  },
  github: {
    border: "border-[#24292F]/30 dark:border-[#f0f6fc]/30",
    bg: "bg-gradient-to-br from-[#24292F]/10 via-gray-50 to-slate-50 dark:from-[#24292F]/50 dark:via-gray-950 dark:to-slate-950",
    iconBg: "bg-[#24292F] dark:bg-[#f0f6fc]",
    iconText: "text-white dark:text-[#24292F]",
    accent: "text-[#24292F] dark:text-[#f0f6fc]",
    handleColor: "!bg-[#24292F] dark:!bg-[#f0f6fc]",
    glow: "shadow-[0_0_15px_rgba(36,41,47,0.15)] dark:shadow-[0_0_20px_rgba(240,246,252,0.15)]",
  },
  google: {
    border: "border-[#4285F4]/40 dark:border-[#4285F4]/50",
    bg: "bg-gradient-to-br from-[#4285F4]/10 via-blue-50/50 to-white dark:from-[#4285F4]/20 dark:via-blue-950/50 dark:to-slate-950",
    iconBg: "bg-white dark:bg-slate-800",
    iconText: "text-[#4285F4]",
    accent: "text-[#4285F4] dark:text-[#4285F4]",
    handleColor: "!bg-[#4285F4]",
    glow: "shadow-[0_0_15px_rgba(66,133,244,0.2)] dark:shadow-[0_0_20px_rgba(66,133,244,0.3)]",
  },
  notion: {
    border: "border-[#000000]/20 dark:border-[#ffffff]/20",
    bg: "bg-gradient-to-br from-[#000000]/5 via-gray-50 to-white dark:from-[#ffffff]/10 dark:via-gray-950 dark:to-slate-950",
    iconBg: "bg-[#000000] dark:bg-[#ffffff]",
    iconText: "text-white dark:text-black",
    accent: "text-[#000000] dark:text-[#ffffff]",
    handleColor: "!bg-[#000000] dark:!bg-[#ffffff]",
    glow: "shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]",
  },
  stripe: {
    border: "border-[#635BFF]/40 dark:border-[#635BFF]/50",
    bg: "bg-gradient-to-br from-[#635BFF]/10 via-[#635BFF]/5 to-indigo-50 dark:from-[#635BFF]/20 dark:via-[#635BFF]/10 dark:to-indigo-950",
    iconBg: "bg-[#635BFF]",
    iconText: "text-white",
    accent: "text-[#635BFF] dark:text-[#635BFF]",
    handleColor: "!bg-[#635BFF]",
    glow: "shadow-[0_0_15px_rgba(99,91,255,0.2)] dark:shadow-[0_0_20px_rgba(99,91,255,0.3)]",
  },
  twilio: {
    border: "border-[#F22F46]/40 dark:border-[#F22F46]/50",
    bg: "bg-gradient-to-br from-[#F22F46]/10 via-[#F22F46]/5 to-red-50 dark:from-[#F22F46]/20 dark:via-[#F22F46]/10 dark:to-red-950",
    iconBg: "bg-[#F22F46]",
    iconText: "text-white",
    accent: "text-[#F22F46] dark:text-[#F22F46]",
    handleColor: "!bg-[#F22F46]",
    glow: "shadow-[0_0_15px_rgba(242,47,70,0.2)] dark:shadow-[0_0_20px_rgba(242,47,70,0.3)]",
  },
  openai: {
    border: "border-[#10A37F]/40 dark:border-[#10A37F]/50",
    bg: "bg-gradient-to-br from-[#10A37F]/10 via-[#10A37F]/5 to-emerald-50 dark:from-[#10A37F]/20 dark:via-[#10A37F]/10 dark:to-emerald-950",
    iconBg: "bg-[#10A37F]",
    iconText: "text-white",
    accent: "text-[#10A37F] dark:text-[#10A37F]",
    handleColor: "!bg-[#10A37F]",
    glow: "shadow-[0_0_15px_rgba(16,163,127,0.2)] dark:shadow-[0_0_20px_rgba(16,163,127,0.3)]",
  },
  anthropic: {
    border: "border-[#D4A574]/40 dark:border-[#D4A574]/50",
    bg: "bg-gradient-to-br from-[#D4A574]/10 via-[#D4A574]/5 to-amber-50 dark:from-[#D4A574]/20 dark:via-[#D4A574]/10 dark:to-amber-950",
    iconBg: "bg-[#D4A574]",
    iconText: "text-white",
    accent: "text-[#D4A574] dark:text-[#D4A574]",
    handleColor: "!bg-[#D4A574]",
    glow: "shadow-[0_0_15px_rgba(212,165,116,0.2)] dark:shadow-[0_0_20px_rgba(212,165,116,0.3)]",
  },
  shopify: {
    border: "border-[#96BF48]/40 dark:border-[#96BF48]/50",
    bg: "bg-gradient-to-br from-[#96BF48]/10 via-[#96BF48]/5 to-lime-50 dark:from-[#96BF48]/20 dark:via-[#96BF48]/10 dark:to-lime-950",
    iconBg: "bg-[#96BF48]",
    iconText: "text-white",
    accent: "text-[#96BF48] dark:text-[#96BF48]",
    handleColor: "!bg-[#96BF48]",
    glow: "shadow-[0_0_15px_rgba(150,191,72,0.2)] dark:shadow-[0_0_20px_rgba(150,191,72,0.3)]",
  },
  hubspot: {
    border: "border-[#FF7A59]/40 dark:border-[#FF7A59]/50",
    bg: "bg-gradient-to-br from-[#FF7A59]/10 via-[#FF7A59]/5 to-orange-50 dark:from-[#FF7A59]/20 dark:via-[#FF7A59]/10 dark:to-orange-950",
    iconBg: "bg-[#FF7A59]",
    iconText: "text-white",
    accent: "text-[#FF7A59] dark:text-[#FF7A59]",
    handleColor: "!bg-[#FF7A59]",
    glow: "shadow-[0_0_15px_rgba(255,122,89,0.2)] dark:shadow-[0_0_20px_rgba(255,122,89,0.3)]",
  },
  salesforce: {
    border: "border-[#00A1E0]/40 dark:border-[#00A1E0]/50",
    bg: "bg-gradient-to-br from-[#00A1E0]/10 via-[#00A1E0]/5 to-sky-50 dark:from-[#00A1E0]/20 dark:via-[#00A1E0]/10 dark:to-sky-950",
    iconBg: "bg-[#00A1E0]",
    iconText: "text-white",
    accent: "text-[#00A1E0] dark:text-[#00A1E0]",
    handleColor: "!bg-[#00A1E0]",
    glow: "shadow-[0_0_15px_rgba(0,161,224,0.2)] dark:shadow-[0_0_20px_rgba(0,161,224,0.3)]",
  },
  mailchimp: {
    border: "border-[#FFE01B]/40 dark:border-[#FFE01B]/50",
    bg: "bg-gradient-to-br from-[#FFE01B]/10 via-[#FFE01B]/5 to-yellow-50 dark:from-[#FFE01B]/20 dark:via-[#FFE01B]/10 dark:to-yellow-950",
    iconBg: "bg-[#FFE01B]",
    iconText: "text-black",
    accent: "text-[#241C15] dark:text-[#FFE01B]",
    handleColor: "!bg-[#FFE01B]",
    glow: "shadow-[0_0_15px_rgba(255,224,27,0.2)] dark:shadow-[0_0_20px_rgba(255,224,27,0.3)]",
  },
  sendgrid: {
    border: "border-[#1A82E2]/40 dark:border-[#1A82E2]/50",
    bg: "bg-gradient-to-br from-[#1A82E2]/10 via-[#1A82E2]/5 to-blue-50 dark:from-[#1A82E2]/20 dark:via-[#1A82E2]/10 dark:to-blue-950",
    iconBg: "bg-[#1A82E2]",
    iconText: "text-white",
    accent: "text-[#1A82E2] dark:text-[#1A82E2]",
    handleColor: "!bg-[#1A82E2]",
    glow: "shadow-[0_0_15px_rgba(26,130,226,0.2)] dark:shadow-[0_0_20px_rgba(26,130,226,0.3)]",
  },
  dropbox: {
    border: "border-[#0061FF]/40 dark:border-[#0061FF]/50",
    bg: "bg-gradient-to-br from-[#0061FF]/10 via-[#0061FF]/5 to-blue-50 dark:from-[#0061FF]/20 dark:via-[#0061FF]/10 dark:to-blue-950",
    iconBg: "bg-[#0061FF]",
    iconText: "text-white",
    accent: "text-[#0061FF] dark:text-[#0061FF]",
    handleColor: "!bg-[#0061FF]",
    glow: "shadow-[0_0_15px_rgba(0,97,255,0.2)] dark:shadow-[0_0_20px_rgba(0,97,255,0.3)]",
  },
  aws: {
    border: "border-[#FF9900]/40 dark:border-[#FF9900]/50",
    bg: "bg-gradient-to-br from-[#FF9900]/10 via-[#FF9900]/5 to-orange-50 dark:from-[#FF9900]/20 dark:via-[#FF9900]/10 dark:to-orange-950",
    iconBg: "bg-[#232F3E]",
    iconText: "text-[#FF9900]",
    accent: "text-[#FF9900] dark:text-[#FF9900]",
    handleColor: "!bg-[#FF9900]",
    glow: "shadow-[0_0_15px_rgba(255,153,0,0.2)] dark:shadow-[0_0_20px_rgba(255,153,0,0.3)]",
  },
  azure: {
    border: "border-[#0078D4]/40 dark:border-[#0078D4]/50",
    bg: "bg-gradient-to-br from-[#0078D4]/10 via-[#0078D4]/5 to-blue-50 dark:from-[#0078D4]/20 dark:via-[#0078D4]/10 dark:to-blue-950",
    iconBg: "bg-[#0078D4]",
    iconText: "text-white",
    accent: "text-[#0078D4] dark:text-[#0078D4]",
    handleColor: "!bg-[#0078D4]",
    glow: "shadow-[0_0_15px_rgba(0,120,212,0.2)] dark:shadow-[0_0_20px_rgba(0,120,212,0.3)]",
  },
  jira: {
    border: "border-[#0052CC]/40 dark:border-[#0052CC]/50",
    bg: "bg-gradient-to-br from-[#0052CC]/10 via-[#0052CC]/5 to-blue-50 dark:from-[#0052CC]/20 dark:via-[#0052CC]/10 dark:to-blue-950",
    iconBg: "bg-[#0052CC]",
    iconText: "text-white",
    accent: "text-[#0052CC] dark:text-[#0052CC]",
    handleColor: "!bg-[#0052CC]",
    glow: "shadow-[0_0_15px_rgba(0,82,204,0.2)] dark:shadow-[0_0_20px_rgba(0,82,204,0.3)]",
  },
  trello: {
    border: "border-[#0079BF]/40 dark:border-[#0079BF]/50",
    bg: "bg-gradient-to-br from-[#0079BF]/10 via-[#0079BF]/5 to-sky-50 dark:from-[#0079BF]/20 dark:via-[#0079BF]/10 dark:to-sky-950",
    iconBg: "bg-[#0079BF]",
    iconText: "text-white",
    accent: "text-[#0079BF] dark:text-[#0079BF]",
    handleColor: "!bg-[#0079BF]",
    glow: "shadow-[0_0_15px_rgba(0,121,191,0.2)] dark:shadow-[0_0_20px_rgba(0,121,191,0.3)]",
  },
  asana: {
    border: "border-[#F06A6A]/40 dark:border-[#F06A6A]/50",
    bg: "bg-gradient-to-br from-[#F06A6A]/10 via-[#F06A6A]/5 to-red-50 dark:from-[#F06A6A]/20 dark:via-[#F06A6A]/10 dark:to-red-950",
    iconBg: "bg-gradient-to-br from-[#F06A6A] to-[#F9A03F]",
    iconText: "text-white",
    accent: "text-[#F06A6A] dark:text-[#F06A6A]",
    handleColor: "!bg-[#F06A6A]",
    glow: "shadow-[0_0_15px_rgba(240,106,106,0.2)] dark:shadow-[0_0_20px_rgba(240,106,106,0.3)]",
  },
  airtable: {
    border: "border-[#18BFFF]/40 dark:border-[#18BFFF]/50",
    bg: "bg-gradient-to-br from-[#18BFFF]/10 via-[#18BFFF]/5 to-cyan-50 dark:from-[#18BFFF]/20 dark:via-[#18BFFF]/10 dark:to-cyan-950",
    iconBg: "bg-[#18BFFF]",
    iconText: "text-white",
    accent: "text-[#18BFFF] dark:text-[#18BFFF]",
    handleColor: "!bg-[#18BFFF]",
    glow: "shadow-[0_0_15px_rgba(24,191,255,0.2)] dark:shadow-[0_0_20px_rgba(24,191,255,0.3)]",
  },
  figma: {
    border: "border-[#F24E1E]/40 dark:border-[#F24E1E]/50",
    bg: "bg-gradient-to-br from-[#F24E1E]/10 via-[#A259FF]/5 to-purple-50 dark:from-[#F24E1E]/20 dark:via-[#A259FF]/10 dark:to-purple-950",
    iconBg: "bg-gradient-to-br from-[#F24E1E] via-[#A259FF] to-[#1ABCFE]",
    iconText: "text-white",
    accent: "text-[#F24E1E] dark:text-[#F24E1E]",
    handleColor: "!bg-[#A259FF]",
    glow: "shadow-[0_0_15px_rgba(162,89,255,0.2)] dark:shadow-[0_0_20px_rgba(162,89,255,0.3)]",
  },
  twitter: {
    border: "border-[#000000]/30 dark:border-[#ffffff]/30",
    bg: "bg-gradient-to-br from-[#000000]/5 via-gray-50 to-white dark:from-[#ffffff]/10 dark:via-gray-950 dark:to-slate-950",
    iconBg: "bg-[#000000] dark:bg-[#ffffff]",
    iconText: "text-white dark:text-black",
    accent: "text-[#000000] dark:text-[#ffffff]",
    handleColor: "!bg-[#000000] dark:!bg-[#ffffff]",
    glow: "shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]",
  },
  facebook: {
    border: "border-[#1877F2]/40 dark:border-[#1877F2]/50",
    bg: "bg-gradient-to-br from-[#1877F2]/10 via-[#1877F2]/5 to-blue-50 dark:from-[#1877F2]/20 dark:via-[#1877F2]/10 dark:to-blue-950",
    iconBg: "bg-[#1877F2]",
    iconText: "text-white",
    accent: "text-[#1877F2] dark:text-[#1877F2]",
    handleColor: "!bg-[#1877F2]",
    glow: "shadow-[0_0_15px_rgba(24,119,242,0.2)] dark:shadow-[0_0_20px_rgba(24,119,242,0.3)]",
  },
  instagram: {
    border: "border-[#E4405F]/40 dark:border-[#E4405F]/50",
    bg: "bg-gradient-to-br from-[#833AB4]/10 via-[#E4405F]/5 to-[#FCAF45]/10 dark:from-[#833AB4]/20 dark:via-[#E4405F]/10 dark:to-[#FCAF45]/20",
    iconBg: "bg-gradient-to-br from-[#833AB4] via-[#E4405F] to-[#FCAF45]",
    iconText: "text-white",
    accent: "text-[#E4405F] dark:text-[#E4405F]",
    handleColor: "!bg-[#E4405F]",
    glow: "shadow-[0_0_15px_rgba(228,64,95,0.2)] dark:shadow-[0_0_20px_rgba(228,64,95,0.3)]",
  },
  youtube: {
    border: "border-[#FF0000]/40 dark:border-[#FF0000]/50",
    bg: "bg-gradient-to-br from-[#FF0000]/10 via-[#FF0000]/5 to-red-50 dark:from-[#FF0000]/20 dark:via-[#FF0000]/10 dark:to-red-950",
    iconBg: "bg-[#FF0000]",
    iconText: "text-white",
    accent: "text-[#FF0000] dark:text-[#FF0000]",
    handleColor: "!bg-[#FF0000]",
    glow: "shadow-[0_0_15px_rgba(255,0,0,0.2)] dark:shadow-[0_0_20px_rgba(255,0,0,0.3)]",
  },
  zoom: {
    border: "border-[#2D8CFF]/40 dark:border-[#2D8CFF]/50",
    bg: "bg-gradient-to-br from-[#2D8CFF]/10 via-[#2D8CFF]/5 to-blue-50 dark:from-[#2D8CFF]/20 dark:via-[#2D8CFF]/10 dark:to-blue-950",
    iconBg: "bg-[#2D8CFF]",
    iconText: "text-white",
    accent: "text-[#2D8CFF] dark:text-[#2D8CFF]",
    handleColor: "!bg-[#2D8CFF]",
    glow: "shadow-[0_0_15px_rgba(45,140,255,0.2)] dark:shadow-[0_0_20px_rgba(45,140,255,0.3)]",
  },
  intercom: {
    border: "border-[#1F8DED]/40 dark:border-[#1F8DED]/50",
    bg: "bg-gradient-to-br from-[#1F8DED]/10 via-[#1F8DED]/5 to-blue-50 dark:from-[#1F8DED]/20 dark:via-[#1F8DED]/10 dark:to-blue-950",
    iconBg: "bg-[#1F8DED]",
    iconText: "text-white",
    accent: "text-[#1F8DED] dark:text-[#1F8DED]",
    handleColor: "!bg-[#1F8DED]",
    glow: "shadow-[0_0_15px_rgba(31,141,237,0.2)] dark:shadow-[0_0_20px_rgba(31,141,237,0.3)]",
  },
  zendesk: {
    border: "border-[#03363D]/40 dark:border-[#78A300]/50",
    bg: "bg-gradient-to-br from-[#03363D]/10 via-[#03363D]/5 to-teal-50 dark:from-[#78A300]/20 dark:via-[#78A300]/10 dark:to-lime-950",
    iconBg: "bg-[#03363D] dark:bg-[#78A300]",
    iconText: "text-white",
    accent: "text-[#03363D] dark:text-[#78A300]",
    handleColor: "!bg-[#03363D] dark:!bg-[#78A300]",
    glow: "shadow-[0_0_15px_rgba(3,54,61,0.2)] dark:shadow-[0_0_20px_rgba(120,163,0,0.3)]",
  },
  quickbooks: {
    border: "border-[#2CA01C]/40 dark:border-[#2CA01C]/50",
    bg: "bg-gradient-to-br from-[#2CA01C]/10 via-[#2CA01C]/5 to-green-50 dark:from-[#2CA01C]/20 dark:via-[#2CA01C]/10 dark:to-green-950",
    iconBg: "bg-[#2CA01C]",
    iconText: "text-white",
    accent: "text-[#2CA01C] dark:text-[#2CA01C]",
    handleColor: "!bg-[#2CA01C]",
    glow: "shadow-[0_0_15px_rgba(44,160,28,0.2)] dark:shadow-[0_0_20px_rgba(44,160,28,0.3)]",
  },
  xero: {
    border: "border-[#13B5EA]/40 dark:border-[#13B5EA]/50",
    bg: "bg-gradient-to-br from-[#13B5EA]/10 via-[#13B5EA]/5 to-cyan-50 dark:from-[#13B5EA]/20 dark:via-[#13B5EA]/10 dark:to-cyan-950",
    iconBg: "bg-[#13B5EA]",
    iconText: "text-white",
    accent: "text-[#13B5EA] dark:text-[#13B5EA]",
    handleColor: "!bg-[#13B5EA]",
    glow: "shadow-[0_0_15px_rgba(19,181,234,0.2)] dark:shadow-[0_0_20px_rgba(19,181,234,0.3)]",
  },
  calendly: {
    border: "border-[#006BFF]/40 dark:border-[#006BFF]/50",
    bg: "bg-gradient-to-br from-[#006BFF]/10 via-[#006BFF]/5 to-blue-50 dark:from-[#006BFF]/20 dark:via-[#006BFF]/10 dark:to-blue-950",
    iconBg: "bg-[#006BFF]",
    iconText: "text-white",
    accent: "text-[#006BFF] dark:text-[#006BFF]",
    handleColor: "!bg-[#006BFF]",
    glow: "shadow-[0_0_15px_rgba(0,107,255,0.2)] dark:shadow-[0_0_20px_rgba(0,107,255,0.3)]",
  },
  typeform: {
    border: "border-[#262627]/30 dark:border-[#ffffff]/30",
    bg: "bg-gradient-to-br from-[#262627]/5 via-gray-50 to-white dark:from-[#ffffff]/10 dark:via-gray-950 dark:to-slate-950",
    iconBg: "bg-[#262627] dark:bg-[#ffffff]",
    iconText: "text-white dark:text-black",
    accent: "text-[#262627] dark:text-[#ffffff]",
    handleColor: "!bg-[#262627] dark:!bg-[#ffffff]",
    glow: "shadow-[0_0_15px_rgba(38,38,39,0.15)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]",
  },
  webflow: {
    border: "border-[#4353FF]/40 dark:border-[#4353FF]/50",
    bg: "bg-gradient-to-br from-[#4353FF]/10 via-[#4353FF]/5 to-indigo-50 dark:from-[#4353FF]/20 dark:via-[#4353FF]/10 dark:to-indigo-950",
    iconBg: "bg-[#4353FF]",
    iconText: "text-white",
    accent: "text-[#4353FF] dark:text-[#4353FF]",
    handleColor: "!bg-[#4353FF]",
    glow: "shadow-[0_0_15px_rgba(67,83,255,0.2)] dark:shadow-[0_0_20px_rgba(67,83,255,0.3)]",
  },
  monday: {
    border: "border-[#FF3D57]/40 dark:border-[#FF3D57]/50",
    bg: "bg-gradient-to-br from-[#FF3D57]/10 via-[#FFCB00]/5 to-yellow-50 dark:from-[#FF3D57]/20 dark:via-[#FFCB00]/10 dark:to-yellow-950",
    iconBg: "bg-gradient-to-br from-[#FF3D57] to-[#FFCB00]",
    iconText: "text-white",
    accent: "text-[#FF3D57] dark:text-[#FF3D57]",
    handleColor: "!bg-[#FF3D57]",
    glow: "shadow-[0_0_15px_rgba(255,61,87,0.2)] dark:shadow-[0_0_20px_rgba(255,61,87,0.3)]",
  },
  linear: {
    border: "border-[#5E6AD2]/40 dark:border-[#5E6AD2]/50",
    bg: "bg-gradient-to-br from-[#5E6AD2]/10 via-[#5E6AD2]/5 to-indigo-50 dark:from-[#5E6AD2]/20 dark:via-[#5E6AD2]/10 dark:to-indigo-950",
    iconBg: "bg-[#5E6AD2]",
    iconText: "text-white",
    accent: "text-[#5E6AD2] dark:text-[#5E6AD2]",
    handleColor: "!bg-[#5E6AD2]",
    glow: "shadow-[0_0_15px_rgba(94,106,210,0.2)] dark:shadow-[0_0_20px_rgba(94,106,210,0.3)]",
  },
  supabase: {
    border: "border-[#3ECF8E]/40 dark:border-[#3ECF8E]/50",
    bg: "bg-gradient-to-br from-[#3ECF8E]/10 via-[#3ECF8E]/5 to-emerald-50 dark:from-[#3ECF8E]/20 dark:via-[#3ECF8E]/10 dark:to-emerald-950",
    iconBg: "bg-[#3ECF8E]",
    iconText: "text-white",
    accent: "text-[#3ECF8E] dark:text-[#3ECF8E]",
    handleColor: "!bg-[#3ECF8E]",
    glow: "shadow-[0_0_15px_rgba(62,207,142,0.2)] dark:shadow-[0_0_20px_rgba(62,207,142,0.3)]",
  },
  vercel: {
    border: "border-[#000000]/30 dark:border-[#ffffff]/30",
    bg: "bg-gradient-to-br from-[#000000]/5 via-gray-50 to-white dark:from-[#ffffff]/10 dark:via-gray-950 dark:to-slate-950",
    iconBg: "bg-[#000000] dark:bg-[#ffffff]",
    iconText: "text-white dark:text-black",
    accent: "text-[#000000] dark:text-[#ffffff]",
    handleColor: "!bg-[#000000] dark:!bg-[#ffffff]",
    glow: "shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]",
  },
  netlify: {
    border: "border-[#00C7B7]/40 dark:border-[#00C7B7]/50",
    bg: "bg-gradient-to-br from-[#00C7B7]/10 via-[#00C7B7]/5 to-teal-50 dark:from-[#00C7B7]/20 dark:via-[#00C7B7]/10 dark:to-teal-950",
    iconBg: "bg-[#00C7B7]",
    iconText: "text-white",
    accent: "text-[#00C7B7] dark:text-[#00C7B7]",
    handleColor: "!bg-[#00C7B7]",
    glow: "shadow-[0_0_15px_rgba(0,199,183,0.2)] dark:shadow-[0_0_20px_rgba(0,199,183,0.3)]",
  },
  postgresql: {
    border: "border-[#336791]/40 dark:border-[#336791]/50",
    bg: "bg-gradient-to-br from-[#336791]/10 via-[#336791]/5 to-blue-50 dark:from-[#336791]/20 dark:via-[#336791]/10 dark:to-blue-950",
    iconBg: "bg-[#336791]",
    iconText: "text-white",
    accent: "text-[#336791] dark:text-[#336791]",
    handleColor: "!bg-[#336791]",
    glow: "shadow-[0_0_15px_rgba(51,103,145,0.2)] dark:shadow-[0_0_20px_rgba(51,103,145,0.3)]",
  },
  mongodb: {
    border: "border-[#00ED64]/40 dark:border-[#00ED64]/50",
    bg: "bg-gradient-to-br from-[#00ED64]/10 via-[#00ED64]/5 to-green-50 dark:from-[#00ED64]/20 dark:via-[#00ED64]/10 dark:to-green-950",
    iconBg: "bg-[#00684A]",
    iconText: "text-[#00ED64]",
    accent: "text-[#00684A] dark:text-[#00ED64]",
    handleColor: "!bg-[#00ED64]",
    glow: "shadow-[0_0_15px_rgba(0,237,100,0.2)] dark:shadow-[0_0_20px_rgba(0,237,100,0.3)]",
  },
  valkey: {
    border: "border-[#DC382D]/40 dark:border-[#DC382D]/50",
    bg: "bg-gradient-to-br from-[#DC382D]/10 via-[#DC382D]/5 to-red-50 dark:from-[#DC382D]/20 dark:via-[#DC382D]/10 dark:to-red-950",
    iconBg: "bg-[#DC382D]",
    iconText: "text-white",
    accent: "text-[#DC382D] dark:text-[#DC382D]",
    handleColor: "!bg-[#DC382D]",
    glow: "shadow-[0_0_15px_rgba(220,56,45,0.2)] dark:shadow-[0_0_20px_rgba(220,56,45,0.3)]",
  },
  segment: {
    border: "border-[#52BD95]/40 dark:border-[#52BD95]/50",
    bg: "bg-gradient-to-br from-[#52BD95]/10 via-[#52BD95]/5 to-emerald-50 dark:from-[#52BD95]/20 dark:via-[#52BD95]/10 dark:to-emerald-950",
    iconBg: "bg-[#52BD95]",
    iconText: "text-white",
    accent: "text-[#52BD95] dark:text-[#52BD95]",
    handleColor: "!bg-[#52BD95]",
    glow: "shadow-[0_0_15px_rgba(82,189,149,0.2)] dark:shadow-[0_0_20px_rgba(82,189,149,0.3)]",
  },
  mixpanel: {
    border: "border-[#7856FF]/40 dark:border-[#7856FF]/50",
    bg: "bg-gradient-to-br from-[#7856FF]/10 via-[#7856FF]/5 to-violet-50 dark:from-[#7856FF]/20 dark:via-[#7856FF]/10 dark:to-violet-950",
    iconBg: "bg-[#7856FF]",
    iconText: "text-white",
    accent: "text-[#7856FF] dark:text-[#7856FF]",
    handleColor: "!bg-[#7856FF]",
    glow: "shadow-[0_0_15px_rgba(120,86,255,0.2)] dark:shadow-[0_0_20px_rgba(120,86,255,0.3)]",
  },
  amplitude: {
    border: "border-[#1B74F1]/40 dark:border-[#1B74F1]/50",
    bg: "bg-gradient-to-br from-[#1B74F1]/10 via-[#1B74F1]/5 to-blue-50 dark:from-[#1B74F1]/20 dark:via-[#1B74F1]/10 dark:to-blue-950",
    iconBg: "bg-[#1B74F1]",
    iconText: "text-white",
    accent: "text-[#1B74F1] dark:text-[#1B74F1]",
    handleColor: "!bg-[#1B74F1]",
    glow: "shadow-[0_0_15px_rgba(27,116,241,0.2)] dark:shadow-[0_0_20px_rgba(27,116,241,0.3)]",
  },

  // Smart Home / IoT
  mqtt: {
    border: "border-[#660066]/40 dark:border-[#660066]/50",
    bg: "bg-gradient-to-br from-[#660066]/10 via-[#660066]/5 to-purple-50 dark:from-[#660066]/20 dark:via-[#660066]/10 dark:to-purple-950",
    iconBg: "bg-[#660066]",
    iconText: "text-white",
    accent: "text-[#660066] dark:text-[#9933FF]",
    handleColor: "!bg-[#660066]",
    glow: "shadow-[0_0_15px_rgba(102,0,102,0.2)] dark:shadow-[0_0_20px_rgba(102,0,102,0.3)]",
  },
  homeassistant: {
    border: "border-[#18BCF2]/40 dark:border-[#18BCF2]/50",
    bg: "bg-gradient-to-br from-[#18BCF2]/10 via-[#18BCF2]/5 to-cyan-50 dark:from-[#18BCF2]/20 dark:via-[#18BCF2]/10 dark:to-cyan-950",
    iconBg: "bg-[#18BCF2]",
    iconText: "text-white",
    accent: "text-[#18BCF2] dark:text-[#18BCF2]",
    handleColor: "!bg-[#18BCF2]",
    glow: "shadow-[0_0_15px_rgba(24,188,242,0.2)] dark:shadow-[0_0_20px_rgba(24,188,242,0.3)]",
  },
  nodered: {
    border: "border-[#8F0000]/40 dark:border-[#8F0000]/50",
    bg: "bg-gradient-to-br from-[#8F0000]/10 via-[#8F0000]/5 to-red-50 dark:from-[#8F0000]/20 dark:via-[#8F0000]/10 dark:to-red-950",
    iconBg: "bg-[#8F0000]",
    iconText: "text-white",
    accent: "text-[#8F0000] dark:text-[#FF4444]",
    handleColor: "!bg-[#8F0000]",
    glow: "shadow-[0_0_15px_rgba(143,0,0,0.2)] dark:shadow-[0_0_20px_rgba(143,0,0,0.3)]",
  },
  philipshue: {
    border: "border-[#0065D3]/40 dark:border-[#0065D3]/50",
    bg: "bg-gradient-to-br from-[#0065D3]/10 via-[#0065D3]/5 to-blue-50 dark:from-[#0065D3]/20 dark:via-[#0065D3]/10 dark:to-blue-950",
    iconBg: "bg-gradient-to-br from-[#0065D3] to-[#00A9E0]",
    iconText: "text-white",
    accent: "text-[#0065D3] dark:text-[#00A9E0]",
    handleColor: "!bg-[#0065D3]",
    glow: "shadow-[0_0_15px_rgba(0,101,211,0.2)] dark:shadow-[0_0_20px_rgba(0,101,211,0.3)]",
  },
  // Steel Blue - saga (distributed transactions)
  saga: {
    border: "border-sky-300/60 dark:border-sky-600/40",
    bg: "bg-gradient-to-br from-sky-50 via-blue-50/50 to-indigo-50 dark:from-sky-950 dark:via-blue-950/50 dark:to-indigo-950",
    iconBg:
      "bg-gradient-to-br from-sky-600 to-blue-700 dark:from-sky-500 dark:to-blue-600",
    iconText: "text-white",
    accent: "text-sky-700 dark:text-sky-400",
    handleColor: "!bg-sky-600",
    glow: "shadow-[0_0_15px_rgba(2,132,199,0.15)] dark:shadow-[0_0_20px_rgba(2,132,199,0.25)]",
  },
} as const;

/** Map integration/plugin names to their brand theme */
export function getIntegrationTheme(name: string): NodeThemeKey {
  const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  const themeMap: Record<string, NodeThemeKey> = {
    linkedin: "linkedin",
    slack: "slack",
    discord: "discord",
    github: "github",
    google: "google",
    gmail: "google",
    googlesheets: "google",
    googledrive: "google",
    googlecalendar: "google",
    notion: "notion",
    stripe: "stripe",
    twilio: "twilio",
    openai: "openai",
    chatgpt: "openai",
    gpt: "openai",
    anthropic: "anthropic",
    claude: "anthropic",
    shopify: "shopify",
    hubspot: "hubspot",
    salesforce: "salesforce",
    mailchimp: "mailchimp",
    sendgrid: "sendgrid",
    dropbox: "dropbox",
    aws: "aws",
    s3: "aws",
    lambda: "aws",
    azure: "azure",
    jira: "jira",
    trello: "trello",
    asana: "asana",
    airtable: "airtable",
    figma: "figma",
    twitter: "twitter",
    x: "twitter",
    facebook: "facebook",
    meta: "facebook",
    instagram: "instagram",
    youtube: "youtube",
    zoom: "zoom",
    intercom: "intercom",
    zendesk: "zendesk",
    quickbooks: "quickbooks",
    xero: "xero",
    calendly: "calendly",
    typeform: "typeform",
    webflow: "webflow",
    monday: "monday",
    mondaycom: "monday",
    linear: "linear",
    supabase: "supabase",
    vercel: "vercel",
    netlify: "netlify",
    postgresql: "postgresql",
    postgres: "postgresql",
    mongodb: "mongodb",
    mongo: "mongodb",
    valkey: "valkey",
    segment: "segment",
    mixpanel: "mixpanel",
    amplitude: "amplitude",
    // Smart Home / IoT
    mqtt: "mqtt",
    homeassistant: "homeassistant",
    hass: "homeassistant",
    nodered: "nodered",
    philipshue: "philipshue",
    hue: "philipshue",
  };

  return themeMap[normalized] ?? "plugin";
}

export type NodeThemeKey = keyof typeof nodeThemes;

/** Handle configuration */
interface NodeHandle {
  type: "source" | "target";
  position: Position;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
}

/** Standard node dimensions for consistent sizing (must be even multiples of grid size 15px for center alignment) */
export const NODE_WIDTH = 270;
export const NODE_MIN_HEIGHT = 120;

/** Base node props */
interface BaseNodeProps {
  id: string;
  /** Node theme key or custom theme */
  theme: NodeThemeKey | NodeTheme;
  /** Icon component */
  icon: LucideIcon;
  /** Node title/label */
  label: string;
  /** Optional description */
  description?: string;
  /** Optional badge text */
  badge?: string;
  /** Badge variant */
  badgeVariant?: "default" | "outline" | "secondary" | "destructive";
  /** Whether node is selected */
  selected?: boolean;
  /** Handle configurations */
  handles?: NodeHandle[];
  /** Custom content to render in body */
  children?: ReactNode;
  /** Footer content (buttons, etc.) */
  footer?: ReactNode;
  /** Handle labels at bottom */
  handleLabels?: { left?: string; right?: string };
  /** Click handler */
  onClick?: () => void;
  /** Delete handler */
  onDelete?: () => void;
}

/**
 * Base node component providing consistent styling across all workflow nodes.
 *
 * Features:
 * - Fixed width (280px) and minimum height (120px) for consistent canvas layout
 * - Clean header with icon in rounded container
 * - Consistent spacing and typography
 * - Dark mode support
 * - Hover and selection states
 */
export const BaseNode = memo(
  ({
    theme,
    icon: Icon,
    label,
    description,
    badge,
    badgeVariant = "outline",
    selected,
    handles = [],
    children,
    footer,
    handleLabels,
    onClick,
    onDelete,
  }: BaseNodeProps) => {
    const themeConfig = typeof theme === "string" ? nodeThemes[theme] : theme;

    return (
      <div
        className={cn(
          "group relative cursor-pointer rounded-xl border px-4 py-3",
          themeConfig.border,
          themeConfig.bg,
          themeConfig.glow,
          selected &&
            "ring-2 ring-primary ring-offset-2 ring-offset-background",
        )}
        style={{ width: NODE_WIDTH, minHeight: NODE_MIN_HEIGHT }}
        onClick={onClick}
      >
        {/* Delete button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full border bg-background opacity-0 shadow-md transition-opacity group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
        >
          <Trash2 className="h-3 w-3 text-destructive" />
        </Button>

        {/* Header */}
        <div className="flex min-w-0 items-center justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            {/* Icon container - gemstone style with gradient and subtle shadow */}
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm",
                themeConfig.iconBg,
              )}
            >
              <Icon className={cn("h-5 w-5", themeConfig.iconText)} />
            </div>
            {/* Title and description */}
            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
              <span className="truncate font-medium text-foreground">
                {label}
              </span>
              {description && (
                <span className="truncate text-muted-foreground text-xs">
                  {description}
                </span>
              )}
            </div>
          </div>
          {/* Badge */}
          {badge && (
            <Badge
              variant={badgeVariant}
              className={cn(
                "shrink-0 border-transparent text-xs",
                themeConfig.iconBg,
                themeConfig.iconText,
              )}
            >
              {badge}
            </Badge>
          )}
        </div>

        {/* Body content */}
        {children && <div className="mt-3 space-y-2">{children}</div>}

        {/* Footer */}
        {footer && <div className="mt-3">{footer}</div>}

        {/* Handle labels */}
        {handleLabels && (
          <div className="mt-2 flex justify-between px-2 text-[10px] text-muted-foreground">
            <span>{handleLabels.left}</span>
            <span>{handleLabels.right}</span>
          </div>
        )}

        {/* Handles for connections */}
        {handles.map((handle, index) => (
          <Handle
            key={handle.id || `${handle.type}-${handle.position}-${index}`}
            type={handle.type}
            position={handle.position}
            id={handle.id}
            className={cn(
              "h-3 w-3",
              handle.className || themeConfig.handleColor,
            )}
            style={handle.style}
          />
        ))}
      </div>
    );
  },
);

BaseNode.displayName = "BaseNode";

/** Info row component for displaying key-value pairs */
export const NodeInfoRow = memo(
  ({
    label,
    value,
    className,
  }: {
    label: string;
    value: ReactNode;
    className?: string;
  }) => (
    <div
      className={cn(
        "flex min-w-0 items-center justify-between gap-2 overflow-hidden text-sm",
        className,
      )}
    >
      <span className="shrink-0 text-muted-foreground">{label}</span>
      <span className="min-w-0 truncate text-foreground">{value}</span>
    </div>
  ),
);

NodeInfoRow.displayName = "NodeInfoRow";

/** Code/expression display component */
export const NodeCodeBlock = memo(
  ({ children, className }: { children: ReactNode; className?: string }) => (
    <div
      className={cn(
        "rounded-md bg-muted px-2 py-1 font-mono text-foreground text-xs",
        className,
      )}
    >
      {children}
    </div>
  ),
);

NodeCodeBlock.displayName = "NodeCodeBlock";

/** Action button for node testing/actions */
export const NodeActionButton = memo(
  ({
    children,
    onClick,
    variant = "default",
    className,
  }: {
    children: ReactNode;
    onClick?: (e: React.MouseEvent) => void;
    variant?: "default" | "success" | "danger" | "warning";
    className?: string;
  }) => {
    const variantClasses = {
      default: "bg-muted text-foreground hover:bg-muted/80",
      success:
        "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300",
      danger:
        "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300",
      warning:
        "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300",
    };

    return (
      <div
        className={cn(
          "cursor-pointer rounded-md px-3 py-1.5 text-center font-medium text-xs transition-colors",
          variantClasses[variant],
          className,
        )}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(e);
        }}
      >
        {children}
      </div>
    );
  },
);

NodeActionButton.displayName = "NodeActionButton";
