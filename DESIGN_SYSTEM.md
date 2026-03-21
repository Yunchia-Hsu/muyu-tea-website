# Muyu Design System

> React + TypeScript · Tea ceremony course platform · Lightweight design system extracted from a production SPA

---

## 1. Design Tokens

Tokens are defined as CSS custom properties in `src/styles/global.css` — the single source of truth for all visual decisions.

### Color

| Token                | Value     | Usage                  |
|----------------------|-----------|------------------------|
| `color-brand-dark`   | `#2f2a26` | Buttons, headings, nav |
| `color-brand-mid`    | `#6f6a64` | Secondary text, hover  |
| `color-surface-base` | `#eae1d6` | Page background        |
| `color-surface-card` | `#fffcf2` | Card / panel background|
| `color-border-light` | `#e0d8cf` | Borders, input outlines|
| `color-border-dark`  | `#504141` | Focus state            |
| `color-text-primary` | `#1a1a1a` | Body text              |
| `color-text-muted`   | `#969797` | Placeholder, disabled  |
| `color-feedback-error`| `#cc3333` / `#ffeeee` | Error text / background |
| `color-feedback-success`| `#2e7d32` / `#e8f5e9` | Success text / background |

Warm earthy tones reinforce the brand; red/green are reserved exclusively for feedback states.

### Typography · Spacing · Other

| Category    | Tokens                                                               |
|-------------|----------------------------------------------------------------------|
| Font family | `"Inter", system-ui, sans-serif`                                     |
| Font size   | `48 / 40 / 32 / 28 / 18 / 16 / 14 / 12px` (display → xs)             |
| Font weight | `400 / 500 / 600 / 700` (regular → bold)                             |
| Spacing     | `4 / 8 / 12 / 16 / 20 / 32 / 40px` (space-1 → space-7)               |
| Border radius| `8px sm · 12px md · 20px lg · 999px pill`                           |
| Shadow      | `sm 0 3px 8px · md 0 4px 12px · lg 0 8px 24px rgba(0,0,0,0.10–0.15)` |
| Breakpoints | `480px mobile · 768px tablet`                                        |

---

## 2. Component Library

### CourseCard
Image card used in the carousel. Two size variants control dimensions and opacity.

| Prop | Type | Default |
|------|------|---------|
| `src` | `string` | required |
| `alt` | `string` | required |
| `size` | `"small" \| "large"` | `"small"` |
| `zIndex` | `number` | `1` |

```tsx
<CourseCard src="/img/tea.jpg" alt="Pu-erh Course" size="large" zIndex={2} />
```

---

### ErrorMessage
Inline feedback. Renders nothing when `message` is null; shows dismiss button when `onClose` is provided.

| Prop | Type |
|------|------|
| `message` | `string \| null` |
| `onClose` | `() => void` (optional) |

```tsx
<ErrorMessage message={error} onClose={() => setError(null)} />
```

A11y: close button uses `aria-label="Close"`. Planned: add `role="alert"` for screen reader announcement.

---

### Header
Singleton nav bar. Self-manages auth state via a custom `auth-changed` DOM event — no props.

| Auth state | Renders                          |
|------------|----------------------------------|
| Guest      | "Log in" → opens `AuthModal`     |
| Logged in  | "Welcome, {username}" + "Log out"|

---

### LoginForm / Register
Controlled auth forms. Always rendered inside `AuthModal`, never standalone.

| Prop | LoginForm | Register |
|------|-----------|---------|
| `onClose` | ✓    | ✓       |
| `onGoRegister`  ✓ | —      |
| `onGoLogin` | —   | ✓      |

Internal states: idle → loading (inputs disabled) → error (shows `ErrorMessage`).

---

### AuthModal
Full-screen overlay driven by `AuthModalContext`. Hosts `LoginForm` or `Register` based on `mode`.

```tsx
// Trigger from anywhere without prop drilling:
const { openAuthModal } = useAuthModal();
<button onClick={() => openAuthModal("login")}>Log in</button>
```

Dismiss: click backdrop or press `Escape`. A11y: `role="dialog"` + `aria-modal="true"`.

---

### OptimizedImage
Drop-in `<img>` with lazy loading, skeleton placeholder, and WebP support.

```tsx
<OptimizedImage src="/courses/pu-erh.webp" alt="Pu-erh tea course" />
```

Rule: all content images must use `OptimizedImage`. Above-the-fold images use `loading="eager"` only.

---

## 3. Governance

### Component Tiers

| Tier | Rule   | Examples |
|------|--------|---------|
| **Primitive** | Stateless or local UI state only | `CourseCard`, `ErrorMessage`, `OptimizedImage` |
| **Composite** | Assembles primitives, may have state; no imports of other composites | `LoginForm`, `Register` |
| **Singleton** | One instance, context/event driven, no config props | `Header`, `AuthModal` |

### Props API Rules
- Required props first, optional last with explicit defaults
- Booleans: `isDisabled`, `hasError` prefix
- Handlers: `onClose`, `onChange` prefix
- No `style` prop — use `className` + CSS only

### Naming

| Entity | Convention |
|--------|------------|
| Component / CSS files | `PascalCase.tsx` + `PascalCase.css` |
| CSS class names | `kebab-case`, component-scoped |
| Context files | `[Name]Context.tsx` |
| Tokens | `category-variant-property` (e.g. `color-brand-dark`) |

### Accessibility Baseline (required before merge)
- [ ] All interactive elements keyboard-reachable
- [ ] `<button>` has visible text or `aria-label`
- [ ] `<img>` has descriptive `alt`
- [ ] Modals: `role="dialog"` + `aria-modal` + ESC to close
- [ ] No color as the sole indicator of state

### New Component Checklist
1. Classify tier (Primitive / Composite / Singleton)
2. Define TypeScript `interface` for props first
3. Co-locate CSS file with same filename
4. Use tokens only — no magic numbers
5. Review against a11y baseline
6. Update this file

---

## 4. Figma Sync

**Tokens**: CSS custom properties in `global.css` ↔ Figma Variables. Naming mirrors code: `color/brand/dark`, `space/4`.

**Components**: Each code variant maps to a Figma variant property (e.g. `size="large"` → `Size = Large`). Figma components live on a dedicated "Design System" page — other pages use instances only.

**Review gate**: Any PR touching a shared component requires designer sign-off (if visual) and developer sign-off (if API changes).

---

## 5. Lessons Learned

| Issue | Resolution |
|-------|------------|
| Magic color values scattered across CSS files | Extracted into `color-*` tokens |
| No component classification → unclear state ownership | Introduced Primitive / Composite / Singleton tiers |
| Bare `<img>` tags in some pages | Standardized on `OptimizedImage` with governance rule |
| Auth modal triggered via prop drilling | Migrated to `AuthModalContext` + `useAuthModal()` |
| No a11y requirements → missing `aria-label` on icon buttons | Added a11y checklist to contribution guidelines |
