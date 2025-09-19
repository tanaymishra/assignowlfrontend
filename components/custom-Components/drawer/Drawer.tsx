import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import { CSSTransition } from 'react-transition-group';
import { cn } from "@/lib/utils";
import './drawer-transitions.css';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
  height?: string;
  position?: 'right' | 'left';
  className?: string;
  incomingStyles?: CSSProperties;
}

interface pressState {
  isPressed: boolean;
  time: number;
  position: number;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  width = '400px',
  height = '100%',
  position = 'right',
  className = '',
  incomingStyles
}) => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const draggerRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isPressed, setIsPressed] = useState<pressState>({
    isPressed: false,
    time: 0,
    position: 0
  });
  const [draggerPercentage, setDraggerPercentage] = useState(0);


  const decideState = (velocity: number, draggerPercentage: number) => {
    if (!window || window.innerWidth >= 768) { return }
    if (velocity < -2) {
      onClose();
    }
    if (draggerPercentage > 50) {
      onClose();
    }
    setDraggerPercentage(0);
  };

  useEffect(() => {
    if (!draggerRef.current) return;

    const element = draggerRef.current;

    const handleStart = (e: MouseEvent | TouchEvent) => {
      setIsPressed({
        isPressed: true,
        time: Date.now(),
        position: 'touches' in e
          ? (e as TouchEvent).touches[0].clientY
          : (e as MouseEvent).clientY
      });
    };

    const handleEnd = (e: MouseEvent | TouchEvent) => {
      const endTime = Date.now();
      const currentPosition = 'touches' in e
        ? (e as TouchEvent).changedTouches[0].clientY
        : (e as MouseEvent).clientY;
      const deltaY = isPressed.position - currentPosition;
      const deltaTime = endTime - isPressed.time; // Time in milliseconds
      const velocity = deltaY / deltaTime; // Pixels per millisecond

      const dragPercent = Math.ceil(currentPosition / window.innerHeight * 100);
      const finalDraggerPercentage = dragPercent <= 0 ? 0 : dragPercent;

      decideState(velocity, finalDraggerPercentage);

      setIsPressed({
        isPressed: false,
        time: 0,
        position: 0
      });
      setDraggerPercentage(0);
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isPressed.isPressed) return;

      const clientY = 'touches' in e
        ? (e as TouchEvent).touches[0].clientY
        : (e as MouseEvent).clientY;
      let dragPercent = Math.ceil(clientY / window.innerHeight * 100)
      setDraggerPercentage(dragPercent <= 0 ? 0 : dragPercent);
    };

    // Mouse events
    element.addEventListener('mousedown', handleStart);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('mousemove', handleMove);

    // Touch events
    element.addEventListener('touchstart', handleStart);
    document.addEventListener('touchend', handleEnd);
    document.addEventListener('touchmove', handleMove);

    return () => {
      // Mouse cleanup
      element.removeEventListener('mousedown', handleStart);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('mousemove', handleMove);

      // Touch cleanup
      element.removeEventListener('touchstart', handleStart);
      document.removeEventListener('touchend', handleEnd);
      document.removeEventListener('touchmove', handleMove);
    };
  }, [isPressed.isPressed]);

  useEffect(() => {
    setMounted(isOpen);

    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="drawer-overlay"
        unmountOnExit
        nodeRef={overlayRef}
      >
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 backdrop-blur-sm bg-black/20"
          style={incomingStyles}
          onClick={onClose}
        />
      </CSSTransition>

      {/* Drawer */}
      <CSSTransition
        in={isOpen}
        timeout={400}
        classNames={isMobile ? "drawer-mobile" : `drawer-${position}`}
        unmountOnExit
        nodeRef={drawerRef}
      >
        <div
          ref={drawerRef}
          className={cn(
            "fixed bg-background shadow-xl overflow-hidden z-50",
            // Desktop positioning and borders
            !isMobile && position === 'right' && "top-0 right-0 h-full border-l border-border",
            !isMobile && position === 'left' && "top-0 left-0 h-full border-r border-border",
            // Mobile positioning and styling
            isMobile && "bottom-0 left-0 w-full h-full border-t border-border rounded-t-2xl",
            // Ensure mobile takes full width
            isMobile && "!w-full !max-w-none",
            className
          )}
          style={isPressed.isPressed ? {
            ...(isMobile ? {} : { width, height }),
            transform: `translateY(${draggerPercentage}%)`,
          } : {
            ...(isMobile ? {} : { width, height }),
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {/* Mobile dragger */}
          <div
            className={cn(
              "hidden max-md:flex w-full h-5 bg-muted justify-center items-center cursor-grab active:cursor-grabbing"
            )}
            ref={draggerRef}
          >
            <span className="w-10 h-2 bg-muted-foreground rounded-full drawer-dragger-handle" />
          </div>

          {/* Content */}
          <div className="drawer-content">
            {children}
          </div>
        </div>
      </CSSTransition>


    </>
  );
};

export default Drawer;


//hacky implementation for intial animation to show but but then make animation none as well i think there might be a better approach than this
//Physics utils is required -- need to think to build it