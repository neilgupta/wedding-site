import Head from 'next/head'
import Header from 'components/Header'
import InviteCasual from 'components/InviteCasual'
import InviteFormal from 'components/InviteFormal'
import invites from 'invites'

const Invite = ({code, name, lang, introMessage, domain, translations}) => {
  const t = (key, ctx = {}) => {
    let str = `${key}_${ctx.context}` in translations ? translations[`${key}_${ctx.context}`] : translations[key]
    delete ctx.context
    if (Object.keys(ctx).length) {
      str = str.replace(/\{\{([\s]*[a-zA-Z0-9_]+[\s]*)\}\}/g, (_, match) => ctx[match.trim()])
    }
    return str
  }

  const InviteType = lang === 'hi' ? InviteFormal : InviteCasual

  return (<>
    <Head>
      <title>{t('title', {context: domain})}</title>
      <meta name="description" content={introMessage || t('getting_married', {context: domain, name})} />
      <meta property="og:site_name" content={`${domain}.wedding`} />
      <meta property="og:title" content={t('title', {context: domain})} />
      <meta property="og:description" content={introMessage || t('getting_married', {context: domain, name})} />
      <meta property="og:image" content={lang === 'hi' ? `https://wedding.neil.gg/images/hero2.jpeg` : `https://wedding.neil.gg/images/hero.jpeg`} />
    </Head>

    <Header t={t} domain={domain} code={code} selected="home" lang={lang} />

    <InviteType t={t} introMessage={introMessage} domain={domain} name={name} />
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
