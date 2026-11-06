# Svelte Charts Library - User Needs

## Overview
This document captures the user-centered requirements and pain points that drive the development of an expanded, production-ready Svelte charts library for ONS data visualization work.

---

## User Personas

### 1. **Data Analyst**
- Creates statistical visualizations for ONS publications
- Needs quick, reliable chart creation with minimal configuration
- Works across multiple chart types in a single publication
- Requires consistency with ONS brand guidelines
- Priority: Speed, ease-of-use, pre-configured styling

### 2. **Web Developer/Frontend Engineer**
- Integrates charts into Svelte-based web applications
- Needs flexibility, customization options, and TypeScript support
- Requires clear API documentation and examples
- Works with reactive data that changes frequently
- Priority: API clarity, customization depth, performance

### 3. **Data Journalist/Communications Specialist**
- Uses charts to tell data-driven stories
- Needs a wide range of visualization types to communicate different insights
- Requires annotations and context-setting features
- Wants professional, publication-ready output
- Priority: Chart variety, annotation capability, accessibility

### 4. **UX/Design Specialist**
- Ensures ONS brand consistency and accessibility standards
- Reviews charts for visual hierarchy and readability
- Needs theming and color palette management
- Priority: Compliance, visual polish, theme consistency

---

## Use Cases

### UC1: Quick Dashboard Creation
**Actor:** Data Analyst  
**Goal:** Create a multi-chart dashboard showing quarterly performance metrics without writing custom styling code  
**Current Pain:** Existing svelte-charts library is limited; need to write custom D3 for advanced charts  
**Success Criteria:** 
- Dashboard with 5+ different chart types renders in <15 min
- All charts automatically adopt ONS styling
- Requires no CSS overrides

### UC2: Dynamic Data with Real-Time Updates
**Actor:** Web Developer  
**Goal:** Display live-updating data (e.g., unemployment figures) with smooth transitions between data states  
**Current Pain:** Performance degrades with large datasets; state management integration unclear  
**Success Criteria:**
- Render 10k+ data points with <2s initial load
- Smooth transitions when data updates reactively
- No memory leaks after 100+ updates

### UC3: Complex Multi-Series Visualization
**Actor:** Data Journalist  
**Goal:** Create a line chart showing COVID cases, hospitalization, and deaths over time with confidence intervals  
**Current Pain:** Must manually layer multiple D3 visualizations or customize heavily  
**Success Criteria:**
- Multi-series chart with confidence bands in <5 min config time
- Tooltips and legends auto-generated
- Ready for publication without tweaks

### UC4: Comparative Analysis Chart
**Actor:** Data Analyst  
**Goal:** Compare regional unemployment across three time periods side-by-side (grouped/clustered bars)  
**Current Pain:** Limited bar chart variations available  
**Success Criteria:**
- Support for 5+ bar chart configurations
- Automatic axis scaling across comparisons
- Clear labeling and differentiation between groups

### UC5: Accessibility Compliance Audit
**Actor:** UX/Design Specialist  
**Goal:** Verify all charts meet WCAG 2.1 AA standards  
**Current Pain:** No accessibility reports or guidance  
**Success Criteria:**
- WCAG compliance documentation per chart type
- Semantic HTML and ARIA labels auto-generated
- Color contrast verified against standards

### UC6: Branded Publication Suite
**Actor:** Communications Specialist  
**Goal:** Produce 20-chart publication with ONS branding, custom annotations, and data source callouts  
**Current Pain:** Manual styling for each chart; inconsistent fonts, colors, margins  
**Success Criteria:**
- Single theme config applies to all charts
- Annotation API for adding context boxes, arrows, footnotes
- Export-ready without manual design polish

### UC7: Live-Updating Dashboard with Smooth Transitions
**Actor:** Web Developer  
**Goal:** Display real-time data (e.g., election results) where ranking and values update continuously  
**Current Pain:** Elements don't transition smoothly; bar for candidate A stays in position 0 even when they drop to rank 3  
**Success Criteria:**
- Each data element (candidate, region, etc.) maintains its identity
- Elements smoothly animate to new positions when rankings change
- Values transition smoothly without visual confusion
- Works with 100+ rapid updates without lag

