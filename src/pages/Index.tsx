import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { label: "Преимущества", href: "#benefits" },
  { label: "Программа", href: "#program" },
  { label: "Результаты", href: "#results" },
  { label: "Запись", href: "#contact" },
];

const BENEFITS = [
  {
    icon: "Shield",
    title: "Твёрдый сервис",
    desc: "Кальян в понедельник в 14:00 будет таким же идеальным, как в субботу в 22:00. Никаких «плохих дней».",
  },
  {
    icon: "TrendingUp",
    title: "Продажи, а не «вынос углей»",
    desc: "Внедряем скрипты, которые поднимают средний чек на 20% через нативный сервис без давления на гостя.",
  },
  {
    icon: "BarChart2",
    title: "Контроль каждой чаши",
    desc: "Сокращаем списания табака и расходников до минимума за счёт стандартизации забивок.",
  },
  {
    icon: "Zap",
    title: "Автономный механизм",
    desc: "Вы получаете не просто обученных людей, а систему, работающую без вашего постоянного участия.",
  },
];

const PROGRAM_MODULES = [
  {
    day: "День 1",
    title: "Стандарты и основы",
    items: [
      "Диагностика текущего уровня команды",
      "Эталонная забивка: техника и стандарт",
      "Работа с расходниками и контроль качества",
    ],
  },
  {
    day: "День 2",
    title: "Сервис и продажи",
    items: [
      "Скрипты встречи и обслуживания гостя",
      "Техники нативного апселла без давления",
      "Работа с жалобами и сложными ситуациями",
    ],
  },
  {
    day: "День 3",
    title: "Система и автономность",
    items: [
      "Внедрение чек-листов и стандартов",
      "Система контроля качества для управляющих",
      "Аттестация и финальная оценка команды",
    ],
  },
];

const RESULTS = [
  { number: "72", suffix: " часа", text: "до готовой к работе команды" },
  { number: "+20", suffix: "%", text: "рост среднего чека с первой смены" },
  { number: "×3", suffix: "", text: "снижение списаний расходников" },
  { number: "100", suffix: "%", text: "окупаемость уже в первый месяц" },
];

