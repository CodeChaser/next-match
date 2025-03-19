import { heroui } from '@heroui/react';
import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'dark-gradient':
          'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
      },
    },
  },
  plugins: [heroui()],
} satisfies Config;
