"use client";

import * as React from "react";
import DynamicActionBar, { type ActionItem } from "@/components/ui/dynamic-action";
import {
  LayoutGrid,
  CodeXml,
  BookText,
  MessageSquare,
  Users,
  Link,
} from "lucide-react";

/* ── Panel contents ── */
const AppsContent = () => (
  <div className="flex flex-col items-center p-3">
    <div className="flex w-[95%] cursor-pointer items-center gap-3 rounded-2xl py-2 duration-300 hover:bg-black/5 hover:px-3">
      <Users className="h-12 w-12 shrink-0 rounded-lg bg-blue-100 p-3 text-blue-600" />
      <div className="flex w-full flex-col items-start">
        <p className="font-bold leading-tight">Gather</p>
        <p className="text-sm opacity-80">Virtual Office</p>
      </div>
      <span className="block shrink-0 rounded-lg border border-black/50 py-0.5 px-2 text-xs opacity-80">
        Mac
      </span>
    </div>
    <div className="flex w-[95%] cursor-pointer items-center gap-3 rounded-2xl py-2 duration-300 hover:bg-black/5 hover:px-3">
      <MessageSquare className="h-12 w-12 shrink-0 rounded-lg bg-purple-100 p-3 text-purple-600" />
      <div className="flex w-full flex-col items-start">
        <p className="font-bold leading-tight">Slack</p>
        <p className="text-sm opacity-80">Communication App</p>
      </div>
      <span className="block shrink-0 rounded-lg border border-black/50 py-0.5 px-2 text-xs opacity-80">
        Windows
      </span>
    </div>
    <div className="mt-1.5 h-[2px] w-[95%] bg-black/10"></div>
  </div>
);

const ComponentsContent = () => (
  <div className="flex flex-col items-center px-5 py-3">
    {[
      { name: "Action Bar", tag: "Dynamic", date: "06 - 12" },
      { name: "Image Expand", tag: "Overlay", date: "05 - 12" },
      { name: "Read Time", tag: "Scroll", date: "04 - 12" },
    ].map((item) => (
      <div key={item.name} className="group w-full">
        <div className="mx-auto flex w-full cursor-pointer items-center justify-between gap-3 rounded-2xl py-1.5 duration-300 group-hover:w-[95%] group-hover:bg-black/5 group-hover:px-3">
          <div className="flex items-center gap-3">
            <CodeXml className="size-5 shrink-0 opacity-75" />
            <span className="text-sm font-bold">{item.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="block shrink-0 rounded-lg border border-black/50 py-0.5 px-2 text-xs opacity-80">
              {item.tag}
            </span>
            <span className="text-sm">{item.date}</span>
          </div>
        </div>
      </div>
    ))}
    <div className="mt-1.5 h-[2px] w-full bg-black/10"></div>
  </div>
);

const NotesContent = () => (
  <div className="flex flex-col items-center p-3">
    {[
      { name: "Changelog using GitHub", date: "Jun, 24" },
      { name: "Feedback in Slack", date: "May, 24" },
    ].map((item) => (
      <div key={item.name} className="group w-full">
        <div className="mx-auto flex w-full cursor-pointer items-center justify-between gap-3 rounded-2xl py-2 duration-300 group-hover:w-[95%] group-hover:bg-black/5 group-hover:px-3">
          <div className="flex items-center gap-3">
            <Link className="size-5" />
            <span className="text-sm font-bold">{item.name}</span>
          </div>
          <span className="text-sm">{item.date}</span>
        </div>
      </div>
    ))}
    <div className="mt-1.5 h-[2px] w-full bg-black/10"></div>
  </div>
);

/* ── Action definitions ── */
const actions: ActionItem[] = [
  {
    id: "skills",
    label: "Skills",
    icon: LayoutGrid,
    content: <AppsContent />,
    dimensions: { width: 470, height: 176 },
  },
  {
    id: "projects",
    label: "Projects",
    icon: CodeXml,
    content: <ComponentsContent />,
    dimensions: { width: 470, height: 152 },
  },
  {
    id: "resume",
    label: "Resume",
    icon: BookText,
    content: <NotesContent />,
    dimensions: { width: 470, height: 120 },
  },
];

/* Hero integration — bare bar; positioning handled by
   .hero__action-bar in app/globals.css (bottom-left on desktop,
   centered above the fold on mobile). */
export default function DynamicActionBarDemo() {
  return <DynamicActionBar actions={actions} />;
}

/* Standalone preview — gradient stage wrapper. */
export function DemoOne() {
  return (
    <div className="flex h-[450px] w-full items-end justify-center rounded-lg bg-gradient-to-br from-pink-300 via-rose-300 to-orange-300 p-4 pb-14">
      <DynamicActionBar actions={actions} />
    </div>
  );
}
