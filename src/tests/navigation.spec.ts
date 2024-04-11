import { includes } from '@/lib/utils'
import { test, expect } from '@playwright/test'

test('main navigation', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

  await expect(
    page.getByRole('link', { name: 'projects projects' }),
  ).toBeVisible()
  await expect(page.getByRole('banner')).toContainText('projects')

  await expect(page.getByRole('link', { name: 'about about' })).toBeVisible()
  await expect(page.getByRole('banner')).toContainText('about')

  await expect(
    page.getByRole('link', { name: 'archive archive' }),
  ).toBeVisible()
  await expect(page.getByRole('banner')).toContainText('archive')

  await expect(
    page.getByRole('link', { name: 'contact contact' }),
  ).toBeVisible()
  await expect(page.getByRole('banner')).toContainText('contact')

  await expect(page.getByRole('link', { name: 'cv cv' })).toBeVisible()
  await expect(page.getByRole('banner')).toContainText('cv')
})
