# Svelte Charts Library - Requirements Specification

## 1. Functional Requirements

### 1.1 Supported Chart Types

#### Basic Charts
- [ ] **Bar Chart** — Horizontal bars for categorical data
- [ ] **Bar Chart Stacked** — Horizontal stacked bars for composition
- [ ] **Bar Chart Clustered** — Multiple bars per category for comparison
- [ ] **Bar Chart Grouped** — Groups of bars separated by category
- [ ] **Bar Chart Stacked-Grouped** — Combined stacking and grouping
- [ ] **Bar Chart with Dropdown** — Interactive series selection via dropdown
- [ ] **Column Chart** — Vertical bars (time series default)
- [ ] **Column Chart Stacked with Optional Line** — Stacked columns + line overlay

#### Statistical/Advanced Charts
- [ ] **Line Chart** — Single or multi-series time series
- [ ] **Line Chart with CI Area** — Line + confidence interval shading
- [ ] **Line Chart Dropdown Options** — Interactive series selection
- [ ] **Line Chart SM Focus** — Small-screen variant with focus interaction
- [ ] **Line Chart SM Multiseries** — Small-screen multi-series optimization
- [ ] **Area Stacked** — Stacked area chart for composition over time
- [ ] **Area Stacked SM** — Small-screen variant
- [ ] **Column Chart with CI Bands** — Column chart + confidence interval bands
- [ ] **Range Charts** (Arrow/Dot/Bar/Reference) — Show ranges and uncertainty
- [ ] **Range CI Area Grouped** — Grouped range charts with confidence intervals

#### Specialty Charts
- [ ] **Scatter Bubble Plot** — Multi-dimensional data (x, y, size, color)
- [ ] **Beeswarm** — Dense point distribution with collision avoidance
- [ ] **Heatmap** — 2D matrix visualization with color encoding
- [ ] **Slope Chart** — Show change between two points
- [ ] **Waterfall Chart** — Cumulative flow (starting point → steps → ending point)
- [ ] **Population Pyramid** — Age/gender distribution mirror bars
- [ ] **Pie Chart** — (If applicable to ONS use) — Categorical proportions
- [ ] **Doughnut Chart** — Pie variant with center empty space

#### Annotations
- [ ] **Annotation Bar** — Highlight regions on bar/column charts
- [ ] **Annotation Column** — Highlight regions on column charts
- [ ] **Annotation Load from File** — Load annotations from external config
- [ ] **Annotation Toolbar** — Interactive annotation UI for chart editing

### 1.2 Core Features

#### Data Handling
- [ ] Accept data in standardized JSON format (array of objects with named properties)
- [ ] Auto-detect data types (numeric, categorical, temporal)
- [ ] Support missing/null values with clear fallback behavior
- [ ] Handle large datasets (10k+ rows) without performance degradation
- [ ] Support reactive data updates with smooth transitions
- [ ] **Identity-based keying** — use unique identifier (e.g., category name) to track elements across updates
- [ ] **Preserve element identity** — when data reorders, elements smoothly transition to their new positions, not just swap values in place
- [ ] **Configurable key field** — specify which property is the unique identifier per chart

#### Styling & Theming
- [ ] **Default ONS Theme** applied automatically
  - Official ONS color palette (category, sequential, diverging, highlight)
  - ONS-approved fonts (appropriate fallbacks)
  - Standard margins, padding, stroke widths
  - Accessibility-compliant contrast ratios
- [ ] **Theme Customization** API
  - Override color palette per-chart
  - Override fonts (title, axis labels, legend)
  - Override spacing/dimensions
  - Preserve accessibility defaults
- [ ] **Responsive Behavior**
  - Reflow legends on small screens
  - Rotate/hide axis labels if needed
  - Adjust font sizes for readability
  - "SM" variants for explicit mobile optimization

#### Interactivity
- [ ] **Tooltips** — Hover over data points, show value + metadata
  - Standard tooltip styling (ONS palette, font, spacing)
  - Default template: category, value, series (if applicable)
  - Customizable via slot: `<svelte:fragment slot="tooltip" let:data>`
  - **Accessibility modes** to avoid precise hovering:
    - Vertical guideline mode: crosshair follows mouse, shows all values at x-position
    - Snap-to-nearest: hover near point, automatically snaps to closest data element
    - Focus mode: click to freeze tooltip, click elsewhere to release
  - Works on touch (tap-and-hold or tap-to-focus)
