"use client"

import { useCallback, useEffect, useRef } from "react"
import { animate, motion, useAnimationControls, useInView, useMotionValue } from "framer-motion"

const VELLUM = "oklch(94.5% 0.021 85)"
const VERMILLION = "oklch(55% 0.185 33)"

/* Layer whose geometry morphs between poses (normal, long reach, tuck).
   All poses share one path command structure, so d interpolates cleanly. */
function MorphLayer({
  paths,
  longPaths,
  tuckPaths,
  fill,
  longFill,
  tuckFill,
  width,
  pose,
}: {
  paths: string[]
  longPaths: string[]
  tuckPaths?: string[]
  fill: string
  longFill: string
  tuckFill?: string
  width: number
  pose: ReturnType<typeof useAnimationControls>
}) {
  return (
    <>
      <motion.path
        variants={{
          normal: { d: fill },
          long: { d: longFill },
          tuck: { d: tuckFill ?? fill },
        }}
        initial="long"
        animate={pose}
        fill={VERMILLION}
        stroke="none"
      />
      <g stroke={VELLUM} strokeWidth={width}>
        {paths.map((d, i) => (
          <motion.path
            key={d}
            variants={{
              normal: { d },
              long: { d: longPaths[i] },
              tuck: { d: (tuckPaths ?? paths)[i] },
            }}
            initial="long"
            animate={pose}
          />
        ))}
      </g>
    </>
  )
}

