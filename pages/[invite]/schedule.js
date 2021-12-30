import Head from 'next/head'
import Header from 'components/Header'
import invites from 'invites'

const Invite = ({code, name, introMessage, domain, pub, translations, lang}) => {
  const t = (key, ctx = {}) => {
    let str = `${key}_${ctx.context}` in translations ? translations[`${key}_${ctx.context}`] : translations[key]
    delete ctx.context
    if (Object.keys(ctx).length) {
      str = str.replace(/\{\{([\s]*[a-zA-Z0-9_]+[\s]*)\}\}/g, (_, match) => ctx[match.trim()])
    }
    return str
  }

  return (<>
    <Head>
      <title>{t('title', {context: domain})}</title>
      <meta name="description" content={introMessage || t('getting_married', {context: domain, name})} />
      <meta property="og:site_name" content={`${domain}.wedding`} />
      <meta property="og:title" content={t('title', {context: domain})} />
      <meta property="og:description" content={introMessage || t('getting_married', {context: domain, name})} />
      <meta property="og:image" content={lang === 'hi' ? `https://wedding.neil.gg/images/hero2.jpeg` : `https://wedding.neil.gg/images/hero.jpeg`} />
    </Head>

    <Header t={t} domain={domain} code={code} selected="schedule" lang={lang} />

    {!!pub && <>
      <h2 className="eventDate" dangerouslySetInnerHTML={{__html: t('friday_date')}} />
      <h3 className="eventLocation">Delirium Village</h3>

      <div className="event">
        <div className="eventName lastEvent">
          <p className="eventType">{t('pub')}</p>
          <p className="eventTime">{t('pub_time')}</p>
        </div>
        <div className="eventDetails lastEvent">
          {t('pub_desc')}
        </div>
      </div>
    </>}

    <h2 className="eventDate" dangerouslySetInnerHTML={{__html: t('saturday_date')}} />
    <h3 className="eventLocation">{t('bruges')}</h3>

    <div className="event">
      <div className="eventName lastEvent">
        <p className="eventType">{t('saturday_tour')}</p>
        <p className="eventTime">{t('saturday_time')}</p>
      </div>
      <div className="eventDetails lastEvent">
        {t('saturday_desc')}
      </div>
    </div>

    <h2 className="eventDate" dangerouslySetInnerHTML={{__html: t('sunday_date')}} />
    <h3 className="eventLocation">{t('bayard')}</h3>

    <div className="event">
      <div className="eventName">
        <p className="eventType">{t('bus_to_bayard')}</p>
        <p className="eventTime">{t('bus_to_bayard_time')}</p>
      </div>
      <div className="eventDetails">
        {t('bus_to_bayard_desc')}
      </div>
    </div>
    <div className="event">
      <div className="eventName">
        <p className="eventType">{t('baraat')}</p>
        <p className="eventTime">{t('baraat_time')}</p>
      </div>
      <div className="eventDetails">
        {t('baraat_desc')}
      </div>
    </div>
    <div className="event">
      <div className="eventName">
        <p className="eventType">{t('lunch')}</p>
        <p className="eventTime">{t('lunch_time')}</p>
      </div>
      <div className="eventDetails">
        {t('lunch_desc')}
      </div>
    </div>
    <div className="event">
      <div className="eventName">
        <p className="eventType">{t('ceremony')}</p>
        <p className="eventTime">{t('ceremony_time')}</p>
      </div>
      <div className="eventDetails">
        {t('ceremony_desc')}
      </div>
    </div>
    <div className="event">
      <div className="eventName">
        <p className="eventType">{t('reception')}</p>
        <p className="eventTime">{t('reception_time')}</p>
      </div>
      <div className="eventDetails">
        {t('reception_desc')}
      </div>
    </div>
    <div className="event">
      <div className="eventName">
        <p className="eventType">{t('dinner')}</p>
        <p className="eventTime">{t('dinner_time')}</p>
      </div>
      <div className="eventDetails">
        {t('dinner_desc')}
      </div>
    </div>
    <div className="event">
      <div className="eventName">
        <p className="eventType">{t('dance')}</p>
        <p className="eventTime">{t('dance_time')}</p>
      </div>
      <div className="eventDetails">
        {t('dance_desc')}
      </div>
    </div>
    <div className="event">
      <div className="eventName lastEvent">
        <p className="eventType">{t('bus_to_hotel')}</p>
        <p className="eventTime">{t('bus_to_hotel_time')}</p>
      </div>
      <div className="eventDetails lastEvent">
        {t('bus_to_hotel_desc')}
      </div>
    </div>

    <p className="note">{t('schedule_note')}</p>
  </>)
}

export async function getStaticProps(context) {
  const props = invites[context.params.invite]
  props.code = context.params.invite
  props.domain = process.env.NAMESPACE
  if ((props.lang === 'nl' && props.domain === 'neil') ||
      (props.lang === 'hi' && props.domain === 'kat')) {
    // enforce that english is used if languages are swapped on opposing domains
    props.lang = 'en'
  }
  props.translations = (await import(`locales/${props.lang}.json`)).default
  return {props}
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(invites).map(i => ({params: {invite: i}})),
    fallback: false
  };
}

export default Invite
