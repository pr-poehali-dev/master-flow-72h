import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";

const GOLD = "#C9A84C";
const GOLD_LIGHT = "#E8C96A";

const SLIDES = [
  {
    id: 1,
    tag: "Программа обучения",
    title: "MASTER FLOW:",
    titleAccent: "Прибыльная команда за 72 часа.",
    subtitle: "Хватит «учить» персонал. Внедрите готовую систему подготовки мастеров, которая окупается с первой смены.",
    type: "hero",
    content: {
      blockTitle: "Почему это нужно вашему бизнесу:",
      items: [
        {
          icon: "Shield",
          title: "Твёрдый сервис",
          text: "Кальян в понедельник в 14:00 будет таким же идеальным, как в субботу в 22:00.",
        },
        {
          icon: "TrendingUp",
          title: "Продажи, а не «вынос углей»",
          text: "Внедряем скрипты, которые поднимают средний чек на 20% через нативный сервис.",
        },
        {
          icon: "BarChart2",
          title: "Контроль каждой чаши",
          text: "Сокращаем списания табака и расходников до минимума за счёт стандартизации забивок.",
        },
      ],
      quote: "Вы получаете не просто обученных людей, а автономный механизм, приносящий деньги.",
    },
  },
  {
    id: 2,
    tag: "Ловушка опыта",
    title: "Почему «мастер с опытом» —",
    titleAccent: "это не гарантия прибыли?",
    subtitle: null,
    type: "risks",
    content: {
      blockTitle: "Риски работы без единой системы:",
      items: [
        {
          icon: "Shuffle",
          title: "Конфликт стандартов",
          text: "Каждый «опытный» мастер делает так, как научили в другом месте. Гость получает разный кальян в зависимости от смены.",
        },
        {
          icon: "TrendingDown",
          title: "Скрытый перерасход",
          text: "Лишние 3–5 граммов табака в каждой чаше превращаются в сотни тысяч рублей убытков в годовом отчёте.",
        },
        {
          icon: "Star",
          title: "«Звёздная болезнь»",
          text: "Профи игнорируют скрипты продаж, считая что всё знают. Это ограничивает средний чек и ломает атмосферу заведения.",
        },
        {
          icon: "UserX",
          title: "Зависимость от личности",
          text: "Если бизнес держится на «звёздах», а не на системе — вы их заложник. Уходит мастер — уходят и гости.",
        },
      ],
      quoteItems: [
        "Master Flow превращает «авторский хаос» в контролируемую технологию.",
        "Не важно, кого вы наняли — новичка или профи. После обучения они работают по вашему стандарту.",
      ],
    },
  },
  {
    id: 3,
    tag: "День 1",
    title: "Экспертный фундамент:",
    titleAccent: "Сокращаем издержки с первой смены",
    subtitle: null,
    type: "day",
    content: {
      modules: [
        {
          num: "01",
          title: "Анатомия и ресурс оборудования",
          text: "Глубокое понимание устройства кальяна. Учим правильно эксплуатировать детали, избегая коррозии, поломок и преждевременного износа дорогого парка.",
        },
        {
          num: "02",
          title: "Химия табака и управление жаром",
          text: "Разбор брендов по жаростойкости, крепости и вкусопередаче. Мастер знает, как экономить до 15% сырья за счёт правильной работы с температурой.",
        },
        {
          num: "03",
          title: "Стандарты 5S и гигиена",
          text: "Организация рабочего места по японской системе. Идеальная чистота и эргономика ускоряют отдачу кальяна на 20% и вызывают доверие у взыскательных гостей.",
        },
      ],
      quote: "Ваш сотрудник перестаёт действовать «на ощупь». Он понимает физику процесса и бережно относится к каждому грамму табака и каждой детали кальяна.",
    },
  },
  {
    id: 4,
    tag: "День 2",
    title: "Технология идеального вкуса",
    titleAccent: "и системный рост прибыли",
    subtitle: null,
    type: "day",
    content: {
      modules: [
        {
          num: "01",
          title: "Технологии забивки под любой запрос",
          text: "Отработка техник «Воздушная», «Плотная», «Оверпак». Мастер подбирает способ под предпочтения гостя — попадание во вкус и крепость на 100%.",
        },
        {
          num: "02",
          title: "Стабильность курения 60+ минут",
          text: "Секреты контроля температуры и работы с углями. Больше никаких жалоб на «сгоревший» кальян. Довольный гость — это лояльный гость и высокие чаевые.",
        },
        {
          num: "03",
          title: "Психология сервиса и Up-sell",
          text: "Алгоритм «3 вопроса» — как за 30 секунд выявить потребность. Нативные допродажи: премиум-линейки, фруктовые чаши, чайные пары. Средний чек +20–30%.",
        },
      ],
      quote: "Мастер превращается в экспертного консультанта. Он знает, как сделать продукт высшего качества и приносить заведению на 20–30% больше выручки с каждого стола.",
    },
  },
  {
    id: 5,
    tag: "День 3",
    title: "Аттестация и готовность",
    titleAccent: "к «полной посадке»",
    subtitle: null,
    type: "day",
    content: {
      modules: [
        {
          num: "01",
          title: "Сенсорный тест",
          text: "Базовая аналитика вкуса: определить профиль (цитрус / десерт / хвоя), уровень крепости и чистоту курения. Гость получит именно то, что заказывал.",
        },
        {
          num: "02",
          title: "Работа «в запаре» — Speed Test",
          text: "Задача: собрать и вынести 3 разных кальяна за 12 минут без потери качества. Сервис будет летать даже в самую жаркую пятницу.",
        },
        {
          num: "03",
          title: "Психологическая устойчивость",
          text: "Отработка конфликтных сценариев: «мне не дымно», «слишком крепко», «не тот вкус». Учим гасить негатив профессионализмом.",
        },
        {
          num: "04",
          title: "Финальный чек-лист (25 параметров)",
          text: "Жёсткая приёмка: от стерильности щипцов до манеры общения и сервировки.",
        },
      ],
      quote: "Вы получаете сотрудника, в котором уверены на 100%. Он не «поплывёт» в пятничный вечер и грамотно проконсультирует любого гостя.",
    },
  },
  {
    id: 6,
    tag: "Экономика",
    title: "Экономика вашего заведения:",
    titleAccent: "До и После",
    subtitle: "Почему Master Flow окупается уже за первые 2 недели?",
    type: "economics",
    content: {
      metrics: [
        { value: "−15–20%", label: "Списания табака", text: "Жёсткий контроль граммовки и техника забивки «без перерасхода». Каждая пачка приносит больше чаш." },
        { value: "+25%", label: "Средний чек", text: "Рабочие скрипты допродаж: переход на премиум-линейки, авторский чай, фруктовые чаши." },
        { value: "+30%", label: "LTV гостей", text: "Стабильность — залог лояльности. Случайные гости превращаются в постоянных." },
        { value: "+15 ч", label: "Время владельца / мес", text: "Освобождаетесь от рутины обучения. Система Master Flow выдаёт готовый результат за вас." },
      ],
      quote: "Master Flow — это не траты на персонал. Это инвестиция, которая начинает приносить прибыль с первого дня после обучения.",
      cta: "Давайте внедрим систему Master Flow и выведем ваш сервис на новый уровень уже на этой неделе!",
    },
  },
];

