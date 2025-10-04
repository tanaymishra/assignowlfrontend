"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconChartBar,
  IconClipboardCheck,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/store";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DashboardSidebar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  
  const links = [
    {
      label: "Assignment Scorer",
      href: "/scorer",
      icon: (
        <IconClipboardCheck className="h-5 w-5 shrink-0 text-muted-foreground group-hover/sidebar:text-primary transition-colors duration-300" />
      ),
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-muted-foreground group-hover/sidebar:text-primary transition-colors duration-300" />
      ),
    },
    {
      label: "History",
      href: "/previous-marks",
      icon: (
        <IconChartBar className="h-5 w-5 shrink-0 text-muted-foreground group-hover/sidebar:text-primary transition-colors duration-300" />
      ),
    },
    {
      label: "Settings",
      href: "/settings",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-muted-foreground group-hover/sidebar:text-primary transition-colors duration-300" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-6 lg:gap-10">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          {open ? <Logo /> : <LogoIcon />}
          <motion.div 
            className="mt-6 lg:mt-8 flex flex-col gap-1"
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
            
            {/* Logout button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * links.length }}
            >
              <motion.button
                onClick={handleLogout}
                className={cn(
                  "flex items-center justify-start gap-3 group/sidebar py-3 px-3 rounded-xl transition-all duration-300 relative overflow-hidden min-h-[44px] touch-manipulation w-full",
                  "hover:bg-destructive/20 hover:backdrop-blur-sm text-muted-foreground hover:text-destructive hover:shadow-lg hover:shadow-destructive/10 active:bg-destructive/30"
                )}
                whileHover={{ 
                  scale: 1.02,
                  x: 4
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {/* Glassy hover effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-destructive/10 via-destructive/5 to-transparent"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                <motion.div
                  className="relative z-10 flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <IconArrowLeft className="h-5 w-5 shrink-0 text-muted-foreground group-hover/sidebar:text-destructive transition-colors duration-300" />
                </motion.div>

                <motion.span
                  animate={{
                    display: open ? "inline-block" : "none",
                    opacity: open ? 1 : 0,
                    x: open ? 0 : -10,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="text-sm font-medium whitespace-pre inline-block !p-0 !m-0 relative z-10 flex-1 min-w-0"
                >
                  Logout
                </motion.span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* User info at bottom */}
        {user && (
          <motion.div 
            className="border-t border-border/40 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center space-x-3 px-3 py-2">
              <motion.div 
                className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/20"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <IconUserBolt className="h-4 w-4 text-primary" />
              </motion.div>
              <motion.span
                animate={{
                  display: open ? "inline-block" : "none",
                  opacity: open ? 1 : 0,
                  x: open ? 0 : -10,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="text-sm font-medium text-foreground"
              >
                {user.name}
              </motion.span>
            </div>
          </motion.div>
        )}
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