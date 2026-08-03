"use client"

import { useCallback, useEffect, useRef } from "react"
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "framer-motion"
import {
  LEFT_BACK,
  LEFT_BACK_FILL,
  LEFT_BACK_FILL_TUCK,
  LEFT_BACK_REGION_FILL,
  LEFT_BACK_TUCK,
  LEFT_FRONT,
  LEFT_FRONT_FILL,
  LEFT_FRONT_FILL_LONG,
  LEFT_FRONT_FILL_TUCK,
  LEFT_FRONT_LONG,
  MIRROR,
  RIGHT_BACK_FLIGHT,
  RIGHT_BAND_FILL,
  RIGHT_FRONT_LONG,
  RIGHT_FRONT_TUCK,
  STROKE_WIDTH,
} from "./handshake-paths"

const VELLUM = "oklch(94.5% 0.021 85)"
const VERMILLION = "oklch(55% 0.185 33)"

/* The right thumb's tail ends on the left hand's line (anchor point
   A.11). During the pump the two hands rotate around different pivots,
   so the tail's end point follows the left hand to keep the lines
   joined. */
const RIGHT_THUMB_BASE = RIGHT_BACK_FLIGHT[0].slice(0, RIGHT_BACK_FLIGHT[0].lastIndexOf(" L "))
const ANCHOR_X = 584.1
const ANCHOR_Y = 361.5

function rotatePoint(x: number, y: number, cx: number, cy: number, deg: number): [number, number] {
  const r = (deg * Math.PI) / 180
  const c = Math.cos(r)
  const s = Math.sin(r)
  const dx = x - cx
  const dy = y - cy
  return [cx + dx * c - dy * s, cy + dx * s + dy * c]
}

/* Move an arm line's start cap outward, so it ends beyond the view.
   Every arm chain starts with its cap point, and the left space maps
   a smaller x to "further out" for both hands through the mirror. */
function extendArm(d: string, ext: number): string {
  return d.replace(/^M ([\d.]+)/, (_, x: string) => `M ${(parseFloat(x) - ext).toFixed(1)}`)
}

/* One path that morphs from pose A (fold 0) to pose B (fold 1).
   Both poses share one path command structure, so d interpolates
   cleanly. Motion values drive the morph directly; the component
   does not use AnimationControls, whose start promises can hang
   after a strict-mode remount. */
function MorphPath({ a, b, fold, fill }: { a: string; b: string; fold: MotionValue<number>; fill?: boolean }) {
  const d = useTransform(fold, [0, 1], [a, b])
  if (fill) return <motion.path d={d} fill={VERMILLION} stroke="none" />
  return <motion.path d={d} />
}

/* A layer of stroked chains over an opaque body fill. */
function MorphLayer({
  a,
  b,
  fillA,
  fillB,
  fold,
}: {
  a: string[]
  b: string[]
  fillA: string
  fillB: string
  fold: MotionValue<number>
}) {
  return (
    <>
      <MorphPath a={fillA} b={fillB} fold={fold} fill />
      <g stroke={VELLUM} strokeWidth={STROKE_WIDTH}>
        {a.map((d, i) => (
          <MorphPath key={d} a={d} b={b[i]} fold={fold} />
        ))}
      </g>
    </>
  )
}

/* The full clasp scene: fly in, retract and fold, close, one synced
   pump. The tuck pose is the clasp; no image swap occurs. The parent
   supplies a vermillion background and any interactivity. */
