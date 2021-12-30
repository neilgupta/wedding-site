import {useState, useEffect} from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import Confetti from 'components/Confetti'

import styles from './Rsvp.module.css'

const throwConfetti = () => {
  const event = new Event('confetti')
  const c = document.getElementById("confetti");
  if (c) c.dispatchEvent(event)
}

const MAX_SEATS = 5 // can't hog more than 5 seats, that's rude

const DRINKS     = 16
const LUNCH      = 8
const SANGEET    = 4
const WEDDING    = 2

export default function Rsvp({name, invite, pub, rsvp, seatNames = [], eventsHash, t}) {
  const [rsvpd, setRsvpd] = useState(rsvp === false || !!eventsHash)
  const [names, setNames] = useState(seatNames)
  eventsHash = eventsHash || (rsvp === false ? 0 : 30)
  const [events, setEvents] = useState(eventsHash)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)
  const [justSubmitted, setSubmitted] = useState(false)

  useEffect(() => {
    // load values from local storage if available
    const r = localStorage.getItem('rsvpd2')
    if (r !== null) setRsvpd(r === 'true')
    const n = localStorage.getItem('seatNames')
    if (n !== null) setNames(JSON.parse(n))
    const e = parseInt(localStorage.getItem('eventsHash'))
    if (!isNaN(e)) setEvents(e)
    const c = localStorage.getItem('comment')
    if (c !== null) setComment(c)
  }, [])

  const changeAttending = e => {
    if (e.target.checked) {
      changeEvents(events | e.target.value)
    } else {
      changeEvents(events & ~e.target.value)
    }
  }

  const changeEvents = evts => {
    setEvents(evts);
    localStorage.setItem('eventsHash', evts)
  }

  const changeName = (e, idx) => {
    let newNames = [...names]
    const name = e.target.value?.trim()
    if (idx != undefined) {
      if (name) {
        newNames[idx] = e.target.value
      } else {
        newNames = newNames.filter((n, i) => i !== idx)
      }
    } else if (name) {
      newNames.push(e.target.value)
    }
    setNames(newNames)
    localStorage.setItem('seatNames', JSON.stringify(newNames))
  }

  const changeComment = e => {
    setComment(e.target.value)
    localStorage.setItem('comment', e.target.value)
  }

  const changeRsvp = e => {
    e.preventDefault()
    setRsvpd(false)
    return false
  }

  const isAttendingWedding  = events & WEDDING
  const isAttendingDrinks   = events & DRINKS && pub && isAttendingWedding
  const isAttendingLunch    = events & LUNCH && isAttendingWedding
  const isAttendingSangeet  = events & SANGEET && isAttendingWedding

  const handleSubmit = e => {
    e.preventDefault()
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) { // if complete
        setLoading(false)
        if (xhr.status !== 200) {
          setFailed(true)
        } else {
          localStorage.setItem('rsvpd2', true)
        }
      }
    }
    xhr.open("POST", process.env.NEXT_PUBLIC_WEBHOOK_URL, true)
    xhr.setRequestHeader("Content-type", "application/json")
    xhr.send(JSON.stringify({
      embeds: [
        {
          title: isAttendingWedding ? `${name} said yes! 🎉` : `${name} said no 👎`,
          description: comment,
          color: isAttendingWedding ? 3066993 : 15158332, // https://gist.github.com/thomasbnt/b6f455e2c7d743b796917fa3c205f812
          url: window.location.href,
          fields: [
            {
              name: 'RSVP',
              value: isAttendingWedding ? 'Yes' : 'No',
              inline: true
            },
            {
              name: 'Friend Drinks',
              value: isAttendingDrinks ? 'Yes' : 'No',
              inline: true
            },
            {
              name: 'Welcome Lunch',
              value: isAttendingLunch ? 'Yes' : 'No',
              inline: true
            },
            {
              name: 'Sangeet',
              value: isAttendingSangeet ? 'Yes' : 'No',
              inline: true
            },
            {
              name: 'Seats',
              value: isAttendingWedding ? names.length : 0,
              inline: true
            },
            {
              name: 'Events Hash',
              value: isAttendingWedding ? events : 0,
              inline: true
            },
            {
              name: 'Names',
              value: isAttendingWedding ? names.join(', ') : 'None',
            }
          ]
        }
      ]
    }))
    setLoading(true)
    setRsvpd(true)
    setSubmitted(true)
    return false
  }

  if (rsvpd) {
    if (loading) {
      return <p style={{textAlign: 'center'}}>
        <svg xmlns="http://www.w3.org/2000/svg" style={{margin: 'auto', display: 'block', backgroundPosition: 'initial initial', backgroundRepeat: 'initial initial'}} width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
          <path fill="none" stroke="#7B61FF" strokeWidth="8" strokeDasharray="177.0463604736328 79.54256774902345" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" strokeLinecap="round" style={{transform:'scale(0.79)', transformOrigin:'50px 50px'}}>
            <animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="2.0408163265306123s" keyTimes="0;1" values="0;256.58892822265625"></animate>
          </path>
        </svg> {t('submitting')}
      </p>
    } else if (failed) {
      return <div className={styles.rsvp}>
        <h1>
          <span role="img" aria-label="dead">😵</span>
          {t('something_went_wrong')}
        </h1>
        <p><a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>{t('what_happened')}</a></p>
      </div>
    } else if (isAttendingWedding) {
      return <div className={styles.rsvp}>
        <h1>
          <span role="img" aria-label="party" onClick={throwConfetti}>🎉</span>
          {t('party_got_better')}
        </h1>
        <p className={styles.addCalendar}><a className="ctaBtn primary" href={`/api/ics/${invite}`}>{t('add_to_calendar')}</a> <a href="#" className="ctaBtn secondary" onClick={changeRsvp}>{t('change_my_rsvp')}</a></p>
        {justSubmitted && <Confetti />}
      </div>
    } else {
      return <div className={styles.rsvp}>
        <h1>
          <span role="img" aria-label="sad">😭</span>
          {t('miss_you')}
        </h1>
        <p className={styles.addCalendar}><a href="#" className="ctaBtn secondary" onClick={changeRsvp}>{t('change_my_rsvp')}</a></p>
      </div>
    }
  }

  const nameInputs = names.map((name, idx) => <li key={idx}><input type="text" value={name} placeholder={t('full_name')} className={styles.attendingName} onChange={(e) => changeName(e, idx)} /></li>)
  if (nameInputs.length < MAX_SEATS) nameInputs.push(<li key={nameInputs.length}><input value="" type="text" placeholder={t('full_name')} className={styles.attendingName} onChange={changeName} /></li>)

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p>{t('share_with_you')}</p>
      <p><strong>{t('which_events')}</strong></p>
      <div className={styles.attending}>
        {!!pub && (
          <label>
            <input type="checkbox" value={DRINKS} checked={!!isAttendingDrinks} onChange={changeAttending} />
            <span>{t('pub')}</span>
          </label>
        )}
        <label>
          <input type="checkbox" value={LUNCH} checked={!!isAttendingLunch} onChange={changeAttending} />
          <span>{t('welcome_lunch')}</span>
        </label>
        <label>
          <input type="checkbox" value={SANGEET} checked={!!isAttendingSangeet} onChange={changeAttending} />
          <span>{t('sangeet')}</span>
        </label>
        <label>
          <input type="checkbox" value={WEDDING} checked={!!isAttendingWedding} onChange={changeAttending} />
          <span>{t('wedding')}</span>
        </label>
      </div>
      {!!isAttendingWedding && (<>
        <p><strong>{t('who_attending')}</strong></p>
        <ol className={styles.nameList}>{nameInputs}</ol>
      </>)}
      <label><p><strong>{t('what_else', {context: !!isAttendingWedding})}</strong></p>
        <TextareaAutosize className={styles.text}
          placeholder={t('comments', {context: !!isAttendingWedding})}
          minRows={2}
          maxRows={10}
          value={comment}
          onChange={changeComment} />
      </label>
      <input type="submit" value="RSVP &rarr;" className={styles.submit} />
    </form>
  )
}