export default function ClaspDemo({
  back,
  backTuck,
  backFillTuck,
  backRight,
  front,
  frontR,
  frontLong,
  frontRLong,
  frontTuck,
  frontRTuck,
  backFill,
  backRegionFill,
  bandFill,
  frontFill,
  frontFillLong,
  frontFillTuck,
  mirror,
  width,
  speed = 1,
}: {
  back: string[]
  backTuck: string[]
  backFillTuck: string
  backRight: string[]
  front: string[]
  frontR: string[]
  frontLong: string[]
  frontRLong: string[]
  frontTuck: string[]
  frontRTuck: string[]
  backFill: string
  backRegionFill: string
  bandFill: string
  frontFill: string
  frontFillLong: string
  frontFillTuck: string
  mirror: string
  width: number
  speed?: number
}) {
  const left = useAnimationControls()
  const right = useAnimationControls()
  const pose = useAnimationControls()
  const poseR = useAnimationControls()
  const poseB = useAnimationControls()
  const angL = useMotionValue(0)
  const angR = useMotionValue(0)
  const leftRot0 = useRef<SVGGElement>(null)
  const leftRot1 = useRef<SVGGElement>(null)
  const rightRot0 = useRef<SVGGElement>(null)
  const rightRot1 = useRef<SVGGElement>(null)
  const rightRot2 = useRef<SVGGElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const inView = useInView(svgRef, { once: true, amount: 0.5 })
  const runId = useRef(0)

  const play = useCallback(async () => {
    const run = ++runId.current
    const alive = () => runId.current === run
    left.stop(); right.stop(); pose.stop(); poseR.stop(); poseB.stop()
    {
      left.set({ x: -720 })
      right.set({ x: 720 })
      angL.set(0)
      angR.set(0)
      pose.set("long")
      poseR.set("long")
      poseB.set("normal")
      await new Promise((r) => setTimeout(r, 400 / speed))
      if (!alive()) return
      // fly in fully stretched all the way to the almost-clasped position
      await Promise.all([
        left.start({ x: -34, transition: { duration: 2.0 / speed, ease: [0.3, 0, 0.7, 0.25] } }),
        right.start({ x: 34, transition: { duration: 2.0 / speed, ease: [0.3, 0, 0.7, 0.25] } }),
      ])
      if (!alive()) return
      // fingers retract and fold while the hands keep creeping inward
      await Promise.all([
        pose.start("normal", { duration: 0.42 / speed, ease: "easeInOut" }),
        poseR.start("tuck", { duration: 0.42 / speed, ease: "easeInOut" }),
        poseB.start("tuck", { duration: 0.42 / speed, ease: "easeInOut" }),
        left.start({ x: -6, transition: { duration: 0.42 / speed, ease: "linear" } }),
        right.start({ x: 6, transition: { duration: 0.42 / speed, ease: "linear" } }),
      ])
      if (!alive()) return
      // fast final close; no image swap, the tucked hands are the clasp
      await Promise.all([
        left.start({ x: [-6, 3, 0], transition: { duration: 0.45 / speed, times: [0, 0.5, 1], ease: "easeOut" } }),
        right.start({ x: [6, -3, 0], transition: { duration: 0.45 / speed, times: [0, 0.5, 1], ease: "easeOut" } }),
      ])
      if (!alive()) return
      // the shake: both hands pivot at their arm sides, synced, one firm pump
      await Promise.all([
        animate(angL, [0, 7, -2.2, 0], { duration: Math.max(0.7 / speed, 0.5), times: [0, 0.4, 0.75, 1], ease: "easeInOut" }),
        animate(angR, [0, -7, 2.2, 0], { duration: Math.max(0.7 / speed, 0.5), times: [0, 0.4, 0.75, 1], ease: "easeInOut" }),
      ])
    }
  }, [left, right, pose, poseR, poseB, angL, angR, speed])

  useEffect(() => {
    const ls = [leftRot0, leftRot1]
    const rs = [rightRot0, rightRot1, rightRot2]
    const u1 = angL.on("change", (v) => {
      for (const r of ls) r.current?.setAttribute("transform", `rotate(${v} 60 630)`)
    })
    const u2 = angR.on("change", (v) => {
      for (const r of rs) r.current?.setAttribute("transform", `rotate(${v} 1007 630)`)
    })
    return () => { u1(); u2() }
  }, [angL, angR])

  useEffect(() => {
    if (inView) play()
  }, [inView, play])

  return (
    <button type="button" onClick={() => play()} className="block w-full" aria-label="Play the clasp">
      <div className="overflow-hidden bg-vermillion">
        <motion.svg ref={svgRef} viewBox="0 60 1024 950" className="mx-auto block h-auto w-full max-w-3xl" aria-hidden>
          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* 1: right fingers (mirrored front), furthest back */}
            <motion.g initial={{ x: 720 }} animate={right}>
              <g ref={rightRot0}>
                <g transform={mirror}>
                  <MorphLayer
                    paths={frontR}
                    longPaths={frontRLong}
                    tuckPaths={frontRTuck}
                    fill={frontFill}
                    longFill={frontFillLong}
                    tuckFill={frontFillTuck}
                    width={width}
                    pose={poseR}
                  />
                </g>
              </g>
            </motion.g>
            {/* 2: left thumb; its dome folds flat at the clasp */}
            <motion.g initial={{ x: -720 }} animate={left}>
              <g ref={leftRot0}>
                <MorphLayer
                  paths={back}
                  longPaths={back}
                  tuckPaths={backTuck}
                  fill={backFill}
                  longFill={backFill}
                  tuckFill={backFillTuck}
                  width={width}
                  pose={poseB}
                />
              </g>
            </motion.g>
            {/* 2b: right palm band, under the left fingers */}
            <motion.g initial={{ x: 720 }} animate={right}>
              <g ref={rightRot1}>
                <g transform={mirror}>
                  <path d={bandFill} fill={VERMILLION} stroke="none" />
                </g>
              </g>
            </motion.g>
            {/* 3: left fingers */}
            <motion.g initial={{ x: -720 }} animate={left}>
              <g ref={leftRot1}>
                <MorphLayer
                  paths={front}
                  longPaths={frontLong}
                  fill={frontFill}
                  longFill={frontFillLong}
                  width={width}
                  pose={pose}
                />
              </g>
            </motion.g>
            {/* 4: right thumb (mirrored back, flight tail), topmost */}
            <motion.g initial={{ x: 720 }} animate={right}>
              <g ref={rightRot2}>
                <g transform={mirror}>
                  <MorphLayer
                    paths={backRight}
                    longPaths={backRight}
                    fill={backRegionFill}
                    longFill={backRegionFill}
                    width={width}
                    pose={poseB}
                  />
                </g>
              </g>
            </motion.g>
          </g>
        </motion.svg>
      </div>
    </button>
  )
}