- [ ] **Legends** — Interactive legend (click to toggle series on/off)
- [ ] **Zoom/Pan** — Optional zoom on time series; pan for large datasets
- [ ] **Focus Highlighting** — Dim non-hovered series (small-screen focus)
- [ ] **Dropdown Filters** — Select subset of series to display (configurable)
- [ ] **Annotations** — Add text boxes, arrows, highlights for context
- [ ] **Smooth data transitions** — Elements track their identity through data updates (e.g., bar for "A" smoothly moves to new position when data reorders)

#### Accessibility (WCAG 2.1 AA)
- [ ] Semantic HTML structure (use `<svg>` with proper `<text>` roles)
- [ ] ARIA labels for chart title, axes, series
- [ ] Alt text / text description support per chart
- [ ] Color-independent encoding (use patterns/texture in addition to color)
- [ ] Keyboard navigation (tab through interactive elements)
- [ ] High contrast mode support
- [ ] Focus indicators visible and clear
- [ ] Reduced motion support (disable animations if `prefers-reduced-motion`)

#### Export & Output
- [ ] SVG export with inline styles (no external CSS required)
- [ ] PNG download with configurable resolution
- [ ] Data table export (CSV option)
- [ ] Print-friendly styling

#### Composability & Extensibility
- [ ] **Named slots** for chart elements (title, legend, axes, annotations, footer)
- [ ] **Default content** for each slot (sensible defaults that work out-of-box)
- [ ] **Scoped slots** to pass data context back to consumers (for custom rendering)
- [ ] **Component composition** — break charts into composable pieces (Axes, Legend, Tooltip are independently usable)
- [ ] **Easy element customization** — add/remove/reorder chart elements via slot overrides
- [ ] No need to fork/copy library code for minor customizations

### 1.3 API Requirements

#### Component Structure
```
<Chart
  type="bar" | "line" | "column" | "scatter" | ...
  data={arrayOfObjects}
  config={chartConfig}
  theme={themeOverride?}
  on:tooltip={event}
  on:click={event}
  on:ready={event}
/>
```

#### Data Format (Core)
```typescript
// Minimal example
{
  data: [
    { category: "Jan", value: 100, group: "Region A" },
    { category: "Feb", value: 120, group: "Region A" },
    // ...
  ]
}

// With optional properties
{
  data: [
    {
      category: string | number | Date,
      value: number,
      group?: string,
      label?: string,
      ci_lower?: number,  // confidence interval
      ci_upper?: number,
      size?: number,      // for bubble/scatter
      x?: number, y?: number  // for scatter/2D
    },
    // ...
  ]
}
```

#### Config Object Shape
```typescript
{
  // Dimensions
  width?: number,          // default: container width
  height?: number,         // default: 400px
  margin?: { top, right, bottom, left },

  // Axes
  xAxis?: {
    label?: string,
    scale?: "linear" | "log" | "categorical" | "time",
    ticks?: number,
    format?: string,  // d3 format string (e.g., ".0f", "%")
  },
  yAxis?: {
    label?: string,
    scale?: "linear" | "log",
    min?: number,
    max?: number,
    ticks?: number,
    format?: string,
  },

  // Series
  seriesKey: string,      // property name for series grouping
  valueKey: string,       // property name for Y values
  categoryKey: string,    // property name for X categories/labels

  // Interactivity
  interactive?: {
    tooltip?: boolean,
    legend?: boolean,
    zoom?: boolean,
    dropdown?: boolean,
  },

  // Annotations (if applicable)
  annotations?: Annotation[],

  // Styling
  colorScheme?: "primary" | "secondary" | "highlight",
  showLegend?: boolean,
  legendPosition?: "top" | "bottom" | "right",
  showGridlines?: boolean,
  strokeWidth?: number,
}
```

#### Tooltip API
- **Default template:** Shows category, value, series name (if multi-series)
- **Styling:** ONS color palette, legible font, high contrast background
- **Slot override:** `slot="tooltip"` with scoped data access
- **Interaction modes:** Configurable behavior for dense datasets
  - `hover` (default) — hover directly over point
  - `guideline` — vertical/horizontal line follows cursor, shows all values at x-position
  - `snap` — cursor attracts to nearest data point within threshold
  - `click` — tap to freeze tooltip, tap elsewhere to clear
