// excel4pro.ru - поведение лендинга

// Ссылки на оплату. Вставь сюда ссылки платёжки или Stepik, когда они будут готовы.
const PAY_LINKS = {
  basic: "", // тариф "Базовый", 2 900 ₽
  pro: ""    // тариф "Продвинутый", 17 900 ₽
};

(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Год в футере
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();

  // Мобильное меню
  const header = $(".header");
  const burger = $(".burger");
  if (burger) {
    burger.addEventListener("click", () => {
      const open = header.classList.toggle("menu-open");
      burger.setAttribute("aria-expanded", String(open));
    });
    $$(".nav a").forEach(a => a.addEventListener("click", () => {
      header.classList.remove("menu-open");
      burger.setAttribute("aria-expanded", "false");
    }));
  }

  // Аккордеоны (программа и FAQ)
  $$("[data-acc] .acc__btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".acc__item");
      const open = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  // Появление блоков при скролле
  const rv = $$(".rv");
  if ("IntersectionObserver" in window && !reduced) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    rv.forEach(el => io.observe(el));
  } else {
    rv.forEach(el => el.classList.add("in"));
  }

  // Кнопки оплаты
  const toast = $("#toast");
  let toastTimer;
  function showToast(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add("on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("on"), 3500);
  }
  $$("[data-plan]").forEach(a => {
    const url = PAY_LINKS[a.dataset.plan];
    if (url) {
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener";
    } else {
      a.addEventListener("click", e => {
        e.preventDefault();
        showToast("Оплата откроется совсем скоро. Следите за обновлениями!");
      });
    }
  });

  // Липкая кнопка на мобильных после первого экрана
  const mcta = $("#mcta");
  const hero = $(".hero");
  const pricing = $("#pricing");
  if (mcta && hero && "IntersectionObserver" in window) {
    let heroVisible = true, pricingVisible = false;
    const upd = () => mcta.classList.toggle("on", !heroVisible && !pricingVisible);
    new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; upd(); }).observe(hero);
    if (pricing) new IntersectionObserver(([e]) => { pricingVisible = e.isIntersecting; upd(); }).observe(pricing);
  }

  // Анимация в hero: вопрос к ИИ -> формула -> заполнение столбцов
  const fx = $("#fx");
  const b1 = $("#b1"), b2 = $("#b2");
  const cells = $$(".sheet td[data-v]");
  const formula = '=СУММЕСЛИМН(Операции[Сумма];Операции[Категория];A2;Операции[Месяц];"Октябрь")';
  const fill = () => cells.forEach(td => { td.textContent = td.dataset.v; });

  if (!fx) return;
  if (reduced) {
    b1 && b1.classList.add("on");
    b2 && b2.classList.add("on");
    fx.textContent = formula;
    fill();
    return;
  }

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  async function loop() {
    while (true) {
      cells.forEach(td => { td.textContent = "-"; td.classList.remove("active"); });
      fx.textContent = "";
      b1.classList.remove("on"); b2.classList.remove("on");
      await sleep(600);
      b1.classList.add("on");
      await sleep(1300);
      b2.classList.add("on");
      await sleep(900);
      const first = cells[0];
      first.classList.add("active");
      for (let i = 1; i <= formula.length; i++) {
        fx.textContent = formula.slice(0, i);
        await sleep(28);
      }
      await sleep(400);
      first.classList.remove("active");
      for (const td of cells) {
        td.textContent = td.dataset.v;
        await sleep(140);
      }
      await sleep(5200);
    }
  }
  loop();
})();
