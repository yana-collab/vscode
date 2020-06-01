/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

//@ts-check

'use strict';

const path = require('path');
const withDefaults = require('../shared.webpack.config');

module.exports = withDefaults({
	context: __dirname,
	target: 'webworker',
	node: false,
	entry: {
		extension: './src/extension.ts',
	},
	externals: {
		'keytar': 'commonjs keytar',
	},
	module: {
		rules: [{
			test: /\.ts$/,
			exclude: /node_modules/,
			use: [{
				// configure TypeScript loader:
				// * enable sources maps for end-to-end source maps
				loader: 'ts-loader',
				options: {
					compilerOptions: {
						'sourceMap': true,
					}
				}
			}]
		}]
	},
	output: {
		filename: 'github-authentication.js',
	},
	resolve: {
		alias: {
			'node-fetch': path.resolve(__dirname, 'node_modules/node-fetch/browser.js'),
			'vscode-extension-telemetry': path.resolve(__dirname, 'polyfills/vscode-extension-telemetry-web.js'),
			'vscode-nls': path.resolve(__dirname, 'polyfills/vscode-nls-web.js'),
			'uuid': path.resolve(__dirname, 'node_modules/uuid/dist/esm-browser/index.js')
		},
	}
});
