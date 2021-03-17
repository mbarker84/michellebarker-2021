const minDesktop = () => window.matchMedia('(min-width: 1024px)').matches
const minTablet = () => window.matchMedia('(min-width: 768px)').matches
const minSmallTablet = () => window.matchMedia('(min-width: 640px)').matches

export { minDesktop, minTablet, minSmallTablet }
