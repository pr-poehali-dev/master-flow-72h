import { useState, useEffect, useRef } from "react";

export const NAV_LINKS = [
  { label: "Преимущества", href: "#benefits" },
  { label: "Программа", href: "#program" },
  { label: "Результаты", href: "#results" },
  { label: "Запись", href: "#contact" },
];

export const BENEFITS = [
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

export const PROGRAM_MODULES = [
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

export const RESULTS = [
  { number: "72", suffix: " часа", text: "до готовой к работе команды" },
  { number: "+20", suffix: "%", text: "рост среднего чека с первой смены" },
  { number: "×3", suffix: "", text: "снижение списаний расходников" },
  { number: "100", suffix: "%", text: "окупаемость уже в первый месяц" },
];

export const TESTIMONIALS = [
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

export function useInView(threshold = 0.15) {
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

export function AnimatedSection({
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

export function scrollTo(href: string, onClose?: () => void) {
  if (onClose) onClose();
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}
