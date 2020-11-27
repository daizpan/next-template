import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

type Props = {
  styleTags: any;
};

export default class MyDocument extends Document<Props> {
  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head>
          <meta name="description" content="Hello, World!" />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.

  const sheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  const page = originalRenderPage((App) => (props) => sheet.collectStyles(<App {...props} />));
  const styleTags = sheet.getStyleElement();
  return { ...page, styleTags };
};
