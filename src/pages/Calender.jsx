import { useEffect, useState } from "react";
import { ASSETS } from "../constants/assets";
import { portalFetchJson } from "../utils/portal";

const CALENDAR_API =
  import.meta.env.VITE_PORTAL_CALENDAR_API ||
  "https://portal.sfgs.com.ng/?page=academic_calendar_api";

const PORTAL_ORIGIN =
  import.meta.env.VITE_PORTAL_ORIGIN || "https://portal.sfgs.com.ng";

const Calender = () => {
  const [calendarUrl, setCalendarUrl] = useState("");
  const [sessionLabel, setSessionLabel] = useState("");
  const [termLabel, setTermLabel] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await portalFetchJson(CALENDAR_API, { method: "GET" });
        const url = data?.calendar?.file_url || "";
        if (!cancelled && url) {
          const normalized = url.startsWith("/") ? `${PORTAL_ORIGIN}${url}` : url;
          setCalendarUrl(normalized);
          setSessionLabel(data?.current_session || "");
          setTermLabel(data?.current_term || "");
        }
      } catch {
        // Keep the built-in static fallback if the portal is unavailable.
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="bg-white">

      {/* Hero */}
      <div
        className="relative min-h-[80vh] w-full bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('${ASSETS.academicCalendarHero}')` }}
      >
        <div className="absolute inset-0 bg-[rgba(4,9,30,0.7)]" />
        <div className="relative z-10 text-center px-4">
          <p className="text-[#F069B4] text-xs font-semibold uppercase tracking-[0.18em] mb-3">
            School Schedule
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
            Academic Calendar
          </h1>
          <div className="w-12 h-0.5 bg-[#F069B4] mx-auto mt-5" />
        </div>
      </div>

      {/* Calendar Content */}
      <section className="py-16 sm:py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#F069B4] text-xs font-semibold uppercase tracking-[0.18em] mb-3">Stay Updated</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#4a0f3f]">Academic Schedule</h2>
            <div className="w-10 h-0.5 bg-[#F069B4] mx-auto mt-4" />
            <p className="mt-4 text-gray-600 text-sm">
              Stay updated with our academic schedules and events.
            </p>
            {(sessionLabel || termLabel) && (
              <p className="mt-2 text-sm text-gray-500">
                Current:{" "}
                {sessionLabel && (
                  <span className="font-semibold text-[#4a0f3f]">{sessionLabel}</span>
                )}
                {termLabel && (
                  <>
                    {" "}
                    / <span className="font-semibold text-[#4a0f3f]">{termLabel}</span>
                  </>
                )}
              </p>
            )}
          </div>

          {/* PDF Preview */}
          <div className="mx-auto w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b bg-[#f8f5f8] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-gray-600">
                {isLoading
                  ? "Loading calendar..."
                  : calendarUrl
                  ? "Preview"
                  : "No calendar uploaded yet."}
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors ${
                    calendarUrl ? "bg-[#4a0f3f] hover:bg-[#F069B4]" : "bg-gray-300 pointer-events-none"
                  }`}
                >
                  Open PDF
                </a>
                <a
                  href={calendarUrl}
                  download
                  className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors ${
                    calendarUrl ? "bg-[#F069B4] hover:bg-[#4a0f3f]" : "bg-gray-300 pointer-events-none"
                  }`}
                >
                  Download
                </a>
              </div>
            </div>

            {calendarUrl ? (
              <div className="relative w-full" style={{ height: "80vh" }}>
                <iframe
                  title="Academic Calendar PDF"
                  src={calendarUrl}
                  className="h-full w-full"
                />
              </div>
            ) : (
              <div className="p-6 text-sm text-gray-500">
                No calendar available at the moment. Please check back later.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Calender;
