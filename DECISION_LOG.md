# Development Decision Log

This document records significant architectural, technical, and design decisions made during the development of the Svelte Charts library. Each entry includes the decision, rationale, and date.

---

## Initial Setup & Architecture

### 1. Technology Stack: Vanilla JavaScript (No TypeScript)
**Date:** 2026-11-06  
**Status:** ✅ Decided  
**Decision:** Implement the library entirely in vanilla JavaScript with JSDoc comments for IDE support, rather than TypeScript.

**Rationale:**
- Most team members work in JavaScript; TypeScript creates a barrier to entry for contributors
- ONSdigital/svelte-charts (existing library) uses vanilla JS successfully
- JSDoc comments provide IDE hints and type safety without compilation overhead
- Keeps build process simpler and faster

**Alternatives Considered:**
- Full TypeScript: Better type safety but higher barrier to entry
- Hybrid approach: More complexity; harder to maintain

**Impact:**
- Faster onboarding for JS developers
- All utilities in `/src/lib/utils/` and components in `/src/lib/charts/` are `.js`/.svelte` only
- Reduces build complexity

---

### 2. Svelte Version: 5.x+ Only (No Backward Compatibility)
**Date:** 2026-11-06  
**Status:** ✅ Decided  
**Decision:** Target Svelte 5.x+ exclusively; no support for Svelte 3 or 4.

**Rationale:**
- Team is actively migrating toward Svelte 5
- Svelte 5 introduces runes, improved reactivity, and better composition patterns
- Supporting multiple major versions adds maintenance burden
- Allows use of latest Svelte features (runes, snippets)

**Impact:**
- Cleaner, more modern component API
- No need for backward-compatible patterns
- Users must upgrade to Svelte 5 to use this library

---

### 3. D3 Integration Strategy: TBD
**Date:** 2026-11-06  
**Status:** 🔄 Pending Decision  
**Decision Point:** Decide whether to use LayerCake (existing svelte-charts pattern) or pure D3 directly.

**Current Status:**
- Existing svelte-charts uses LayerCake as D3 wrapper
- New library might benefit from more direct D3 control for complex transitions and identity-keyed animations

**Next Steps:**
- Prototype first chart (BarChart) with both approaches
- Evaluate ease of use, performance, bundle size
- Make decision after first proof-of-concept

---

## Core Features

### 4. Tooltip API: Four Interaction Modes
**Date:** 2026-11-06  
**Status:** ✅ Decided  
**Decision:** Implement tooltips with four configurable interaction modes: `hover`, `guideline`, `snap`, and `click`.

**Rationale:**
- Dense datasets require non-hover interactions (accessibility requirement)
- Guideline mode shows all values at x-position (time-series friendly)
- Snap mode attracts cursor to nearest point (forgiving interaction)
- Click mode freezes tooltip (mobile-friendly, deliberate inspection)

**Implementation Details:**
- Default mode: `hover` (backward compatible with traditional charts)
- Configurable via `tooltipMode` in chart config
- Custom styling via `slot="tooltip"` override
- Touch-friendly (tap-and-hold, tap-to-focus)

**Impact:**
- Solves usability pain points in UC8 (dense data exploration)
- Improves accessibility for users with fine motor control issues

---

### 5. Identity-Keyed Data Transitions
**Date:** 2026-11-06  
**Status:** ✅ Decided  
**Decision:** All charts use identity-based keying to track elements smoothly through data updates.

**Rationale:**
- When data reorders (e.g., ranking changes), bars must smoothly animate to new positions
- Without proper keying, bars stay in positional order and only swap values (confusing UX)
- Svelte's `#each` with key binding + D3 join keying required

**Implementation Pattern:**
```javascript
// In chart component
#each data as item (item[keyField])
  // D3 join: .data(data).key(d => d[keyField])
```

**Configuration:**
- User specifies `keyField` in chart config (e.g., `keyField: "category"`)
- Transition duration & easing configurable
- Default: 800ms, cubicInOut easing

**Impact:**
- Smooth, intuitive animations for live-updating dashboards (UC7)
- Improves data storytelling and user understanding

---

