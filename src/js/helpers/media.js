export const minDesktop = () => {
  return window.matchMedia('(min-width: 1024px)').matches
}

export const minTablet = () => {
  return window.matchMedia('(min-width: 720px)').matches
}

export const isHover = () => {
  return window.matchMedia('(hover: hover)').matches
}
