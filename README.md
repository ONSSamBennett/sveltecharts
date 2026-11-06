# SvelteCharts

A comprehensive, production-ready charts library for Svelte 5+ applications. Built for the UK Office for National Statistics (ONS), supporting 30+ chart types with smooth animations, accessibility-first design, and intuitive composition patterns.

**Status:** 🚧 MVP in active development

---

## 📋 What's in This Repository?

### Documentation
- **[USER_NEEDS.md](./USER_NEEDS.md)** — User personas, use cases, pain points, and desired outcomes
- **[REQUIREMENTS.md](./REQUIREMENTS.md)** — Complete technical specification for the MVP
- **[DECISION_LOG.md](./DECISION_LOG.md)** — Architectural and design decisions with rationale

### Project Structure (In Progress)
```
sveltecharts/
├── src/
│   └── lib/
│       ├── charts/          # Svelte chart components
│       ├── utils/           # JavaScript utilities (data transforms, helpers)
│       └── sub-components/  # Shared sub-components (Axis, Legend, Tooltip)
├── tests/                   # Unit, component, and integration tests
├── stories/                 # Storybook examples
├── docs/                    # Markdown guides (getting started, API, etc.)
└── README.md
```

---

## 🎯 MVP Phase (Phase 1)

The MVP includes **15+ chart types** and core features for production use:

### Chart Types
- Bar, Bar Stacked, Bar Clustered, Bar Grouped
- Column, Column Stacked with Line
- Line (single & multi-series), Line with CI Area
- Area Stacked
- Scatter/Bubble, Beeswarm, Heatmap, Slope, Waterfall, Population Pyramid

### Core Features
✅ **Smooth Data Transitions** — Elements track data identity through updates (e.g., bars smoothly move when ranking changes)  
✅ **Composable via Slots** — Customize title, legend, axes, tooltips, annotations without forking  
✅ **Accessible Tooltips** — Four interaction modes (hover, guideline, snap, click) for dense datasets  
✅ **Responsive Design** — Adapts to mobile and large screens  
✅ **WCAG 2.1 AA** — Accessibility compliance built-in  
✅ **ONS Branding** — Default ONS color palette and typography  
✅ **Vanilla JavaScript** — Low barrier to entry; works with JSDoc + IDE hints  

### Phase 2+ Enhancements
- Annotations system (text, arrows, highlights)
- Theme customization API
- Pie/Doughnut, Range, and other specialized charts
- Export to SVG/PNG
- Mobile optimization passes
- Comprehensive accessibility audit

---

## 🚀 Getting Started (Coming Soon)

### Installation
```bash
npm install sveltecharts
```

### Quick Example
```svelte
<script>
  import { BarChart } from 'sveltecharts';
  
  const data = [
    { category: 'Jan', value: 100, group: 'Region A' },
    { category: 'Feb', value: 120, group: 'Region A' },
  ];
  
  const config = {
    categoryKey: 'category',
    valueKey: 'value',
    seriesKey: 'group',
  };
</script>

<BarChart {data} {config} />
```

See [docs/GETTING_STARTED.md](./docs/GETTING_STARTED.md) (coming soon) for more examples.

---

## 📚 Documentation

### For Users
- **[Getting Started](./docs/GETTING_STARTED.md)** (coming soon) — Installation and minimal examples
- **[API Reference](./docs/API_REFERENCE.md)** (coming soon) — All props, events, methods
- **[Chart Types Guide](./docs/CHART_TYPES.md)** (coming soon) — When/how to use each chart
- **[Composition & Slots](./docs/COMPOSITION.md)** (coming soon) — Customize elements
- **[Theming](./docs/THEMING.md)** (coming soon) — Colors, fonts, spacing
- **[Accessibility Guide](./docs/ACCESSIBILITY.md)** (coming soon) — WCAG compliance per chart
- **[Migration from svelte-charts](./docs/MIGRATION.md)** (coming soon) — Upgrade guide
- **Storybook** (coming soon) — Interactive component explorer

### For Contributors
- **[DECISION_LOG.md](./DECISION_LOG.md)** — Architecture decisions with rationale
- **[Contributing Guide](./CONTRIBUTING.md)** (coming soon) — How to add new charts or features
- **[Dev Setup](./docs/DEV_SETUP.md)** (coming soon) — Local development environment

---

## 🏗️ Architecture Decisions

Key decisions made during planning:

| Decision | Details |
|----------|---------|
| **Language** | Vanilla JavaScript (no TypeScript) for low barrier to entry |
| **Svelte Target** | Svelte 5.x+ only (no backward compatibility) |
| **Tooltip Modes** | Four modes: hover, guideline, snap, click (accessibility focus) |
| **Data Keying** | Identity-based for smooth transitions through reorderings |
| **Composition** | Slot-based for easy customization |
| **Testing** | Vitest + Playwright for visual regression testing |
| **Accessibility** | WCAG 2.1 AA compliance required |

See **[DECISION_LOG.md](./DECISION_LOG.md)** for complete rationale and alternatives considered.

---

## 🧪 Testing & Quality

- **Unit Tests** — Utilities, data transforms, validation
- **Component Tests** — Chart rendering, props, reactivity
- **Visual Regression Tests** — All chart variants and compositions
- **Integration Tests** — Multiple charts, store integration
- **Accessibility Tests** — WCAG compliance verification
- **Performance Benchmarks** — Render time, memory, animations

Target: **>80% test coverage**

---

## 📊 Performance Targets

| Metric | Target |
|--------|--------|
| Initial render (1k rows) | <500ms |
| Initial render (10k rows) | <2s |
| Data update animation | <500ms transition |
| Bundle size (gzipped) | <200KB |
| Smooth framerate | 60 FPS |

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) (coming soon) for guidelines.

### Current Focus
- [ ] Set up build configuration (Rollup)
- [ ] Implement first chart: BarChart with identity keying
- [ ] Set up Storybook
- [ ] Write component tests

### Report Issues
Found a bug or have a feature request? Open an issue on GitHub.

---

## 📄 License

[License TBD]

---

## 📞 Questions?

- Check [REQUIREMENTS.md](./REQUIREMENTS.md) for technical details
- Check [USER_NEEDS.md](./USER_NEEDS.md) for use cases and personas
- Check [DECISION_LOG.md](./DECISION_LOG.md) for architectural decisions
- Open an issue or start a discussion on GitHub
