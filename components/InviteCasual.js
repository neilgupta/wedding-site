import styles from './InviteCasual.module.css'

export default function InviteCasual({t, domain, name, introMessage}) {
  return (<>
    <div className={styles.invitePicture}>
      <img src="/images/hero.jpeg" alt={t('title', {context: domain})} className={styles.invitePicture} />
    </div>

    <div className={styles.weddingNames}>
      <p className={styles.personName}>{t('person1', {context: domain})}</p>
      <p className={styles.and}>{t('and')}</p>
      <p className={styles.personName}>{t('person2', {context: domain})}</p>
    </div>

    <div className={styles.weddingDates} dangerouslySetInnerHTML={{__html: t('dates')}} />

    <hr className={styles.divider} />

    <p className={styles.introText}>{introMessage || t('getting_married', {context: domain, name})}</p>

    <hr className={styles.divider} />
  </>)
}
