import { assembly, jscad } from "tscircuit"

/** All dimensions are millimetres; PCB centre is z=0, thickness 1.6. */
export const mountingPoints = [[-23.5, -12.5], [-23.5, 12.5], [23.5, -12.5], [23.5, 12.5]] as const

/** Fused into the native shell base by export:enclosure. Not a loose insert.
 * Posts end at PCB underside (z=-0.8); pilots take prototype M2 x 4 screws.
 * The frame overlaps the enclosure floor by 0.2 mm for a solid union.
 */
export function PcbSupports() {
  return <assembly.printedpart name="PcbSupports" color="#777777" jscad={
    <jscad.subtract>
      <jscad.union>
        <jscad.subtract>
          <jscad.cuboid size={[54.6, 32.6, 1.2]} center={[0, 0, -3.4]} />
          <jscad.cuboid size={[47, 25, 1.6]} center={[0, 0, -3.4]} />
        </jscad.subtract>
        {mountingPoints.map(([x, y], i) => <jscad.cuboid key={i}
          size={[5, 5, 3.2]} center={[x, y, -2.4]} />)}
      </jscad.union>
      {mountingPoints.map(([x, y], i) => <jscad.cylinder key={i}
        radius={0.8} height={3.6} center={[x, y, -2.4]} segments={48} />)}
    </jscad.subtract>
  } />
}
