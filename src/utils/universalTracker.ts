function generateUUID(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getCookie(name: string): string | null {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function setCookie(name: string, value: string, days: number) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  const host = window.location.hostname;
  let domain = "";
  if (host.includes("hexerapp.ir")) {
    domain = "; domain=.hexerapp.ir";
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/" + domain + "; samesite=lax";
}

function decorateUrl(urlString: string, anonymousId: string, utms: Record<string, string>): string {
  try {
    const url = new URL(urlString);
    if (anonymousId) {
      url.searchParams.set("anonymous_id", anonymousId);
    }
    Object.entries(utms).forEach(([key, val]) => {
      if (val) {
        url.searchParams.set(key, val);
      }
    });
    return url.toString();
  } catch (e) {
    return urlString;
  }
}

function decorateAllLinks(anonymousId: string, utms: Record<string, string>) {
  const links = document.querySelectorAll('a[href*="hexerapp.ir"]');
  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    if (link.getAttribute("data-decorated") === "true") return;

    const decorated = decorateUrl(href, anonymousId, utms);
    link.setAttribute("href", decorated);
    link.setAttribute("data-decorated", "true");
  });
}

export function initUniversalTracker() {
  if (typeof window === "undefined") return () => {};

  // 1. UTM parsing
  const urlParams = new URLSearchParams(window.location.search);
  const utms = {
    utm_source: urlParams.get("utm_source") || "",
    utm_medium: urlParams.get("utm_medium") || "",
    utm_campaign: urlParams.get("utm_campaign") || "",
    utm_term: urlParams.get("utm_term") || "",
    utm_content: urlParams.get("utm_content") || "",
  };

  // 2. Cookie resolution (with client-side fallback)
  let anonymousId = getCookie("anonymous_id");
  if (!anonymousId) {
    anonymousId = generateUUID();
    setCookie("anonymous_id", anonymousId, 365);
  }

  // 3. Post Event to Supabase if UTMs are present
  const hasUtm = Object.values(utms).some((val) => val !== "");
  if (hasUtm) {
    const supabaseUrl = (import.meta as any).env.VITE_ANALYTICS_SUPABASE_URL;
    const supabaseAnonKey = (import.meta as any).env.VITE_ANALYTICS_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      fetch(`${supabaseUrl}/rest/v1/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": supabaseAnonKey,
          "Authorization": `Bearer ${supabaseAnonKey}`,
          "Prefer": "return=minimal",
        },
        body: JSON.stringify({
          anonymous_id: anonymousId,
          event_type: "page_view",
          utm_source: utms.utm_source || null,
          utm_medium: utms.utm_medium || null,
          utm_campaign: utms.utm_campaign || null,
          utm_term: utms.utm_term || null,
          utm_content: utms.utm_content || null,
          landing_host: window.location.hostname || null,
          page_path: window.location.pathname || null,
          referrer: document.referrer || null,
        }),
      }).catch((err) => {
        console.error("Failed to send tracking event to Supabase:", err);
      });
    } else {
      console.warn("Supabase configuration missing or incomplete. Event tracking skipped.");
    }
  }

  // 4. Decorate Links and observe mutations
  decorateAllLinks(anonymousId, utms);

  const observer = new MutationObserver(() => {
    decorateAllLinks(anonymousId, utms);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return () => {
    observer.disconnect();
  };
}
