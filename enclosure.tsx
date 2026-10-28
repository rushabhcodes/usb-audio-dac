import { assembly, jscad } from "tscircuit"

/** Existing optional PCB holes; the snap-fit cover does not need screws. */
export const mountingPoints = [[-23.5, -12.5], [-23.5, 12.5], [23.5, -12.5], [23.5, 12.5]] as const

/** Millimetres in the PCB frame: board centre z=0, surfaces z=±0.8. */
export const enclosureDimensions = {
  width: 58,
  length: 36,
  wall: 1.6,
  floorBottom: -3.8,
  floorTop: -2.2,
  seam: 6.7,
  lidTop: 8.3,
  skirtBottom: 1.05,
  skirtThickness: 0.8,
  fitClearance: 0.2,
} as const

const d = enclosureDimensions
const innerWidth = d.width - 2 * d.wall
const innerLength = d.length - 2 * d.wall
const skirtWidth = innerWidth - 2 * d.fitClearance
const skirtLength = innerLength - 2 * d.fitClearance
const snapPositions = [-15, 15] as const
const sides = [-1, 1] as const

function Box({ width, length, bottom, top, x = 0, y = 0 }: {
  width: number; length: number; bottom: number; top: number; x?: number; y?: number
}) {
  return <jscad.cuboid size={[width, length, top - bottom]} center={[x, y, (top + bottom) / 2]} />
}

/** Cuts both the wall and lid skirt. Datums follow the current connector models. */
function PortOpenings({ openTop = false }: { openTop?: boolean }) {
  return <>{[
    { x: -28, z: 2.4255, width: 12.6, height: 7.6, radius: 3.8 },
    { x: 28, z: 3.25, width: 10, height: 6.5, radius: 0.8 },
  ].map(({ x, z, width, height, radius }) => <jscad.union key={x}>
    <jscad.hull>
      {sides.flatMap((ySide) => sides.map((zSide) => <jscad.cylinder key={`${ySide}/${zSide}`}
        radius={radius} height={6} center={[x, ySide * (width / 2 - radius), z + zSide * (height / 2 - radius)]}
        rotation={[0, Math.PI / 2, 0]} />))}
    </jscad.hull>
    {/* The lid closes these U-shaped base openings, avoiding thin port bridges. */}
    {openTop && <Box x={x} width={6} length={width} bottom={z} top={d.seam + 0.1} />}
  </jscad.union>)}</>
}

/** A ramp deflects each lid tongue inward; its flat shoulder catches the window. */
function SnapHook({ x, side }: { x: number; side: number }) {
  const points: [number, number][] = [[16, 1.1], [16.7, 2.05], [16, 2.05]]
    .map(([y, z]) => [side * y, z])
  if (side < 0) points.reverse()
  return <jscad.translate offset={[x - 3, 0, 0]}>
    <jscad.rotate angles={[Math.PI / 2, 0, Math.PI / 2]}>
      <jscad.extrudeLinear height={6}><jscad.polygon points={points} /></jscad.extrudeLinear>
    </jscad.rotate>
  </jscad.translate>
}

/** Two printable parts: a shallow tray with PCB ledges and a snap-on lid. */
export function SnapFitEnclosure() {
  return <>
    <assembly.printedpart name="CaseBase" color="#555555" material="petg" jscad={
      <jscad.subtract>
        <jscad.union>
          <jscad.subtract>
            <Box width={d.width} length={d.length} bottom={d.floorBottom} top={d.seam} />
            <Box width={innerWidth} length={innerLength} bottom={d.floorTop} top={d.seam + 0.1} />
          </jscad.subtract>
          {/* Four edge ledges support the PCB underside; no posts or carrier. */}
          {[-23.5, 23.5].flatMap((x) => sides.map((side) =>
            <Box key={`${x}/${side}`} x={x} y={side * 15.4} width={5} length={3}
              bottom={d.floorTop - 0.1} top={-0.8} />))}
        </jscad.union>
        <PortOpenings openTop />
        {/* Small through-windows also let a thin tool release the four hooks. */}
        {snapPositions.flatMap((x) => sides.map((side) =>
          <Box key={`${x}/${side}`} x={x} y={side * 17.1} width={6.6} length={2.2}
            bottom={0.9} top={2.25} />))}
      </jscad.subtract>
    } />
    <assembly.printedpart name="CaseLid" color="#777777" material="petg" jscad={
      <jscad.subtract>
        <jscad.union>
          <Box width={d.width} length={d.length} bottom={d.seam} top={d.lidTop} />
          <jscad.subtract>
            <Box width={skirtWidth} length={skirtLength} bottom={d.skirtBottom} top={d.seam + 0.1} />
            <Box width={skirtWidth - 2 * d.skirtThickness} length={skirtLength - 2 * d.skirtThickness}
              bottom={d.skirtBottom - 0.1} top={d.seam + 0.2} />
          </jscad.subtract>
          {snapPositions.flatMap((x) => sides.map((side) =>
            <SnapHook key={`${x}/${side}`} x={x} side={side} />))}
        </jscad.union>
        <PortOpenings />
        {/* The skirt overlaps the PCB edge, retaining it with 0.25 mm vertical play. */}
        {snapPositions.flatMap((x) => sides.flatMap((side) => sides.map((edge) =>
          <Box key={`${x}/${side}/${edge}`} x={x + edge * 3.3} y={side * 16} width={0.6} length={2}
            bottom={d.skirtBottom - 0.1} top={6.25} />)))}
      </jscad.subtract>
    } />
  </>
}
