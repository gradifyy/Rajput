import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import vm from "node:vm";
import { menuItems } from "../src/menu-data.js";
import { dictionary } from "../src/i18n.js";
import {
  searchDishes,
  normalizeBase,
  menuURL,
  escapeHTML,
  readLanguage,
  saveLanguage,
  formatPrice,
} from "../src/utils.js";
const base = normalizeBase(process.env.BASE_PATH || "/");
test("every interface label has nonempty Korean and English translations", () => {
  for (const [key, value] of Object.entries(dictionary)) {
    assert.equal(value.length, 2, key);
    for (const text of value)
      assert.ok(typeof text === "string" && text.trim(), key);
  }
});
test("menu records retain evidence and complete bilingual content", () => {
  assert.equal(new Set(menuItems.map((d) => d.id)).size, menuItems.length);
  for (const d of menuItems) {
    assert.ok(
      ["curry", "tandoor", "naan", "sides", "drinks"].includes(d.category),
    );
    assert.ok(d.en && d.ko && d.description.ko && d.description.en);
    assert.match(d.source, /^https:\/\//);
    assert.equal(d.verification, "PROVISIONAL");
    assert.equal(d.price, null);
    assert.equal(d.priceStatus, "NEEDS OWNER CONFIRMATION");
    assert.equal(d.availability, "unconfirmed");
    assert.deepEqual(d.tags, []);
  }
});
test("new food assets exist and old stock imagery is not shipped", async () => {
  for (const f of ["table.webp", "tandoori.webp", "naan.webp", "favicon.svg"])
    await access(new URL("../public/assets/" + f, import.meta.url));
  await assert.rejects(
    access(new URL("../public/assets/hero.jpg", import.meta.url)),
  );
});
test("empty and whitespace searches return all visible sourced records", () => {
  assert.equal(searchDishes(menuItems, "all", "").length, menuItems.length);
  assert.equal(searchDishes(menuItems, "all", "   ").length, menuItems.length);
});
test("category filter returns three naan records", () =>
  assert.deepEqual(
    searchDishes(menuItems, "naan", "").map((d) => d.id),
    ["plain-naan", "butter-naan", "garlic-naan"],
  ));
test("English search is trimmed and case insensitive", () =>
  assert.equal(
    searchDishes(menuItems, "all", " GARLIC ")[0].id,
    "garlic-naan",
  ));
test("Korean search works independently of UI language", () =>
  assert.equal(searchDishes(menuItems, "all", "사모사")[0].id, "samosa"));
test("search respects category and empty results", () => {
  assert.equal(searchDishes(menuItems, "curry", "naan").length, 0);
  assert.equal(searchDishes(menuItems, "all", "zzzzzz").length, 0);
});
test("HTML escaping is retained", () =>
  assert.equal(
    escapeHTML("<img x=\"y\" onerror='x'>"),
    "&lt;img x=&quot;y&quot; onerror=&#39;x&#39;&gt;",
  ));
test("root and project-subpath hosting normalize safely", () => {
  assert.equal(normalizeBase("/"), "/");
  assert.equal(normalizeBase("Rajput"), "/Rajput/");
  assert.equal(normalizeBase("/Rajput/"), "/Rajput/");
  assert.throws(() => normalizeBase("../x"));
  assert.throws(() => normalizeBase("https://example.org"));
});
test("QR destination follows the current origin and deployment base", () => {
  assert.equal(
    menuURL("https://restaurant.example", "/"),
    "https://restaurant.example/menu/",
  );
  assert.equal(
    menuURL("https://gradifyy.github.io", "/Rajput/"),
    "https://gradifyy.github.io/Rajput/menu/",
  );
});
test("language persists and blocked storage remains usable", () => {
  const map = new Map(),
    storage = { getItem: (k) => map.get(k), setItem: (k, v) => map.set(k, v) };
  assert.equal(readLanguage(storage), "ko");
  saveLanguage(storage, "en");
  assert.equal(readLanguage(storage), "en");
  const blocked = {
    getItem() {
      throw Error("blocked");
    },
    setItem() {
      throw Error("blocked");
    },
  };
  assert.equal(readLanguage(blocked), "ko");
  assert.doesNotThrow(() => saveLanguage(blocked, "en"));
  assert.equal(readLanguage(null), "ko");
});
test("bundled QR encoder creates a real scalable SVG and matrix", async () => {
  const context = vm.createContext({});
  vm.runInContext(
    await readFile(
      new URL("../public/vendor/qrcode.js", import.meta.url),
      "utf8",
    ),
    context,
  );
  const qr = context.qrcode(0, "M");
  qr.addData(menuURL("https://restaurant.example", base));
  qr.make();
  assert.ok(qr.getModuleCount() > 20);
  assert.match(
    qr.createSvgTag({ cellSize: 5, margin: 20, scalable: true }),
    /<svg/,
  );
  assert.equal(typeof qr.isDark(0, 0), "boolean");
});
test("all route shells use the selected base and bundled QR library", async () => {
  for (const route of [
    "index.html",
    "menu/index.html",
    "qr/index.html",
    "404.html",
  ]) {
    const s = await readFile(
      new URL("../dist/" + route, import.meta.url),
      "utf8",
    );
    assert.ok(s.includes(`name="rajput-base" content="${base}"`));
    assert.ok(s.includes(`type="module" src="${base}app.js"`));
    assert.ok(s.includes(`src="${base}vendor/qrcode.js"`));
    assert.match(s, /noindex,nofollow,noarchive/);
  }
  await assert.rejects(
    access(new URL("../dist/assets/menu-qr.svg", import.meta.url)),
  );
});
test("built links and images use the deployment base", async () => {
  const app = await readFile(
    new URL("../dist/app.js", import.meta.url),
    "utf8",
  );
  assert.ok(app.includes(`href="${base}menu/`));
  assert.ok(app.includes(`src="${base}assets/table.webp`));
  assert.doesNotMatch(app, /chatgpt\.site|openai|codex/i);
  assert.match(app, /menuURL\(location.origin,\s*base\)/);
});
test("reduced motion leaves content visible without animation", async () => {
  const css = await readFile(
    new URL("../src/style.css", import.meta.url),
    "utf8",
  );
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(
    css,
    /\.will-reveal\s*\{\s*opacity:\s*1;\s*transform:\s*none;?\s*\}/,
  );
  const app = await readFile(new URL("../src/app.js", import.meta.url), "utf8");
  assert.ok(
    app.includes('matchMedia("(prefers-reduced-motion: reduce)").matches'),
  );
});
test("unreliable entries are excluded and corroborated additions remain traceable", () => {
  assert.ok(!menuItems.some((d) => ["paneer-tikka", "papad"].includes(d.id)));
  for (const id of ["butter-chicken", "lassi"])
    assert.ok(
      menuItems.find((d) => d.id === id)?.source.includes("restaurantguru.com"),
    );
  for (const d of menuItems) assert.equal(d.visible, true);
});

test("only explicitly verified finite prices become customer-facing currency", () => {
  const draft = {
    price: 15000,
    currency: "KRW",
    priceStatus: "NEEDS OWNER CONFIRMATION",
  };
  assert.equal(formatPrice(draft), null);
  assert.equal(formatPrice({ ...draft, priceStatus: "VERIFIED" }), "₩15,000");
  for (const price of [null, NaN, -1, "15000"])
    assert.equal(
      formatPrice({ ...draft, priceStatus: "VERIFIED", price }),
      null,
    );
});
