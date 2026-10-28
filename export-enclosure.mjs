// Export the supported native tscircuit shell, fusing its PCB supports into the base.
// STL coordinates are millimetres. Base floor and lid outer face lie on the print bed.
import { readFile, mkdir, writeFile } from "node:fs/promises"
import modeling from "@jscad/modeling"
import { executeJscadOperations } from "jscad-planner"
import stl from "@jscad/stl-serializer"

const data = JSON.parse(await readFile(process.argv[2] ?? "dist/index/circuit.json", "utf8"))
const owner = (name) => data.find((x) => x.type === "source_component" && x.name === name)?.source_component_id
const models = (name) => data.filter((x) => x.type === "cad_component" && x.source_component_id === owner(name) && x.model_jscad)
const evaluate = (record) => {
  const solid = executeJscadOperations(modeling, record.model_jscad)
  const { x = 0, y = 0, z = 0 } = record.position ?? {}
  const rotation = record.rotation ?? {}
  return modeling.transforms.translate([x, y, z], modeling.transforms.rotate(
    [rotation.x ?? 0, rotation.y ?? 0, rotation.z ?? 0].map((a) => a * Math.PI / 180), solid))
}
const shell = models("Shell").map(evaluate).sort((a, b) =>
  modeling.measurements.measureBoundingBox(a)[0][2] - modeling.measurements.measureBoundingBox(b)[0][2])
const supports = models("PcbSupports")
if (shell.length !== 2 || supports.length !== 1) throw new Error("Expected native base, lid and PCB supports; build index.circuit.tsx first")
const base = modeling.booleans.union(shell[0], evaluate(supports[0]))
const lid = modeling.transforms.rotateX(Math.PI, shell[1])
await mkdir("dist/enclosure", { recursive: true })
for (const [name, solid] of [["base", base], ["lid", lid]]) {
  const [low, high] = modeling.measurements.measureBoundingBox(solid)
  const placed = modeling.transforms.translate([0, 0, -low[2]], solid)
  const printable = modeling.modifiers.generalize({ snap: true, simplify: true, triangulate: true }, placed)
  const chunks = stl.serialize({ binary: true }, printable)
  await writeFile(`dist/enclosure/svara-usb-${name}.stl`, Buffer.concat(chunks.map((x) => Buffer.from(x))))
  console.log(`${name}: ${high.map((v, i) => (v - low[i]).toFixed(3)).join(" × ")} mm`)
}
