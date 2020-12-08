const { resolve } = require('path')

module.exports = {
	// set your styleguidist configuration here
	title: 'Default Style Guide',
	renderRootJsx: resolve(__dirname, './styleguide.root.js'),
	// components: 'src/components/**/[A-Z]*.vue',
	// defaultExample: true,
	// sections: [
	//   {
	//     name: 'First Section',
	//     components: 'src/components/**/[A-Z]*.vue'
	//   }
	// ],
	// webpackConfig: {
	//   // custom config goes here
	// },
	exampleMode: 'expand'
}
