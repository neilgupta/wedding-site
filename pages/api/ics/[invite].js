import invites from 'invites'
import * as locales from 'locales'

export default function handler(req, res) {
  const {invite} = req.query
  const {host} = req.headers
  const {lang} = invites[invite]

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/calendar; charset=utf-8')
  res.setHeader('Content-Disposition', 'attachment; filename="calendar.ics"')

  res.end(
`BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
PRODID:NeilWedding
METHOD:PUBLISH
X-WR-CALNAME:Katelijne & Neil's Wedding
X-PUBLISHED-TTL:PT1H
BEGIN:VEVENT
UID:wedding@neil.wedding
SUMMARY:Katelijne & Neil's Wedding
DESCRIPTION:${locales[lang]['cant_wait_to_see_you']}
DTSTAMP:20200903T063216Z
DTSTART;VALUE=DATE:20210911
DTEND;VALUE=DATE:20210913
URL:https://${host}/${invite}
LOCATION:${locales[lang]['marriott']}
STATUS:CONFIRMED
CREATED:20200903T063216Z
END:VEVENT
END:VCALENDAR`)
}