- **Touch support:** Tap-and-hold or tap-to-focus (not hover-dependent)
- **Non-intrusive:** Tooltip follows cursor, doesn't occlude data

```svelte
<!-- Default tooltip -->
<BarChart {data} config={{ tooltipMode: 'guideline' }} />

<!-- Custom tooltip -->
<BarChart {data}>
  <svelte:fragment slot="tooltip" let:item>
    <div class="custom-tooltip">
      <strong>{item.category}</strong>
      <p>Value: {item.value.toFixed(2)}</p>
      <p class="small">{item.info}</p>
    </div>
  </svelte:fragment>
</BarChart>
```

### 1.5 Data Identity & Transitions

#### Keyed Transitions (Critical for UX)

Every chart **must use identity-based keying** to track data elements smoothly:

```javascript
// Data updates
// Before: A: 10, B: 25, C: 35
// After:  B: 20, C: 30, A: 40

// ✅ CORRECT: Bar for "A" smoothly moves from position 0 to position 2
//             and transitions from height 10 to height 40
// ❌ WRONG:   Bar at position 0 stays put and just changes height from 10 to 20
```

#### Implementation Requirements
- [ ] **D3 join keyed by identity field** — `d.data().key(d => d[keyField])`
- [ ] **Svelte #each with key binding** — `#each data as item (item[keyField])`
- [ ] **Element persistence** — DOM elements linked to unique identifiers, not array indices
- [ ] **Smooth transitions** — Configurable duration & easing (default: 800ms, cubicInOut)
- [ ] **Position tracking** — When categories reorder, elements smoothly animate to new positions
- [ ] **Value transitions** — Heights/widths/sizes animate to new values
- [ ] **Series tracking** — Multi-series charts track each series by ID through reorderings

#### Slot Architecture
All charts support **named slots** for easy customization without forking:

```svelte
<BarChart {data} {config}>
  <!-- Custom title -->
  <svelte:fragment slot="title">
    <h2>My Custom Title</h2>
  </svelte:fragment>
  
  <!-- Custom legend -->
  <svelte:fragment slot="legend" let:series>
    <CustomLegend {series} />
  </svelte:fragment>
  
  <!-- Custom annotations -->
  <svelte:fragment slot="annotations">
    <Annotation x={50} y={100} text="Peak value" />
  </svelte:fragment>
</BarChart>
```

#### Available Slots (per chart type, as applicable)
- `title` — Chart title area
- `subtitle` — Subtitle/description
- `legend` — Legend (receives `series` data via let-binding)
- `axes` — Custom axis rendering (receives axis data)
- `tooltip` — Custom tooltip UI (receives hover data)
- `annotations` — Custom annotation overlays
- `footer` — Footer/source attribution

#### Component Composition
- [ ] **Standalone utilities** — Axes, Legend, Tooltip components can be used independently
- [ ] **Modular piece architecture** — Shared sub-components (Bar, Line, Area, Axis labels, etc.)
- [ ] **CSS customization points** — CSS custom properties for colors, fonts, spacing
- [ ] **Flexible data binding** — Pass Svelte stores or reactive variables; charts respond to updates

#### Example: Adding Custom Elements
```svelte
<!-- Use the library chart as-is -->
<ColumnChart {data} {config} />

<!-- Or customize it -->
<ColumnChart {data} {config}>
  <svelte:fragment slot="annotations">
    <!-- Add custom business logic annotation -->
    {#each annotations as ann}
      <text x={ann.x} y={ann.y}>📊 {ann.label}</text>
    {/each}
  </svelte:fragment>
</ColumnChart>
```

- [ ] **Color palette helpers**
  - `getPaletteColor(name, index)` — Fetch from ONS color schemes
  - `getContrastColor(bgColor)` — Ensure readable text color
- [ ] **Data transformation**
  - `pivotData(data, rowKey, colKey, valueKey)` — Pivot table format
  - `groupData(data, key)` — Group by category
  - `filterData(data, predicate)` — Filter rows
  - `aggregateData(data, groupKey, method)` — Sum, average, count
