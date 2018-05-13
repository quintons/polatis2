const webpack           = require('webpack');
const path              = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const Paths = {
    dist:           path.resolve(__dirname, 'dist'),
    src:            path.resolve(__dirname, 'src'),
    indexFile:      path.resolve(__dirname, 'src/index.js'),
    nodeModulesDir: path.resolve(__dirname, 'node_modules'),
    sassFile:       path.resolve(__dirname, 'assets/css/main.scss')
};

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css"
})

const config = {
    devtool: '#source-map',
    entry: {
        main: ['react-hot-loader/patch', 'babel-polyfill', Paths.indexFile, Paths.sassFile]
    },
    output: {
        path: Paths.dist,
        filename: "[name].bundle.js",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test:     /\.(js|jsx)$/,
                exclude:  [Paths.nodeModulesDir],
                use:   ['babel-loader']
            },
            {
                test: /\.(css|scss)$/,
                use: extractSass.extract(
                    {
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                query: {
                                    modules: false,
                                    sourceMap: true,
                                    importLoaders: 1,
                                    localIdentName: '[name]__[local]___[hash:base64:5]'
                                }
                            },
                            'postcss-loader',
                            'sass-loader'
                        ]
                    }
                )
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
                use: [
                    {
                        loader:  'url-loader',
                        options: {
                            limit: 100000,
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['node_modules', 'src']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(Paths.src, 'index.html')
        }),
        extractSass,
        new CopyWebpackPlugin([
            {from: 'src/static/images/**/*', to: ''},
            {from: 'src/static/fonts/**/*', to: ''},
            {from: 'src/static/lang/**/*', to: ''},
            {from: 'src/static/js/**/*', to: ''}
        ]),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: Paths.src,
        hot: true
    }
};

module.exports = config;