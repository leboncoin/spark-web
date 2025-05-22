function hexToLuminance(hex: string): number {
  // Convert hex to RGB
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  // Apply the formula for relative luminance
  const rgb = [r, g, b].map((value): number => {
    return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4)
  }) as [number, number, number]

  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]
}

function contrastRatio(hex1: string, hex2: string): number {
  const luminance1 = hexToLuminance(hex1)
  const luminance2 = hexToLuminance(hex2)

  const ratio =
    (Math.max(luminance1, luminance2) + 0.05) / (Math.min(luminance1, luminance2) + 0.05)

  return ratio
}

function getWCAGScore(contrast: number, fontSizePx: number): string {
  const isLargeText = fontSizePx >= 24 // 24px or larger is considered large text

  if (contrast >= 7) {
    return 'AAA'
  } else if (contrast >= 4.5 && !isLargeText) {
    return 'AA'
  } else if (contrast >= 3 && isLargeText) {
    return 'AA'
  } else {
    return 'Failed'
  }
}

export interface ColorReport {
  small: { contrastRatio: string; score: string; textSize: string; colors: [string, string] }
  large: { contrastRatio: string; score: string; textSize: string; colors: [string, string] }
}

/**
 * https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
 *
 * - Normal text  expected ratio: 4.5:1
 * - Large text (>= 18pt or 14pt with bold font) expected ratio: 3:1
 *
 * (1pt = 1.333px, therefore 14pt and 18pt are equivalent to approximately 18.5px and 24px)
 *
 *
 * How to read contrast:
 *
 * In the ratio "4.5:1", the 4.5 represents the luminance of the lighter color compared to the darker color, which is 1.
 * A ratio of 4.5:1 means the lighter color is 4.5 times brighter than the darker color.
 *
 * 1:1 – No contrast (the two colors are identical).
 * 21:1 (maximum contrast, black vs. white).
 */
export function checkColorContrast(
  hex1: string,
  hex2: string,
  fontSizePx: number
): { contrastRatio: string; score: string; textSize: string; colors: [string, string] } {
  const ratio = contrastRatio(hex1, hex2)

  return {
    contrastRatio: ratio.toFixed(2),
    score: getWCAGScore(ratio, fontSizePx),
    textSize: fontSizePx >= 24 ? 'Large' : 'Small',
    colors: [hex1, hex2],
  }
}

const NORMAL_FONT_SIZE = 16
const LARGE_FONT_SIZE = 24

export const getSmallAndLargeCompliance = (background: string, foreground: string): ColorReport => {
  return {
    small: checkColorContrast(background, foreground, NORMAL_FONT_SIZE),
    large: checkColorContrast(background, foreground, LARGE_FONT_SIZE),
  }
}

export const getThemeContrastReport = () => {
  const tokenPairsReport = {
    // MAIN
    main: 'bg-main text-on-main',
    mainHovered: 'bg-main-hovered text-on-main',
    mainContainer: 'bg-main-container text-on-main-container',
    mainContainerHovered: 'bg-main-container-hovered text-on-main-container',
    // SUPPORT
    support: 'bg-support text-on-support',
    supportHovered: 'bg-support-hovered text-on-support',
    supportContainer: 'bg-support-container text-on-support-container',
    supportContainerHovered: 'bg-support-container-hovered text-on-support-container',
    // ACCENT
    accent: 'bg-accent text-on-accent',
    accentHovered: 'bg-accent-hovered text-on-accent',
    accentContainer: 'bg-accent-container text-on-accent-container',
    accentContainerHovered: 'bg-accent-container-hovered text-on-accent-container',
    // BASIC
    basic: 'bg-basic text-on-basic',
    basicHovered: 'bg-basic-hovered text-on-basic',
    basicContainer: 'bg-basic-container text-on-basic-container',
    basicContainerHovered: 'bg-basic-container-hovered text-on-basic-container',
    // SUCCESS
    success: 'bg-success text-on-success',
    successHovered: 'bg-success-hovered text-on-success',
    successContainer: 'bg-success-container text-on-success-container',
    successContainerHovered: 'bg-success-container-hovered text-on-success-container',
    // ERROR
    error: 'bg-error text-on-error',
    errorHovered: 'bg-error-hovered text-on-error',
    errorContainer: 'bg-error-container text-on-error-container',
    errorContainerHovered: 'bg-error-container-hovered text-on-error-container',
    // ALERT
    alert: 'bg-alert text-on-alert',
    alertHovered: 'bg-alert-hovered text-on-alert',
    alertContainer: 'bg-alert-container text-on-alert-container',
    alertContainerHovered: 'bg-alert-container-hovered text-on-alert-container',
    // INFO
    info: 'bg-info text-on-info',
    infoHovered: 'bg-info-hovered text-on-info',
    infoContainer: 'bg-info-container text-on-info-container',
    infoContainerHovered: 'bg-info-container-hovered text-on-info-container',
    // NEUTRAL
    neutral: 'bg-neutral text-on-neutral',
    neutralHovered: 'bg-neutral-hovered text-on-neutral',
    neutralContainer: 'bg-neutral-container text-on-neutral-container',
    neutralContainerHovered: 'bg-neutral-container-hovered text-on-neutral-container',
    // BACKGROUND
    background: 'bg-background text-on-background',
    backgroundVariant: 'bg-background-variant text-on-background-variant',
    // SURFACE
    surface: 'bg-surface text-on-surface',
    surfaceHovered: 'bg-surface-hovered text-on-surface',
    // SURFACE INVERSE
    surfaceInverse: 'bg-surface-inverse text-on-surface-inverse',
    surfaceInverseHovered: 'bg-surface-inverse-hovered text-on-surface-inverse',
  }

  return tokenPairsReport
}
