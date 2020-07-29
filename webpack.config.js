const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const SOURCE = path.resolve(__dirname, 'src');
const OUTPUT = path.resolve(__dirname, 'build');

module.exports = {
    entry: [
        `${SOURCE}/index.js`,
        `${SOURCE}/index.css`
    ],
    output: {
        path: OUTPUT,
        filename: '[name].js',
    },
    mode: 'production',
    module: {
        rules: [
            // Include pug-loader to process the pug files
            {
                test: /\.pug$/,
                use: 'pug-loader'
            },
            // Include css/style loaders to process our css files
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']  
            }
        ]
    },
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({})
        ],
    },
    plugins: [
        // Extract our css to a seperate css file
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        // Use HTMLWebpackPLugin with template set to our pug template.
        new HtmlWebpackPlugin({
            template: `${SOURCE}/templates/index.pug`,
            inject: false
        })
    ]
}