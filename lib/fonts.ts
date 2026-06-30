import localFont from 'next/font/local'

/** Google Sans Flex — open-source brand sans (SIL OFL). */
export const googleSansFlex = localFont({
  src: [
    {
      path: '../node_modules/@fontsource-variable/google-sans-flex/files/google-sans-flex-latin-wght-normal.woff2',
      style: 'normal',
    },
    {
      path: '../node_modules/@fontsource-variable/google-sans-flex/files/google-sans-flex-latin-ext-wght-normal.woff2',
      style: 'normal',
    },
  ],
  variable: '--font-google-sans-flex',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})
