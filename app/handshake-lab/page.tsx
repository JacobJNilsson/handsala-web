/* Reference page for the handshake animation artwork. Not linked from nav.
   The canonical path, fill, and pose data is also in /public/lab/hand-layers.json.
   The final clasp frame matches the favicon at 99.63% (0.37% pixel error). */
import ClaspDemo from "./ClaspDemo"

/* Extraction: the favicon's visible left-hand strokes, stroke width 63.5.
   Chains 1..4 are the front finger chains of the animation. */
const EXTRACT_LEFT = [
  "M 85.0 288.0 L 364.5 287.5",
  "M 85.0 629.0 L 154.5 629.0 C 187.0 642.5 191.0 652.0 210.5 670.0 L 301.5 763.0 C 315.5 777.0 341.0 806.0 357.5 816.0 C 389.0 827.0 411.0 819.0 428.0 802.0 C 444.0 785.0 450.5 751.5 435.0 728.5",
  "M 404.5 696.0 L 494.0 785.0 C 517.0 804.0 545.5 805.0 570.0 787.0 C 592.0 769.0 604.0 738.0 583.0 705.0",
  "M 490.0 610.5 L 612.0 732.0 C 631.0 755.0 658.0 763.5 689.0 750.0 C 721.0 732.0 733.0 693.5 709.0 658.0 L 690.0 640.0",
  "M 580.5 358.0 L 807.0 585.0 C 823.0 600.5 821.0 605.0 827.0 617.0 C 829.0 635.0 827.0 642.0 824.0 654.0 C 811.5 687.0 771.5 701.5 742.0 686.0 C 725.0 680.5 698.0 644.0 690.0 640.0 L 575.5 523.5",
]

/* Animation layers. The left hand paints as-is. The right hand paints the
   same imagery through MIRROR, with its own short arm lines. */
const LEFT_FRONT_FILL = "M 85.0 629.0 L 154.5 629.0 C 187.0 642.5 191.0 652.0 210.5 670.0 L 301.5 763.0 C 315.5 777.0 341.0 806.0 357.5 816.0 C 389.0 827.0 411.0 819.0 428.0 802.0 C 444.0 785.0 450.5 751.5 435.0 728.5 L 494.0 785.0 C 517.0 804.0 545.5 805.0 570.0 787.0 C 592.0 769.0 604.0 738.0 583.0 705.0 L 612.0 732.0 C 631.0 755.0 658.0 763.5 689.0 750.0 C 721.0 732.0 733.0 693.5 709.0 658.0 L 690.0 640.0 C 698.0 644.0 725.0 680.5 742.0 686.0 C 771.5 701.5 811.5 687.0 824.0 654.0 C 827.0 642.0 829.0 635.0 827.0 617.0 C 821.0 605.0 823.0 600.5 807.0 585.0 L 580.5 358.0 Z"

const LEFT_FRONT_MORPH = [
  "M 85.0 629.0 L 154.5 629.0 C 187.0 642.5 191.0 652.0 210.5 670.0 L 301.5 763.0 C 315.5 777.0 341.0 806.0 357.5 816.0 C 389.0 827.0 411.0 819.0 428.0 802.0 C 444.0 785.0 450.5 751.5 435.0 728.5 L 494.0 785.0",
  "M 404.5 696.0 L 494.0 785.0 C 517.0 804.0 545.5 805.0 570.0 787.0 C 592.0 769.0 604.0 738.0 583.0 705.0 L 612.0 732.0",
  "M 490.0 610.5 L 612.0 732.0 C 631.0 755.0 658.0 763.5 689.0 750.0 C 721.0 732.0 733.0 693.5 709.0 658.0 L 690.0 640.0",
  "M 580.5 358.0 L 807.0 585.0 C 823.0 600.5 821.0 605.0 827.0 617.0 C 829.0 635.0 827.0 642.0 824.0 654.0 C 811.5 687.0 771.5 701.5 742.0 686.0 C 725.0 680.5 698.0 644.0 690.0 640.0 L 575.5 523.5",
]

