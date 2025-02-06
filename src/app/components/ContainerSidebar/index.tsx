"use client";
import { FC, ReactNode } from "react";
import { useSidebarAdminStore } from "@/store/useSidebarAdminStore";
import { cn } from "@/utils";

const ContainerSidebar: FC<{ children: ReactNode }> = ({ children }) => {
  const { isOpen } = useSidebarAdminStore();
  return (
    <div className="w-full flex">
      <div className={cn('hidden', isOpen? 'md:block md:w-1/6' : '')}>
        &nbsp;
      </div>
      <div className={cn('w-full', isOpen? 'md:w-5/6' : '')}>
        {children}
      </div>
  </div>
  );
};

export default ContainerSidebar;
