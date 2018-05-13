const webpack           = require('webpack');
const path              = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const Paths = {
    dist:           path.resolve(__dirname, 'dist'),
    src:            path.resolve(__dirname, 'src'),
    indexFile:      path.resolve(__dirname, 'src/index.html'),
    nodeModulesDir: path.resolve(__dirname, 'node_modules'),
    sassFile:       path.resolve(__dirname, 'assets/css/main.scss'),

    leftpane:      path.resolve(__dirname, 'src/leftpane_structure.html')
};

const config = {
    devtool: '#source-map',
    entry: {
        main: [Paths.indexFile, Paths.leftpane, Paths.sassFile] // ,  'babel-polyfill',
    },
    output: {
        path: Paths.dist,
        filename: "[name].bundle.js",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude:  [Paths.nodeModulesDir],
                use:   [{
                    loader: 'babel-loader?cacheDirectory&cacheIdentifier='+ Math.random(),
                    options: {
                        presets: ["env", "stage-0",
                            ["env", {
                                "targets": {
                                    "browsers": ["last 2 versions", "safari >= 7"]
                                },
                                debug: true
                            }]
                        ]
                    }
                }]
            },
            {
                test: /\.css/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: '[name]_[local]__[hash:base64:5]'
                            }
                        },
                        'postcss-loader'
                    ]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: false,
                                sourceMap: true,
                                importLoaders: 2,
                                localIdentName: '[name]_[local]__[hash:base64:5]'
                            }
                        },
                        'sass-loader'
                    ]
                })
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
        extensions: ['.js'],
        modules: ['node_modules', 'src']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(Paths.src, 'index.html')
        }),
        new ExtractTextPlugin({filename: "[name].[contenthash].css", allChunks: true}),
        new CopyWebpackPlugin([
            // {from: 'assets/images/**/*', to: ''},
            // {from: 'assets/fonts/**/*', to: ''},
            // {from: 'assets/lang/**/*', to: ''},
            // {from: 'assets/js/**/*', to: ''},
            {from: 'src/static/**/*', to: ''}
            ]),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    devServer: {
        port: 8082,
        host: '127.0.0.1',
        disableHostCheck: true, // so you can use the computers IP address not just 'localhost'/127.0.0.1
        contentBase: Paths.src,
        historyApiFallback: true,
        hot: true,
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:8081",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
        inline: true,
        proxy: {
            "/api/**": {
                target: "http://192.168.9.11",
                secure: false
            },
            "/auth/**": {
                target: "http://192.168.9.11",
                secure: false
            }
        }
    }
};

module.exports = config;