const TESTIMONIALS = [
  {
    name: "Артём Власов",
    role: "Владелец сети «Облако», Москва",
    text: "После MASTER FLOW мои ребята начали реально продавать, а не просто делать кальян. Средний чек вырос с 2 400 до 3 100 рублей за первые две недели.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  },
  {
    name: "Дмитрий Колесов",
    role: "Управляющий «Amber Lounge», СПб",
    text: "Думал, что знаю всё про обучение персонала. Программа открыла глаза — мои мастера работали «интуитивно», а не по системе. Теперь всё иначе.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [formData, setFormData] = useState({ name: "", phone: "", city: "" });
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="font-body bg-dark text-white min-h-screen overflow-x-hidden">

      {/* ─── NAVBAR ─── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(8,8,8,0.95)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.15)" : "none",
          backdropFilter: scrolled ? "blur(20px)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-display text-xl font-bold tracking-[0.2em] text-gold">
            MASTER FLOW
          </span>
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-xs tracking-[0.15em] uppercase text-white/60 hover:text-gold transition-colors duration-300"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contact")}
              className="text-xs tracking-[0.12em] uppercase px-5 py-2.5 border border-gold text-gold hover:bg-gold hover:text-dark transition-all duration-300"
            >
              Записаться
            </button>
          </nav>
          <button
            className="md:hidden text-gold"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-dark-100 border-t border-gold/20 px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-sm tracking-[0.12em] uppercase text-white/70 hover:text-gold text-left transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-dark" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 80% 50% at 50% -10%, rgba(201,168,76,0.25) 0%, transparent 60%),
              radial-gradient(ellipse 40% 40% at 80% 80%, rgba(201,168,76,0.08) 0%, transparent 50%)
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div
          className="absolute left-0 top-0 w-px h-full opacity-20"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #C9A84C 30%, #C9A84C 70%, transparent)",
          }}
        />
        <div
          className="absolute right-0 top-0 w-px h-full opacity-20"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #C9A84C 30%, #C9A84C 70%, transparent)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 border border-gold/30 text-gold/80 text-xs tracking-[0.2em] uppercase"
            style={{ animation: "fade-in-up 0.6s ease-out forwards", opacity: 0 }}
          >
            <span className="w-6 h-px bg-gold/50" />
            Программа подготовки персонала
            <span className="w-6 h-px bg-gold/50" />
          </div>

          <h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6"
            style={{ animation: "fade-in-up 0.8s ease-out 0.2s forwards", opacity: 0 }}
          >
            <span
              style={{
                background:
                  "linear-gradient(135deg, #E8C96A 0%, #C9A84C 40%, #F5E6B8 60%, #C9A84C 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gold-shimmer 3s ease infinite",
              }}
            >
              MASTER FLOW
            </span>
            <br />
            <span className="text-white font-light">Прибыльная команда</span>
            <br />
            <span className="text-white">за 72 часа.</span>
          </h1>

          <p
            className="text-white/60 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-3"
            style={{ animation: "fade-in-up 0.8s ease-out 0.4s forwards", opacity: 0 }}
          >
            Хватит «учить» персонал.
          </p>
          <p
            className="text-white/45 text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto mb-12"
            style={{ animation: "fade-in-up 0.8s ease-out 0.5s forwards", opacity: 0 }}
          >
            Внедрите готовую систему подготовки мастеров,
            <br className="hidden md:inline" /> которая окупается с первой смены.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ animation: "fade-in-up 0.8s ease-out 0.7s forwards", opacity: 0 }}
          >
            <button
              onClick={() => scrollTo("#contact")}
              className="w-full sm:w-auto px-10 py-4 text-sm tracking-[0.15em] uppercase font-semibold text-dark transition-all duration-300 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #E8C96A, #C9A84C)" }}
            >
              Записаться на программу
            </button>
            <button
              onClick={() => scrollTo("#program")}
              className="w-full sm:w-auto px-10 py-4 text-sm tracking-[0.15em] uppercase border border-white/20 text-white/70 hover:border-gold/50 hover:text-gold transition-all duration-300"
            >
              Узнать подробнее
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs tracking-[0.2em] uppercase text-gold">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* ─── BENEFITS ─── */}
      <section id="benefits" className="py-24 md:py-32 relative">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,168,76,0.3) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-16">
            <span className="text-gold/60 text-xs tracking-[0.3em] uppercase font-body mb-4 block">
              Почему это работает
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              Почему это нужно
              <br />
              <em className="font-light text-gold">вашему бизнесу</em>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div
                  className="group p-8 border border-white/8 hover:border-gold/40 transition-all duration-500 relative overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(201,168,76,0.05) 0%, transparent 60%)",
                    }}
                  />
                  <div className="relative z-10">
                    <div
                      className="w-12 h-12 flex items-center justify-center mb-6 border border-gold/30"
                      style={{ background: "rgba(201,168,76,0.08)" }}
                    >
                      <Icon name={b.icon} fallback="Star" size={20} className="text-gold" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-white mb-3">
                      {b.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed font-light">{b.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>

      {/* ─── PROGRAM ─── */}
      <section id="program" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-gold/60 text-xs tracking-[0.3em] uppercase font-body mb-4 block">
              3 дня трансформации
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              Программа
              <br />
              <em className="font-light text-gold">обучения</em>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {PROGRAM_MODULES.map((mod, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div
                  className="relative p-8 border border-white/8 hover:border-gold/30 transition-all duration-500 h-full"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <div
                    className="absolute -top-px left-8 right-8 h-px"
                    style={{
                      background:
                        "linear-gradient(to right, transparent, #C9A84C, transparent)",
                    }}
                  />
                  <span className="text-gold/50 text-xs tracking-[0.25em] uppercase font-body block mb-3">
                    {mod.day}
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-white mb-6">
                    {mod.title}
                  </h3>
                  <ul className="space-y-3">
                    {mod.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-white/55 text-sm leading-relaxed font-light"
                      >
                        <span className="w-1 h-1 rounded-full bg-gold mt-2.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="absolute bottom-4 right-6 font-display text-6xl font-bold text-white/[0.04] select-none">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RESULTS ─── */}
      <section id="results" className="py-24 md:py-32 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(201,168,76,0.04) 50%, transparent)",
          }}
        />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-16">
            <span className="text-gold/60 text-xs tracking-[0.3em] uppercase font-body mb-4 block">
              Измеримые показатели
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              Результаты,
              <br />
              <em className="font-light text-gold">которые видны сразу</em>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {RESULTS.map((r, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div
                  className="text-center p-8 border border-white/6 hover:border-gold/25 transition-all duration-500"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <div
                    className="font-display text-5xl md:text-6xl font-bold mb-2"
                    style={{
                      background: "linear-gradient(135deg, #E8C96A, #C9A84C)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {r.number}
                    <span className="text-3xl">{r.suffix}</span>
                  </div>
                  <p className="text-white/50 text-xs tracking-wide leading-relaxed font-light">
                    {r.text}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mb-8">
            <p className="text-center text-gold/60 text-xs tracking-[0.3em] uppercase">
              Говорят владельцы
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div
                  className="p-8 border border-white/8 hover:border-gold/25 transition-all duration-500 relative"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <div className="absolute top-6 right-8 font-display text-6xl text-gold/10 select-none leading-none">
                    "
                  </div>
                  <p className="text-white/65 text-sm leading-relaxed font-light mb-6 italic font-display text-base">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={t.img}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover border border-gold/25 grayscale"
                    />
                    <div>
                      <p className="text-white text-sm font-semibold">{t.name}</p>
                      <p className="text-white/40 text-xs">{t.role}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="py-24 md:py-32">
        <div className="max-w-2xl mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <span className="text-gold/60 text-xs tracking-[0.3em] uppercase font-body mb-4 block">
              Начни трансформацию
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Записаться
              <br />
              <em className="font-light text-gold">на программу</em>
            </h2>
            <p className="text-white/50 text-sm font-light leading-relaxed">
              Оставьте заявку — мы свяжемся в течение 2 часов и подберём удобный формат
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  required
                  type="text"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border border-white/15 text-white placeholder-white/30 px-5 py-4 text-sm font-light focus:outline-none focus:border-gold/60 transition-colors duration-300"
                />
                <input
                  required
                  type="tel"
                  placeholder="Телефон / WhatsApp"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-transparent border border-white/15 text-white placeholder-white/30 px-5 py-4 text-sm font-light focus:outline-none focus:border-gold/60 transition-colors duration-300"
                />
                <input
                  type="text"
                  placeholder="Ваш город"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-transparent border border-white/15 text-white placeholder-white/30 px-5 py-4 text-sm font-light focus:outline-none focus:border-gold/60 transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="w-full py-4 text-sm tracking-[0.15em] uppercase font-semibold text-dark transition-all duration-300 hover:scale-[1.02] mt-2"
                  style={{
                    background: "linear-gradient(135deg, #E8C96A, #C9A84C)",
                    boxShadow: "0 0 30px rgba(201,168,76,0.2)",
                  }}
                >
                  Отправить заявку
                </button>
                <p className="text-center text-white/25 text-xs font-light">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                </p>
              </form>
            ) : (
              <div
                className="text-center py-16 border border-gold/20 p-10"
                style={{ background: "rgba(201,168,76,0.04)" }}
              >
                <div className="w-16 h-16 mx-auto mb-6 border border-gold/40 flex items-center justify-center">
                  <Icon name="Check" size={24} className="text-gold" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-white mb-3">
                  Заявка отправлена
                </h3>
                <p className="text-white/50 text-sm font-light">
                  Мы свяжемся с вами в течение 2 часов
                </p>
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/6 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg font-bold tracking-[0.2em] text-gold/80">
            MASTER FLOW
          </span>
          <p className="text-white/25 text-xs text-center font-light">
            Программа подготовки персонала кальянных заведений
          </p>
          <p className="text-white/20 text-xs font-light">© 2026</p>
        </div>
      </footer>
    </div>
  );
}