const LEFT_FRONT_LONG = [
  "M 85.0 629.0 L 154.5 629.0 C 187.0 642.5 191.0 652.0 210.5 670.0 L 301.5 763.0 C 452.0 916.7 477.5 945.7 494.0 955.7 C 525.5 966.7 547.5 958.7 564.5 941.7 C 580.5 924.7 587.0 891.2 571.5 868.2 L 660.9 951.0",
  "M 404.5 696.0 L 660.9 951.0 C 683.9 970.0 712.4 971.0 736.9 953.0 C 758.9 935.0 770.9 904.0 749.9 871.0 L 781.0 900.4",
  "M 490.0 610.5 L 781.0 900.4 C 800.0 923.4 827.0 931.9 858.0 918.4 C 890.0 900.4 902.0 861.9 878.0 826.4 L 754.6 705.0",
  "M 580.5 358.0 L 871.8 649.8 C 887.8 665.3 885.8 669.8 891.8 681.8 C 893.8 699.8 891.8 706.8 888.8 718.8 C 876.3 751.8 836.3 766.3 806.8 750.8 C 789.8 745.3 762.8 708.8 754.8 704.8 L 575.5 523.5",
]

const LEFT_FRONT_FILL_LONG = "M 85.0 629.0 L 154.5 629.0 C 187.0 642.5 191.0 652.0 210.5 670.0 L 301.5 763.0 C 452.0 916.7 477.5 945.7 494.0 955.7 C 525.5 966.7 547.5 958.7 564.5 941.7 C 580.5 924.7 587.0 891.2 571.5 868.2 L 660.9 951.0 C 683.9 970.0 712.4 971.0 736.9 953.0 C 758.9 935.0 770.9 904.0 749.9 871.0 L 781.0 900.4 C 800.0 923.4 827.0 931.9 858.0 918.4 C 890.0 900.4 902.0 861.9 878.0 826.4 L 754.8 704.8 C 762.8 708.8 789.8 745.3 806.8 750.8 C 836.3 766.3 876.3 751.8 888.8 718.8 C 891.8 706.8 893.8 699.8 891.8 681.8 C 885.8 669.8 887.8 665.3 871.8 649.8 L 580.5 358.0 Z"

const LEFT_FRONT_TUCK = [
  "M 85.0 629.0 L 154.5 629.0 C 187.0 629.0 191.0 629.0 210.5 629.0 L 494.0 629.0 C 508.0 643.0 533.5 672.0 550.0 682.0 C 581.5 693.0 603.5 685.0 620.5 668.0 C 636.5 651.0 643.0 617.5 627.5 594.5 L 494.0 696.0",
  "M 404.5 696.0 L 494.0 696.0 C 517.0 715.0 545.5 716.0 570.0 698.0 C 592.0 680.0 604.0 649.0 583.0 616.0 L 612.0 732.0",
  "M 490.0 610.5 L 612.0 732.0 C 631.0 755.0 658.0 763.5 689.0 750.0 C 721.0 732.0 733.0 693.5 709.0 658.0 L 690.0 640.0",
  "M 580.5 358.0 L 807.0 585.0 C 823.0 600.5 821.0 605.0 827.0 617.0 C 829.0 635.0 827.0 642.0 824.0 654.0 C 811.5 687.0 771.5 701.5 742.0 686.0 C 725.0 680.5 698.0 644.0 690.0 640.0 L 575.5 523.5",
]

const LEFT_FRONT_FILL_TUCK = "M 85.0 629.0 L 154.5 629.0 C 187.0 629.0 191.0 629.0 210.5 629.0 L 494.0 629.0 C 508.0 643.0 533.5 672.0 550.0 682.0 C 581.5 693.0 603.5 685.0 620.5 668.0 C 636.5 651.0 643.0 617.5 627.5 594.5 L 494.0 696.0 C 517.0 715.0 545.5 716.0 570.0 698.0 C 592.0 680.0 604.0 649.0 583.0 616.0 L 612.0 732.0 C 631.0 755.0 658.0 763.5 689.0 750.0 C 721.0 732.0 733.0 693.5 709.0 658.0 L 690.0 640.0 C 698.0 644.0 725.0 680.5 742.0 686.0 C 771.5 701.5 811.5 687.0 824.0 654.0 C 827.0 642.0 829.0 635.0 827.0 617.0 C 821.0 605.0 823.0 600.5 807.0 585.0 L 580.5 358.0 Z"

