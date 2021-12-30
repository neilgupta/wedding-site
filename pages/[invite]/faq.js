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

    <Header t={t} domain={domain} code={code} selected="faq" lang={lang} />

    <div className="section">
      <h2>{t('faq')}</h2>

      <p className="question">What should I wear?</p>
      <p className="answer">We don't have a dress code and welcome you to wear whatever you're most comfortable in. We will be wearing Indian attire for the Sangeet and black tie for the Wedding on Sunday, but are ok if you'd prefer to be more casual.</p>

      <p className="question">What is the weather like in Belgium in September?</p>
      <p className="answer">It's generally nice, albeit a little chilly.</p>

      <p className="question">How do I pronounce Kat's name?</p>
      <p className="answer">Cat-el-en-uh Lee-bart</p>

      <p className="question">Can I use the hotel group rate for more than the weekend?</p>
      <p className="answer">Yes! The hotel group rate is valid from September 8 - 16. If you need longer than that, let us know and the hotel will likely accomodate your stay.</p>
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
