/**
 * Get the indices of each slides that serves as the start of a page
 * @returns number[] (ex: [0, 2, 4])
 */
function getSnapIndices({
  totalSlides,
  slidesPerMove,
  slidesPerPage,
}: {
  totalSlides: number
  slidesPerMove: number | 'auto'
  slidesPerPage: number
}) {
  const slideBy = slidesPerMove === 'auto' ? slidesPerPage : slidesPerMove
  const snapPoints: number[] = []

  const lastSnapIndex = Math.floor((totalSlides - slidesPerPage) / slideBy) * slideBy

  for (let i = 0; i <= lastSnapIndex; i += slideBy) {
    snapPoints.push(i)
  }

  // Adding final snap point if necessary
  if (snapPoints[snapPoints.length - 1] !== totalSlides - slidesPerPage) {
    snapPoints.push(totalSlides - slidesPerPage)
  }

  return snapPoints
}

export function getSlideElements(container: HTMLDivElement | null): Element[] {
  return container ? Array.from(container.querySelectorAll('[data-part="item"]')) : []
}

export function isSnapPoint(
  slideIndex: number,
  {
    container,
    slidesPerMove,
    slidesPerPage,
  }: {
    container: HTMLDivElement | null
    slidesPerMove: number | 'auto'
    slidesPerPage: number
  }
) {
  return getSnapIndices({
    totalSlides: getSlideElements(container).length,
    slidesPerPage,
    slidesPerMove,
  }).includes(slideIndex)
}

/**
 * Get the scroll value of each slides that serves as the start of a page
 * @returns number[] (ex for a 400px carousel with no gap: [400, 800, 1200])
 */
export function getSnapPositions({
  container,
  slidesPerMove,
  slidesPerPage,
}: {
  container: HTMLDivElement | null
  slidesPerMove: number | 'auto'
  slidesPerPage: number
}) {
  if (!container) return []

  return getSlideElements(container)
    .filter((_, index) => {
      return isSnapPoint(index, {
        slidesPerMove,
        slidesPerPage,
        container,
      })
    })
    .map(slide => (slide as HTMLElement).offsetLeft)
}
