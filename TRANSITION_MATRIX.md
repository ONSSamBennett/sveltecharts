# Chart Transition Matrix

**Based on:** AniVis research (Li et al., 2021) — "Generating Animated Transitions Between Statistical Charts with a Tree-Based Model"

**Purpose:** Define which chart-to-chart transitions are viable in Phase 2+ and what transition mechanisms should be used for each.

## Overview

Chart morphing transitions (Phase 2+) require careful consideration of the underlying data schema, visual encoding changes, and mark morphing complexity. The AniVis paper provides a framework for classifying transitions based on:

1. **Data schema compatibility** — Do both charts represent the same data dimensions/measures?
2. **Mark morphing complexity** — How easily can visual marks (paths) transform between chart types?
3. **Axis and legend changes** — Do axes need to be rescaled, hidden/shown, or reoriented?

## Chart Types Included

This matrix covers the MVP chart types:

- **BarChart** (horizontal bars, single/stacked/grouped/clustered)
- **ColumnChart** (vertical bars, single/stacked/grouped/clustered)
- **LineChart** (single/multi-series, with optional CI area)
- **AreaChart** (stacked areas, with optional CI)
- **ScatterChart** (2D points with optional size/color encoding)
- **BubbleChart** (3D scatter: x, y, size, color)
- **BeeswarmChart** (collision-avoiding points)
- **HeatmapChart** (2D matrix with color encoding)
- **SlopeChart** (change between two time points)
- **WaterfallChart** (cumulative flow)
- **PopulationPyramid** (mirrored bars)
- **RangeChart** (ranges with optional CI bands)

---

## Transition Matrix

Format: **Source → Target = [Feasibility | Mark Morphing | Complexity | Notes]**

### ✅ Recommended Transitions (Low-to-Medium Complexity)

These transitions are **well-suited for Phase 2** implementation because:
1. Data schema compatibility is high
2. Mark morphing is geometrically straightforward
3. User mental model is preserved

#### Bar ↔ Column Transitions

| Transition | Feasibility | Mark Morphing | Complexity | Mechanism | Notes |
|-----------|-------------|---------------|-----------|-----------|----|
| **Bar → Column** | ✅ Highly Viable | Rotate (90°) | Low | Path rotation + axis reorientation | Bars stay as rectangular paths, axes swap roles |
| **Column → Bar** | ✅ Highly Viable | Rotate (90°) | Low | Path rotation + axis reorientation | Same as above, reversed |
| **Bar → Bar (Stacked)** | ✅ Highly Viable | Reposition + Restack | Low-Medium | Position → Stack transformation | Requires bar reordering and stacking logic |
| **Column (Stacked) → Column (Single)** | ✅ Highly Viable | Unstack + Reposition | Low-Medium | Unstack transformation | Bars move outward/inward to ungrouped positions |

#### Line ↔ Area Transitions

| Transition | Feasibility | Mark Morphing | Complexity | Mechanism | Notes |
|-----------|-------------|---------------|-----------|-----------|----|
| **Line → Area (Stacked)** | ✅ Highly Viable | Extend path downward | Low | Path morphing (add lower boundary) | Line becomes area by closing path to baseline |
| **Area (Stacked) → Line** | ✅ Highly Viable | Remove lower boundary | Low | Path morphing (remove lower boundary) | Area collapses to center line |
| **Line (Single) → Line (Multi-series)** | ✅ Highly Viable | Duplicate + Reposition | Low | Data filtering by parent app | Chart receives new data, smoothly renders new lines |

#### Bar / Column ↔ Scatter / Bubble Transitions

| Transition | Feasibility | Mark Morphing | Complexity | Mechanism | Notes |
|-----------|-------------|---------------|-----------|-----------|----|
| **Bar → Scatter** | ✅ Highly Viable | Compress bar → dot | Medium | Bar path compresses to circle-shaped path | Requires remapping categorical X axis to scatter X |
| **Column → Bubble** | ✅ Highly Viable | Bar → dot + size encoding | Medium | Bars become circles sized by value, with color encoding | Y-axis value maps to position; original value maps to size |
| **Scatter → Column** | ✅ Highly Viable | Dots → bars | Medium | Points aggregate/group into bars by category | Reverse of scatter → column |

#### Multi-Series Composition Transitions

