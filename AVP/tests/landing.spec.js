const { test, expect } = require('@playwright/test');

test.describe('Landing page', () => {
  test('loads and shows hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.hero h1')).toContainText('Адаптивный сценарный контроль');
    await expect(page.locator('.hero-badge')).toBeVisible();
    await expect(page.locator('.hero-meta')).toContainText('Покровская');
  });

  test('shows two scenario cards', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('.scenario-card');
    await expect(cards).toHaveCount(2);
    await expect(cards.nth(0)).toContainText('Апробированный сценарий');
    await expect(cards.nth(1)).toContainText('Универсальный шаблон');
  });

  test('shows four kit cards that are clickable', async ({ page }) => {
    await page.goto('/');
    const kitCards = page.locator('.kit-card');
    await expect(kitCards).toHaveCount(4);
    await expect(kitCards.nth(0)).toContainText('H5P-шаблон');
    await expect(kitCards.nth(1)).toContainText('Пошаговая инструкция');
    await expect(kitCards.nth(2)).toContainText('Промпты для AI');
    await expect(kitCards.nth(3)).toContainText('Чеклист');
  });

  test('shows three steps', async ({ page }) => {
    await page.goto('/');
    const steps = page.locator('.step');
    await expect(steps).toHaveCount(3);
  });

  test('topbar navigation links work', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('.topbar-nav');
    await expect(nav.locator('a')).toHaveCount(3);
  });
});

test.describe('Scenario cards navigation', () => {
  test('clicking template card loads H5P player', async ({ page }) => {
    await page.goto('/');
    await page.click('#card-template');
    await expect(page).toHaveURL(/scenario=template/);
    await expect(page.locator('#player-section')).toBeVisible();
    await expect(page.locator('#player-label')).toContainText('Универсальный шаблон');
  });

  test('clicking original card loads H5P player', async ({ page }) => {
    await page.goto('/');
    await page.click('#card-original');
    await expect(page).toHaveURL(/scenario=original/);
    await expect(page.locator('#player-section')).toBeVisible();
    await expect(page.locator('#player-label')).toContainText('Coffee Shop');
  });
});

test.describe('Kit cards are clickable on scenario page', () => {
  test('instruction card navigates from template page', async ({ page }) => {
    await page.goto('/?scenario=template');
    await page.locator('.kit-card[href="instruction.html"]').click();
    await expect(page).toHaveURL(/instruction\.html/);
    await expect(page.locator('.article-header h1')).toContainText('Как создать интерактивный сценарий');
  });

  test('prompts card navigates from template page', async ({ page }) => {
    await page.goto('/?scenario=template');
    await page.locator('.kit-card[href="prompts.html"]').click();
    await expect(page).toHaveURL(/prompts\.html/);
    await expect(page.locator('.article-header h1')).toContainText('Промпты');
  });

  test('checklist card navigates from template page', async ({ page }) => {
    await page.goto('/?scenario=template');
    await page.locator('.kit-card[href="checklist.html"]').click();
    await expect(page).toHaveURL(/checklist\.html/);
    await expect(page.locator('.article-header h1')).toContainText('Чеклист');
  });
});

test.describe('Instruction page', () => {
  test('loads and shows all sections', async ({ page }) => {
    await page.goto('/instruction.html');
    await expect(page.locator('.article-header h1')).toBeVisible();
    await expect(page.locator('h2')).toHaveCount(8);
  });

  test('FAQ items are interactive', async ({ page }) => {
    await page.goto('/instruction.html');
    const faqItem = page.locator('.faq-item').first();
    await expect(faqItem.locator('p')).not.toBeVisible();
    await faqItem.click();
    await expect(faqItem.locator('p')).toBeVisible();
  });

  test('back link goes to main page', async ({ page }) => {
    await page.goto('/instruction.html');
    await page.locator('a[href="index.html"]').first().click();
    await expect(page).toHaveURL(/index\.html/);
  });
});

test.describe('Prompts page', () => {
  test('loads and shows 4 prompt cards', async ({ page }) => {
    await page.goto('/prompts.html');
    await expect(page.locator('.article-header h1')).toContainText('Промпты');
    const promptCards = page.locator('.prompt-card');
    await expect(promptCards).toHaveCount(4);
  });

  test('copy button works', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/prompts.html');
    const copyBtn = page.locator('.copy-btn').first();
    await copyBtn.click();
    await expect(copyBtn).toContainText('Скопировано');
  });

  test('chain visualization shows 4 steps', async ({ page }) => {
    await page.goto('/prompts.html');
    const chainSteps = page.locator('.chain-step');
    await expect(chainSteps).toHaveCount(4);
  });
});

test.describe('Checklist page', () => {
  test('loads and shows all checkbox groups', async ({ page }) => {
    await page.goto('/checklist.html');
    await expect(page.locator('.article-header h1')).toContainText('Чеклист');
    const groups = page.locator('.checklist-group');
    await expect(groups).toHaveCount(4);
  });

  test('checkboxes are interactive and update progress', async ({ page }) => {
    await page.goto('/checklist.html');
    const progressText = page.locator('#progress-text');
    await expect(progressText).toContainText('0 из');

    await page.locator('input[data-key="c1"]').check();
    await expect(progressText).toContainText('1 из');
  });

  test('reset button clears all checkboxes', async ({ page }) => {
    await page.goto('/checklist.html');
    await page.locator('input[data-key="c1"]').check();
    await page.locator('input[data-key="c2"]').check();
    await expect(page.locator('#progress-text')).toContainText('2 из');

    await page.locator('#reset-btn').click();
    await expect(page.locator('#progress-text')).toContainText('0 из');
  });
});
