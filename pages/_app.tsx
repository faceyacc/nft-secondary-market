import type { AppProps } from 'next/app'
import Link from 'next/link'
import '../styles/base.css'




function MyApp({ Component, pageProps }: AppProps) {
  // return <Component {...pageProps} />
  return (
    <div>
      <nav className="border-b p-6">
        <p className="text-4xl font-bold">NFT Secondary Marketplace</p>
        <div className="flex mt-4">
          <Link href="/">
            <a className="mr-4 text-blue-500">
              Home
            </a>
          </Link>
          <Link href="/create-items">
            <a className="mr-6 text-blue-500">
              Sell Digital Asset
            </a>
          </Link>

          <Link href="/my-assets">
            <a className="mr-6 text-blue-500">
              My Digital Assets
            </a>
          </Link>

          <Link href="/creator-dashboard">
          <a className="mr-6 text-blue-500">
            Creator Dashboard
          </a>
          </Link>
        </div>
      </nav>
      <Component { ...pageProps } />
    </div>
  )
}


export default MyApp