export default function ClaspAnimation({
  speed = 4,
  autoPlay = "inView",
  playSignal,
  signalAction = "replay",
  overshoot = false,
  armExtend = 0,
  onDone,
  className,
}: {
  speed?: number
  autoPlay?: "mount" | "inView"
  playSignal?: number
  signalAction?: "replay" | "pump"
  /* Start the hands beyond the browser viewport, not just beyond the
     scene box. For a full-screen intro whose svg overflows visibly. */
  overshoot?: boolean
  /* Extra length on the four arm lines, in artwork units. The parent
     measures this so the arm end caps stay outside the view. */
  armExtend?: number
  onDone?: () => void
  className?: string
}) {
  const restStart = overshoot ? 2400 : 720
  const xL = useMotionValue(-restStart)
  const xR = useMotionValue(restStart)

  /* With extended arms, the hands pivot at the arms' off-screen end
     caps, not at the wrists. A smaller angle keeps the same travel at
     the clasp, so the visible arms stay almost level in the shake. */
  const pivotLx = armExtend ? 85 - armExtend : 60
  const pivotRx = armExtend ? 938.5 + armExtend : 1007
  const pumpScale = armExtend ? (511 - 60) / (511 - pivotLx) : 1

  /* armExtend is fixed for the component's lifetime, so these stay
     stable and the morph structure never changes. */
  const arm = (paths: string[]) => (armExtend ? [extendArm(paths[0], armExtend), ...paths.slice(1)] : paths)
  const leftBack = arm(LEFT_BACK)
  const leftBackTuck = arm(LEFT_BACK_TUCK)
  const leftFront = arm(LEFT_FRONT)
  const leftFrontLong = arm(LEFT_FRONT_LONG)
  const rightFrontLong = arm(RIGHT_FRONT_LONG)
  const rightFrontTuck = arm(RIGHT_FRONT_TUCK)
  const thumbBase = armExtend ? extendArm(RIGHT_THUMB_BASE, armExtend) : RIGHT_THUMB_BASE
  const fold = useMotionValue(0)
  const angL = useMotionValue(0)
  const angR = useMotionValue(0)
  const leftRot0 = useRef<SVGGElement>(null)
  const leftRot1 = useRef<SVGGElement>(null)
  const rightRot0 = useRef<SVGGElement>(null)
  const rightRot1 = useRef<SVGGElement>(null)
  const rightRot2 = useRef<SVGGElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const inView = useInView(svgRef, { once: true, amount: 0.5 })
  const reduceMotion = useReducedMotion()
  const runId = useRef(0)
  const doneRef = useRef(onDone)
  useEffect(() => {
    doneRef.current = onDone
  })

  // world position of the anchored tail end, mapped back into the right
  // thumb layer's own space through both pump rotations and the mirror
  const rightThumbD = useTransform([angL, angR], (latest: number[]) => {
    const [wx, wy] = rotatePoint(ANCHOR_X, ANCHOR_Y, pivotLx, 630, latest[0])
    const [ux, uy] = rotatePoint(wx, wy, pivotRx, 630, -latest[1])
    return `${thumbBase} L ${(1067.1 - ux).toFixed(2)} ${uy.toFixed(2)}`
  })

  const runPump = useCallback(
    () =>
      Promise.all([
        animate(angL, [0, 7 * pumpScale, -2.2 * pumpScale, 0], { duration: Math.max(0.7 / speed, 0.5), times: [0, 0.4, 0.75, 1], ease: "easeInOut" }),
        animate(angR, [0, -7 * pumpScale, 2.2 * pumpScale, 0], { duration: Math.max(0.7 / speed, 0.5), times: [0, 0.4, 0.75, 1], ease: "easeInOut" }),
      ]),
    [angL, angR, speed, pumpScale],
  )

  // one extra shake on a closed clasp; no restart from the sides
  const pump = useCallback(async () => {
    if (fold.get() !== 1) return
    angL.stop()
    angR.stop()
    angL.set(0)
    angR.set(0)
    await runPump()
  }, [angL, angR, fold, runPump])

  const play = useCallback(async () => {
    const run = ++runId.current
    const alive = () => runId.current === run
    for (const v of [xL, xR, fold, angL, angR]) v.stop()
    if (reduceMotion) {
      xL.set(0)
      xR.set(0)
      fold.set(1)
      doneRef.current?.()
      return
    }
    // with overshoot, measure how far the viewport extends past the
    // scene box, so the hands start outside the browser window
    let start = 720
    if (overshoot && svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect()
      if (rect.width > 0) {
        const scale = rect.width / 1024
        const overhang = Math.max(rect.left, window.innerWidth - rect.right, 0) / scale
        start = 720 + overhang + 40
      }
    }
    xL.set(-start)
    xR.set(start)
    fold.set(0)
    angL.set(0)
    angR.set(0)
    await new Promise((r) => setTimeout(r, 400 / speed))
    if (!alive()) return
    // fly in fully stretched all the way to the almost-clasped position
    await Promise.all([
      animate(xL, -34, { duration: 2.0 / speed, ease: [0.3, 0, 0.7, 0.25] }),
      animate(xR, 34, { duration: 2.0 / speed, ease: [0.3, 0, 0.7, 0.25] }),
    ])
    if (!alive()) return
    // fingers retract and fold while the hands keep creeping inward
    await Promise.all([
      animate(fold, 1, { duration: 0.42 / speed, ease: "easeInOut" }),
      animate(xL, -6, { duration: 0.42 / speed, ease: "linear" }),
      animate(xR, 6, { duration: 0.42 / speed, ease: "linear" }),
    ])
    if (!alive()) return
    // fast final close; no image swap, the tucked hands are the clasp
    await Promise.all([
      animate(xL, [-6, 3, 0], { duration: 0.45 / speed, times: [0, 0.5, 1], ease: "easeOut" }),
      animate(xR, [6, -3, 0], { duration: 0.45 / speed, times: [0, 0.5, 1], ease: "easeOut" }),
    ])
    if (!alive()) return
    // the shake: both hands pivot at their arm sides, synced, one firm pump
    await runPump()
    if (!alive()) return
    doneRef.current?.()
  }, [xL, xR, fold, angL, angR, speed, reduceMotion, runPump, overshoot])

  useEffect(() => {
    const ls = [leftRot0, leftRot1]
    const rs = [rightRot0, rightRot1, rightRot2]
    const u1 = angL.on("change", (v) => {
      for (const r of ls) r.current?.setAttribute("transform", `rotate(${v} ${pivotLx} 630)`)
    })
    const u2 = angR.on("change", (v) => {
      for (const r of rs) r.current?.setAttribute("transform", `rotate(${v} ${pivotRx} 630)`)
    })
    return () => { u1(); u2() }
  }, [angL, angR, pivotLx, pivotRx])

  useEffect(() => {
    if (autoPlay === "mount") play()
  }, [autoPlay, play])

  useEffect(() => {
    if (autoPlay === "inView" && inView) play()
  }, [autoPlay, inView, play])

  const firstSignal = useRef(true)
  useEffect(() => {
    if (playSignal === undefined) return
    if (firstSignal.current) {
      firstSignal.current = false
      return
    }
    if (signalAction === "pump") pump()
    else play()
  }, [playSignal, signalAction, pump, play])

  return (
    <motion.svg ref={svgRef} viewBox="0 60 1024 950" className={className} aria-hidden>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* 1: right fingers (mirrored front), furthest back */}
        <motion.g style={{ x: xR }}>
          <g ref={rightRot0}>
            <g transform={MIRROR}>
              <MorphLayer
                a={rightFrontLong}
                b={rightFrontTuck}
                fillA={LEFT_FRONT_FILL_LONG}
                fillB={LEFT_FRONT_FILL_TUCK}
                fold={fold}
              />
            </g>
          </g>
        </motion.g>
        {/* 2: left thumb; its dome folds flat at the clasp */}
        <motion.g style={{ x: xL }}>
          <g ref={leftRot0}>
            <MorphLayer
              a={leftBack}
              b={leftBackTuck}
              fillA={LEFT_BACK_FILL}
              fillB={LEFT_BACK_FILL_TUCK}
              fold={fold}
            />
          </g>
        </motion.g>
        {/* 2b: right palm band, under the left fingers */}
        <motion.g style={{ x: xR }}>
          <g ref={rightRot1}>
            <g transform={MIRROR}>
              <path d={RIGHT_BAND_FILL} fill={VERMILLION} stroke="none" />
            </g>
          </g>
        </motion.g>
        {/* 3: left fingers; they retract to the normal pose */}
        <motion.g style={{ x: xL }}>
          <g ref={leftRot1}>
            <MorphLayer
              a={leftFrontLong}
              b={leftFront}
              fillA={LEFT_FRONT_FILL_LONG}
              fillB={LEFT_FRONT_FILL}
              fold={fold}
            />
          </g>
        </motion.g>
        {/* 4: right thumb (mirrored back, flight tail), topmost; its tail
            end follows the left hand's anchor during the pump */}
        <motion.g style={{ x: xR }}>
          <g ref={rightRot2}>
            <g transform={MIRROR}>
              <path d={LEFT_BACK_REGION_FILL} fill={VERMILLION} stroke="none" />
              <g stroke={VELLUM} strokeWidth={STROKE_WIDTH}>
                <motion.path d={rightThumbD} />
              </g>
            </g>
          </g>
        </motion.g>
      </g>
    </motion.svg>
  )
}
