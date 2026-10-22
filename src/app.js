import { menuItems, categories } from "./menu-data.js";
import { dictionary } from "./i18n.js";
import {
  escapeHTML as esc,
  normalizeBase,
  searchDishes,
  menuURL,
  readLanguage,
  saveLanguage,
  formatPrice,
} from "./utils.js";
const base = normalizeBase(
  document.querySelector('meta[name="rajput-base"]').content,
);
const relative = location.pathname.startsWith(base)
  ? location.pathname.slice(base.length).replace(/\/+$/, "")
  : "404";
const route = relative === "" ? "home" : relative;
let storage;
try {
  storage = window.localStorage;
} catch {
  storage = null;
}
let lang = readLanguage(storage),
  category = "all",
  query = "",
  returnFocus = null;
const t = (key) => dictionary[key]?.[lang === "ko" ? 0 : 1] || key;
const lines = (key) => esc(t(key)).replaceAll("\n", "<br>");
const main = document.getElementById("main"),
  dialog = document.getElementById("detail");
const maps = {
  naver:
    "https://map.naver.com/p/search/" +
    encodeURIComponent("라즈뿟 인도요리 부산 북구 덕천1길 9"),
  kakao:
    "https://map.kakao.com/link/search/" +
    encodeURIComponent("라즈뿟 인도요리 부산 덕천1길 9"),
  google:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("라즈뿟 인도요리 부산 북구 덕천1길 9"),
};
const arrow = '<span aria-hidden="true">↗</span>';
const photo = (name, alt, cls = "") =>
  `<figure class="${cls}"><img src="/assets/${name}.webp" alt="${esc(alt)}" loading="lazy" width="1536" height="1024"><figcaption>${t("photoNote")}</figcaption></figure>`;