### 6. Slot-Based Composition Architecture
**Date:** 2026-11-06  
**Status:** ✅ Decided  
**Decision:** All charts support named slots (title, subtitle, legend, axes, tooltip, annotations, footer) for composition without forking.

**Rationale:**
- Users need to customize individual chart elements for their apps
- Slots eliminate need to fork or copy library code
- Scoped slots allow consumers to access data context
- Follows Svelte best practices

**Available Slots (per chart type):**
- `title` — Chart title area
- `subtitle` — Subtitle/description
- `legend` — Interactive legend (receives series data)
- `axes` — Custom axis rendering
- `tooltip` — Custom tooltip UI
- `annotations` — Custom annotation overlays
- `footer` — Source attribution

**Impact:**
- Users can customize charts without deep CSS or component knowledge
- Reduces library version churn (fewer requests for new variants)
- Encourages community contributions

---

## MVP Scope

### 7. MVP Chart Types: 15+ Charts
**Date:** 2026-11-06  
**Status:** ✅ Decided  
**Decision:** MVP includes 15+ chart types (Phase 1 only); more added in Phase 2+.

**Phase 1 (MVP) Charts:**
1. Bar Chart (horizontal)
2. Bar Chart Stacked
3. Bar Chart Clustered
4. Bar Chart Grouped
5. Column Chart (vertical)
6. Column Chart Stacked with Line
7. Line Chart (single & multi-series)
8. Line Chart with CI Area
9. Area Stacked
10. Scatter Bubble Plot
11. Beeswarm
12. Heatmap
13. Slope Chart
14. Waterfall Chart
15. Population Pyramid

**Rationale:**
- Covers 80% of common ONS use cases
- More manageable scope for MVP
- Allows focus on quality, testing, and documentation

**Phase 2+ Charts:**
- Pie/Doughnut (lower priority in ONS work)
- Range Charts with confidence intervals
- Column Chart with CI Bands
- Line Chart SM Focus variants
- Advanced annotations

**Impact:**
- Focused, achievable MVP timeline
- Higher quality for core chart types
- Clear roadmap for Phase 2+ enhancements

---

## File Structure & Organization

### 8. Project Structure: `/src/lib/charts/`, `/src/lib/utils/`
**Date:** 2026-11-06  
**Status:** ✅ Decided  
**Decision:** Follow existing svelte-charts pattern:
- `/src/lib/charts/` — All Svelte components (.svelte files ONLY)
- `/src/lib/utils/` — All utility functions, helpers, data transforms (.js files)
- `/src/lib/sub-components/` — Shared sub-components (Axis, Legend, Tooltip, etc.)

**Rationale:**
- Proven pattern from existing svelte-charts library
- Team familiarity reduces onboarding friction
- Clear separation of concerns
- Easier to find and maintain code

**Naming Conventions:**
- Components: `BarChart.svelte`, `LineChart.svelte`, etc.
- Utilities: `groupData.js`, `validateConfig.js`, etc.
- Sub-components: `Axis.svelte`, `Legend.svelte`, `Tooltip.svelte`

**Impact:**
- Consistent with team's existing patterns
- Lower learning curve for new contributors

---

## Build & Tooling

### 9. Build System: Vite (Not Rollup)
**Date:** 2026-11-06  
**Status:** ✅ Decided  
**Decision:** Use Vite as the build system (not Rollup) for development and testing, with option to export as library.

**Rationale:**
- Vite provides faster development experience with HMR (hot module reload)
- Excellent Svelte support via @sveltejs/vite-plugin-svelte
- Built-in dev server perfect for testing components in real-time
- Library export possible via Vite config
- Simpler configuration than Rollup for team familiar with Vite

**Existing svelte-charts uses Rollup** for library build, but we're taking a modern approach with Vite for MVP development. We can revisit library packaging strategy in Phase 2.

**Build Outputs:**
- Dev: `npm run dev` — Vite dev server on http://localhost:5173
- Build: `npm run build` — Production-optimized output to `/dist/`
- Test: `npm run test` — Vitest component testing

---

### 10. Testing Framework: Vitest + Playwright
**Date:** 2026-11-06  
**Status:** ✅ Decided  
**Decision:** Use Vitest for unit/component tests + Playwright for E2E and visual regression testing.

