import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"],
  pin4: ["pin4"]
} as const

export const PJ_320D = (props: ChipProps<typeof pinLabels>) => {
  return (
    <connector
      pinLabels={pinLabels}
      symbol={
        <symbol>
          <schematicpath points={[{"x":0,"y":-0.4},{"x":-0.46,"y":-0.4},{"x":-0.5,"y":-0.32},{"x":-0.54,"y":-0.4}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0,"y":-0.2},{"x":-0.36,"y":-0.2},{"x":-0.4,"y":-0.12},{"x":-0.44,"y":-0.2}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.08,"y":0},{"x":-0.26,"y":0},{"x":-0.3,"y":-0.08},{"x":-0.34,"y":0}]} strokeColor="#880000" />
          <port name="pin4" pinNumber={4} aliases={["4"]} direction="right" schX={0.4} schY={0} schStemLength={0.4} />
          <port name="pin2" pinNumber={2} aliases={["2"]} direction="right" schX={0.4} schY={-0.4} schStemLength={0.4} />
          <port name="pin3" pinNumber={3} aliases={["3"]} direction="right" schX={0.4} schY={-0.2} schStemLength={0.4} />
          <port name="pin1" pinNumber={1} aliases={["1"]} direction="right" schX={0.4} schY={0.2} schStemLength={0.4} />
          <schematicrect schX={-0.8} schY={-0.18} width={0.12} height={0.36} strokeWidth={0.02} color="#880000" />
          <schematicpath points={[{"x":0,"y":0.2},{"x":-0.8,"y":0.2},{"x":-0.8,"y":0}]} strokeColor="#880000" />
          <schematictext schX={-0.21} schY={0.602} text="{NAME}" fontSize={0.2} anchor="bottom_center" />
        </symbol>
      }
      supplierPartNumbers={{
  "jlcpcb": [
    "C431535"
  ]
}}
      manufacturerPartNumber="PJ-320D"
      footprint={<footprint insertionDirection="from_left">
        <hole pcbX="-5.07495175mm" pcbY="-0.000127mm" diameter="0.999998mm" />
<hole pcbX="1.92503425mm" pcbY="-0.000127mm" diameter="0.999998mm" />
<smtpad portHints={["pin2"]} pcbX="-3.57508175mm" pcbY="3.499993mm" width="1.499997mm" height="2.999994mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="-0.57508775mm" pcbY="3.499993mm" width="1.499997mm" height="2.999994mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="3.42490425mm" pcbY="3.499993mm" width="1.499997mm" height="2.999994mm" shape="rect" />
<smtpad portHints={["pin1"]} pcbX="4.82495225mm" pcbY="-3.499993mm" width="1.499997mm" height="2.999994mm" shape="rect" />
<silkscreenpath strokeWidth={0.15} route={[{"x":-5.85,"y":-3.0001210000000356},{"x":3.843724849999944,"y":-3.0001210000000356}]} />
<silkscreenpath strokeWidth={0.15} route={[{"x":5.3250274499998795,"y":2.9998670000001084},{"x":5.3250274499998795,"y":-1.768856000000028}]} />
<silkscreenpath strokeWidth={0.15} route={[{"x":4.405928449999919,"y":2.9998670000001084},{"x":5.3250274499998795,"y":2.9998670000001084}]} />
<silkscreenpath strokeWidth={0.15} route={[{"x":0.4059364499998992,"y":2.9998670000001084},{"x":2.4436514499999475,"y":2.9998670000001084}]} />
<silkscreenpath strokeWidth={0.15} route={[{"x":-2.594057550000116,"y":2.9998670000001084},{"x":-1.5563405500001863,"y":2.9998670000001084}]} />
<silkscreenpath strokeWidth={0.15} route={[{"x":-5.85,"y":2.9998670000001084},{"x":-4.5563345500002015,"y":2.9998670000001084}]} />




<silkscreentext text="{NAME}" pcbX="-1.59413575mm" pcbY="6.005197mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-9.025045949999935,"y":5.249990000000025},{"x":5.824950749999971,"y":5.249990000000025},{"x":5.824950749999971,"y":-5.249989999999912},{"x":-9.025045949999935,"y":-5.249989999999912},{"x":-9.025045949999935,"y":5.249990000000025}]} />
      </footprint>}
      cadModel={{
        modelBounds: { min: { x: -1.5, y: -4, z: -3.1 }, max: { x: 12.6, y: 4, z: 2.74998 } },
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C431535.obj?uuid=7178d96b87ee4d73a30dddb4c856adc2",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C431535.step?uuid=7178d96b87ee4d73a30dddb4c856adc2",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 7.275060049999911, y: 0, z: -2.5500011000000002 },
      }}
      {...props}
    />
  )
}