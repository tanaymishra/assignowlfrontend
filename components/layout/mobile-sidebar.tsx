"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import {
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconFileText,
  IconChartBar,
  IconClipboardCheck,
  IconArrowLeft,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const { user, logout } = useAuth();
  
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
      ),
    },
    {
      label: "Assignments",
      href: "/assignments",
      icon: (
        <IconFileText className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
      ),
    },
    {
      label: "Analytics",
      href: "/analytics",
      icon: (
        <IconChartBar className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
      ),
    },
    {
      label: "Assignment Scorer",
      href: "/scorer",
      icon: (
        <IconClipboardCheck className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
      ),
    },
    {
      label: "Previous Marks",
      href: "/previous-marks",
      icon: (
        <IconChartBar className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
      ),
    },
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
      ),
    },
    {
      label: "Settings",
      href: "/settings",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
      ),
    },
  ];

  const handleLogout = () => {
    logout();
    onClose();
  };

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90] md:hidden"
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="fixed left-0 top-0 h-full w-[280px] bg-background/95 backdrop-blur-xl border-r border-border/40 z-[100] flex flex-col justify-between p-6 md:hidden shadow-2xl"
          >
            {/* Glassy overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
            
            {/* Close button */}
            <motion.button
              className="absolute right-4 top-4 z-50 text-foreground p-2 rounded-lg hover:bg-muted/50 transition-colors tap-target"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-5 w-5" />
            </motion.button>
            
            <div className="relative z-10 pt-8 flex-1 flex flex-col">
              {/* Logo */}
              <motion.div
                className="flex items-center space-x-3 py-2 text-sm font-normal mb-8"
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
                <span className="font-semibold whitespace-pre text-foreground">
                  AssignOwl
                </span>
              </motion.div>

              {/* Navigation Links */}
              <div className="flex-1 flex flex-col gap-1">
                {links.map((link, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * idx }}
                  >
                    <Link
                      href={link.href}
                      onClick={handleLinkClick}
                      className={cn(
                        "flex items-center justify-start gap-3 group py-3 px-3 rounded-xl transition-all duration-300 relative overflow-hidden min-h-[44px] touch-manipulation",
                        "hover:bg-background/30 hover:backdrop-blur-sm text-muted-foreground hover:text-foreground hover:shadow-lg hover:shadow-primary/10 active:bg-background/40"
                      )}
                    >
                      {/* Glassy hover effect */}
                      <motion.div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent"
                        initial={{ scale: 0.8 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      <div className="relative z-10 flex-shrink-0">
                        {link.icon}
                      </div>

                      <span className="text-sm font-medium whitespace-pre relative z-10 flex-1 min-w-0">
                        {link.label}
                      </span>
                    </Link>
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
                      "flex items-center justify-start gap-3 group py-3 px-3 rounded-xl transition-all duration-300 relative overflow-hidden min-h-[44px] touch-manipulation w-full",
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
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-destructive/10 via-destructive/5 to-transparent"
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <motion.div
                      className="relative z-10 flex-shrink-0"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <IconArrowLeft className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-destructive transition-colors duration-300" />
                    </motion.div>

                    <span className="text-sm font-medium whitespace-pre relative z-10 flex-1 min-w-0">
                      Logout
                    </span>
                  </motion.button>
                </motion.div>
              </div>
              
              {/* User info at bottom */}
              {user && (
                <motion.div 
                  className="border-t border-border/40 pt-4 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    href="/profile"
                    onClick={handleLinkClick}
                    className={cn(
                      "flex items-center justify-start gap-3 group py-3 px-3 rounded-xl transition-all duration-300 relative overflow-hidden min-h-[44px] touch-manipulation",
                      "hover:bg-background/30 hover:backdrop-blur-sm text-muted-foreground hover:text-foreground hover:shadow-lg hover:shadow-primary/10 active:bg-background/40"
                    )}
                  >
                    {/* Glassy hover effect */}
                    <motion.div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent"
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <motion.div 
                      className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/20 relative z-10"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <IconUserBolt className="h-4 w-4 text-primary" />
                    </motion.div>

                    <span className="text-sm font-medium whitespace-pre relative z-10 flex-1 min-w-0">
                      {user.name}
                    </span>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}