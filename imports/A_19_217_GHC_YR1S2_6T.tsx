import type { LedProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["cathode","neg"],
  pin2: ["anode","pos"]
} as const

export const A_19_217_GHC_YR1S2_6T = (props: LedProps) => {
  const { name = "LED1", ...restProps } = props

  return (
    <led
      name={name}
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C2986059"
  ]
}}
      manufacturerPartNumber="19-217/GHC-YR1S2/6T"
      footprint={<footprint>
        <smtpad portHints={["pin1","cathode","neg"]} pcbX="-0.799465mm" pcbY="-0.003429mm" width="0.7999984mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin2","anode","pos"]} pcbX="0.799465mm" pcbY="0.003429mm" width="0.7999984mm" height="0.7999984mm" shape="rect" />
<silkscreenpath route={[{"x":0.24043639999990774,"y":0.7565136000000621},{"x":1.390497600000117,"y":0.7565136000000621}]} />
<silkscreenpath route={[{"x":0.24043639999990774,"y":-0.7436103999999659},{"x":1.390497600000117,"y":-0.7436103999999659}]} />
<silkscreenpath route={[{"x":1.390497600000117,"y":0.7564628000000084},{"x":1.390497600000117,"y":-0.7235189999998966}]} />
<silkscreenpath route={[{"x":-0.13957299999992756,"y":-0.7458963999999924},{"x":-1.189685200000099,"y":-0.7458963999999924}]} />
<silkscreenpath route={[{"x":-1.4896337999999787,"y":-0.345795599999974},{"x":-1.4896337999999787,"y":-0.4458207999998649},{"x":-1.189685200000099,"y":-0.7458963999999924}]} />
<silkscreenpath route={[{"x":-1.4896337999999787,"y":0.3541268000000173},{"x":-1.4896337999999787,"y":-0.345795599999974}]} />
<silkscreenpath route={[{"x":-1.4896337999999787,"y":0.3541268000000173},{"x":-1.4896337999999787,"y":0.4542790000000423},{"x":-1.189685200000099,"y":0.7542276000000356}]} />
<silkscreenpath route={[{"x":-0.13957299999992756,"y":0.7542276000000356},{"x":-1.189685200000099,"y":0.7542276000000356}]} />
<silkscreentext text="{NAME}" pcbX="-0.053467mm" pcbY="1.768477mm" anchorAlignment="center" fontSize="1mm" />
<fabricationnotepath route={[{"x":0.5289295999998558,"y":0.06832600000007005},{"x":1.068933599999923,"y":0.06832600000007005},{"x":1.068933599999923,"y":-0.061671199999977944},{"x":0.5289295999998558,"y":-0.061671199999977944},{"x":0.5289295999998558,"y":0.06832600000007005}]} strokeWidth="0mm" isFilled hasStroke={false} />
<fabricationnotepath route={[{"x":0.7345679999999675,"y":-0.2671318000000156},{"x":0.7345679999999675,"y":0.27287220000005163},{"x":0.8645397999999886,"y":0.27287220000005163},{"x":0.8645397999999886,"y":-0.2671318000000156},{"x":0.7345679999999675,"y":-0.2671318000000156}]} strokeWidth="0mm" isFilled hasStroke={false} />
<fabricationnotepath route={[{"x":-1.0700004000000263,"y":0.06146800000010444},{"x":-0.5299963999999591,"y":0.06146800000010444},{"x":-0.5299963999999591,"y":-0.06852919999994356},{"x":-1.0700004000000263,"y":-0.06852919999994356},{"x":-1.0700004000000263,"y":0.06146800000010444}]} strokeWidth="0mm" isFilled hasStroke={false} />
<fabricationnotepath route={[{"x":-0.2999993999999333,"y":0.3999484000000848},{"x":-0.2999993999999333,"y":-0.4000499999999647},{"x":-0.09999980000009145,"y":-0.4000499999999647},{"x":-0.09999980000009145,"y":0.3999484000000848},{"x":-0.2999993999999333,"y":0.3999484000000848}]} strokeWidth="0mm" isFilled hasStroke={false} />
<courtyardoutline outline={[{"x":-1.4494641999999658,"y":0.6534282000000076},{"x":1.4494642000000795,"y":0.6534282000000076},{"x":1.4494642000000795,"y":-0.6534282000000076},{"x":-1.4494641999999658,"y":-0.6534282000000076},{"x":-1.4494641999999658,"y":0.6534282000000076}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2986059.obj?uuid=6f130ed341a94a9faf4a4c2e249f3fd3",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2986059.step?uuid=6f130ed341a94a9faf4a4c2e249f3fd3",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: -0.000012700000070253736, y: 0.00005079999993995443, z: -0.01 },
      }}
      {...restProps}
    />
  )
}