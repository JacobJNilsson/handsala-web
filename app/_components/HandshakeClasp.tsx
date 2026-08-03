"use client"

import ClaspAnimation from "./ClaspAnimation"

export default function HandshakeClasp({
  playSignal,
  onShake,
}: {
  playSignal: number
  onShake: () => void
}) {
  return (
    <button type="button" onClick={onShake} aria-label="Shake hands" className="block w-full">
      <ClaspAnimation autoPlay="inView" speed={4} playSignal={playSignal} signalAction="pump" className="block h-auto w-full" />
    </button>
  )
}