- [ ] **Format helpers**
  - `formatNumber(value, format)` — Currency, percentage, decimals
  - `formatDate(date, format)` — Locale-aware dates
- [ ] **Validation**
  - `validateChartConfig(type, config)` — Return errors if config invalid
  - `validateData(data, expectedShape)` — Ensure data format

---

## 2. Non-Functional Requirements

### 2.1 Performance

| Metric | Target |
|--------|--------|
| Initial render (1k rows) | <500ms |
| Initial render (10k rows) | <2s |
| Data update animation | <500ms transition |
| Hover/interaction response | <100ms |
| Bundle size (gzipped) | <200KB (entire library) |
| Memory footprint | <50MB for 10k rows + interactive state |
| Smooth framerate | 60 FPS during animations |

### 2.2 Browser Support

- [ ] Chrome (latest 2 versions)
- [ ] Firefox (latest 2 versions)
- [ ] Safari (latest 2 versions)
- [ ] Edge (latest 2 versions)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### 2.3 Accessibility Compliance

- [ ] **WCAG 2.1 AA** minimum standard
- [ ] Color contrast ratios ≥ 4.5:1 (normal text), ≥ 3:1 (large text)
- [ ] Keyboard navigation fully functional
- [ ] Screen reader compatible (tested with NVDA, JAWS, VoiceOver)
- [ ] Reduced motion respected
- [ ] Alt text / chart descriptions available
- [ ] Visual indicators not the only way to encode information

### 2.4 Mobile/Responsive Design

- [ ] Adapt to viewport widths: 320px, 480px, 768px, 1024px+
- [ ] Touch-friendly interactions (tap instead of hover)
- [ ] Readable font sizes at all breakpoints
- [ ] Legends reflow on small screens (stacked instead of side-by-side)
- [ ] Axes rotate/hide labels if space constrained
- [ ] SVG scalable without pixelation

### 2.5 Maintainability

- [ ] JavaScript throughout (vanilla JS, no TypeScript)
- [ ] JSDoc comments for all functions and components
- [ ] >80% test coverage
- [ ] Comprehensive inline comments where logic is non-obvious
- [ ] Consistent code style (ESLint + Prettier)
- [ ] Single-responsibility components
- [ ] Shared utilities library in `/lib/utils/` to reduce duplication
- [ ] Low barrier to entry for JS developers (follows existing svelte-charts pattern)
- [ ] **Modular internal structure** — each chart built from reusable sub-components
- [ ] **Clear slot API documentation** — how to extend each chart type

### 2.6 Styling Compliance

- [ ] All charts adhere to ONS service manual guidelines
- [ ] Color palettes from ONS official palette (no arbitrary colors)
- [ ] Typography: fonts, sizes, weights match ONS standards
- [ ] Spacing & margins consistent across chart types
- [ ] No visual inconsistencies between chart variants

---

## 3. Integration Requirements

### 3.1 Svelte Integration

- [ ] Works with **Svelte 5.x+** (leverages latest runes and reactivity)
- [ ] Reactive to Svelte stores (auto-update when store changes)
- [ ] Transitions & animations use Svelte's transition API
- [ ] SSR-compatible (renderToDOMString)
- [ ] Works in both SvelteKit app & lib environments

### 3.2 Build & Tooling

- [ ] ESM and CJS builds
- [ ] JSDoc comments for IDE hints (no .d.ts files needed)
- [ ] Svelte peer dependency (not bundled)
- [ ] D3 peer dependency (not bundled) or vendored selectively
- [ ] No heavy dependencies (keep import small)

### 3.3 Data Source Compatibility

- [ ] Accept plain JavaScript objects
- [ ] Work with Svelte stores
- [ ] Support async data loading (promises)
- [ ] Handle streaming data (real-time updates)

---

## 4. Constraints

### 4.1 Technology Stack

- **Runtime:** Svelte 5+
- **Visualization:** D3.js v6+ (follows ONS Charts repo standard)
- **Language:** JavaScript (vanilla, no TypeScript)
- **Styling:** CSS Modules + Svelte slots for customization (avoid inline styles where possible)
- **Testing:** Vitest + Playwright (visual regression)
- **Documentation:** Storybook + Markdown

### 4.2 Design Constraints

