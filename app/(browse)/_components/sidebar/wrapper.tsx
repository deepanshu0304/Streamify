"use client"

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { useEffect, useState } from "react";
import { ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton } from "./recommended";
import { FollowingSkeleton } from "./following";

interface wrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: wrapperProps) => {

  const { collapsed } = useSidebar((state) => state);

  const [isClient, setisClient] = useState(false);

  useEffect(() => {
    setisClient(true);
  }, []);

  if (!isClient) {
    return <aside className="fixed left-0 w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
      <ToggleSkeleton />
      <FollowingSkeleton/>
      <RecommendedSkeleton />
    </aside>
  }
  return (
    <aside className={cn("fixed left-0 w-60 h-full bg-background border-r border-[#2D2E35] z-50",
      collapsed && "w-[70px]")}>
      {children}
    </aside>
  )
};
