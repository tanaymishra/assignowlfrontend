import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import css from "./drawer.module.scss";

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
  const [mounted, setMounted] = useState(isOpen);
  const [visible, setVisible] = useState(isOpen);
  const draggerRef = useRef<HTMLDivElement>(null);
  const [isPressed, setIsPressed] = useState<pressState>({
    isPressed: false,
    time: 0,
    position: 0
  });
  const [draggerPercentage, setDraggerPercentage] = useState(0);
  const [animationNone, setAnimationNone] = useState(false);


  const decideState = (velocity: number, draggerPercentage: number) => {
    if(!window || window.innerWidth>=768){return}
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
    if (isOpen) {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [isOpen]);
  useEffect(() => {
    let timeout = setTimeout(() => {
      setAnimationNone(true);
    }, 300);
    return () => { clearTimeout(timeout) }
  }, [])

  const handleAnimationEnd = () => {
    if (!visible) {
      setMounted(false);
    }
  };

  if (!mounted) return null;

  return (
    <div
      className={`${css.drawerOverlay} ${!visible ? css.fadeOut : ''}`}
      onClick={onClose}
      style={incomingStyles}
    >
      <div
        className={`${css.drawer} ${css[position]} ${visible ? css.enter : css.exit} ${animationNone ? css.animNone : null} ${className}`}
        style={isPressed.isPressed ? {
          width, height,
          transform: `translateY(${draggerPercentage}%)`,
          animation: 'none',
          transition: 'none',

        } : {
          width,
          height,
        }}
        onAnimationEnd={handleAnimationEnd}
        onClick={(e)=>{
          e.stopPropagation();
        }}
      >
        <div className={css.dragger} ref={draggerRef}>
          <span className={css.point}></span>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Drawer;


//hacky implementation for intial animation to show but but then make animation none as well i think there might be a better approach than this
//Physics utils is required -- need to think to build it