| Transition | Feasibility | Mark Morphing | Complexity | Mechanism | Notes |
|-----------|-------------|---------------|-----------|-----------|----|
| **Bar (Grouped) → Bar (Stacked)** | ✅ Highly Viable | Reposition + Restack | Medium | Grouped bars shift to stacked positions | Data schema unchanged; visual layout changes |
| **Column (Clustered) → Column (Stacked)** | ✅ Highly Viable | Reposition + Restack | Medium | Same as above | X-axis scale may need adjustment |
| **Area (Single) → Area (Stacked)** | ✅ Highly Viable | Separate → Stack | Medium | Lines reposition to stacked layers | Requires path offset calculation |

---

### ⚠️ Possible Transitions (Medium-to-High Complexity)

These transitions **may be implemented in Phase 2** but require careful design:
1. Data schema changes may require intermediate steps
2. Mark morphing is geometrically complex or unclear
3. Semantic change requires staged animation

#### Range Charts

| Transition | Feasibility | Mark Morphing | Complexity | Mechanism | Notes |
|-----------|-------------|---------------|-----------|-----------|----|
| **Range (Arrow) → Range (Bar)** | ⚠️ Possible | Modify arrow shape | Medium | Arrow endpoints morph into bar | Requires custom shape interpolation |
| **Column with CI → Column with Range** | ⚠️ Possible | Add range bands | Medium-High | Confidence interval bands transform into range visualization | Axis scaling may shift |
| **Range → Column** | ⚠️ Possible | Range compresses | High | Range contracts to single value (assume point estimate) | Information loss; unclear semantic |

#### Slope & Drill-Down Transitions

| Transition | Feasibility | Mark Morphing | Complexity | Mechanism | Notes |
|-----------|-------------|---------------|-----------|-----------|----|
| **Slope → Column** | ⚠️ Possible | Points → bars | Medium-High | Slope endpoints become bar tops; add baseline | Requires mid-point positioning logic |
| **Bar → Slope** | ⚠️ Possible | Bars → connecting lines | Medium-High | Bars transform into slope segments between two time points | Requires time-point reduction (aggregate or select) |
| **Waterfall → Column** | ⚠️ Possible | Waterfall segments → bars | High | Waterfall tiers flatten into single-level bars; totals merge | Information loss; semantic mismatch |

#### Heatmap Transitions

| Transition | Feasibility | Mark Morphing | Complexity | Mechanism | Notes |
|-----------|-------------|---------------|-----------|-----------|----|
| **Heatmap → Scatter** | ⚠️ Possible | Cells → dots | Medium-High | Heatmap cells become scatter points; color → size or vice versa | Requires 2D→2D or 2D→3D remapping |
| **Heatmap → Column** | ⚠️ Possible | Grid → bars | High | Heatmap cells aggregate into bar heights; rows/columns collapse | Information loss; semantic shift |

#### Population Pyramid Transitions

| Transition | Feasibility | Mark Morphing | Complexity | Mechanism | Notes |
|-----------|-------------|---------------|-----------|-----------|----|
| **Population Pyramid → Column (Stacked)** | ⚠️ Possible | Mirror → Side-by-side | High | Pyramid unfolds into paired stacked columns | Axis rotation + layout flip |
| **Population Pyramid → Area** | ⚠️ Possible | Bars → areas | Medium-High | Mirrored bars become mirrored areas | Preserves pyramid visual metaphor better |

#### Beeswarm Transitions

| Transition | Feasibility | Mark Morphing | Complexity | Mechanism | Notes |
|-----------|-------------|---------------|-----------|-----------|----|
| **Beeswarm → Scatter** | ⚠️ Possible | Rearrange points | Medium | Points transition from collision-avoiding layout to scatter plot grid | Visual difference minor (rearrangement, not morphing) |
| **Beeswarm → Box Plot** | ⚠️ Possible | Aggregate → Distribution | High | Beeswarm aggregates into quartile visualization | Information loss (individual points → summary stats) |

---

### ❌ Not Recommended (High Complexity / Semantic Mismatch)

These transitions are **not suitable for Phase 2** because:
1. Data schema is fundamentally different
2. Mark morphing is geometrically meaningless or confusing
3. Semantic shift is too large (viewers will struggle to follow)

#### Pie / Doughnut Transitions

| Transition | Feasibility | Mark Morphing | Complexity | Rationale |
|-----------|-------------|---------------|-----------|----|
| **Pie ↔ Any Other Chart** | ❌ Not Recommended | Pie slices → marks | Very High | Pie represents part-to-whole (implicit axis); other charts have explicit axes. Transition obscures semantic change. |
| **Doughnut ↔ Pie** | ⚠️ Possible | Modify center radius | Low | Close enough; same data schema |

#### Aggregation / Disaggregation Transitions

