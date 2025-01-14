"use client"

export function WavyDivider() {
  return (
    <div className="relative w-full h-16 overflow-hidden bg-beige-50">
      <div
        className="absolute w-full h-full bg-repeat-x"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 60 120\'%3E%3Cpath d=\'M0,60 A30,30 0 0,0 60,60\' fill=\'%23a855f7\'/%3E%3C/svg%3E")',
          top: '-8px',
        }}
      ></div>
    </div>
  )
}
