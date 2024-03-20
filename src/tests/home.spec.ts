import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.getByRole('button', { name: 'Navigate Navigate' }).click()
  await expect(page.getByRole('navigation')).toContainText('Projects')
  await expect(page.getByRole('navigation')).toContainText('About')
  await expect(page.getByRole('navigation')).toContainText('Archive')
  await expect(page.getByRole('navigation')).toContainText('Contact')
})