function GoldDivider() {
  return (
    <div className="w-12 h-px my-4" style={{ background: `linear-gradient(to right, ${GOLD}, transparent)` }} />
  );
}

function SlideHero({ slide }: { slide: typeof SLIDES[0] }) {
  const c = slide.content as typeof SLIDES[0]["content"] & {
    blockTitle: string;
    items: { icon: string; title: string; text: string }[];
    quote: string;
  };
  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-6">
          <span className="w-8 h-px" style={{ background: GOLD }} />
          <span className="text-xs tracking-[0.25em] uppercase font-body" style={{ color: GOLD + "99" }}>
            {slide.tag}
          </span>
        </div>
        <h1 className="font-display font-bold leading-[1.05] mb-2" style={{ fontSize: "clamp(2rem,4vw,3.5rem)" }}>
          <span className="text-white">{slide.title}</span>
          <br />
          <span style={{
            background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>{slide.titleAccent}</span>
        </h1>
        <p className="text-white/55 font-light font-body mb-8" style={{ fontSize: "clamp(0.85rem,1.3vw,1rem)" }}>
          {slide.subtitle}
        </p>

        <p className="text-xs tracking-[0.2em] uppercase mb-4 font-body" style={{ color: GOLD + "80" }}>
          {c.blockTitle}
        </p>
        <div className="grid grid-cols-1 gap-3">
          {c.items.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 border border-white/6 rounded-none"
              style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center border border-white/10"
                style={{ background: "rgba(201,168,76,0.08)" }}>
                <Icon name={item.icon} fallback="Star" size={14} className="text-gold" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold font-body mb-0.5">{item.title}</p>
                <p className="text-white/50 text-xs font-light font-body leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pl-4 border-l-2" style={{ borderColor: GOLD }}>
        <p className="font-display italic text-white/80" style={{ fontSize: "clamp(0.85rem,1.2vw,1rem)" }}>
          "{c.quote}"
        </p>
      </div>
    </div>
  );
}

function SlideRisks({ slide }: { slide: typeof SLIDES[1] }) {
  const c = slide.content as typeof SLIDES[1]["content"] & {
    blockTitle: string;
    items: { icon: string; title: string; text: string }[];
    quoteItems: string[];
  };
  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-5">
          <span className="w-8 h-px" style={{ background: GOLD }} />
          <span className="text-xs tracking-[0.25em] uppercase font-body" style={{ color: GOLD + "99" }}>
            {slide.tag}
          </span>
        </div>
        <h2 className="font-display font-bold leading-[1.05] mb-6" style={{ fontSize: "clamp(1.5rem,3vw,2.8rem)" }}>
          <span className="text-white">{slide.title}</span>
          <br />
          <span style={{
            background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>{slide.titleAccent}</span>
        </h2>

        <p className="text-xs tracking-[0.2em] uppercase mb-4 font-body" style={{ color: GOLD + "80" }}>
          {c.blockTitle}
        </p>
        <div className="grid grid-cols-2 gap-3">
          {c.items.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 border border-white/6"
              style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center border border-white/10"
                style={{ background: "rgba(201,168,76,0.08)" }}>
                <Icon name={item.icon} fallback="AlertCircle" size={13} className="text-gold" />
              </div>
              <div>
                <p className="text-white text-xs font-semibold font-body mb-1">{item.title}</p>
                <p className="text-white/50 text-xs font-light font-body leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 space-y-2">
        {c.quoteItems.map((q, i) => (
          <div key={i} className="flex items-start gap-3 pl-4 border-l-2" style={{ borderColor: GOLD }}>
            <p className="text-white/70 text-sm font-light font-body italic font-display">{q}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideDay({ slide }: { slide: typeof SLIDES[2] }) {
  const c = slide.content as {
    modules: { num: string; title: string; text: string }[];
    quote: string;
  };
  const isDay5 = slide.id === 5;
  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-5">
          <span className="w-8 h-px" style={{ background: GOLD }} />
          <span className="text-xs tracking-[0.25em] uppercase font-body" style={{ color: GOLD + "99" }}>
            {slide.tag}
          </span>
        </div>
        <h2 className="font-display font-bold leading-[1.05] mb-7" style={{ fontSize: "clamp(1.4rem,2.8vw,2.6rem)" }}>
          <span className="text-white">{slide.title}</span>
          <br />
          <span style={{
            background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>{slide.titleAccent}</span>
        </h2>

        <div className={`grid gap-3 ${isDay5 ? "grid-cols-2" : "grid-cols-1"}`}>
          {c.modules.map((mod, i) => (
            <div key={i} className="flex items-start gap-4 p-4 border border-white/6 relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="absolute top-3 right-3 font-display font-bold text-white/[0.04] select-none"
                style={{ fontSize: "clamp(1.5rem,3vw,2.5rem)" }}>
                {mod.num}
              </div>
              <div className="relative z-10">
                <p className="text-white text-sm font-semibold font-body mb-1">{mod.title}</p>
                <p className="text-white/50 text-xs font-light font-body leading-relaxed">{mod.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 pl-4 border-l-2" style={{ borderColor: GOLD }}>
        <p className="font-display italic text-white/75" style={{ fontSize: "clamp(0.8rem,1.1vw,0.95rem)" }}>
          "{c.quote}"
        </p>
      </div>
    </div>
  );
}

function SlideEconomics({ slide }: { slide: typeof SLIDES[5] }) {
  const c = slide.content as {
    metrics: { value: string; label: string; text: string }[];
    quote: string;
    cta: string;
  };
  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="w-8 h-px" style={{ background: GOLD }} />
          <span className="text-xs tracking-[0.25em] uppercase font-body" style={{ color: GOLD + "99" }}>
            {slide.tag}
          </span>
        </div>
        <h2 className="font-display font-bold leading-[1.05] mb-1" style={{ fontSize: "clamp(1.4rem,2.8vw,2.6rem)" }}>
          <span className="text-white">{slide.title}</span>
          <br />
          <span style={{
            background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>{slide.titleAccent}</span>
        </h2>
        {slide.subtitle && (
          <p className="text-white/40 text-sm font-light font-body mb-5">{slide.subtitle}</p>
        )}

        <div className="grid grid-cols-2 gap-3 mb-5">
          {c.metrics.map((m, i) => (
            <div key={i} className="p-4 border border-white/6 relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.02)" }}>
              <div
                className="font-display font-bold mb-1"
                style={{
                  fontSize: "clamp(1.5rem,2.5vw,2.2rem)",
                  background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {m.value}
              </div>
              <p className="text-white text-xs font-semibold font-body mb-1">{m.label}</p>
              <p className="text-white/45 text-xs font-light font-body leading-relaxed">{m.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="pl-4 border-l-2" style={{ borderColor: GOLD }}>
          <p className="font-display italic text-white/75 text-sm">"{c.quote}"</p>
        </div>
        <div className="p-4 text-center" style={{ background: `linear-gradient(135deg, ${GOLD}22, ${GOLD}11)`, border: `1px solid ${GOLD}40` }}>
          <p className="font-display font-semibold text-white" style={{ fontSize: "clamp(0.9rem,1.3vw,1.05rem)" }}>
            {c.cta}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Presentation() {
  const [current, setCurrent] = useState(0);
  const total = SLIDES.length;

  const prev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), []);
  const next = useCallback(() => setCurrent((c) => Math.min(total - 1, c + 1)), [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const slide = SLIDES[current];

  return (
    <div
      className="min-h-screen w-full flex flex-col font-body overflow-hidden"
      style={{ background: "#080808", color: "#fff" }}
    >
      {/* TOP BAR */}
      <div
        className="flex items-center justify-between px-8 py-3 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(201,168,76,0.12)" }}
      >
        <span
          className="font-display font-bold tracking-[0.2em] text-sm"
          style={{ color: GOLD }}
        >
          MASTER FLOW
        </span>
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="transition-all duration-300"
              style={{
                width: i === current ? 24 : 6,
                height: 3,
                background: i === current ? GOLD : "rgba(201,168,76,0.25)",
                borderRadius: 2,
              }}
            />
          ))}
        </div>
        <span className="text-white/30 text-xs font-body tracking-widest">
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* SLIDE AREA */}
      <div className="flex-1 relative overflow-hidden">
        {/* bg decoration */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 60%),
              radial-gradient(ellipse 30% 30% at 95% 95%, rgba(201,168,76,0.05) 0%, transparent 50%)
            `,
          }}
        />
        <div
          className="absolute left-0 top-0 w-px h-full pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.15) 30%, rgba(201,168,76,0.15) 70%, transparent)" }}
        />
        <div
          className="absolute right-0 top-0 w-px h-full pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.15) 30%, rgba(201,168,76,0.15) 70%, transparent)" }}
        />

        <div
          className="relative z-10 h-full max-w-5xl mx-auto px-8 py-8 overflow-y-auto"
          key={current}
          style={{ animation: "slideIn 0.35s ease-out" }}
        >
          {slide.type === "hero" && <SlideHero slide={slide} />}
          {slide.type === "risks" && <SlideRisks slide={slide as typeof SLIDES[1]} />}
          {slide.type === "day" && <SlideDay slide={slide} />}
          {slide.type === "economics" && <SlideEconomics slide={slide as typeof SLIDES[5]} />}
        </div>
      </div>

      {/* BOTTOM NAV */}
      <div
        className="flex items-center justify-between px-8 py-4 flex-shrink-0"
        style={{ borderTop: "1px solid rgba(201,168,76,0.10)" }}
      >
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase transition-all duration-300 disabled:opacity-20"
          style={{ color: current === 0 ? "#fff" : GOLD }}
        >
          <Icon name="ChevronLeft" size={16} />
          Назад
        </button>

        <div className="flex items-center gap-1">
          {SLIDES.map((s, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="text-xs font-body transition-all duration-200 px-2 py-1"
              style={{
                color: i === current ? GOLD : "rgba(255,255,255,0.25)",
                fontWeight: i === current ? 600 : 400,
              }}
            >
              {s.tag}
            </button>
          ))}
        </div>

        <button
          onClick={next}
          disabled={current === total - 1}
          className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase transition-all duration-300 disabled:opacity-20"
          style={{ color: current === total - 1 ? "#fff" : GOLD }}
        >
          Вперёд
          <Icon name="ChevronRight" size={16} />
        </button>
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
