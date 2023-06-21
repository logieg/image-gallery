"use client";
import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * A jittery temporary fix for NextJS forcing a scroll to top when query params are changed
 * Tracking issue: https://github.com/vercel/next.js/issues/49087
 */
export default function ScrollPreserver() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPathname = useRef(pathname);
  const scrollPos = useRef(0);

  const saveScrollPos = () => {
    if (window.scrollY > 0)
      scrollPos.current = window.scrollY;
  };

  useEffect(() => {
    if (pathname === lastPathname.current) {
      window.scrollTo(0, scrollPos.current);
    } else {
      lastPathname.current = pathname;
    }

    window.addEventListener('scroll', saveScrollPos);
    return () => window.removeEventListener('scroll', saveScrollPos);
  }, [pathname, searchParams]);

  return (
    <></>
  );
}
