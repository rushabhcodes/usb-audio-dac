# Svara USB — revision B (prototype)

Independent USB audio DAC/headphone board, designed in tscircuit from manufacturer
datasheets. USB-C → PCM2704C → TPA6132A2 → 3.5 mm headphone socket.

## Design assumptions

- Stereo USB Audio, 16-bit, 32/44.1/48 kHz. Host volume and mute; no onboard buttons.
- 32–80 Ω headphones. Amplifier gain is 0 dB (G0 high, G1 low). The nominal DAC
  level is approximately 0.65 Vrms: about 13 mW/channel into 32 Ω and 5 mW into
  80 Ω before losses. These are calculations, not guaranteed or measured ratings.
- USB bus powered, 100 mA descriptor (PSEL high, HOST low). No USB PD negotiation.
  Each CC pin has its own 5.1 kΩ pull-down. Both connector orientations are wired.
- PCM2704C VDD/VCCP/VCCL/VCCR are separate internal regulator outputs, each with
  1 µF decoupling. They do not power the headphone amplifier. VCOM has 10 µF.
- LP5907 supplies 3.3 V only to the amplifier. USB suspend drives amplifier EN low;
  the LDO stays enabled. Input capacitance and suspend current need bench checks.
- 12 MHz, 20 pF crystal; pins 1/3 are the resonator, pins 2/4 are grounded case pads.
  Two 33 pF loads assume about 3.5 pF effective stray capacitance. Verify frequency,
  startup and drive level on the prototype; the imported 22 pF alternatives remain.
- DAC outputs use 22 Ω/22 nF RF filters and AC coupling into the amplifier's
  inverting inputs. Non-inverting inputs are grounded, following TI Figure 27.
  At 0 dB, 1 µF and 19.8 kΩ give a nominal 8 Hz high-pass corner. Both channels invert.
- HPVDD has only its 2.2 µF bypass; it must never be tied to the external 3.3 V rail.
  The charge pump has a 1 µF flying capacitor and 1 µF HPVSS reservoir. Outputs are
  ground referenced and connect directly to the socket without output capacitors.
- PJ-320D is a four-contact socket: imported pin 2 = tip/left, 3 = first ring/right,
  4 = second ring, 1 = sleeve. Pins 1 and 4 are grounded for stereo headphones;
  there is no microphone input. Confirm the purchased socket with a continuity test.
- Compact board: 54 × 32 mm, 2-layer FR-4, 1.6 mm (revision A: 60 × 34 mm; 15.3% less area). USB-C and
  headphone socket face opposite ends. Four mounting holes support the enclosure prototype described below.

The 23 original imported models, their copper geometry and supplier identifiers
are retained. One 22 nF type (C21122) was added for the output filters. Connector
primitive types and power/NC pin attributes were corrected without changing pads.
Legend strokes and labels were adjusted to 0.15 mm ink and at least 1 mm character
height; a few outline stubs were trimmed to preserve pad clearance.
Unused imported LED, buttons and passive alternatives are not populated.

## Local workflow

Use Bun and the project-local CLI:

```sh
bun run typecheck
bun run build --disable-parts-engine --svgs
bun run dev
./node_modules/.bin/tsci export dist/index/circuit.json --format gerbers --output ../svara-usb-gerbers.zip
./node_modules/.bin/tsci export dist/index/circuit.json --format glb --output ../svara-usb-assembly.glb
```

Generated output and caches stay ignored. The parts-engine option avoids an
unavailable remote datasheet/availability service; it does not validate stock.
PCM2704C JLCPCB assembly availability remains unconfirmed.

## Enclosure prototype

The installed tscircuit API supports `assembly.device`, `enclosure.fdm.box`, and
connector-owned `enclosure.cutoutaperture`. The native box creates a base and
friction-fit lid; it does not create mounting posts. `enclosure.tsx` adds four
5 × 5 mm bosses and a frame. `export-enclosure.mjs` fuses these supports into the
native base, producing **two printable parts**, with no loose PCB carrier.
Generated files remain ignored under `dist/enclosure/`.

