import Head from 'next/head'
import styles from './InviteFormal.module.css'

export default function InviteFormal({t, domain, name, introMessage}) {
  return (<>
    <div className={styles.invitePicture}>
      <img src="/images/hero2.jpeg" alt={t('title', {context: domain})} className={styles.invitePicture} />
    </div>

    <Head>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Italianno" />
    </Head>

    <div align="center">
      <p className={styles.h3}>Sunita and Ramesh Gupta</p>
    </div>
  <div align="center"><p className={styles.h4}>request the pleasure of your company</p></div>
  <div align="center"><p className={styles.h4}>in celebration of the marriage of their son</p></div>
  <div align="center"><p className={styles.h1}>Neil Gupta</p></div>
  <div align="center"><p className={styles.h4}>to</p></div>
  <div align="center"><p className={styles.h1}>Katelijne Lybaert</p></div>
  <div align="center"><p className={styles.h3}>daughter of Liliane and Dirk Lybaert</p></div>
  <div align="center"><p></p></div>
  <div align="center"><p className={styles.h3}>Saturday, September 11, 2021</p></div>
  <div align="center"><p className={styles.h3}>Sunday, September 12, 2021</p></div>
  <div align="center"><p className={styles.h3}>Brussels, Belgium</p></div>
  </>)
}