### UC8: Exploring Dense Data with Accessible Tooltips
**Actor:** Data Analyst  
**Goal:** Inspect a scatter plot with 500+ data points without needing pixel-perfect hovering  
**Current Pain:** Tiny tooltips are hard to trigger; have to hover directly over small points; on mobile, nearly impossible  
**Success Criteria:**
- Multiple tooltip modes (hover, guideline crosshair, snap-to-nearest, click-to-freeze)
- Vertical/horizontal guideline shows all values at a given x/y position
- Snap mode attracts cursor to nearest point within reasonable distance
- Works seamlessly on touch devices
- Customizable tooltip styling via slot

### UC8: Exploring Dense Data with Accessible Tooltips
**Actor:** Data Analyst  
**Goal:** Inspect a scatter plot with 500+ data points without needing pixel-perfect hovering  
**Current Pain:** Tiny tooltips are hard to trigger; have to hover directly over small points; on mobile, nearly impossible  
**Success Criteria:**
- Multiple tooltip modes (hover, guideline crosshair, snap-to-nearest, click-to-freeze)
- Vertical/horizontal guideline shows all values at a given x/y position
- Snap mode attracts cursor to nearest point within reasonable distance
- Works seamlessly on touch devices
- Customizable tooltip styling via slot

---

## Pain Points & Barriers

### Current Limitations (vs. existing svelte-charts)
1. **Limited Chart Diversity** — Only basic charts (bar, line); missing population pyramids, beeswarms, waterfalls, range charts, heatmaps
2. **Inconsistent Styling** — No built-in ONS branding; manual color/font management
3. **No Annotation Support** — Cannot add explanatory text, arrows, or highlights to data
4. **Performance Unknown** — Unclear behavior with 10k+ data points
5. **Poor Mobile Support** — Existing library doesn't adapt to small screens; "sm" (small) variants needed

### Gaps vs. ONS Charts Repository
1. **Fragmented Codebase** — ONS Charts are D3-based templates; hard to maintain consistency in a Svelte ecosystem
2. **Reusability Issues** — Each chart is a standalone template; little shared infrastructure
3. **Documentation Gaps** — Guidelines exist but no Svelte-specific integration docs

### Developer Experience Issues
1. **Unclear Data Formats** — What shape should input data take?
2. **No TypeScript Support** — Type safety would reduce errors
3. **Theme Customization Opaque** — How to override colors for specific use cases?
4. **Reactive Data Binding** — Unclear how to wire Svelte stores to chart data

---

## Desired Outcomes

### Immediate (MVP)
- ✅ Support **15+ chart types** (bar, column, line, area, pie, doughnut, scatter, line with CI, bar with dropdown, beeswarm, heatmap, slope, waterfall, range charts, population pyramid)
- ✅ **Full JavaScript support** with clear, well-documented APIs
- ✅ **ONS styling baked-in** — no manual configuration needed for brand compliance
- ✅ **Small-screen variants** ("sm" versions for responsive design)
- ✅ **Responsive & performant** — 10k+ data points, smooth animations
- ✅ **Composable charts** — easy to add/remove/customize elements via slots

### Phase 2
- 📝 **Annotation system** — Add context, arrows, highlights, footnotes
- 📊 **Theme customization** — Color palette overrides, font/margin config
- ♿ **Accessibility report** — WCAG compliance per chart + guidance
- 🎯 **Dropdown & filtering UI** — Interactive controls built-in
- 📱 **Mobile optimizations** — Touch interactions, responsive legends
- 🧩 **Advanced composition** — Scoped slots for data-driven customization
- 🎬 **Chart morphing transitions** — Smooth animated transitions between chart types (e.g., bars → dots when switching from BarChart to ScatterChart); same data elements maintain identity throughout

### Phase 3+
- 🔄 **Export formats** — SVG/PNG download with full styling
- 📊 **Data transformation helpers** — Built-in utilities for pivoting, grouping data
- 🧩 **Composite charts** — Stacked line + bar, dual axes, faceted grids
- 📡 **Real-time streaming** — Optimized updates for live data
- 🎨 **Chart builders** — Drag-and-drop / config UI for rapid customization

---

## Success Metrics

1. **Adoption** — Library used in 80%+ of new ONS web visualizations within 6 months
2. **Satisfaction** — Developer satisfaction score >4.0/5.0
3. **Time Savings** — Chart creation takes <30 min (vs. 2+ hours manually)
4. **Quality** — 100% charts meet WCAG AA; brand consistency across publications
5. **Performance** — All chart types render 10k+ points in <2s on standard laptop
6. **Coverage** — Support for all chart types in ONS Charts repository
7. **Smooth Transitions** — Data reorderings produce smooth, tracked animations (no visual confusion)
