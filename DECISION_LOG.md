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

---

### D4: Series Filtering Handled by Parent App (Not Chart)

**Date:** 2026-11-06  
**Decision:** Charts do not include built-in dropdown or series filtering UI. Series selection/filtering is handled by the parent Svelte component. Charts remain reactive to data prop changes and smoothly transition when parent updates the data.

**Rationale:**
- Decouples chart logic from UI framework concerns
- Parent app has full control over filtering UI (dropdown, buttons, checkboxes, etc.)
- Chart focuses on visualization, parent handles state management
- Simpler chart API (no dropdown config needed)
- More flexible for users (can implement any filtering pattern)

**Implementation:**
- Chart receives `data` prop with already-filtered dataset
- When parent changes data (user selects different series in dropdown), chart smoothly transitions
- Identity-based keying ensures elements track through reorderings/filtering

**Example:**
```svelte
<!-- Parent component -->
<script>
  let selectedSeries = ['A', 'B'];
  $: filteredData = data.filter(d => selectedSeries.includes(d.series));
</script>

<select bind:value={selectedSeries} multiple>
  <option value="A">Series A</option>
  <option value="B">Series B</option>
</select>

<!-- Chart just receives pre-filtered data, smoothly re-renders -->
<BarChart data={filteredData} {config} />
```

**Alternatives Considered:**
- Built-in dropdown UI in chart (rejected: inflexible, duplicates parent app's filtering logic)
- Chart manages visible series state (rejected: couples chart to state management)

**Status:** Active

---

### D5: Annotation Types: Point, Directional, Range, and Line (Not Region Editor or Toolbar)

**Date:** 2026-11-06  
**Decision:** MVP supports four annotation types: point (highlight data points), directional (arrows along axes), range (highlight regions), and line (reference lines). No region editor UI or interactive annotation toolbar.

**Rationale:**
- These four types cover the most common annotation use cases:
  - Point: highlighting outliers or specific values
  - Directional: indicating trends or changes
  - Range: marking significant periods or regions
  - Line: marking thresholds, averages, targets
- Simpler to implement than complex region editors
- Annotations are SVG overlays, fully customizable via slot if users need advanced patterns
- Interactive toolbar is Phase 2+ feature (after core system is stable)

**Annotation Types:**

1. **Point Annotation** — Highlight specific data point + optional arrow
   - Config: `type: 'point'`, `dataKey`, `label`, `showArrow`, `arrowPosition`

2. **Directional Annotation** — Arrow pointing along an axis (up/down/left/right)
   - Config: `type: 'directional'`, `axis`, `position`, `direction`, `label`

3. **Range Annotation** — Highlight a range/region on the chart
   - Config: `type: 'range'`, `axis`, `start`, `end`, `label`, `fillColor`

4. **Line Annotation** — Reference line (vertical or horizontal)
   - Config: `type: 'line'`, `axis`, `position`, `label`, `lineStyle`

**Customization:**
- Default rendering via ONS styling
- Fully overridable via `slot="annotations"` for custom patterns

**Alternatives Considered:**
- Region editor UI (rejected: UI editor scope, better for Phase 2+)
- Interactive annotation toolbar (rejected: Phase 2+ feature)
- Load annotations from file (rejected: parent app can manage this)

**Status:** Active

*More decisions will be recorded as development progresses.*