**Rationale:**
- Vitest: Fast, Vite-native, great for component/utility testing
- Playwright: Visual regression testing for charts (critical for regression detection)
- Familiar to team, good integration with Svelte testing libraries

**Test Coverage Target:** >80% of utility functions and components

**Testing Strategy:**
- Unit tests: Utilities, data transforms, validation
- Component tests: Chart rendering, prop handling, reactivity
- Visual regression: All chart variants + composition patterns
- Integration tests: Multiple charts on page, store integration
- Transition tests: Verify identity-keyed animations work smoothly
- Accessibility tests: axe-core automated + manual WCAG audit

**Impact:**
- High-quality, maintainable code
- Confidence in chart rendering across browsers and scenarios

---

## Documentation

### 11. Documentation: Storybook + Markdown
**Date:** 2026-11-06  
**Status:** ✅ Decided  
**Decision:** Use Storybook for interactive component documentation + markdown files for guides and API reference.

**Documentation Structure:**
- `docs/GETTING_STARTED.md` — Installation and minimal example
- `docs/API_REFERENCE.md` — All props, events, methods
- `docs/CHART_TYPES.md` — When/how to use each chart
- `docs/COMPOSITION.md` — Slot API and customization examples
- `docs/THEMING.md` — Color palette, font, spacing overrides
- `docs/ACCESSIBILITY.md` — WCAG compliance per chart type
- `docs/MIGRATION.md` — Upgrade from svelte-charts
- Storybook stories (5+ examples per chart type, composition patterns)

**Rationale:**
- Storybook: Interactive, visual documentation; easier for designers/non-coders
- Markdown: Version-controlled, searchable, easy to review in PR

**Impact:**
- High-quality onboarding experience for new users
- Clear examples for each use case
- Easy to maintain alongside code

---

## Accessibility & Quality Standards

### 12. Accessibility Target: WCAG 2.1 AA
**Date:** 2026-11-06  
**Status:** ✅ Decided  
**Decision:** All charts meet WCAG 2.1 AA minimum standard (not AAA).

**Rationale:**
- WCAG 2.1 AA is industry standard for public sector (UK government)
- Covers 80% of accessibility needs
- AAA would add complexity for diminishing returns

**Compliance Areas:**
- Color contrast: ≥4.5:1 (normal), ≥3:1 (large)
- Keyboard navigation: Full support
- Screen reader: Semantic HTML, ARIA labels
- Reduced motion: Respect `prefers-reduced-motion`
- Alt text / chart descriptions: Available

**Impact:**
- Charts accessible to users with disabilities
- Aligns with ONS policy and UK government standards
- Better SEO and user experience

---

## Performance Targets

### 13. Performance Benchmarks
**Date:** 2026-11-06  
**Status:** ✅ Decided  
**Decision:** Target the following performance metrics.

**Targets:**
| Metric | Target |
|--------|--------|
| Initial render (1k rows) | <500ms |
| Initial render (10k rows) | <2s |
| Data update animation | <500ms transition |
| Hover/interaction response | <100ms |
| Bundle size (gzipped) | <200KB (entire library) |
| Memory footprint | <50MB for 10k rows + interactive state |
| Smooth framerate | 60 FPS during animations |

**Rationale:**
- Ensures charts feel responsive and snappy
- Large datasets (10k rows) common in ONS work
- Mobile users expect fast interactions

**Verification:**
- Benchmark tests in CI/CD pipeline
- Real-world testing with sample datasets
- Performance profiling during development

**Impact:**
- Production-ready performance
- Good user experience on various hardware
- Competitive with commercial charting libraries

---

## Known Decisions to Revisit

### Decision Points for Later:
1. **D3 vs LayerCake** (Decision #3) — Decide after first chart prototype
2. **Build system** (Decision #9) — Evaluate Rollup vs SvelteKit, decide in Week 1
3. **Tooltip snap threshold** — What pixel distance should "snap" activate? (recommend 40px, TBD)
4. **Large dataset optimization** — When to virtualize (>100k rows)? Defer to Phase 3+
5. **Export formats** — Priority order for SVG/PNG download? Defer to Phase 2

---

## Version History

- **v0.1.0** (2026-11-06) — Initial decision log created; decisions 1-13 finalized
