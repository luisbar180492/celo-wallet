import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        neo: {
          bg: '#e0e5ec',
          light: '#ffffff',
          dark: '#a3b1c6',
          shadow: '#d1d9e6',
        },
      },
      boxShadow: {
        'neo': '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff',
        'neo-inset': 'inset 8px 8px 16px #d1d9e6, inset -8px -8px 16px #ffffff',
        'neo-sm': '4px 4px 8px #d1d9e6, -4px -4px 8px #ffffff',
        'neo-lg': '12px 12px 24px #d1d9e6, -12px -12px 24px #ffffff',
      },
    },
  },
  plugins: [],
};

export default config;
