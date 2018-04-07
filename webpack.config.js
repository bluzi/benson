const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: ['./src/index.js'],
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [{
            loader: 'babel-loader'
        }],
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: './src/css', to: './css' },
            { from: './src/icons', to: './icons' },
        ])
    ]
}