- **No jQuery, Bootstrap, or heavy UI frameworks** — keep it lightweight
- **No custom fonts in bundle** — rely on system fonts + ONS standards
- **SVG-only output** (not Canvas) — better for accessibility & styling
- **Modular architecture** — users should import only what they need
- **Low barrier to entry for JS developers** — follows existing svelte-charts pattern

### 4.3 Known Limitations & Trade-offs

- **Very large datasets (>100k rows)** may benefit from virtualization (not MVP)
- **3D charts** out of scope (2D only per ONS standards)
- **Maps/geographic visualizations** handled by separate Maps library
- **Custom D3 brushes** not exposed as first-class API (possible via config hack)

---

## 5. Quality Assurance

### 5.1 Testing

- [ ] **Unit tests** — Utility functions, data transforms, color palette helpers
- [ ] **Component tests** — Each chart type renders correctly with sample data
- [ ] **Integration tests** — Multiple charts on same page, Svelte store integration
- [ ] **Visual regression tests** — Snapshots of all chart variants
- [ ] **Transition tests** — Verify data reordering produces smooth, tracked animations
  - Test: Data reorders, bars smoothly move to new positions (not just swap values)
  - Test: Values transition smoothly while positions update
  - Test: Multiple rapid updates maintain element identity
- [ ] **Tooltip tests** — Verify all interaction modes work correctly
  - Test: Hover mode shows tooltip on direct hover
  - Test: Guideline mode shows vertical line + all values at x-position
  - Test: Snap mode attracts cursor to nearest point
  - Test: Click mode freezes/unfreezes tooltip
  - Test: Custom slot overrides default tooltip
  - Test: Touch interactions (tap-and-hold, tap-to-focus)
- [ ] **Accessibility tests** — axe-core automated + manual WCAG audit
- [ ] **Performance tests** — Benchmark render times for large datasets
- [ ] **E2E tests** — Interactions (tooltip, legend toggle, dropdown), export

### 5.2 Documentation

- [ ] **Getting started guide** — Installation, minimal example
- [ ] **API reference** — All props, events, methods documented
- [ ] **Chart type guides** — When/how to use each chart, example data
- [ ] **Theming guide** — How to customize colors, fonts, spacing
- [ ] **Slot API guide** — Named slots available per chart, with examples
- [ ] **Composition patterns** — How to add/customize elements, common use cases
- [ ] **Accessibility guide** — Best practices per chart type
- [ ] **Migration guide** — Upgrade path from svelte-charts
- [ ] **Storybook stories** — Interactive examples for all charts + variants + composition examples
- [ ] **WCAG compliance report** — Per-chart accessibility audit

### 5.3 Release Quality

- [ ] No breaking changes in minor/patch versions (semantic versioning)
- [ ] Changelog documents all additions, fixes, deprecations
- [ ] Deprecation warnings provided 2 versions before removal
- [ ] Automated publishing (npm) on version tag

---

## 6. Deliverables

### Phase 1 (MVP)
1. **Core Library Package**
   - 15 chart types (as listed in 1.1)
   - TypeScript support
   - ONS default theme
   - Basic interactivity (tooltip, legend, responsive)

2. **Documentation**
   - README with installation & quick start
   - API reference
   - Storybook with 5+ examples per chart type

3. **Accessibility & Quality**
   - WCAG 2.1 AA compliance per chart
   - >80% test coverage
   - Visual regression test suite

### Phase 2
1. Annotation system
2. Theme customization API
3. Dropdown/filtering UI components
4. Mobile optimization passes
5. Accessibility report + per-chart guidance

### Phase 3+
1. Export (SVG/PNG) functionality
2. Data transformation utilities
3. Composite charts (dual-axis, faceted grids)
4. Real-time data streaming optimizations

---

## 7. Success Criteria

- ✅ **All 15+ chart types** implemented and tested
- ✅ **Vanilla JavaScript throughout** with comprehensive JSDoc
- ✅ **WCAG 2.1 AA** compliance verified
- ✅ **Performance benchmarks** met (as per 2.1)
- ✅ **Bundle size** <200KB gzipped
- ✅ **80%+ test coverage**
- ✅ **Comprehensive documentation** in Storybook + markdown
- ✅ **Low barrier to entry** for JS developers
- ✅ **Zero breaking changes** in v1.x minor/patch releases
- ✅ **Developer satisfaction** >4/5 in beta feedback
