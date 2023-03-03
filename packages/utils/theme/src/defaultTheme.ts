import type { Theme } from './types'

export const defaultTheme: Theme = {
  borderRadius: {
    none: '0px',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '3rem',
    full: '9999px',
  },
  borderWidth: {
    none: '0px',
    sm: '1px',
    md: '2px',
  },
  boxShadow: {
    none: 'none',
    normal: '0 -1px 4px 0 rgba(26, 26, 26, 0.08), 0 4px 8px 0 rgba(26, 26, 26, 0.12)',
    highlighted: '0 -1px 8px 0 rgba(26, 26, 26, 0.12), 0 4px 8px 0 rgba(0, 0, 0, 0.14)',
  },
  colors: {
    // Primary
    primary: '#EC5A13',
    onPrimary: '#FFFFFF',
    primaryContainer: '#FDECE8',
    onPrimaryContainer: '#89380F',
    primaryHovered: '#B84A14',
    primaryDisabled: '#F0F5FA',
    primaryFocused: '#EC5A13',
    primaryContainerHovered: '##FBDFD1',
    primaryContainerDisabled: '##F0F5FA',
    primaryContainerFocused: '#FDECE8',
    // Secondary
    secondary: '#06233D',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#F0F5FA',
    onSecondaryContainer: '#06233D',
    secondaryHovered: '#010509',
    secondaryDisabled: '#F0F5FA',
    secondaryFocused: '#06233D',
    secondaryContainerHovered: '#EDDEE5',
    secondaryContainerDisabled: '#F0F5FA',
    secondaryContainerFocused: '#F0F5FA',
    // Primary Variant
    primaryVariant: '#B84A14',
    onPrimaryVariant: '#FFFFFF',
    primaryVariantHovered: '#89380F',
    primaryVariantDisabled: '#F0F5FA',
    primaryVariantFocused: '#B84A14',
    // Secondary Variant
    secondaryVariant: '#4E6579',
    onSecondaryVariant: '#FFFFFF',
    secondaryVariantHovered: '#3D4D5C',
    secondaryVariantDisabled: '#F0F5FA',
    secondaryVariantFocused: '#4E6579',
    // Success
    success: '#4E9850',
    onSuccess: '#FFFFFF',
    successContainer: '#EDF5EE',
    onSuccessContainer: '#2F5B30',
    successHovered: '#3E7A40',
    successDisabled: '#F0F5FA',
    successFocused: '#4E9850',
    successContainerHovered: '#DCEADC',
    successContainerDisabled: '#F0F5FA',
    successContainerFocused: '#EDF5EE',
    // Alert
    alert: '#FFAA00',
    onAlert: '#14191F',
    alertContainer: '#FFF6E5',
    onAlertContainer: '#996600',
    alertHovered: '#CC8800',
    alertDisabled: '#F0F5FA',
    alertFocused: '#FFAA00',
    alertContainerHovered: '#FFEECC',
    alertContainerDisabled: '#F0F5FA',
    alertContainerFocused: '#FFF6E5',
    // Error
    error: '#D93426',
    onError: '#FFFFFF',
    errorContainer: '#FBECEB',
    onErrorContainer: '#822017',
    errorHovered: '#AD291F',
    errorDisabled: '#F0F5FA',
    errorFocused: '#D93426',
    errorContainerHovered: '#F7D7D4',
    errorContainerDisabled: '#F0F5FA',
    errorContainerFocused: '#FBECEB',
    // Info
    info: '#1388EC',
    onInfo: '#FFFFFF',
    infoContainer: '#E7F3FD',
    onInfoContainer: '#0B518E',
    infoHovered: '#0F6CBD',
    infoDisabled: '#F0F5FA',
    infoFocused: '#1388EC',
    infoContainerHovered: '#CFE6FB',
    infoContainerDisabled: '#F0F5FA',
    infoContainerFocused: '#E7F3FD',
    // Neutral
    neutral: '#627C93',
    onNeutral: '#FFFFFF',
    neutralContainer: '#F0F5FA',
    onNeutralContainer: '#3D4D5C',
    neutralHovered: '#4E6579',
    neutralDisabled: '#F0F5FA',
    neutralFocused: '#627C93',
    neutralContainerHovered: '#DAE6F1',
    neutralContainerDisabled: '#F0F5FA',
    neutralContainerFocused: '#F0F5FA',
    // Background
    background: '#FFFFFF',
    onBackground: '#06233D',
    backgroundHovered: '#F7FAFD',
    backgroundDisabled: '#F0F5FA',
    backgroundFocused: '#FFFFFF',
    // Surface
    surface: '#FFFFFF',
    onSurface: '#06233D',
    surfaceHovered: '#F7FAFD',
    surfaceDisabled: '#F0F5FA',
    surfaceFocused: '#FFFFFF',
    // Surface Inverse
    surfaceInverse: '#14191F',
    onSurfaceInverse: '#FFFFFF',
    surfaceInverseHovered: '#14191F',
    surfaceInverseDisabled: '#F0F5FA',
    surfaceInverseFocused: '#14191F',
    // Outline
    outline: '#A3B4C2',
    // Overlay
    overlay: '#2B3640',
  },
  fontFamily: {
    openSans:
      'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"',
  },
  fontSize: {
    display1: { fontSize: '5rem', lineHeight: '7rem' },
    display1Expanded: { fontSize: '6rem', lineHeight: '8rem' },
    display2: { fontSize: '4rem', lineHeight: '5.5rem' },
    display2Expanded: { fontSize: '5rem', lineHeight: '7rem' },
    display3: { fontSize: '3rem', lineHeight: '4rem' },
    display3Expanded: { fontSize: '4rem', lineHeight: '5.5rem' },
    headline1: { fontSize: '2.5rem', lineHeight: '3.5rem' },
    headline1Expanded: { fontSize: '3rem', lineHeight: '4rem' },
    headline2: { fontSize: '2.25rem', lineHeight: '3rem' },
    headline2Expanded: { fontSize: 'rem', lineHeight: '3rem' },
    subhead: { fontSize: '2rem', lineHeight: '3rem' },
    subheadExpanded: { fontSize: '2rem', lineHeight: '3rem' },
    body1: { fontSize: '2rem', lineHeight: '3rem' },
    body2: { fontSize: '1.75rem', lineHeight: '2.5rem' },
    caption: { fontSize: '1.5rem', lineHeight: '2rem' },
    small: { fontSize: '1.25rem', lineHeight: '1.75rem' },
    body1Link: { fontSize: '2rem', lineHeight: '3rem' },
    body2Link: { fontSize: '1.75rem', lineHeight: '2.25rem' },
    captionLink: { fontSize: '1.5rem', lineHeight: '2rem' },
    callout: { fontSize: '2rem', lineHeight: '3rem' },
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  },
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  spacing: {
    auto: 'auto',
    none: '0px',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
    '3xl': '5rem',
  },
  zIndex: {
    hide: -1,
    base: 0,
    raised: 1,
    dropdown: 1000,
    sticky: 1100,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
}
