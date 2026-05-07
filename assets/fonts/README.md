# LBC Denim INK Font

This directory contains the **LBC Denim INK** custom font family used by Spark UI.

## Font Files

The font is available in 4 weights, each with WOFF2 (recommended) and TTF (fallback) formats:

- **Regular (400)**: `LBCDenimINK-Regular.woff2` / `LBCDenimINK-Regular.ttf`
- **Medium (500)**: `LBCDenimINK-Medium.woff2` / `LBCDenimINK-Medium.ttf`
- **Semi-Bold (600)**: `LBCDenimINK-SemiBold.woff2` / `LBCDenimINK-SemiBold.ttf`
- **Bold (700)**: `LBCDenimINK-Bold.woff2` / `LBCDenimINK-Bold.ttf`

> 💡 **Format Priority**: WOFF2 is the modern, compressed format with best browser support. TTF is provided as a fallback for older browsers.

## How to Use in Your Project

Spark UI **does not bundle font files** in the npm package. You need to host and load the fonts yourself.

### Option 1: Host on Your CDN (Recommended for Production)

1. Upload the font files to your CDN
2. Add `@font-face` declarations to your CSS:

```css
/* Add this to your main CSS file or a dedicated fonts.css */

@font-face {
  font-family: 'LBC Denim INK';
  src: url('https://your-cdn.com/fonts/LBCDenimINK-Regular.woff2') format('woff2'),
       url('https://your-cdn.com/fonts/LBCDenimINK-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'LBC Denim INK';
  src: url('https://your-cdn.com/fonts/LBCDenimINK-Medium.woff2') format('woff2'),
       url('https://your-cdn.com/fonts/LBCDenimINK-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'LBC Denim INK';
  src: url('https://your-cdn.com/fonts/LBCDenimINK-SemiBold.woff2') format('woff2'),
       url('https://your-cdn.com/fonts/LBCDenimINK-SemiBold.ttf') format('truetype');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'LBC Denim INK';
  src: url('https://your-cdn.com/fonts/LBCDenimINK-Bold.woff2') format('woff2'),
       url('https://your-cdn.com/fonts/LBCDenimINK-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

1. Import Spark theme (fonts will use the family name):

```css
@import 'tailwindcss';
@import '@spark-ui/theme-utils/base';
```

### Option 2: Self-Host in Your Project

1. Copy the font files from `assets/fonts/lbc-denim-ink/` to your project's public directory:

```bash
# Example structure
public/
  fonts/
    lbc-denim-ink/
      LBCDenimINK-Regular.woff2
      LBCDenimINK-Regular.ttf
      LBCDenimINK-Medium.woff2
      LBCDenimINK-Medium.ttf
      LBCDenimINK-SemiBold.woff2
      LBCDenimINK-SemiBold.ttf
      LBCDenimINK-Bold.woff2
      LBCDenimINK-Bold.ttf
```

1. Add `@font-face` declarations with relative paths:

```css
@font-face {
  font-family: 'LBC Denim INK';
  src: url('/fonts/lbc-denim-ink/LBCDenimINK-Regular.woff2') format('woff2'),
       url('/fonts/lbc-denim-ink/LBCDenimINK-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* Repeat for weights 500, 600, 700 */
```

1. Import Spark theme:

```css
@import 'tailwindcss';
@import '@spark-ui/theme-utils/base';
```

## Performance Optimization

### Preload Critical Fonts

Add `<link rel="preload">` in your HTML `<head>` to load fonts faster:

```html
<link rel="preload" href="/fonts/lbc-denim-ink/LBCDenimINK-Regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/lbc-denim-ink/LBCDenimINK-Bold.woff2" as="font" type="font/woff2" crossorigin>
```

### Font Subsetting

If you only support specific languages, consider subsetting the fonts to reduce file size:

```bash
# Example with pyftsubset (from fonttools)
pyftsubset LBCDenimINK-Regular.woff2 \
  --output-file=LBCDenimINK-Regular-subset.woff2 \
  --unicodes=U+0020-007F,U+00A0-00FF  # Basic Latin + Latin-1 Supplement
```

### Use font-display: swap

All `@font-face` declarations should use `font-display: swap` to prevent invisible text while fonts load:

```css
@font-face {
  font-family: 'LBC Denim INK';
  font-display: swap; /* ← Important for performance */
  /* ... */
}
```

## Why Aren't Fonts Bundled in the NPM Package?

We've chosen **not** to bundle font files in `@spark-ui/theme-utils` for several reasons:

1. **Package Size**: Font files add ~800KB to the npm package
2. **Flexibility**: Teams can host fonts on their own CDN with custom caching strategies
3. **Performance**: Self-hosting allows better control over optimization (subsetting, compression)
4. **Convention**: Most design system libraries (Material UI, Chakra, etc.) don't bundle fonts
5. **Redundancy**: Internal projects likely already have access to these fonts

## Need Help?

See the [Typography documentation](?path=/docs/styling-typography--docs) in Storybook for more information.

## Font License

The LBC Denim INK font is proprietary and licensed for use within leboncoin projects only.
