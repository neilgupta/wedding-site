import { useRouter } from 'next/router'

import styles from './InviteCode.module.css'

export default function InviteCode({autoFocus = false}) {
  const router = useRouter()

  const handleSubmit = e => {
    e.preventDefault()
    router.replace('/' + e.target.code.value.toLowerCase())
    return false
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label><p>Please enter your invite code.</p>
        <input type="text" name="code" placeholder="Invite code" autoFocus={autoFocus} required className={styles.code} />
      </label>
      <input type="submit" value="Enter &rarr;" className={styles.submit} />
    </form>
  )
}
