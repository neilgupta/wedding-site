import Head from 'next/head'
import InviteCode from 'components/InviteCode'

export default function Home() {
  return (
    <main>
      <Head>
        <title>Neil & Kat</title>
        <meta name="description" content="I'm getting married to Kat and I look forward to sharing this special moment with you." />
        <meta property="og:site_name" content="Neil & Kat" />
        <meta property="og:title" content="I'm getting married!" />
        <meta property="og:description" content="I'm getting married to Kat and I look forward to sharing this special moment with you." />
        <meta property="og:image" content="https://wedding.neil.gg/images/hero.jpeg" />
      </Head>
      <InviteCode autoFocus />
    </main>
  )
}
