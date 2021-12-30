import Head from 'next/head'
import invites from 'invites'

export default function Stats() {
  const vals = Object.values(invites)
  const seats = vals.reduce((acc, i) => {
    if (i.eventsHash) acc += i.seatNames.length
    return acc
  }, 2) // we're obviously attending ourselves

  return (
    <main>
      <Head>
        <title>RSVP Stats</title>
      </Head>
      <h1 style={{textAlign: 'center', marginBottom: '2em', marginTop: '-1em'}}>
        RSVP Stats
      </h1>
      <h2>👯‍♀️ <a href="https://www.guilded.gg/Kat-and-Neil/groups/5D0wNay3/channels/d8f720df-9596-4154-b3a9-f94e6f169b85/chat" target="_blank">{seats} people attending</a></h2>
      <h2>📩 {vals.length} invites, ✅ {vals.filter(i => i.eventsHash).length}, ❌ {vals.filter(i => i.rsvp === false).length}</h2>
      <h2>🤔 {vals.filter(i => i.eventsHash === undefined).length} not yet responded</h2>
      <ul>
        {
          Object.keys(invites)
            .filter(k => invites[k].eventsHash === undefined)
            .map(k => <li><a href={`/${k}`} target="_blank">{invites[k].name}</a> ({invites[k].count}) {invites[k].pub ? '🍻' : ''}</li>)
        }
      </ul>
    </main>
  )
}
