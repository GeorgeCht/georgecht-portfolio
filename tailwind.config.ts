import type { Config } from 'tailwindcss'
import type { PluginAPI } from 'tailwindcss/types/config'
const plugin = require('tailwindcss/plugin')

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        desktop: '1280px',
      },
      'font-variation': {
        thin: 300,
        light: 400,
        semi: 420,
        medium: 500,
        bold: 666,
        heavy: 900,
      },
      height: {
        // @ts-expect-error: Fallbacks not supported in @tailwindcss yet
        'dvh-desktop': ['calc(100vh - 40px)', 'calc(100dvh - 40px)'],
        // @ts-expect-error: Fallbacks not supported in @tailwindcss yet
        'dvh-mobile': ['calc(100vh - 36px)', 'calc(100dvh - 36px)'],
        // @ts-expect-error: Fallbacks not supported in @tailwindcss yet
        'dvh-screen-desktop': ['100vh', '100dvh'],
        // @ts-expect-error: Fallbacks not supported in @tailwindcss yet
        'dvh-screen-mobile': ['100vh', '100dvh'],
      },
      minHeight: {
        // @ts-expect-error: Fallbacks not supported in @tailwindcss yet
        'dvh-desktop': ['calc(100vh - 40px)', 'calc(100dvh - 40px)'],
        // @ts-expect-error: Fallbacks not supported in @tailwindcss yet
        'dvh-mobile': ['calc(100vh - 36px)', 'calc(100dvh - 36px)'],
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(1, 0, 0.01, 1)',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '0' },
          '50%, 100%': { opacity: '1' },
        },
        marquee: {
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        blink: 'blink 0.475s ease-in-out infinite',
        marquee: 'marquee var(--duration, 30s) linear infinite',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }: PluginAPI) {
      matchUtilities(
        {
          'font-variation': (value: string | number) => ({
            fontVariationSettings: `'shea' 420, 'wght' ${String(value)}`,
          }),
        },
        { values: theme('font-variation') },
      )
    }),
    require('tailwind-gradient-mask-image'),
  ],
}
export default config
