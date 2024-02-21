import '../styles/globals.css';
import '@pantheon-systems/nextjs-kit/style.css';
import { GoogleTagManager } from '@next/third-parties/google';

export default function MyApp({ Component, pageProps }) {
	return( 
		<>
		<Component {...pageProps} />
		<GoogleTagManager gtmId="G-WC96XDYR3H" />
		</>
	)
}