const LEFT_BACK_TUCK = ["M 85.0 288.0 L 260.6 288.5 C 309.6 288.1 322.1 287.9 358.1 287.6 C 387.6 287.3 413.6 287.1 458.1 286.7 L 586.1 285.5 C 624.1 285.2 641.1 285.0 663.1 284.8 L 699.1 284.5 C 723.1 311.5 735.6 317.5 743.1 332.0 C 754.1 364.5 738.1 380.5 707.1 400.5 C 680.1 410.5 674.1 412.5 651.1 408.5 C 621.1 401.5 608.1 387.5 584.1 361.5 L 580.5 358.0"]

const LEFT_BACK_FILL_TUCK = "M 85.0 288.0 L 260.6 288.5 C 309.6 288.1 322.1 287.9 358.1 287.6 C 387.6 287.3 413.6 287.1 458.1 286.7 L 586.1 285.5 C 624.1 285.2 641.1 285.0 663.1 284.8 L 699.1 284.5 C 723.1 311.5 735.6 317.5 743.1 332.0 C 754.1 364.5 738.1 380.5 707.1 400.5 C 680.1 410.5 674.1 412.5 651.1 408.5 C 621.1 401.5 608.1 387.5 584.1 361.5 L 580.5 358.0 L 567.0 310.0 L 427.0 330.0 Z M 85.0 284.0 L 260.6 284.5 L 556.6 330.5 L 604.0 382.0 L 596.0 441.0 L 300.0 640.0 L 85.0 627.0 Z"

const LEFT_BACK_REGION_FILL = "M 85.0 288.0 L 260.6 288.5 C 309.6 290.5 322.1 269.5 358.1 248.5 C 387.6 229.5 413.6 208.5 458.1 201.5 L 586.1 204.5 C 624.1 214.0 641.1 226.5 663.1 249.5 L 699.1 284.5 C 723.1 311.5 735.6 317.5 743.1 332.0 C 754.1 364.5 738.1 380.5 707.1 400.5 C 680.1 410.5 674.1 412.5 651.1 408.5 C 621.1 401.5 608.1 387.5 584.1 361.5 L 580.5 358.0 L 567.0 310.0 L 427.0 330.0 Z"

const LEFT_BAND_FILL = "M 85.0 284.0 L 260.6 284.5 L 556.6 330.5 L 604.0 382.0 L 596.0 441.0 L 300.0 640.0 L 85.0 627.0 Z"

const RIGHT_BAND_FILL = "M 85.0 284.0 L 260.6 284.5 L 556.6 330.5 L 604.0 382.0 L 340.0 598.0 L 85.0 598.0 Z"

const LEFT_BACK_FILL = LEFT_BACK_REGION_FILL + " " + LEFT_BAND_FILL

const RIGHT_BACK_FLIGHT = ["M 128.6 288.0 L 260.6 288.5 C 309.6 290.5 322.1 269.5 358.1 248.5 C 387.6 229.5 413.6 208.5 458.1 201.5 L 586.1 204.5 C 624.1 214.0 641.1 226.5 663.1 249.5 L 699.1 284.5 C 723.1 311.5 735.6 317.5 743.1 332.0 C 754.1 364.5 738.1 380.5 707.1 400.5 C 680.1 410.5 674.1 412.5 651.1 408.5 C 621.1 401.5 608.1 387.5 585.1 361.0 L 557.6 334.0 L 511.1 334.0 L 487.6 357.5"]

const MIRROR = "translate(1067.1 0) scale(-1 1)"

