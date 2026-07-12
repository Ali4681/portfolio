"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DigitalWorld = dynamic(() => import("../experience/DigitalWorld"), {
  ssr: false,
});
export default function WorldCanvas({
  active,
  reduced,
  theme,
}: {
  active: boolean;
  reduced: boolean;
  theme: "dark" | "light";
}) {
  const [canMount, setCanMount] = useState(false);

  useEffect(() => {
    if (reduced) return;

    let idleCallback: number | undefined;
    let fallbackTimer: ReturnType<typeof setTimeout> | undefined;
    if ("requestIdleCallback" in window) {
      idleCallback = requestIdleCallback(() => setCanMount(true), {
        timeout: 500,
      });
    } else {
      fallbackTimer = setTimeout(() => setCanMount(true), 0);
    }

    return () => {
      if (idleCallback !== undefined) cancelIdleCallback(idleCallback);
      if (fallbackTimer !== undefined) clearTimeout(fallbackTimer);
    };
  }, [reduced]);

  return reduced || !canMount ? null : (
    <DigitalWorld active={active} theme={theme} />
  );
}
