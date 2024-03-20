import { includes } from '@/lib/utils'
import { test, expect } from '@playwright/test'

test('main navigation', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: includes('Navigate') }).click()
  await expect(page.getByRole('navigation')).toContainText('Projects')
  await expect(page.getByRole('navigation')).toContainText('About')
  await expect(page.getByRole('navigation')).toContainText('Archive')
  await expect(page.getByRole('navigation')).toContainText('Contact')
})

// test('go back navigation', async ({ page }) => {
//   await page.goto('/about')
//   await page.getByRole('button', { name: includes('Navigate') }).click()
//   await expect(page.getByRole('navigation')).toContainText('← Back')
// })
