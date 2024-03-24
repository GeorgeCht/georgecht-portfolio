import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('homepage', () => {
  test('should not have any automatically detectable accessibility issues', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/')
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(['color-contrast'])
      .analyze()
    expect(accessibilityScanResults.violations).toEqual([])
  })
})
