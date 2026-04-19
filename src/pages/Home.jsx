import { Link } from "react-router-dom";
import { ASSETS } from "../constants/assets";
import { BookOpen, Users, Award, Lightbulb, Monitor, Globe, ArrowRight, GraduationCap } from "lucide-react";

const features = [
  {
    icon: <Users size={22} />,
    title: "Individual Focus",
    desc: "Every student receives dedicated attention, ensuring no learner is left behind in their academic journey.",
  },
  {
    icon: <BookOpen size={22} />,
    title: "Rigorous Curriculum",
    desc: "An intensive, well-structured programme that prepares students for national examinations and higher education.",
  },
  {
    icon: <Award size={22} />,
    title: "Academic Excellence",
    desc: "A consistent track record of outstanding results driven by dedicated and well-trained staff.",
  },
  {
    icon: <Lightbulb size={22} />,
    title: "Critical Thinking",
    desc: "Students are trained to analyse, reason, and solve problems independently across all disciplines.",
  },
  {
    icon: <Monitor size={22} />,
    title: "Modern Facilities",
    desc: "Well-equipped classrooms, science laboratories, and ICT infrastructure designed for effective learning.",
  },
  {
    icon: <Globe size={22} />,
    title: "Extracurricular Development",
    desc: "Sports, arts, and clubs that build character, teamwork, and leadership beyond the classroom.",
  },
];

const HomePage = () => {
  return (
    <main className="overflow-x-hidden">

      {/* ── Hero ── */}
      <section
        className="relative min-h-screen w-full bg-cover bg-center flex flex-col items-center justify-center text-center px-5"
        style={{ backgroundImage: `url('${ASSETS.heroMain}')` }}
      >
        <div className="absolute inset-0 bg-[#0d0210]/75" />
        <div className="relative z-10 max-w-2xl mx-auto w-full">
          <p className="text-[#F069B4] text-xs font-semibold uppercase tracking-[0.18em] mb-5">
            Sure Foundation Group of Schools
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-snug mb-5">
            High Academic &amp;<br />
            <span className="text-[#F069B4]">Moral Standards</span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-8">
            A structured and disciplined learning environment that equips secondary school
            students with the knowledge, values, and skills to excel.
          </p>
          <div className="flex flex-col gap-3 w-full max-w-xs mx-auto sm:max-w-none sm:flex-row sm:justify-center">
            <Link
              to="/admission"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-4 bg-[#4a0f3f] border border-[#F069B4] text-white text-sm font-semibold rounded-md hover:bg-[#F069B4] transition-all duration-300 min-h-[52px]"
            >
              Apply for Admission <ArrowRight size={15} />
            </Link>
            <Link
              to="/about"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-4 border border-white/50 text-white text-sm font-semibold rounded-md hover:border-white hover:bg-white/5 transition-all duration-300 min-h-[52px]"
            >
              About Our School
            </Link>
          </div>
        </div>
      </section>

      {/* ── About / Welcome ── */}
      <section className="py-16 sm:py-20 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            {/* Text */}
            <div>
              <p className="text-[#F069B4] text-xs font-semibold uppercase tracking-[0.18em] mb-3">About Us</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#4a0f3f] leading-snug mb-4">
                Welcome to Sure Foundation Group of Schools
              </h2>
              <div className="w-10 h-0.5 bg-[#F069B4] mb-5" />
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                We are a thriving educational community serving students whose parents and
                guardians have chosen us for our well-trained staff, rigorous curriculum, and
                a stimulating, structured learning environment.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
                Situated in Port Harcourt, Nigeria, our school is committed to building
                students of strong academic foundation, sound moral character, and readiness
                for the challenges of higher education and life.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#4a0f3f] text-[#4a0f3f] text-sm font-semibold rounded-md hover:bg-[#4a0f3f] hover:text-white transition-all duration-300 min-h-[48px]"
              >
                Read More About Us <ArrowRight size={14} />
              </Link>
            </div>

            {/* Images — stacked cleanly on mobile */}
            <div className="flex flex-col gap-3">
              <img
                src={ASSETS.programSecondary}
                alt="Secondary School"
                className="w-full h-52 sm:h-64 object-cover rounded-lg"
              />
              <div className="grid grid-cols-2 gap-3">
                <img
                  src={ASSETS.featureAcademicExcellence}
                  alt="Academic"
                  className="w-full h-32 sm:h-40 object-cover rounded-lg"
                />
                <img
                  src={ASSETS.facilities1}
                  alt="Facilities"
                  className="w-full h-32 sm:h-40 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-16 sm:py-20 px-5 bg-[#f8f5f8]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 sm:mb-12">
            <p className="text-[#F069B4] text-xs font-semibold uppercase tracking-[0.18em] mb-3">Why Choose Us</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#4a0f3f] mb-3">
              Learning Is Just the Beginning
            </h2>
            <div className="w-10 h-0.5 bg-[#F069B4]" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white border-l-4 border-[#4a0f3f] p-5 sm:p-6 rounded-r-lg shadow-sm"
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <span className="text-[#F069B4] flex-shrink-0">{f.icon}</span>
                  <h3 className="font-bold text-[#4a0f3f] text-sm sm:text-base">{f.title}</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      {/* Note: bg-fixed (background-attachment: fixed) is intentionally omitted — it does not render correctly on mobile Safari/iOS */}
      <section
        className="relative w-full py-20 sm:py-24 px-5 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(4, 9, 30, 0.80), rgba(4, 9, 30, 0.80)), url('${ASSETS.ctaBg}')`,
        }}
      >
        <div className="relative z-10 max-w-2xl mx-auto w-full text-center">
          <GraduationCap size={40} className="text-[#F069B4] mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug mb-4">
            Shaping Futures, One Student at a Time
          </h2>
          <div className="w-10 h-0.5 bg-[#F069B4] mx-auto mb-5" />
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-9">
            A school that empowers its students to excel in any endeavour and to find their
            own voice — academically, morally, and socially.
          </p>
          <div className="flex flex-col gap-3 w-full max-w-xs mx-auto sm:max-w-none sm:flex-row sm:justify-center">
            <Link
              to="/admission"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-4 bg-[#4a0f3f] border border-[#F069B4] text-white text-sm font-semibold rounded-md hover:bg-[#F069B4] transition-all duration-300 min-h-[52px]"
            >
              Apply for Admission <ArrowRight size={14} />
            </Link>
            <Link
              to="/contact"
              className="flex items-center justify-center w-full sm:w-auto px-7 py-4 border border-white/50 text-white text-sm font-semibold rounded-md hover:border-white hover:bg-white/5 transition-all duration-300 min-h-[52px]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
};

export default HomePage;
