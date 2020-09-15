module.exports = function (api) {
	api.cache(true);

	const presets = [
		[
			'@babel/preset-env',
			{
				// targets: { ie: '11' },
				targets: '> 0.25%, not dead',
				useBuiltIns: 'usage',
				corejs: '3',
				modules: false,
			},
		],
	];
	const plugins = [
		['@babel/plugin-transform-async-to-generator'],
		['@babel/plugin-transform-runtime'],
	];

	return {
		plugins,
		presets,
	};
};
