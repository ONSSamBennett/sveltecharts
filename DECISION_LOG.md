# Decision Log

Record of key architectural and technical decisions made during SvelteCharts development.

## Format

Each entry includes:
- **Decision** — What was decided
- **Rationale** — Why this decision was made  
- **Alternatives** — Other options considered
- **Status** — Active, Superseded, or Deferred

---

## Decisions

### D1: Chart Variations Driven by Configuration (Not Component Explosion)

**Date:** 2026-11-06  
**Decision:** Chart variations (e.g., Line, Line with CI, Line with Dropdown, Line SM Focus) will be unified into single chart components (e.g., `LineChart`) with configuration attributes that control behavior, not separate components.

**Rationale:**
- Reduces component count and API surface (fewer imports for users)
- Makes it easier to share logic between variants (DRY principle)
- Enables Phase 2 morphing transitions (e.g., Bar → Scatter via config change)
- Easier for users to discover and use — one mental model per chart type

**Examples:**
- Bar, BarStacked, BarClustered, BarGrouped, BarDropdown → **`BarChart`** with `layout` and `interactive` config
- Line, LineCI, LineDropdown, LineSMFocus → **`LineChart`** with `confidenceInterval`, `interactive`, `responsiveMode` config

**Alternatives Considered:**
- Separate component per variation (rejected: bloats library, duplicates logic)
- Generic `<Chart>` component (rejected: too ambiguous, harder to document)

**Status:** Active

---

### D2: Use SVG Paths for All Visual Elements (Future Chart Morphing Support)

**Date:** 2026-11-06  
**Decision:** MVP chart components render all visual elements (bars, dots, lines, areas) as SVG `<path>` elements, not higher-level primitives (rect, circle, line, polygon).

**Rationale:**
- Paths can be smoothly morphed between shapes (e.g., bars → dots via `d` attribute interpolation)
- Enables Phase 2 feature: smooth animated transitions between chart types
- Does not add complexity to MVP (just different SVG structure)
- Makes it easy to extend to shapes that rect/circle can't express (e.g., hexagons, rounded shapes)

**Technical Implications:**
- Shape rendering logic encapsulated in utility functions (e.g., `barPath()`, `dotShape()`)
- All data elements tagged with stable identity (`data-key` or `data-id`)
- Coordinate scales kept separate from shape rendering (facilitates future transitions)
- Data reordering tests verify element identity is preserved throughout animation

**Alternatives Considered:**
- Use rect/circle/line primitives (rejected: cannot morph smoothly to different shapes)
- Canvas rendering (rejected: poor accessibility, harder to customize)

**Status:** Active

---

### D3: Modular Architecture with Reusable Sub-Components

**Date:** 2026-11-06  
**Decision:** Chart components will be built from reusable sub-components (Axes, Legend, Tooltip, Annotations) that can also be used independently.

**Rationale:**
- Reduces duplication (Axis logic shared across bar, column, line, area, etc.)
- Allows users to customize elements via composition/slots
- Facilitates code reuse in Phase 2 (e.g., blending axes during morphing)
- Improves maintainability (single source of truth per feature)

**Examples:**
- `<AxisX>`, `<AxisY>` for axis rendering
- `<Legend>` for series toggling
- `<Tooltip>` with configurable interaction modes
- `<AnnotationLayer>` for overlays

**Status:** Active

*More decisions will be recorded as development progresses.*

