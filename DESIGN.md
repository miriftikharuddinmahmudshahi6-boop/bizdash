# Design Brief

## Purpose
Professional business intelligence dashboard for revenue tracking, user management, and daily operations monitoring. Data-dense admin UI optimized for clarity and trust.

## Tone
Refined industrialism—corporate precision meets subtle elegance. Deliberately restrained, functional, information-forward.

## Primary Differentiator
Constrained color palette (teal primary, warm accent for revenue, cool grays) with industrial typography. No gradients, no decorative motion—pure functional clarity inspired by Linear and Stripe.

## Palette

| Token | Light | Dark | Role |
|-------|-------|------|------|
| Background | 0.98 0 0 | 0.12 0 0 | Page & container backgrounds |
| Foreground | 0.2 0 0 | 0.92 0 0 | Primary text & content |
| Card | 0.96 0 0 | 0.16 0 0 | Elevated content surfaces |
| Primary (Teal) | 0.5 0.15 210 | 0.65 0.18 210 | Buttons, active states, primary actions |
| Accent (Warm) | 0.65 0.2 45 | 0.72 0.22 45 | Revenue highlights, growth indicators |
| Destructive | 0.55 0.22 25 | 0.65 0.19 22 | Delete, error states |
| Muted | 0.9 0 0 | 0.2 0 0 | Secondary, disabled states |
| Chart-1 (Warm) | 0.65 0.2 45 | 0.72 0.22 45 | Revenue, primary metric |
| Chart-2 (Teal) | 0.5 0.15 210 | 0.65 0.18 210 | Primary data series |
| Chart-3 (Cool) | 0.55 0.18 160 | 0.68 0.2 160 | Secondary data |
| Chart-4 (Gold) | 0.62 0.19 100 | 0.7 0.21 100 | Tertiary data |
| Chart-5 (Sage) | 0.72 0.16 70 | 0.78 0.18 70 | Quaternary data |

## Typography

| Role | Font | Size | Weight | Usage |
|------|------|------|--------|-------|
| Display | Fraunces (serif) | 32–48px | 600 | Page titles, KPI headers |
| Headline | Fraunces (serif) | 20–24px | 600 | Card titles, section headers |
| Body | DM Sans (sans-serif) | 14–16px | 400 | Content, labels, descriptions |
| Data | Geist Mono (monospace) | 12–14px | 400 | Revenue figures, transaction IDs, metrics |

## Elevation & Depth

- **Header**: `border-b border-border`, `bg-card`, no shadow
- **Sidebar**: `border-r border-sidebar-border`, `bg-sidebar`
- **Cards**: `shadow-card (0 1px 3px)`, `border border-border`, `bg-card`
- **Elevated**: `shadow-elevated (0 4px 12px)`, `bg-popover`, used for modals/dropdowns

## Structural Zones

| Zone | Background | Treatment | Density |
|------|------------|-----------|---------|
| Header | `bg-card` + border-b | Sticky, flex row with logo + nav + user menu | Sparse |
| Sidebar | `bg-sidebar` | Collapsible left nav, icon + label, active highlight with primary color | Medium |
| KPI Grid | `bg-background` | 4 cards in 2×2 grid (mobile: 1 col), `shadow-card`, label + large serif number + sparkline | High |
| Transactions | `bg-background` | Data table, row alternation with `bg-muted/5`, monospace figures | Very High |
| Charts | `bg-card` | 3-column layout (revenue trend, user growth, daily comparison), medium padding | Medium |
| Footer | `bg-muted/20` + border-t | Left-aligned copyright, right-aligned links | Sparse |

## Spacing & Rhythm

- **Gap**: 24px (containers), 16px (card grids), 12px (form fields)
- **Padding**: 32px (page), 20px (card), 16px (button)
- **Border-radius**: 8px (cards), 6px (buttons), 4px (inputs), 0 (data table cells)

## Component Patterns

- **Buttons**: Primary (teal bg, white text), Secondary (muted border), Destructive (red bg)
- **Inputs**: Muted border, focus ring in primary teal
- **Tables**: Monospace figures, subtle row hover, no full-row selection highlight
- **KPI cards**: Icon + label on top, serif number below, optional sparkline footer
- **Badges**: Semantic colors (green=success, red=error, blue=pending), small rounded pill

## Motion

- Smooth state transitions: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- No bounce, no overshoot
- Fade-in for modals (opacity 0→1 over 0.2s)

## Dark Mode
Dark is the primary design direction (UI optimized for dark first, light adapted). Teal becomes more saturated in dark mode for button contrast. Warm accent becomes slightly brighter for revenue emphasis.

## Constraints
- Maximum 3 colors per zone (primary, accent, neutral)
- Monospace for all numerical data
- No arbitrary hues, no rainbow gradients
- All shadows use black with opacity (no colored shadows)
- Sidebar navigation: icon + single-line label only (no breadcrumbs)