- Assembled nominal outside: **59.2 × 37.2 × 18.1 mm**. Walls/floor/lid: 2 mm.
  PCB edge clearance: 0.6 mm per side; underside gap: 3 mm; top headroom: 9.5 mm.
- Four 2.2 mm PCB mounting holes at (±23.5, ±12.5) mm, with nominal 2.7 mm radius copper
  keepouts on both layers. Use four prototype M2 × 4 mm screws; 1.6 mm printed
  pilot holes need drilling/tapping to suit the chosen plastic and screw.
  Verify screw length, head diameter (≤4.0 mm) and thread engagement before use.
- USB-C opening: 12.6 × 7.6 mm pill, centred 1.6255 mm above PCB top.
  Headphone opening: 11 mm circle, centred 2.55 mm above PCB top. Dimensions
  include the aperture margin and allow limited plug-body access through the
  recessed ports. Test the intended USB cable and headphone plug; arbitrary
  overmoulds, right-angle plugs and adapters are not guaranteed to fit.
- The original connector OBJ bounds set the aperture heights. Insertion directions
  are explicit; the board intentionally lets connector bodies overhang its edges
  while retaining the exact original copper and hole geometry.
- The native lid has 0.30 mm total sliding clearance (0.15 mm per side).
  Print the base floor down and lid outer face down; the exporter places them on
  Z=0 in those orientations. Start with a calibrated 0.4 mm nozzle FDM printer.
  Material, shrinkage, layer settings, friction retention, screw pilots, solder-tail
  clearance and cable insertion require a physical prototype. This is not a
  mechanically qualified enclosure or a sealed/EMI-certified product.

Generate the board, then the printable STLs with the project-local tools:

```sh
bun run export:enclosure
# dist/enclosure/svara-usb-base.stl
# dist/enclosure/svara-usb-lid.stl
```

Revision A is package v1.0.0. This compact PCB and enclosure are revision B
(package v1.1.0).

## Manufacturing and validation

This revision targets ordinary single-design 2-layer fabrication, 1 oz copper,
green mask, through vias with nominal 0.30 mm drill/0.60 mm pad, and no filled,
capped, blind or buried vias. A nominal drill is not a guaranteed finished bore.
The USB-C shell retains its original plated slots and locating holes.

JLCPCB's current surcharge rules identify small holes below 0.30 mm and drilling
density above 150,000 holes/m² as potential extra charges. Inspect the **exported**
Gerber and Excellon files, including slots, before ordering. Finish, assembly,
extended-part feeder fees, stock, stencil, shipping, taxes and the final quotation
are separate from a geometry check. Fine-pitch assembly may favor ENIG, which is
a priced finish option. No zero-surcharge quotation has been obtained.

The revision-B export was checked as actual Gerber/Excellon geometry:

- **54 × 32 mm**, two copper layers; 49 through vias at **0.30/0.60 mm**.
- Four 0.8 mm plated USB slots; four connector locating holes (0.6/1.0 mm) and
  four 2.2 mm mounting holes. There are 61 physical hole features. Conservatively
  counting slot starts and routes separately gives **65 operations, 37,616/m²**,
  below the published 150,000/m² drilling-density surcharge threshold.
- Minimum trace width: 0.15 mm. Minimum disconnected-copper gap: approximately
  0.15 mm. Copper-to-routed-edge clearance: at least 0.2258 mm on both layers.
  NPTH copper clearance exceeds 0.296 mm; minimum hole-edge spacing is 0.4545 mm.
- Via rings are 0.15 mm. Retained USB slot rings are approximately 0.1999 mm,
  above JLCPCB's 0.18 mm absolute minimum for 1 oz two-layer component holes and
  below its 0.25 mm recommendation. Original imported copper/hole declarations
  remain unchanged. The mounting keepouts are nominally 2.7 mm radius; use
  M2 screw heads no larger than 4 mm.
- Slot routing density is conservatively 8.37 m/m², below the published narrow-slot
  routing threshold of 80 m/m². Combined exposed copper is about 7.20% of board
  area; this does not make ENIG a free finish option.