| Transition | Feasibility | Mark Morphing | Complexity | Rationale |
|-----------|-------------|---------------|-----------|----|
| **Bar (Aggregated) → Scatter (Disaggregated)** | ❌ Not Recommended | Bar → point cloud | Very High | Requires drill-down intermediate step. Single-step morph loses data fidelity. |
| **Column (Sum) → Waterfall (Decomposed)** | ❌ Not Recommended | Bar → stacked segments | Very High | Semantic shift from aggregate to components; requires staged animation with intermediate steps. |

#### Multi-Dimensional Schema Changes

| Transition | Feasibility | Mark Morphing | Complexity | Rationale |
|-----------|-------------|---------------|-----------|----|
| **2D Heatmap → 3D Bubble** | ❌ Not Recommended | Grid cells → spheres | Very High | Dimension addition changes data schema fundamentally; no clear mark correspondence. |
| **Line (1D series) → Heatmap (2D matrix)** | ❌ Not Recommended | Line → grid | Very High | Adds dimension; requires data aggregation/reorganization; unclear mark mapping. |

---

## Implementation Guidance for Phase 2

### For Recommended Transitions (✅)

1. **Build shape morphing functions** for each mark type:
   - `morphBarToScatter()` — bar path → circle path
   - `morphLineToArea()` — line path → area path (add lower boundary)
   - `morphRotation(path, angle, duration)` — rotate path (for bar ↔ column)

2. **Pre-compute intermediate scales**:
   - When source chart X axis is categorical and target is numeric (or vice versa), compute intermediary scale values
   - Example: Bar chart X axis (categories) → Scatter chart X axis (numeric range)

3. **Preserve element identity** throughout:
   - Each data point maintains `data-key` through transformation
   - Transition should show continuous motion from source position to target position

4. **Test user comprehension**:
   - Formative study with users to verify transition sequences are intuitive
   - Follow AniVis principles: stage complex transitions into multiple steps if needed

### For Possible Transitions (⚠️)

1. **Implement staged transitions** (following AniVis):
   - Break transitions into logical steps (e.g., "aggregate data" → "morph marks" → "rescale axes")
   - Order steps to minimize cognitive load
   - Allow configurable timing/sequencing

2. **Intermediate chart types**:
   - For Bar → Slope: intermediate step might show grouped column with two data points
   - For Waterfall → Column: intermediate step unwinds waterfall to show individual bar contributions

3. **Explicit user confirmation**:
   - These transitions might feel "wrong" to users; provide explanatory annotations
   - Document the transition rationale in chart labels

### For Not Recommended Transitions (❌)

1. **Do not implement direct morphing** in Phase 2
2. **Instead, offer static multiple view** (side-by-side charts)
3. **Document in blog posts** why certain transitions aren't supported
4. **Future work**: Interactive "guided" transitions with intermediate explanations

---

## Data Schema Compatibility Rules

### Rule 1: Same Dimension/Measure Structure

**Viable transitions** preserve the data schema structure (tree model).

```
Source: dimensions=[Year, Brand], measure=Sales
Target: dimensions=[Year, Brand], measure=Sales
→ ✅ Viable (visual layout can change, data doesn't)
Example: Bar(grouped) → Column(stacked) — same data, different layout
```

```
Source: dimensions=[Year, Brand], measure=Sales
Target: dimensions=[Year, Brand], measures=[Sales, Profit]
→ ⚠️ Possible (add measure requires staged transition)
Example: Column → Line (overlaid) — requires legend/color update
```

```
Source: dimensions=[Year, Brand], measure=Sales
Target: dimensions=[Year], measure=Sales
→ ⚠️ Possible (remove dimension via aggregation/merge)
Example: Column(by Brand) → Column(totals) — requires merge step
```

### Rule 2: Mark Correspondence

**Viable marks** have clear geometric correspondence.

```
✅ Bar ↔ Column — rotate 90°
✅ Line ↔ Area — add/remove lower boundary
✅ Bar → Scatter — compress/expand (paths remain path-based)
⚠️ Slope ↔ Column — endpoint correspondence unclear without intermediate
❌ Pie ↔ Bar — no axis alignment, fundamentally different encoding
```

### Rule 3: Axis Compatibility

**Axis transitions** are simpler when:
- Both charts have same axis type (both categorical X, both numeric Y)
- Axis roles can swap (bar → column)
- Axis scale ranges are similar (or require simple rescaling)

