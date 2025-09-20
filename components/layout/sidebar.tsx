"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconFileText,
  IconChartBar,
  IconClipboardCheck,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function DashboardSidebar() {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-muted-foreground group-hover/sidebar:text-primary transition-colors duration-300" />
      ),
    },
    {
      label: "Assignments",
      href: "/assignments",
      icon: (
        <IconFileText className="h-5 w-5 shrink-0 text-muted-foreground group-hover/sidebar:text-primary transition-colors duration-300" />
      ),
    },
    {
      label: "Analytics",
      href: "/analytics",
      icon: (
        <IconChartBar className="h-5 w-5 shrink-0 text-muted-foreground group-hover/sidebar:text-primary transition-colors duration-300" />
      ),
    },
    {
      label: "Assignment Scorer",
      href: "/scorer",
      icon: (
        <IconClipboardCheck className="h-5 w-5 shrink-0 text-muted-foreground group-hover/sidebar:text-primary transition-colors duration-300" />
      ),
    },
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-muted-foreground group-hover/sidebar:text-primary transition-colors duration-300" />
      ),
    },
    {
      label: "Settings",
      href: "/settings",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-muted-foreground group-hover/sidebar:text-primary transition-colors duration-300" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-muted-foreground group-hover/sidebar:text-destructive transition-colors duration-300" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          {open ? <Logo /> : <LogoIcon />}
          <motion.div 
            className="mt-8 flex flex-col gap-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {links.map((link, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * idx }}
              >
                <SidebarLink link={link} />
              </motion.div>
            ))}
          </motion.div>
        </div>
        <motion.div 
          className="border-t border-border/40 pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <SidebarLink
            link={{
              label: "John Doe",
              href: "#",
              icon: (
                <motion.div 
                  className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/20"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <IconUserBolt className="h-4 w-4 text-primary" />
                </motion.div>
              ),
            }}
          />
        </motion.div>
      </SidebarBody>
    </Sidebar>
  );
}

export const Logo = () => {
  return (
    <motion.a
      href="#"
      className="relative z-20 flex items-center space-x-3 py-2 text-sm font-normal"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        whileHover={{ rotate: 5 }}
        transition={{ duration: 0.3 }}
      >
        <Image 
          src="/comman/logo.svg" 
          width={28} 
          height={28} 
          alt="Logo" 
          className="h-7 w-7 shrink-0"
        />
      </motion.div>
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="font-semibold whitespace-pre text-foreground"
      >
        AssignOwl
      </motion.span>
    </motion.a>
  );
};

export const LogoIcon = () => {
  return (
    <motion.a
      href="#"
      className="relative z-20 flex items-center justify-center py-2 text-sm font-normal"
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        whileHover={{ rotate: 10 }}
        transition={{ duration: 0.3 }}
      >
        <Image 
          src="/comman/logo.svg" 
          width={28} 
          height={28} 
          alt="Logo" 
          className="h-7 w-7 shrink-0"
        />
      </motion.div>
    </motion.a>
  );
};