- All **31 net groups** connect in exported copper with no opens or net-to-net
  shorts, and the source netlist matches revision A. The crystal branches remain
  on the top layer with no clock vias. All via bores clear top pad mask openings.
  Legend has 0.15 mm strokes, at least 1 mm characters, no exposed-pad overlap,
  and at least 0.153 mm pad-opening clearance.

These checks avoid the documented small-via and drilling-density fee triggers;
they do not establish a zero-surcharge quotation or production readiness.

Typecheck, the local circuit build, and `bun run export:enclosure` pass with no
CAD errors. The CLI emits styling/metadata warnings for the custom schematic
sheet and the passive ferrite modeled as a chip. Its route-cache warning concerns
the manually authored clock net; it does not prevent routing or exports.

The native GLB contains the PCB, all 37 populated component instances, base,
lid and support model. The two exported STL parts are each one watertight solid
with consistent winding and positive volume. CAD intersections show no overlap
between base/lid, the PCB envelope, or the supplied connector model envelopes.
The four pilot holes remain open. Minimum nominal wall ligament around the
headphone opening is 1.45 mm above and 1.65 mm below; USB lower ligament is
2.425 mm. These are model checks, not a physical fit or print test.

The BOM/CPL audit matches all 37 unique designators, MPNs and 19 supplier IDs to
the CAD source. Placement centers match within 0.0005 mm; layers and raw PCB
angles match exactly. All 37 parts lack JLCPCB reference-orientation metadata,
so supplier zero-degree orientations remain unverified. J1's exported derived
center is X = -23.525 mm while its footprint anchor is X = -23.100 mm; confirm
its pickup datum in the assembly preview. The placement file is **not released
for turnkey assembly**. Exact-part stock and extended-part setup fees remain
unconfirmed; no JLCPCB order or assembly upload has been placed.

Before production, physically verify USB enumeration in both cable orientations,
active/suspend current and inrush, all rails, crystal startup/frequency, output
DC, channel mapping, clipping/THD under load, thermal behavior, ESD, and enclosure
fit with the intended cables, screws, plastic and printer. Check solder tails
against the 3 mm underside gap and 2 mm clearance above the support frame.
USB pair impedance and return paths require review against the chosen stackup;
no controlled-impedance, USB certification or measured audio claim is made.

## Primary references

- [TI PCM2704C, SBFS036B](https://www.ti.com/lit/ds/symlink/pcm2704c.pdf): pins,
  bus-powered configuration, clock, USB and decoupling; sections 9–12.
- [TI TPA6132A2, SLOS597B](https://www.ti.com/lit/ds/symlink/tpa6132a2.pdf): gain
  table, single-ended Figure 27, charge pump, decoupling and layout; sections 7–10.
- [TI LP5907](https://www.ti.com/lit/ds/symlink/lp5907.pdf).
- [ST USBLC6-2](https://www.st.com/resource/en/datasheet/usblc6-2.pdf).
- [SHOU HAN PJ-320D manufacturer drawing, C431535](https://datasheet.lcsc.com/datasheet/pdf/50aca6c1750ca25d6422baa81dc852bf.pdf?productCode=C431535),
  [numbered contact drawing](https://static.chipdip.ru/lib/521/DOC042521444.pdf).
- [YXC X322512MSB4SI manufacturer datasheet](https://www.micros.com.pl/mediaserver/Q12.000_3.2x2.5_Y_0001.pdf).
- [JLCPCB capabilities](https://jlcpcb.com/capabilities/pcb-capabilities/),
  [surcharge rules](https://jlcpcb.com/help/article/in-what-cases-will-there-be-charged-extra).

- [Native enclosure USB cutout example](https://github.com/tscircuit/core/blob/main/tests/enclosure/enclosure-fdm-box-usb-cutout.test.tsx),
  [FDM enclosure solver](https://github.com/tscircuit/create-fdm-enclosure), and
  [printed-part API](https://docs.tscircuit.com/elements/assembly-printedpart).
  This project pins the working tscircuit version rather than relying on an
  unreleased enclosure schema.
