import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang={'en'}>
      <Head />
      <body
        className={
          'overflow-x-hidden w-full transition-colors duration-[666ms]'
        }
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
