import { includes } from '@/lib/utils'
import { test, expect } from '@playwright/test'

test('main navigation', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.getByRole('button', { name: includes('Navigate') }).click()
  await expect(page.getByRole('navigation')).toContainText('Projects')
  await expect(page.getByRole('navigation')).toContainText('About')
  await expect(page.getByRole('navigation')).toContainText('Archive')
  await expect(page.getByRole('navigation')).toContainText('Contact')
})
