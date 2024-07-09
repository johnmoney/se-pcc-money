import { GoogleTagManager } from "@next/third-parties/google";

import "../styles/globals.css";
import "@pantheon-systems/pds-toolkit-react/_dist/css/pds-core.css";
import "govicons/css/govicons.min.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <GoogleTagManager gtmId="G-WC96XDYR3H" />
    </>
  );
}
