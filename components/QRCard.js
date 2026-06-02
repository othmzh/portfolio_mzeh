import { QRCodeSVG } from 'qrcode.react'
import styles from '../styles/QRCard.module.css'

export default function QRCard({ url }) {
  return (
    <div className={styles.card}>
      <div className={styles.qrWrap}>
        <QRCodeSVG
          value={url}
          size={120}
          bgColor="transparent"
          fgColor="var(--accent)"
          level="M"
          aria-label="QR code vers le profil LinkedIn d'Othmen Mzeh"
          role="img"
        />
      </div>
      <div className={styles.label}>// Scanner pour accéder</div>
      <div className={styles.sub}>Mon profil LinkedIn</div>
    </div>
  )
}
