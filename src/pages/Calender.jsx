import { useEffect, useState } from "react";
import { ASSETS } from "../constants/assets";
import { portalFetchJson } from "../utils/portal";

const CALENDAR_API =
  import.meta.env.VITE_PORTAL_CALENDAR_API ||
  "https://portal.sfgs.com.ng/?page=academic_calendar_api";

const Calender = () => {
  const [calendarUrl, setCalendarUrl] = useState(ASSETS.academicCalendarPdf);
  const [sessionLabel, setSessionLabel] = useState("");

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

        {/* PDF Embed or Link */}
        <div className="mt-8">
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            View Academic Calendar (PDF)
          </a>

        </div>
      </div>
    </>
  );
};

export default Calender;