function home() {
  return `<section class="hero"><div class="hero-top"><span>인도요리 · INDIAN CUISINE</span><span>${t("heroLocation")}</span></div><h1 class="hero-wordmark">Rajput</h1><div class="hero-bottom"><p class="hero-korean">라즈뿟 인도요리</p><p>${lines("heroLine")}</p><a class="text-link" href="/menu/">${t("viewMenu")}</a></div><figure class="hero-photo"><img src="/assets/table.webp" alt="${lang === "ko" ? "커리, 탄두리 치킨, 난을 차린 식탁 — 콘셉트 사진" : "Curry, tandoori chicken, and naan on an Indian table — concept photograph"}" width="1536" height="1024" fetchpriority="high"><figcaption>${t("photoNote")}</figcaption><a class="photo-link" href="#visit">Deokcheon, Busan ${arrow}</a></figure></section>
<section class="food-section wrap reveal"><div class="section-heading"><p class="eyebrow">${t("foodEyebrow")}</p><h2>${lines("foodTitle")}</h2><p class="body-copy">${t("foodIntro")}</p><a class="text-link" href="/menu/">${t("foodCta")}</a></div><div class="food-display">${photo("tandoori", lang === "ko" ? "탄두리 치킨 콘셉트 사진" : "Concept tandoori chicken photograph")}<div class="featured-list">${[
    ["tandoori-half", "featuredTandoor", "featuredTandoorSub"],
    ["butter-chicken", "featuredCurry", "featuredCurrySub"],
    ["garlic-naan", "featuredNaan", "featuredNaanSub"],
  ]
    .map(
      ([id, name, sub], i) =>
        `<a href="/menu/?dish=${id}"><span class="item-number">0${i + 1}</span><span><small>${t(sub)}</small><strong>${t(name)}</strong></span>${arrow}</a>`,
    )
    .join("")}</div></div></section>
<section class="table-section" id="table"><div class="table-inner wrap reveal">${photo("naan", lang === "ko" ? "난을 담은 바구니 콘셉트 사진" : "Concept photograph of naan in a basket")}<div><p class="eyebrow">${t("tableEyebrow")}</p><h2>${lines("tableTitle")}</h2><p class="body-copy">${t("tableText")}</p><a class="text-link" href="/menu/">${t("tableLink")}</a></div></div></section>
<section id="visit" class="visit-section wrap reveal"><div><p class="eyebrow">${t("visitEyebrow")}</p><h2>${lines("visitTitle")}</h2><div class="floor-mark" aria-hidden="true">2F<span>DEOKCHEON<br>BUSAN</span></div></div><div class="visit-details"><p class="place-name">라즈뿟 인도요리 <span>Rajput Indian Cuisine</span></p><address>${t("address")}</address><p class="landmark">${t("landmark")}</p><button class="text-link copy-address">${t("copyAddress")} <span aria-hidden="true">⧉</span></button><div class="map-links"><p>${t("mapPrompt")}</p>${Object.entries(
    maps,
  )
    .map(
      ([key, url]) =>
        `<a href="${url}" target="_blank" rel="noopener noreferrer">${t(key)}</a>`,
    )
    .join(
      "",
    )}</div><div class="visit-note"><h3>${t("hoursLabel")}</h3><p>${t("hoursText")}</p></div></div></section>
<section class="faq wrap reveal"><h2>${t("faqTitle")}</h2><div>${[1, 2, 3].map((n) => `<details><summary>${t("faq" + n)}<span aria-hidden="true">+</span></summary><p>${t("faq" + n + "a")}</p></details>`).join("")}</div></section>`;
}
function menu() {
  return `<section class="menu-intro wrap"><p class="eyebrow">${t("menuEyebrow")}</p><h1>${t("menuTitle")}<span class="title-flourish" aria-hidden="true">✳</span></h1><p>${t("menuIntro")}</p></section><section class="menu-browser wrap" aria-label="${t("menu")}"><div class="menu-tools"><div class="category-tabs" role="group" aria-label="${t("menu")}">${["all", ...categories].map((c) => `<button data-category="${c}" aria-pressed="${category === c}">${t(c)}</button>`).join("")}</div><div class="search-box"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><input type="search" id="search" aria-label="${t("search")}" placeholder="${t("searchPlaceholder")}" value="${esc(query)}" autocomplete="off"><button id="clearSearch" aria-label="${t("clearSearch")}" ${query ? "" : "hidden"}>×</button></div></div><p class="menu-notice">${t("menuNotice")}</p><p id="resultCount" class="result-count" role="status" aria-live="polite"></p><div id="menuResults"></div><p class="menu-bottom-note">${t("menuFooter")}</p></section>`;
}
function dishRow(d) {
  return `<button class="dish" data-dish="${d.id}" aria-label="${esc((lang === "ko" ? d.ko : d.en) + " · " + t("details"))}"><span class="dish-copy"><strong>${esc(lang === "ko" ? d.ko : d.en)}</strong><small lang="${lang === "ko" ? "en" : "ko"}">${esc(lang === "ko" ? d.en : d.ko)}</small><span>${esc(d.description[lang])}</span></span><span class="dish-tail"><small>${esc(formatPrice(d, lang) || t("pricePending"))}</small><span class="dish-plus" aria-hidden="true">+</span></span></button>`;
}
function renderResults() {
  const filtered = searchDishes(
    menuItems.filter((d) => d.visible),
    category,
    query,
  );
  document.getElementById("resultCount").textContent =
    filtered.length +
    (lang === "en" && filtered.length === 1 ? " dish" : t("results"));
  document.getElementById("clearSearch").hidden = !query;
  document
    .querySelectorAll("[data-category]")
    .forEach((b) =>
      b.setAttribute("aria-pressed", b.dataset.category === category),
    );
  document.getElementById("menuResults").innerHTML = filtered.length
    ? categories
        .filter((c) => filtered.some((d) => d.category === c))
        .map(
          (c, i) =>
            `<section class="menu-group"><div class="menu-group-heading"><span>0${categories.indexOf(c) + 1}</span><h2>${t(c)}</h2><span>${filtered.filter((d) => d.category === c).length}</span></div><div class="dish-grid">${filtered
              .filter((d) => d.category === c)
              .map(dishRow)
              .join("")}</div></section>`,
        )
        .join("")
    : `<div class="empty"><span aria-hidden="true">⌕</span><h2>${t("emptyTitle")}</h2><p>${t("emptyText")}</p><button class="button" id="resetMenu">${t("reset")}</button></div>`;
  document
    .querySelectorAll("[data-dish]")
    .forEach((b) =>
      b.addEventListener("click", () => openDish(b.dataset.dish, b)),
    );
  document.getElementById("resetMenu")?.addEventListener("click", () => {
    category = "all";
    query = "";
    document.getElementById("search").value = "";
    renderResults();
    document.getElementById("search").focus();
  });
}
function openDialog(html, trigger) {
  returnFocus = trigger || document.activeElement;
  document.getElementById("dialogContent").innerHTML = html;
  dialog.showModal();
  document.body.classList.add("dialog-open");
  dialog.querySelector(".close").focus();
}
function openDish(id, trigger) {
  const d = menuItems.find((d) => d.id === id && d.visible);
  if (!d) return;
  openDialog(
    `${d.image ? photo(d.image.replace(".webp", ""), lang === "ko" ? "음식 콘셉트 사진" : "Concept food photograph", "detail-photo") : ""}<div class="detail-copy"><p class="eyebrow">${t(d.category)} · RAJPUT</p><h2 id="dialogTitle">${esc(lang === "ko" ? d.ko : d.en)}</h2><p class="detail-translation" lang="${lang === "ko" ? "en" : "ko"}">${esc(lang === "ko" ? d.en : d.ko)}</p><p>${esc(d.description[lang])}</p><p class="detail-price">${esc(formatPrice(d, lang) || t("pricePending"))}</p><p class="ingredient-note">${t("ingredientsNote")}</p><details class="source-details"><summary>${t("sourceLabel")}</summary><p>${t("sourceNote")}</p><a href="${esc(d.source)}" target="_blank" rel="noopener noreferrer">${t("openSource")}</a></details></div>`,
    trigger,
  );
}
function qrPage() {
  return `<section class="qr-layout wrap"><div class="qr-intro"><p class="eyebrow">RAJPUT · QR MENU</p><h1>${lines("qrTitle")}</h1><p>${t("qrIntro")}</p><div class="qr-actions"><a class="button" id="downloadQR" download="rajput-menu-qr.svg">${t("download")}</a><button class="text-link" id="printQR">${t("print")} ↗</button></div><div class="qr-destination"><span>${t("qrDestination")}</span><a id="menuDestination" href="/menu/"></a></div><p class="qr-warning">${t("qrWarning")}</p></div><article class="qr-card" aria-label="${t("print")}"><div class="card-top">INDIAN CUISINE<span>DEOKCHEON, BUSAN</span></div><p class="card-wordmark">Rajput</p><p class="card-korean">라즈뿟 인도요리</p><div id="qrCode"></div><h2>${t("qrCardTitle")}</h2><p>${t("qrCardSub")}</p><p class="card-demo">${t("qrDemo")}</p></article></section>`;
}
function generateQR() {
  const target = menuURL(location.origin, base);
  document.getElementById("menuDestination").textContent = target;
  document.getElementById("menuDestination").href = target;
  try {
    if (typeof window.qrcode !== "function")
      throw Error("QR encoder unavailable");
    const qr = window.qrcode(0, "M");
    qr.addData(target);
    qr.make();
    const qrSVG = qr
      .createSvgTag({ cellSize: 8, margin: 32, scalable: true })
      .replace(
        "<svg ",
        '<svg role="img" aria-label="Rajput digital menu QR code" ',
      );
    document.getElementById("qrCode").innerHTML = qrSVG;
    document.getElementById("downloadQR").href = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(qrSVG);
  } catch {
    document.getElementById("qrCode").innerHTML =
      `<p role="alert">${t("qrError")}</p>`;
    document.getElementById("downloadQR").removeAttribute("href");
    document.getElementById("downloadQR").setAttribute("aria-disabled", "true");
    document.getElementById("printQR").disabled = true;
  }
  document.getElementById("printQR").onclick = () => window.print();
}
function initMotion() {
  const els = document.querySelectorAll(".reveal");
  if (
    matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window)
  )
    return;
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      }),
    { threshold: 0.08 },
  );
  els.forEach((el) => {
    el.classList.add("will-reveal");
    observer.observe(el);
  });
}
function render() {
  document.documentElement.lang = lang;
  document
    .querySelectorAll("[data-i]")
    .forEach((el) => (el.textContent = t(el.dataset.i)));
  document.getElementById("language").textContent =
    lang === "ko" ? "EN" : "한국어";
  document
    .getElementById("language")
    .setAttribute(
      "aria-label",
      lang === "ko" ? "Switch language to English" : "한국어로 변경",
    );
  document
    .getElementById("mobileToggle")
    .setAttribute(
      "aria-label",
      lang === "ko" ? "메뉴 열기" : "Open navigation",
    );
  main.innerHTML =
    route === "home"
      ? home()
      : route === "menu"
        ? menu()
        : route === "qr"
          ? qrPage()
          : `<section class="not-found wrap"><p class="eyebrow">404 · RAJPUT</p><h1>${t("notFound")}</h1><a href="/" class="button">${t("backHome")}</a></section>`;
  document.title =
    (route === "menu"
      ? t("menu") + " · "
      : route === "qr"
        ? "QR Menu · "
        : "") + "Rajput · 라즈뿟 인도요리";
  document.querySelectorAll("nav a").forEach((a) => {
    if (
      (route === "menu" && a.pathname === base + "menu/") ||
      (route === "qr" && a.pathname === base + "qr/")
    )
      a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  if (route === "menu") {
    renderResults();
    document.getElementById("search").addEventListener("input", (e) => {
      query = e.target.value;
      renderResults();
    });
    document.querySelectorAll("[data-category]").forEach((b) =>
      b.addEventListener("click", () => {
        category = b.dataset.category;
        renderResults();
      }),
    );
    document.getElementById("clearSearch").onclick = () => {
      query = "";
      document.getElementById("search").value = "";
      renderResults();
      document.getElementById("search").focus();
    };
  }
  if (route === "qr") generateQR();
  document.querySelectorAll(".copy-address").forEach((b) =>
    b.addEventListener("click", async () => {
      try {
        await Promise.race([
          navigator.clipboard.writeText("부산광역시 북구 덕천1길 9, 2층"),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Clipboard unavailable")), 2000),
          ),
        ]);
        toast(t("copied"));
      } catch {
        toast(t("copyFailed"));
      }
    }),
  );
  initMotion();
  if (location.hash && route === "home")
    requestAnimationFrame(() =>
      document.getElementById(location.hash.slice(1))?.scrollIntoView(),
    );
}
let toastTimer;
function toast(message) {
  clearTimeout(toastTimer);
  const el = document.getElementById("toast");
  el.textContent = message;
  el.classList.add("show");
  toastTimer = setTimeout(() => el.classList.remove("show"), 5000);
}
dialog.querySelector(".close").onclick = () => dialog.close();
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      dialog.close();
  }
});
dialog.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
  if (returnFocus?.isConnected) returnFocus.focus();
});
document.getElementById("language").onclick = () => {
  lang = lang === "ko" ? "en" : "ko";
  saveLanguage(storage, lang);
  render();
  document.getElementById("language").focus();
};
document.getElementById("previewInfo").onclick = (e) =>
  openDialog(
    `<div class="detail-copy"><p class="eyebrow">RAJPUT · DESIGN PREVIEW</p><h2 id="dialogTitle">${t("aboutTitle")}</h2><p>${t("aboutText")}</p></div>`,
    e.currentTarget,
  );
const mobileToggle = document.getElementById("mobileToggle"),
  nav = document.getElementById("navigation");
function closeNavigation() {
  mobileToggle.setAttribute("aria-expanded", "false");
  nav.classList.remove("open");
}
mobileToggle.onclick = () => {
  const open = mobileToggle.getAttribute("aria-expanded") !== "true";
  mobileToggle.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("open", open);
  if (open) nav.querySelector("a").focus();
};
nav
  .querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", closeNavigation));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.classList.contains("open")) {
    closeNavigation();
    mobileToggle.focus();
  }
});
render();
const initialDish = new URLSearchParams(location.search).get("dish");
if (route === "menu" && initialDish) openDish(initialDish);
