import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Custom404() {
  const router = useRouter()

  return (
    <main style={{textAlign: 'center'}}>
      <Head>
        <title>Invite Not Found</title>
        <meta name="description" content="Sorry, I don't recognize this invite code." />
        <meta property="og:site_name" content="Save the date" />
        <meta property="og:title" content="Invite Not Found" />
        <meta property="og:description" content="Sorry, I don't recognize this invite code." />
        <meta property="og:image" content="https://wedding.neil.gg/images/savethedate_en.jpeg" />
      </Head>

      <object data="/images/startled.svg" type="image/svg+xml" style={{
        display: 'block',
        margin: '20px auto 80px',
        width: '90%',
        maxWidth: '372px',
        height: '275px'
      }}>
        Startled
      </object>

      <h1>Well, this is awkward.</h1>

      <p>I don't recognize <strong>{router.asPath.slice(1)}</strong>. <Link href="/">Try a different code</Link> or <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>email us</a>.</p>
    </main>
  )
}
