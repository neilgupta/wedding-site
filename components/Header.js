import styles from './Header.module.css'
import clsx from 'clsx'

export default function Header({t, domain, code, selected, lang}) {
  return (
    <div className={styles.header}>
      {lang !== 'hi' && <h1>{t('title', {context: domain})}</h1>}
      <div className={styles.navlinks}>
        <a href={`/${code}`} className={clsx(selected === 'home' && styles.selected)}>{t('home')}</a>
        <a href={`/${code}/schedule`} className={clsx(selected === 'schedule' && styles.selected)}>{t('schedule')}</a>
        <a href={`/${code}/travel`} className={clsx(selected === 'travel' && styles.selected)}>{t('travel')}</a>
        <a href={`/${code}/rsvp`} className={clsx(styles.rsvp, selected === 'rsvp' && styles.selected)}>{t('rsvp')}</a>
      </div>
    </div>
  )
}
