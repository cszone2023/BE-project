import '../styles/globals.css';
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider activeChain={ChainId.Mumbai}>
      <Component {...pageProps} />
      <Toaster />
    </ThirdwebProvider>
  )
}

export default MyApp
