# Generated Properties

## TODO

- [ ] Class name
- [ ] CSS vars
- [ ] Sass functions

## Breakpoints

Breakpoints names will be used as prefixes for almost all utility classes. Adding breakpoints results in additional classes across the board so use them deliberately. All breakpoints are mobile-first min-widths so properties will match on any screen size above the minimum viewport

- Custom property: `--break-[key]`
- Media query: `@media screen and (min-width: [value])`

Note: Media queries are written in the order of the config keys so for correct mobile-first precedence they should be defined smalled to largest

## Color

### Background color

Include breakpoint prefixes

- Standard: `.bg-[key]`
- Breakpoint prefix: `.[breakpoint]:bg-[key]`
- Custom property: `--bg-[key]`

### Text color

Include breakpoint prefixes

- Standard: `.c-[key]`
- Breakpoint prefix: `.[breakpoint]:c-[key]`
- Custom property: `--color-[key]`

## Typography

### Antialiasing

The two properties that (arguably) make fonts look better, `-webkit-font-smoothing: antialiased;` and `-moz-osx-font-smoothing: grayscale;`. Could be applied to `body` or scoped locally.

- Standard: `.antialias-[key]`
- Breakpoint prefix: `.[breakpoint]:antialias-[key]`

### Font Family

- Standard: `.ff-[key]`
- Breakpoint prefix: `.[breakpoint]:ff-[key]`
- Custom property: `--font-[key]`

### Line Height

- Standard: `.lh-[key]`
- Breakpoint prefix: `.[breakpoint]:lh-[key]`
- Custom property: `--line-[key]`

### Alignment

- Values: left, right, none, center, and justify
- Standard: `.align-[l/r/0/c/j]`
- Breakpoint prefix: `.[breakpoint]:align-[l/r/0/c/j]`

## Spacing

In most cases, directional margin and padding classes follow the pattern `[breakpoint?]:[m/p][x/y/t/r/b/l]-[key]`

### Custom properties

- Custom property: `--space-[key]`

### Margin

Class names include breakpoint prefixes

- `.m-[key]`: all directions
- `.mx-[key]`: horizontal axis (left and right)
- `.my-[key]`: vertical axis (top and bottom)
- `.mt-[key]`: top
- `.mr-[key]`: right
- `.mb-[key]`: bottom
- `.ml-[key]`: left

**Child margin resets**
Currently, no responsive prefixes

- `child-my-0`: Zero out first-child's margin-top and last-child's margin-bottom
- `child-mx-0`: Zero out first-child's margin-left and last-child's margin-right

### Padding

Class names include breakpoint prefixes

- `.p-[key]`: all directions
- `.px-[key]`: horizontal axis (left and right)
- `.py-[key]`: vertical axis (top and bottom)
- `.pt-[key]`: top
- `.pr-[key]`: right
- `.pb-[key]`: bottom
- `.pl-[key]`: left

## Rounded Corners

### Border Radius

- Standard: `.rad-[key]`
- Breakpoint prefix: `.[breakpoint]:rad-[key]`
- Custom property: `--radius-[key]`

## Layering

### z-index

Class names include breakpoint prefixes

- Standard: `.z-[key]`
- Breakpoint prefix: `.[breakpoint]:z-[key]`
- Custom property: `--layer-[key]`

## Display

- soon

## Flex

Common flex properties are generated to cover most cases, all include breakpoint prefixes.

- `.flx-[0/1]`: Shorthand for flex grow, shrink, and basis
- `.flx-g-[0/1]`: Flex-grow of `0` or `1`
- `.flx-s-[0/1]`: Flex-shrink of `0` or `1`
- `.flx-d-[c/cr/r/rr]`: Flex directions `column`, `column-reverse`, `row`, `row-reverse`
- `.flx-a-[fs/fe/c/s/sa/sb]`: Align items to `flex-start`, `flex-end`, `center`, `stretch`, `space-around`, `space-between`
- `.flx-j-[fs/fe/c/s/sa/sb]`: Justif content to `flex-start`, `flex-end`, `center`, `stretch`, `space-around`, `space-between`

## Float

- soon

## Accessibility

### Screen readers

**Always hidden**

- Standard: `.sr-only`
- Breakpoint prefix: `.[breakpoint]:sr-only`

**Hidden unless focused**

- Standard: `.sr-focus`
- Breakpoint prefix: `.[breakpoint]:sr-focus`
