import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    const locale = this.props.__NEXT_DATA__.locale ?? 'fr'
    return (
      <Html lang={locale}>
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#0d1117" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
