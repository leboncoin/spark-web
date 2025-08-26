export const getCssVariable = (varName: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(varName)

export const getComputedCssVariable = (cssAttributeName: string, className: string) => {
  const element = document.createElement('div')
  element.className = className
  element.style.position = 'absolute'
  element.style.left = '-9999px'
  element.style.top = '-9999px'
  document.body.appendChild(element)
  const value = getComputedStyle(element).getPropertyValue(cssAttributeName)
  document.body.removeChild(element)

  return value
}

export const ColorPreview = ({ bg }: { bg: string }) => {
  return (
    <div>
      <div className={`size-sz-144 ${bg}`} />
      <p className="text-body-1">{bg}</p>
      <p className="text-body-2 opacity-dim-1">{getCssVariable('--color-main')}</p>
    </div>
  )
}

export const BackgroundColorPreview = () => {
  const bgColors = {
    'bg-main': {
      token: '--color-main',
      styles: 'bg-main text-on-main hover:bg-main-hovered',
    },
    'bg-main-container': {
      token: '--color-main-container',
      styles: 'bg-main-container text-on-main-container hover:bg-main-container-hovered',
    },
    'bg-support': {
      token: '--color-support',
      styles: 'bg-support text-on-support hover:bg-support-hovered',
    },
    'bg-support-container': {
      token: '--color-support-container',
      styles: 'bg-support-container text-on-support-container hover:bg-support-container-hovered',
    },
    'bg-accent': {
      token: '--color-accent',
      styles: 'bg-accent text-on-accent hover:bg-accent-hovered',
    },
    'bg-accent-container': {
      token: '--color-accent-container',
      styles: 'bg-accent-container text-on-accent-container hover:bg-accent-container-hovered',
    },
    'bg-basic': {
      token: '--color-basic',
      styles: 'bg-basic text-on-basic hover:bg-basic-hovered',
    },
    'bg-basic-container': {
      token: '--color-basic-container',
      styles: 'bg-basic-container text-on-basic-container hover:bg-basic-container-hovered',
    },
    'bg-success': {
      token: '--color-success',
      styles: 'bg-success text-on-success hover:bg-success-hovered',
    },
    'bg-success-container': {
      token: '--color-success-container',
      styles: 'bg-success-container text-on-success-container hover:bg-success-container-hovered',
    },
    'bg-alert': {
      token: '--color-alert',
      styles: 'bg-alert text-on-alert hover:bg-alert-hovered',
    },
    'bg-alert-container': {
      token: '--color-alert-container',
      styles: 'bg-alert-container text-on-alert-container hover:bg-alert-container-hovered',
    },
    'bg-error': {
      token: '--color-error',
      styles: 'bg-error text-on-error hover:bg-error-hovered',
    },
    'bg-error-container': {
      token: '--color-error-container',
      styles: 'bg-error-container text-on-error-container hover:bg-error-container-hovered',
    },
    'bg-info': {
      token: '--color-info',
      styles: 'bg-info text-on-info hover:bg-info-hovered',
    },
    'bg-info-container': {
      token: '--color-info-container',
      styles: 'bg-info-container text-on-info-container hover:bg-info-container-hovered',
    },
    'bg-neutral': {
      token: '--color-neutral',
      styles: 'bg-neutral text-on-neutral hover:bg-neutral-hovered',
    },
    'bg-neutral-container': {
      token: '--color-neutral-container',
      styles: 'bg-neutral-container text-on-neutral-container hover:bg-neutral-container-hovered',
    },
    'bg-surface': {
      token: '--color-surface',
      styles: 'bg-surface text-on-surface hover:bg-surface-hovered',
    },
    'bg-surface-container': {
      token: '--color-surface-container',
      styles: 'bg-surface-container text-on-surface-container hover:bg-surface-container-hovered',
    },
  }

  return (
    <div className="sb-unstyled">
      <div className="gap-lg grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] flex-wrap">
        {Object.entries(bgColors).map(([bg, { token, styles }]) => (
          <div className="gap-sm flex flex-col">
            <div className={`w-sz-160 h-sz-56 relative rounded-lg shadow-sm ${styles}`}></div>
            <p className="text-body-1">{bg}</p>
            <p className="text-body-2 opacity-dim-1">{getCssVariable(token)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export const TextColorPreview = () => {
  const textColors = {
    'text-main': {
      token: '--color-main',
      styles: 'text-main',
    },
    'text-on-main': {
      token: '--color-on-main',
      styles: 'text-on-main bg-main',
    },
    'text-support': {
      token: '--color-support',
      styles: 'text-support',
    },
    'text-on-support': {
      token: '--color-on-support',
      styles: 'text-on-support bg-support',
    },
    'text-accent': {
      token: '--color-accent',
      styles: 'text-accent',
    },
    'text-on-accent': {
      token: '--color-on-accent',
      styles: 'text-on-accent bg-accent',
    },
    'text-basic': {
      token: '--color-basic',
      styles: 'text-basic',
    },
    'text-on-basic': {
      token: '--color-on-basic',
      styles: 'text-on-basic bg-basic',
    },
    'text-success': {
      token: '--color-success',
      styles: 'text-success',
    },
    'text-on-success': {
      token: '--color-on-success',
      styles: 'text-on-success bg-success',
    },
    'text-alert': {
      token: '--color-alert',
      styles: 'text-alert',
    },
    'text-on-alert': {
      token: '--color-on-alert',
      styles: 'text-on-alert bg-alert',
    },
    'text-error': {
      token: '--color-error',
      styles: 'text-error',
    },
    'text-on-error': {
      token: '--color-on-error',
      styles: 'text-on-error bg-error',
    },
    'text-info': {
      token: '--color-info',
      styles: 'text-info',
    },
    'text-on-info': {
      token: '--color-on-info',
      styles: 'text-on-info bg-info',
    },
    'text-neutral': {
      token: '--color-neutral',
      styles: 'text-neutral',
    },
    'text-on-neutral': {
      token: '--color-on-neutral',
      styles: 'text-on-neutral bg-neutral',
    },
    'text-on-surface': {
      token: '--color-on-surface',
      styles: 'text-on-surface bg-surface',
    },
  }

  return (
    <div className="sb-unstyled">
      <div className="gap-lg grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] flex-wrap">
        {Object.entries(textColors).map(([bg, { token, styles }]) => (
          <div className="gap-md flex flex-row items-center">
            <div
              className={`size-sz-56 text-headline-1 relative flex items-center justify-center rounded-lg shadow-sm ${styles}`}
            >
              Aa
            </div>
            <div className="flex flex-col">
              <p className="text-body-1">{bg}</p>
              <p className="text-body-2 opacity-dim-1">{getCssVariable(token)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const OutlineColorPreview = () => {
  const outlineColors = {
    'border-outline': {
      token: '--color-outline',
      styles: 'border-outline',
    },
    'border-outline-high': {
      token: '--color-outline-high',
      styles: 'border-outline-high',
    },
    'border-main': {
      token: '--color-main',
      styles: 'border-main',
    },
    'border-support': {
      token: '--color-support',
      styles: 'border-support',
    },
    'border-accent': {
      token: '--color-accent',
      styles: 'border-accent',
    },
    'border-basic': {
      token: '--color-basic',
      styles: 'border-basic',
    },
    'border-success': {
      token: '--color-success',
      styles: 'border-success',
    },
    'border-alert': {
      token: '--color-alert',
      styles: 'border-alert',
    },
    'border-error': {
      token: '--color-error',
      styles: 'border-error',
    },
    'border-info': {
      token: '--color-info',
      styles: 'border-info',
    },
    'border-neutral': {
      token: '--color-neutral',
      styles: 'border-neutral',
    },
  }

  return (
    <div className="sb-unstyled">
      <div className="gap-lg grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] flex-wrap">
        {Object.entries(outlineColors).map(([bg, { token, styles }]) => (
          <div className="gap-md flex flex-row">
            <div
              className={`size-sz-56 border-md shrink-0 rounded-lg border-dashed ${styles}`}
            ></div>
            <div className="flex flex-col">
              <p className="text-body-1">{bg}</p>
              <p className="text-body-2 opacity-dim-1">{getCssVariable(token)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
