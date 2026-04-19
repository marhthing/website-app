const DEFAULT_PORTAL_WARMUP_URL = "https://portal.sfgs.com.ng/";

let portalWarmupPromise = null;

export function warmUpPortal(portalWarmupUrl = DEFAULT_PORTAL_WARMUP_URL) {
  // InfinityFree/edge security can block non-browser requests with a JS cookie challenge.
  // Loading the portal in a hidden iframe lets the challenge run and sets cookies,
  // so our subsequent `fetch()` can reach the real PHP endpoints.
  if (portalWarmupPromise) return portalWarmupPromise;

  portalWarmupPromise = new Promise((resolve) => {
    try {
      const iframe = document.createElement("iframe");
      iframe.src = portalWarmupUrl;
      iframe.title = "portal-warmup";
      iframe.style.width = "1px";
      iframe.style.height = "1px";
      iframe.style.position = "absolute";
      iframe.style.left = "-9999px";
      iframe.style.top = "0";
      iframe.setAttribute("aria-hidden", "true");

      const timeout = setTimeout(resolve, 5000);
      iframe.onload = () => {
        setTimeout(() => {
          clearTimeout(timeout);
          resolve();
        }, 800);
      };

      document.body.appendChild(iframe);
    } catch {
      resolve();
    }
  });

  return portalWarmupPromise;
}

export async function portalFetchJson(url, options = {}) {
  await warmUpPortal(options.warmupUrl);

  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(options.headers || {}),
    },
  });

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw new Error("Portal did not return JSON (security check may have blocked the request).");
  }

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error || `Portal request failed (${response.status}).`);
  }

  return data;
}

