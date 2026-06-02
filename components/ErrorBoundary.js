import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          background: 'var(--bg)',
          color: 'var(--text)',
          fontFamily: 'var(--sans)',
        }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Une erreur s'est produite</h1>
          <p style={{ color: 'var(--text2)' }}>Veuillez recharger la page.</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 24px',
              background: 'var(--accent)',
              color: 'var(--btn-primary-text)',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Recharger
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
