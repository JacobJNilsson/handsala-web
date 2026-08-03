"use client"

import { motion, useAnimationControls } from "framer-motion"

type AnimationControls = ReturnType<typeof useAnimationControls>

/*
 * Two hands in the favicon's monoline language, drawn in a 2048x780 frame
 * (viewBox y 120-900). Each hand has an "open" pose (flying in) and a
 * "clasped" pose (gripping); the swap between them happens at the moment of
 * impact, hidden by the jolt.
 */

const OPEN_LEFT = [
  "M -60 630 L 690 630 C 735 630 768 614 790 592",
  "M 786 598 L 820 502",
  "M 825 500 C 905 456 990 438 1072 444",
  "M 818 548 C 908 530 995 530 1072 548",
  "M 796 596 C 882 618 955 636 1025 665",
  "M 762 580 C 792 502 838 448 905 415",
]

const OPEN_RIGHT = [
  "M 2110 285 L 1398 285 C 1353 285 1320 301 1298 323",
  "M 1302 317 L 1268 413",
  "M 1263 415 C 1183 459 1098 477 1016 471",
  "M 1270 367 C 1180 385 1093 385 1016 367",
  "M 1292 319 C 1206 297 1133 279 1063 250",
  "M 1326 335 C 1296 413 1250 467 1183 500",
]

const CLASP_LEFT = [
  "M -60 630 L 682 630 C 717 630 737 650 757 673 L 842 770 C 870 800 912 802 940 778",
  "M 1057 505 L 1192 660",
  "M 977 590 L 1112 745",
  "M 900 678 L 1032 830",
]

const CLASP_RIGHT = [
  "M 2110 285 L 1322 285 C 1282 285 1258 262 1228 235 C 1198 208 1150 190 1098 190 C 1035 190 990 207 950 247 L 897 300 C 852 345 842 392 872 427 C 900 458 945 458 978 428",
  "M 1052 322 C 1090 316 1106 330 1124 351 L 1312 570 C 1339 602 1337 642 1309 664 C 1284 683 1257 679 1240 662",
]

function Pose({ paths, visible }: { paths: string[]; visible: boolean }) {
  return (
    <g opacity={visible ? 1 : 0}>
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </g>
  )
}

export const HAND_OFFSCREEN = 1200

export function HandshakeArt({
  clasped,
  left,
  right,
  body,
  className,
  svgRef,
}: {
  clasped: boolean
  left: AnimationControls
  right: AnimationControls
  body: AnimationControls
  className?: string
  svgRef?: React.Ref<SVGSVGElement>
}) {
  return (
    <motion.svg ref={svgRef} viewBox="0 120 2048 780" className={className} aria-hidden>
      <motion.g
        animate={body}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        fill="none"
        stroke="currentColor"
        strokeWidth={58}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.g initial={{ x: -HAND_OFFSCREEN }} animate={left}>
          <Pose paths={OPEN_LEFT} visible={!clasped} />
          <Pose paths={CLASP_LEFT} visible={clasped} />
        </motion.g>
        <motion.g initial={{ x: HAND_OFFSCREEN }} animate={right}>
          <Pose paths={OPEN_RIGHT} visible={!clasped} />
          <Pose paths={CLASP_RIGHT} visible={clasped} />
        </motion.g>
      </motion.g>
    </motion.svg>
  )
}

export const ENTER_TRANSITION = {
  duration: 0.55,
  ease: [0.3, 0, 0.7, 0.25] as [number, number, number, number],
}

export async function runClaspSequence({
  left,
  right,
  body,
  setClasped,
}: {
  left: AnimationControls
  right: AnimationControls
  body: AnimationControls
  setClasped: (v: boolean) => void
}) {
  setClasped(false)
  left.set({ x: -HAND_OFFSCREEN })
  right.set({ x: HAND_OFFSCREEN })
  body.set({ y: 0, rotate: 0 })
  await Promise.all([
    left.start({ x: 0, transition: ENTER_TRANSITION }),
    right.start({ x: 0, transition: ENTER_TRANSITION }),
  ])
  setClasped(true)
  await Promise.all([
    left.start({ x: [0, 26, 0], transition: { duration: 0.45, times: [0, 0.4, 1], ease: "easeOut" } }),
    right.start({ x: [0, -26, 0], transition: { duration: 0.45, times: [0, 0.4, 1], ease: "easeOut" } }),
    body.start({
      y: [0, 34, -12, 0],
      rotate: [0, 1.2, -0.6, 0],
      transition: { duration: 0.5, times: [0, 0.35, 0.72, 1], ease: "easeOut" },
    }),
  ])
}

export function settleClasp({
  left,
  right,
  setClasped,
}: {
  left: AnimationControls
  right: AnimationControls
  setClasped: (v: boolean) => void
}) {
  setClasped(true)
  left.set({ x: 0 })
  right.set({ x: 0 })
}
