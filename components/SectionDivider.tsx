/** Gradient fade between dark hero/cta sections and light body sections */

export function DarkToLight() {
  return (
    <div
      aria-hidden
      style={{
        height: 180,
        background: 'linear-gradient(to bottom, #060607 0%, #FAFAF8 100%)',
        marginTop: -1,
        marginBottom: -1,
      }}
    />
  )
}

export function LightToDark() {
  return (
    <div
      aria-hidden
      style={{
        height: 180,
        background: 'linear-gradient(to bottom, #FAFAF8 0%, #060607 100%)',
        marginTop: -1,
        marginBottom: -1,
      }}
    />
  )
}

export function LightToGray() {
  return (
    <div
      aria-hidden
      style={{
        height: 1,
        background: 'rgba(0,0,0,0.06)',
      }}
    />
  )
}
