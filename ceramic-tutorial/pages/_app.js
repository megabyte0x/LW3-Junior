import '../styles/globals.css'
import { Provider } from "@self.id/react";

export default function App({ Component, pageProps }) {
  return (
    <Provider client={{ ceramic: "testnet-clay" }}>
      <Component {...pageProps} />
    </Provider>
  )
}
