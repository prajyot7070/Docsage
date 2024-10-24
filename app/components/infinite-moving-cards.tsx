"use client";
import { cn } from "../lib/utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import python from "../assets/python_logo.png";
import java from "../assets/javaLogo.png";
import cpp from "../assets/cppLogo.png";
import cLogo from "../assets/cLogo.png";

export const InfiniteMovingCards = ({
  //items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
//  items: {
 //   imageUrl: string;
  //}[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  
  const logos = [cLogo, cpp, java, python]; // Array of logos

  useEffect(() => {
    addAnimation();
  }, []);
  
  const [start, setStart] = useState(false);
  
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });
      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards");
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse");
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

 return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {logos.map((logo, idx) => (
          <li
            key={idx}
            className="flex-shrink-0 px-3 mt-5"
          >
            <Image 
              src={logo}
              alt={`Logo ${idx}`}
              width={100}  // Set appropriate width
              height={100} // Set appropriate height
              className="object-contain"
              priority={true}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
