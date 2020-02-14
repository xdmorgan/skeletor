# @skeletor/css config file

In order to generate styles, a valid yaml config file needs to be provided. By default, the CLI will look for a `skeletor.yml` file in the current directory. To change the defaults, see CLI options in the README.

## Structure

### Minimum viable config

It is intended that no config is necessary. That said, everything is opt-in so an empty config file should yield an empty library build.

```yml
# not a lot going on in this config
```

In most cases, a subset of the kitchen sink example shown below will be desired.

### Kitchen Sink Example

```yml
# Define 5 breakpoints which will prefix all
# responsive properties
breakpoints:
  sm: 420px
  md: 768px
  lg: 1024px
  xl: 1280px
  hd: 1440px

# Define color palette, yields css variables,
# text and background color uitlity classes
colors:
  red: red
  blue: "#00f"
  green: "#bada55"
  purple: rebeccapurple
  white: white
  black: "#000"

# Create a flexbox-style responsive grid
grid:
  cols: 12
  gutter: 24px

# Generate a container component with horizontal
# insets. An initial key is required. Optionally,
# add keys equal to breakpoint names to vary
# inset min and max widths with viewport size
container:
  initial:
    min: 320px
    inset: 24px
    max: 480px
  md:
    min: 700px
    inset: 32px
    max: 1440px

# Responsive common width and height utils
dimensions:
  auto: auto
  none: none
  fill: 100%

# Responsive display properties
displays: true

# Generate font stack css variables and utility classes
font-families:
  heading:
    - Times
    - serif
  system:
    - -apple-system
    - system-ui
    - sans-serif

# Generate font weight css variables and
# responsive utility classes
font-weights:
  normal: 400
  medium: 500
  bold: 700

# Generate line-height css variables and
# responsive utility classes
line-heights:
  compact: 1
  default: 1.2
  spacious: 1.4

# Generate line-height css variables and
# responsive utility classes
spacings:
  0: 0
  quarter: 2px
  half: 4px
  single: 8px
  spacious: 12px
  double: 16px
  triple: 24px
  quad: 32px
  square: 64px
  ten: 80px

# Generate line-height css variables and
# responsive utility classes
z-indexes:
  under: -1
  over: 1
  nav: 100
  modal: 200
  orbit: 1000

# Generate line-height css variables and
# responsive utility classes
rounded-corners:
  small: 2px
  large: 8px
  pill: 999px
  round: 50%
```

---

† I think.