const LEFT_BACK = ["M 85.0 288.0 L 260.6 288.5 C 309.6 290.5 322.1 269.5 358.1 248.5 C 387.6 229.5 413.6 208.5 458.1 201.5 L 586.1 204.5 C 624.1 214.0 641.1 226.5 663.1 249.5 L 699.1 284.5 C 723.1 311.5 735.6 317.5 743.1 332.0 C 754.1 364.5 738.1 380.5 707.1 400.5 C 680.1 410.5 674.1 412.5 651.1 408.5 C 621.1 401.5 608.1 387.5 584.1 361.5 L 580.5 358.0"]

const LEFT_FRONT = EXTRACT_LEFT.slice(1)

/* The right hand's arm lines stop at the favicon's caps (x 938.5 in world,
   128.6 in the shared left space); everything else is the left imagery. */
const shortArm = (d: string) => d.replace("M 85.0 629.0", "M 128.6 629.0")
const RIGHT_FRONT_MORPH = [shortArm(LEFT_FRONT_MORPH[0]), ...LEFT_FRONT_MORPH.slice(1)]
const RIGHT_FRONT_LONG = [shortArm(LEFT_FRONT_LONG[0]), ...LEFT_FRONT_LONG.slice(1)]
const RIGHT_FRONT_TUCK = [shortArm(LEFT_FRONT_TUCK[0]), ...LEFT_FRONT_TUCK.slice(1)]

type Anchor = { x: number; y: number; label: string }
type Ctrl = { x: number; y: number }

function analyzePath(d: string, letter: string): { anchors: Anchor[]; ctrls: Ctrl[] } {
  const toks = d.match(/[MLC]|-?\d+\.?\d*/g) ?? []
  const anchors: Anchor[] = []
  const ctrls: Ctrl[] = []
  let i = 0
  let n = 1
  while (i < toks.length) {
    const t = toks[i]
    if (t === "M" || t === "L") {
      anchors.push({ x: Number(toks[i + 1]), y: Number(toks[i + 2]), label: `${letter}.${n++}` })
      i += 3
    } else if (t === "C") {
      ctrls.push({ x: Number(toks[i + 1]), y: Number(toks[i + 2]) })
      ctrls.push({ x: Number(toks[i + 3]), y: Number(toks[i + 4]) })
      anchors.push({ x: Number(toks[i + 5]), y: Number(toks[i + 6]), label: `${letter}.${n++}` })
      i += 7
    } else {
      i += 1
    }
  }
  return { anchors, ctrls }
}

