module.exports = function (eleventyConfig) {
  eleventyConfig.addCollection('sortedSections', function (collectionApi) {
    return collectionApi.getFilteredByTag('section').sort(function (a, b) {
      return a.data.order - b.data.order
    })
  })

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
    templateFormats: ['html', 'md', 'njk'],
    passthroughFileCopy: true,
  }
}
