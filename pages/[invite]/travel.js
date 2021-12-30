import Head from 'next/head'
import Header from 'components/Header'
import invites from 'invites'

const Invite = ({code, name, introMessage, domain, translations, lang}) => {
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

    <Header t={t} domain={domain} code={code} selected="travel" lang={lang} />

    <div className="invitePicture">
      <img src="/images/hotel.jpeg" alt={t('marriott')} className="invitePicture hotelPicture" />
    </div>

    <div className="section">
      <h2>{t('hotel')}</h2>

      <p className="centered" dangerouslySetInnerHTML={{__html: t('hotel_info')}} />

      <p className="centered marginBelow"><a className="primary ctaBtn" href="https://www.marriott.com/event-reservations/reservation-link.mi?id=1618863091878&key=GRP&app=resvlink" target="_blank">{t('book_stay')}</a></p>

      {lang !== 'nl' && (<>
        <h2>{t('airport')}</h2>

        <p className="centered" dangerouslySetInnerHTML={{__html: t('airport_info')}} />

        <p className="centered marginBelow"><a className="secondary ctaBtn" href="https://www.marriott.com/hotels/maps/travel/brudt-brussels-marriott-hotel-grand-place/?maps" target="_blank">{t('view_directions')}</a></p>

        <h2>{t('travel_advisories')}</h2>

        <p className="centered">{t('advisory')}</p>

        <p className="centered"><a className="secondary ctaBtn" href="https://unitedstates.diplomatie.belgium.be/en/visa-belgium" target="_blank">{t('view_advisories')}</a></p>
      </>)}
    </div>

    <div className="invitePicture">
      <img src="/images/venue.jpg" alt={t('bayard')} className="invitePicture" />
    </div>

    <div className="section">
      <h2>{t('venue')}</h2>

      <p className="centered" dangerouslySetInnerHTML={{__html: t('venue_info')}} />
      <p className="centered">
        Rue du Château Bayard 4,<br/>
        (Route de la Bruyère - GPS)<br/>
        5310 Éghezée - Belgium
      </p>

      <p className="centered marginBelow"><a className="primary ctaBtn" href="https://www.google.com/maps/dir/Current+Location/Rue+du+Château+Bayard+4+5310+Eghezée+Belgique" target="_blank">{t('view_map')}</a></p>
    </div>
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