function AnnotatedHand({ paths, box }: { paths: string[]; box: string }) {
  const letters = "ABCDEFGHIJ"
  return (
    <div className="bg-vellum-deep">
      <svg viewBox={box} className="mx-auto block h-auto w-full max-w-3xl" aria-hidden>
        <g fill="none" stroke="oklch(41% 0.135 27)" strokeWidth={21} strokeLinecap="round" strokeLinejoin="round">
          {paths.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        {paths.map((d, pi) => {
          const { anchors, ctrls } = analyzePath(d, letters[pi])
          return (
            <g key={d}>
              {ctrls.map((c, ci) => (
                <circle key={ci} cx={c.x} cy={c.y} r={7} fill="none" stroke="oklch(45% 0.025 270)" strokeWidth={3} />
              ))}
              {anchors.map((a) => (
                <g key={a.label}>
                  <circle cx={a.x} cy={a.y} r={9} fill="oklch(24% 0.028 270)" />
                  <text
                    x={a.x + 14}
                    y={a.y - 12}
                    fontSize={30}
                    fontFamily="monospace"
                    fontWeight={700}
                    fill="oklch(24% 0.028 270)"
                  >
                    {a.label}
                  </text>
                </g>
              ))}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function Panel({
  title,
  note,
  children,
}: {
  title: string
  note?: string
  children: React.ReactNode
}) {
  return (
    <figure className="m-0">
      <figcaption className="mb-2 text-[11px] font-medium uppercase tracking-[0.25em] text-ink-faint">
        {title}
        {note && <span className="ml-3 normal-case italic tracking-normal text-ink-faint/80">{note}</span>}
      </figcaption>
      {children}
    </figure>
  )
}

export default function HandshakeLab() {
  return (
    <main className="mx-auto max-w-4xl space-y-12 px-6 pb-24 pt-32">
      <h1 className="display-serif text-4xl text-ink">Handshake lab</h1>

      <Panel title="1 · Favicon original">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/handshake-mark.png" alt="Original favicon handshake" className="w-64 bg-vellum-deep p-4" />
      </Panel>

      <Panel title="2 · Accuracy" note="final clasp frame vs the favicon: 0.37% error (99.63% match), red = favicon only, green = ours only">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/lab/extraction-diff.png?v=9" alt="Diff overlay of the final clasp frame against the favicon" className="w-full max-w-md" />
      </Panel>

      <Panel title="3 · Left hand, schematic" note="letters = paths, numbered dots = anchor points, hollow dots = curve controls. A = arm, dome, thumb; it paints behind the right hand">
        <AnnotatedHand paths={[...LEFT_BACK, ...LEFT_FRONT]} box="20 120 940 800" />
      </Panel>

      <Panel title="4 · Left hand reach pose, schematic" note="the fly-in pose: pinky +196, ring +235, long +239, index +92">
        <AnnotatedHand paths={[...LEFT_BACK, ...LEFT_FRONT_LONG]} box="20 140 1060 950" />
      </Panel>

      <Panel title="5 · Left hand tuck pose, schematic" note="the clasp pose: pinky folds level with the wrist, ring follows, dome folds flat on the A.2 to A.7 line">
        <AnnotatedHand paths={[...LEFT_BACK_TUCK, ...LEFT_FRONT_TUCK]} box="20 120 940 800" />
      </Panel>

      <Panel title="6 · Right hand thumb layer, schematic" note="left-space paths before MIRROR: short arm, thumb with the flight tail. The right fingers use the tuck chains of panel 5 with the short arm">
        <AnnotatedHand paths={RIGHT_BACK_FLIGHT} box="60 130 760 350" />
      </Panel>

      <Panel title="7 · Layered clasp, final frame" note="the true end state: right fingers and both thumb layers in tuck pose; matches the favicon at 99.63%">
        <div className="bg-vermillion">
          <svg viewBox="0 60 1024 900" className="mx-auto block h-auto w-full max-w-3xl" aria-hidden>
            <g fill="none" strokeLinecap="round" strokeLinejoin="round" stroke="oklch(94.5% 0.021 85)" strokeWidth={63.5}>
              <g transform={MIRROR}>
                <path d={LEFT_FRONT_FILL_TUCK} fill="oklch(55% 0.185 33)" stroke="none" />
                {RIGHT_FRONT_TUCK.map((d) => <path key={d} d={d} />)}
              </g>
              <path d={LEFT_BACK_FILL_TUCK} fill="oklch(55% 0.185 33)" stroke="none" />
              {LEFT_BACK_TUCK.map((d) => <path key={d} d={d} />)}
              <g transform={MIRROR}>
                <path d={RIGHT_BAND_FILL} fill="oklch(55% 0.185 33)" stroke="none" />
              </g>
              <path d={LEFT_FRONT_FILL} fill="oklch(55% 0.185 33)" stroke="none" />
              {LEFT_FRONT.map((d) => <path key={d} d={d} />)}
              <g transform={MIRROR}>
                <path d={LEFT_BACK_REGION_FILL} fill="oklch(55% 0.185 33)" stroke="none" />
                {RIGHT_BACK_FLIGHT.map((d) => <path key={d} d={d} />)}
              </g>
            </g>
          </svg>
        </div>
      </Panel>

      <Panel title="8 · Clasp demo, slow" note="reach, retract and fold, close, synced pump. Click to replay">
        <ClaspDemo speed={1} />
      </Panel>

      <Panel title="9 · Clasp demo, full speed" note="the same sequence at real speed. Click to replay">
        <ClaspDemo speed={4} />
      </Panel>
    </main>
  )
}
