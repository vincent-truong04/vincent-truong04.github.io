const { test, expect } = require('@playwright/test');
const { default: AxeBuilder } = require('@axe-core/playwright');

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 667 },
];
const SCHEMES = ['light', 'dark'];

// Every page: Home plus one per section that has content (same rule as src/content/index.js).
const content = require('../src/content/content.json');
const PAGES = ['/', '/about', ...['experience'].filter((k) => content[k].length).map((k) => `/${k}`), '/projects',
  ...['research', 'coursework'].filter((k) => content[k].length).map((k) => `/${k}`), '/contact'];

const summarize = (violations) => violations.map((v) => ({
  id: v.id,
  impact: v.impact,
  help: v.help,
  targets: v.nodes.slice(0, 5).map((n) => n.target.join(' ')),
}));

const slug = (path) => (path === '/' ? 'home' : path.slice(1));

// Reduced motion keeps everything visible, so axe can check all of each page.
for (const path of PAGES) {
  for (const vp of VIEWPORTS) {
    for (const scheme of SCHEMES) {
      test(`axe: ${path} ${vp.name} ${scheme}`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
        await page.goto(path, { waitUntil: 'networkidle' });
        await page.screenshot({ path: `test-results/a11y/${slug(path)}-${vp.name}-${scheme}.png`, fullPage: true });

        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
          .analyze();
        expect(summarize(results.violations)).toEqual([]);
      });
    }
  }
}

for (const path of PAGES) {
  test(`axe after scrolling with motion on: ${path}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto(path, { waitUntil: 'networkidle' });
    for (let y = 0; y < 5000; y += 600) {
      await page.mouse.wheel(0, 600);
      await page.waitForTimeout(150);
    }
    await page.waitForTimeout(1000);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(summarize(results.violations)).toEqual([]);
  });
}

for (const path of PAGES) test(`keyboard: every stop is reachable, visible and outlined; no trap: ${path}`, async ({ page }) => {
  await page.goto(path, { waitUntil: 'networkidle' });
  const total = await page.evaluate(() => document.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])').length);
  const stops = [];
  for (let i = 0; i < total + 5; i++) {
    await page.keyboard.press('Tab');
    // Let smooth scrolling bring the element in and its reveal fade finish.
    await page.waitForTimeout(900);
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        text: (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 40),
        outline: s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) >= 2,
        onScreen: r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < innerHeight,
        opaque: (() => { let o = 1; for (let n = el; n; n = n.parentElement) o *= Number(getComputedStyle(n).opacity); return o > 0.95; })(),
      };
    });
    if (!info) break;
    stops.push(info);
  }
  console.log(`${stops.length} tab stops:`, stops.map((s) => s.text).join(' | '));
  expect(stops.length).toBeGreaterThanOrEqual(total);
  expect(stops.filter((s) => !s.outline)).toEqual([]);
  expect(stops.filter((s) => !s.onScreen)).toEqual([]);
  expect(stops.filter((s) => !s.opaque)).toEqual([]);
});

test('skip link moves focus to main content', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await expect(page.locator('.skip-link')).toBeInViewport();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
});

// 320 CSS px is what a 1280px window shows at 400% zoom (WCAG 1.4.10 Reflow).
for (const path of PAGES) for (const width of [320, 640]) {
  test(`reflow at ${width}px: no horizontal scrolling: ${path}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(path, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `test-results/a11y/reflow-${slug(path)}-${width}.png`, fullPage: true });
    const overflow = await page.evaluate(() => {
      const docWidth = document.documentElement.clientWidth;
      return [...document.querySelectorAll('body *')]
        .filter((el) => el.getBoundingClientRect().right > docWidth + 1 && getComputedStyle(el).position !== 'fixed')
        .slice(0, 5)
        .map((el) => `${el.tagName.toLowerCase()}.${el.className}`);
    });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    expect(overflow).toEqual([]);
  });
}

for (const path of PAGES) test(`reduced motion: all content is visible without scrolling or waiting: ${path}`, async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(path, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(100);
  const hidden = await page.evaluate(() => [...document.querySelectorAll('[data-reveal], [data-hero], .floorplan__block')]
    .filter((el) => { const s = getComputedStyle(el); return s.visibility === 'hidden' || Number(s.opacity) < 1; })
    .map((el) => el.textContent.trim().slice(0, 30)));
  expect(hidden).toEqual([]);
});

test('theme toggle switches and remembers the theme', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  const toggle = page.locator('.theme-toggle');
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
});

test('nav switches pages, sets the title, marks the current link and focuses the heading', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.locator('.site-header__nav').getByRole('link', { name: 'Projects' }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page).toHaveTitle(/^Projects · /);
  await expect(page.locator('main h1')).toHaveText('Projects');
  await expect(page.locator('main h1')).toBeFocused();
  await expect(page.locator('.site-header__nav [aria-current="page"]')).toHaveText('Projects');
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
  await page.goBack();
  await expect(page.locator('.hero')).toBeVisible();
});

test('pager clicks through every page in order', async ({ page }) => {
  await page.goto(PAGES[1], { waitUntil: 'networkidle' });
  for (const path of PAGES.slice(2)) {
    await page.locator('.pager__link--next').click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
  }
  await expect(page.locator('.pager__link--next')).toHaveCount(0);
  await page.goto(PAGES[1]);
  await page.locator('.pager__link--prev').click();
  await expect(page.locator('.hero')).toBeVisible();
});

test('deep links load directly and unknown paths show a not-found page', async ({ page }) => {
  await page.goto('/contact', { waitUntil: 'networkidle' });
  await expect(page.locator('main h1')).toHaveText('Contact Me');
  await page.goto('/no-such-page', { waitUntil: 'networkidle' });
  await expect(page.locator('main h1')).toHaveText('Page not found');
});
