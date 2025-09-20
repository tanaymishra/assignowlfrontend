"use client";
import { cn } from "@/lib/utils";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconMenu2, IconX } from "@tabler/icons-react";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "h-screen px-6 py-6 hidden md:flex md:flex-col bg-background/20 backdrop-blur-xl border-r border-border/20 w-[280px] shrink-0 shadow-2xl relative sticky top-0",
          className
        )}
        animate={{
          width: animate ? (open ? "280px" : "80px") : "280px",
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {/* Glassy overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background/30 rounded-r-2xl" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-r-2xl" />
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          "h-16 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-background/20 backdrop-blur-xl border-b border-border/20 w-full relative"
        )}
        {...props}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 to-background/10" />
        <div className="flex justify-end z-20 w-full relative">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IconMenu2
              className="text-foreground h-6 w-6 cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </motion.div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-background/20 backdrop-blur-xl p-10 z-[100] flex flex-col justify-between relative",
                className
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-background/30" />
              <motion.div
                className="absolute right-10 top-10 z-50 text-foreground cursor-pointer"
                onClick={() => setOpen(!open)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IconX className="h-6 w-6" />
              </motion.div>
              <div className="relative z-10">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
}) => {
  const { open, animate } = useSidebar();
  const isLogout = link.label === "Logout";
  
  return (
    <motion.a
      href={link.href}
      className={cn(
        "flex items-center justify-start gap-3 group/sidebar py-3 px-3 rounded-xl transition-all duration-300 relative overflow-hidden",
        isLogout 
          ? "hover:bg-destructive/20 hover:backdrop-blur-sm text-muted-foreground hover:text-destructive hover:shadow-lg hover:shadow-destructive/10" 
          : "hover:bg-background/30 hover:backdrop-blur-sm text-muted-foreground hover:text-foreground hover:shadow-lg hover:shadow-primary/10",
        className
      )}
      whileHover={{ 
        scale: 1.02,
        x: 4
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {/* Glassy hover effect */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-xl opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300",
          isLogout 
            ? "bg-gradient-to-r from-destructive/10 via-destructive/5 to-transparent" 
            : "bg-gradient-to-r from-primary/10 via-primary/5 to-transparent"
        )}
        initial={{ scale: 0.8 }}
        whileHover={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      <motion.div
        className="relative z-10"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        {link.icon}
      </motion.div>

      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
          x: animate ? (open ? 0 : -10) : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="text-sm font-medium whitespace-pre inline-block !p-0 !m-0 relative z-10"
      >
        {link.label}
      </motion.span>
    </motion.a>
  );
};
