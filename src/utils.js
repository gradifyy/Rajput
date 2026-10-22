export const escapeHTML = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
export function normalizeBase(value = "/") {
  const clean = String(value).replace(/^\/+|\/+$/g, "");
  if (!clean) return "/";
  if (!/^[A-Za-z0-9_/-]+$/.test(clean) || clean.split("/").includes(".."))
    throw new Error("Invalid base path");
  return `/${clean}/`;
}
export function searchDishes(dishes, category, query) {
  const needle = query.trim().normalize("NFKC").toLocaleLowerCase();
  return dishes.filter(
    (d) =>
      (category === "all" || category === d.category) &&
      [d.en, d.ko, ...Object.values(d.description), ...(d.keywords || [])].some(
        (s) => s.normalize("NFKC").toLocaleLowerCase().includes(needle),
      ),
  );
}
export function menuURL(origin, base = "/") {
  return new URL(normalizeBase(base) + "menu/", origin).href;
}
export function readLanguage(storage) {
  try {
    return storage.getItem("rajput-language") === "en" ? "en" : "ko";
  } catch {
    return "ko";
  }
}
export function saveLanguage(storage, value) {
  try {
    storage.setItem("rajput-language", value);
  } catch {
    /* Private browsers may disable local storage. */
  }
}

// Publish numbers only after explicit price verification. Unknown never means zero.
export function formatPrice(dish, language = "ko") {
  if (
    dish.priceStatus !== "VERIFIED" ||
    typeof dish.price !== "number" ||
    !Number.isFinite(dish.price) ||
    dish.price < 0
  )
    return null;
  try {
    return new Intl.NumberFormat(language === "ko" ? "ko-KR" : "en-US", {
      style: "currency",
      currency: dish.currency || "KRW",
      maximumFractionDigits: 0,
    }).format(dish.price);
  } catch {
    return null;
  }
}
