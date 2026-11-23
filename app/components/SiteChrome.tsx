"use client";

import { usePathname } from "next/navigation";
import MotionProvider from "./MotionProvider";
import SmoothScroll from "./SmoothScroll";
import PageFx from "./PageFx";
import PageLoader from "./PageLoader";
import Header from "./Header";
import VimeoMiniPlayer from "./VimeoMiniPlayer";

/**
 * The site's header, footer, loader and scroll effects. Left out on /studio,
 * where Sanity Studio needs the whole screen and its own scrolling.
 */
export default function SiteChrome({ footer, children }: { footer: React.ReactNode; children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/studio")) return <>{children}</>;

  return (
    <MotionProvider>
      <SmoothScroll />
      <PageFx />
      <PageLoader />
      <Header />
      {children}
      {footer}
      <VimeoMiniPlayer />
    </MotionProvider>
  );
}
