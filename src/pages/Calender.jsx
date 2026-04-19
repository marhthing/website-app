import { useEffect, useState } from "react";
import { ASSETS } from "../constants/assets";
import { portalFetchJson } from "../utils/portal";

const CALENDAR_API =
  import.meta.env.VITE_PORTAL_CALENDAR_API ||
  "https://portal.sfgs.com.ng/?page=academic_calendar_api";

const Calender = () => {
  const [calendarUrl, setCalendarUrl] = useState(ASSETS.academicCalendarPdf);
  const [sessionLabel, setSessionLabel] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await portalFetchJson(CALENDAR_API, { method: "GET" });
        const url = data?.calendar?.file_url || "";
        if (!cancelled && url) {
          setCalendarUrl(url);
          setSessionLabel(data?.current_session || "");
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
    <>
      {/* Hero Section */}
      <div
        className="relative min-h-[80vh] w-full bg-cover bg-center before:absolute before:inset-0 before:bg-[rgba(4,9,30,0.7)] flex items-center justify-center"
        style={{ backgroundImage: `url('${ASSETS.academicCalendarHero}')` }}
      >
        <h1 className="text-white text-4xl font-bold drop-shadow-lg">Academic Calendar</h1>
      </div>

      {/* Calendar Content */}
      <div className="container mx-auto p-6 text-center">
        <h2 className="text-3xl font-bold text-red-600">Academic Schedule</h2>
        <p className="mt-4 text-lg text-gray-700">
          Stay updated with our academic schedules and events.
        </p>
        {sessionLabel && (
          <p className="mt-2 text-sm text-gray-600">
            Current Session: <span className="font-semibold">{sessionLabel}</span>
          </p>
        )}

        {/* PDF Preview */}
        <div className="mt-8">
          <div className="w-full overflow-hidden rounded-lg border bg-white shadow-md">
            <div className="flex flex-col gap-3 border-b bg-gray-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-left text-sm text-gray-700">
                {isLoading ? "Loading calendar..." : "Preview"}
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Open PDF
                </a>
                <a
                  href={calendarUrl}
                  download
                  className="rounded bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  Download
                </a>
              </div>
            </div>

            <div className="relative w-full" style={{ height: "80vh" }}>
              <iframe
                title="Academic Calendar PDF"
                src={calendarUrl}
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calender;
