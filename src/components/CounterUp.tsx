import { useEffect, useState, useRef } from "react";

interface CounterUpProps {
  end: number;
  durationMs?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export default function CounterUp({
  end,
  durationMs = 2000,
  prefix = "",
  suffix = "",
  decimals = 0,
}: CounterUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          let startTime: number | null = null;

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / durationMs, 1);

            // easeOutQuad curve
            const ease = percentage * (2 - percentage);
            const currentVal = ease * end;

            setCount(currentVal);

            if (percentage < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, durationMs, hasStarted]);

  return (
    <span ref={ref} className="font-mono">
      {prefix}
      {count.toLocaleString("fa-IR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping: false,
      })}
      {suffix}
    </span>
  );
}