```
✅ Bar (categorical X, numeric Y) → Column (numeric X, categorical Y) 
   — Axes rotate 90°, scale compatibility high

⚠️ Line (temporal X, numeric Y) → Scatter (numeric X, numeric Y)
   — X axis type changes (temporal → numeric), requires scale remapping

❌ Pie (no axis) → Line (temporal X, numeric Y)
   — Pie has no axes, addition of axes is semantic mismatch
```

---

## Example Transition Sequences (Following AniVis Principles)

### Example 1: Column(Single) → Column(Stacked)

**Data Schema:** Same (both have Year, Brand, Sales)  
**Complexity:** Low  
**Stages:**

1. **Ungroup bars** — Column(clustered) bars move to common X position
2. **Stack bars** — Bars reposition vertically, stacking on each other
3. **Update legend** — Legend updates to show stacking order (optional)

**Animation Duration:** ~800ms (grouped + stacking animations)

### Example 2: Bar(Grouped) → Scatter

**Data Schema:** Different (Bar has dimensions=[Category, Series]; Scatter has dimensions=[Category, Series] + numeric encodings)  
**Complexity:** Medium  
**Stages:**

1. **Prepare scale remapping** — Compute scatter axes (X from category, Y from value)
2. **Morph marks** — Grouped bars shrink and reshape into circular paths (one per data point)
3. **Reposition** — Circles move to scatter plot positions
4. **Update axes** — X axis label style changes (category → numeric), Y axis relabels
5. **Update legend** — Series colors maintained, shape changes indicated

**Animation Duration:** ~1200ms (mark morphing + repositioning)

### Example 3: Column → Slope (Staged, NOT Direct Morph)

**Data Schema:** Different (Column: dimensions=[Year]; Slope: dimensions=[Year1, Year2])  
**Complexity:** High  
**Stages (Recommended):**

1. **Filter/select years** — Column smoothly animates to show only two years (data filtering by parent)
2. **Reposition** — Two bars shift to left and right positions
3. **Morph marks** — Bars compress into circle-shaped paths at their values
4. **Connect** — Line/path connects the two circles
5. **Finalize** — Slope chart styling (remove intermediate axis ticks, adjust labels)

**Animation Duration:** ~1500ms (multiple sequential stages)

**Note:** This is more complex and should probably NOT be in Phase 2. Better to show side-by-side views in Phase 1 and reconsider in Phase 3.

---

## Recommendations for Implementation

### Phase 2 MVP (Recommend Starting With These)

Focus on **✅ Recommended** transitions:
1. Bar ↔ Column (orientation swap)
2. Bar/Column ↔ Scatter (mark compression)
3. Line ↔ Area (boundary morphing)
4. Bar (grouped) ↔ Bar (stacked) (repositioning)

### Phase 2 Extended (If Time Permits)

Add **⚠️ Possible** transitions:
1. Range (Arrow) → Range (Bar) — if range annotations are used
2. Beeswarm → Scatter — low complexity, good educational value
3. Column → Slope — with staged animation

### Phase 3+ (Future Work)

- Advanced staging with intermediate explanations
- Guided transitions for semantic changes (aggregation/disaggregation)
- User study validation (following AniVis methodology)

---

## References

Li, W., Wang, Y., Huang, H., Cui, W., Zhang, H., Qu, H., & Zhang, D. (2021). **AniVis: Generating Animated Transitions Between Statistical Charts with a Tree-Based Model**. *IEEE Transactions on Visualization and Computer Graphics*, 2106.14313. https://arxiv.org/abs/2106.14313

### Key Concepts from AniVis

1. **Tree-based data model** — Charts represented as hierarchical trees of dimensions → measures
2. **Transition units** — Atomic operations: Add/Remove Dimension, Add/Remove Series, Add/Remove Data Item, Sort, Value Change, Morph, Rescale Axis
3. **Staged animation** — Break complex transitions into multiple sequential stages for clarity
4. **Data change units** — 12 types identified (dimension, measure, series, data item operations)
5. **Visual change units** — Axis rescaling, legend updates, chart type morphing

---

## Decision Log

**Decision D6: Chart Transition Matrix Based on AniVis Research**

**Status:** Recorded, pending implementation (Phase 2+)

**Summary:**
- Created transition matrix with feasibility guidance for all MVP chart types
- Recommended ✅ low-complexity transitions for Phase 2 implementation
- Documented ⚠️ medium-complexity transitions requiring staged animation
- Marked ❌ high-complexity transitions as not suitable for Phase 2
- Established data schema compatibility rules for determining viable transitions
- Provided example staged transition sequences following AniVis principles

This matrix will guide development decisions during Phase 2 morphing implementation.
