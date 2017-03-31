const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const cssToOwnFile = new ExtractTextPlugin('bundle.css');

module.exports = {
    context: path.resolve(__dirname, 'src'),

    entry: './app.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['env', {modules: false}], 'react'],
                        plugins: ['check-es2015-constants']
                    }
                }
            },
            {
                test: /\.(sass|scss|css)$/,
                use: cssToOwnFile.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    attrs: ['img:src', 'link:href']
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: 'img/',
                            outputPath: 'img/'
                        }
                    },
                    {loader: 'img-loader'}
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    publicPath: 'fonts/',
                    outputPath: 'fonts/'
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'app.html'
        }),
        cssToOwnFile
    ],

    devtool: isProduction ? false : 'source-map',

    watchOptions: {
        ignored: /node_modules/
    }
};
