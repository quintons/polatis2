const webpack              = require('webpack');
const path                 = require('path');
const ExtractTextPlugin    = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const CopyWebpackPlugin    = require('copy-webpack-plugin');
const flowBabelWebpackPlugin = require('flow-babel-webpack-plugin');
const glob                 = require('glob');
const PurifyCSSPlugin      = require('purifycss-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const Paths = {
    dist:           path.resolve(__dirname, 'dist'),
    src:            path.resolve(__dirname, 'src'),
    indexFile:      path.resolve(__dirname, 'src/index.jsx'),
    nodeModulesDir: path.resolve(__dirname, 'node_modules'),
    sassFile:       path.resolve(__dirname, 'assets/css/main.scss')
};

const config = {
    // devtool: 'cheap-module-source-map',
    entry: {
        main: ['babel-polyfill', Paths.indexFile, Paths.sassFile] // 'babel-polyfill',
    },
    output: {
        path: Paths.dist,
        filename: "[name].[hash].bundle.js",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude:  [Paths.nodeModulesDir],
                use:   [{
                    loader: 'babel-loader?cacheDirectory&cacheIdentifier='+ Math.random(),
                    options: {
                        presets: ["env", "react", "stage-0",
                            ["env", {
                                "targets": {
                                    "browsers": ["last 2 versions", "ie >= 11", "safari >= 7"]
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
        extensions: ['.js', '.jsx'],
        modules: ['node_modules', 'src'],
        alias: {
            actions: path.resolve(__dirname, 'src/_actions'),
            components: path.resolve(__dirname, 'src/_components'),
            constants: path.resolve(__dirname, 'src/_constants'),
            reducers: path.resolve(__dirname, 'src/_reducers'),
            routes: path.resolve(__dirname, 'src/_routes'),
            services: path.resolve(__dirname, 'src/_services'),
            utils: path.resolve(__dirname, 'src/_utils'),
            containers: path.resolve(__dirname, 'src/containers'),
            static: path.resolve(__dirname, 'src/static'),
            config: path.resolve(__dirname, 'config'),
            assets: path.resolve(__dirname, 'assets')
        }
    },
    plugins: [
        new BundleAnalyzerPlugin(),
        new flowBabelWebpackPlugin({
            warn: true,
            formatter: function (errorCode, errorDetails) {
                return 'A Flow error was detected: ' + errorCode + '\n\n' + errorDetails;
            },
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: false,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true
            },
            output: {
                comments: false
            }
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(Paths.src, 'index.html'),
            minify: {
                collapseWhitespace: true,
                collapseInlineTagWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true
            }
        }),
        new ExtractTextPlugin({filename: "[name].[contenthash].css", allChunks: true}),
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'src/*.html')),
            verbose: true,
        }),
        new CopyWebpackPlugin([
            {from: Paths.nodeModulesDir + '/simple-line-icons/fonts', to: 'src/static/fonts'},
            {from: 'messages', to: 'messages'},
            {from: 'src/static/**/*', to: ''}
        ]),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    devServer: {
        port: 8081,
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

// secure: false
// headers: {'Access-Control-Allow-Origin': '*'},
// headers: {
//     "Access-Control-Allow-Origin": "http://localhost:8081",
//         "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
//         "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
// },
// ,
// proxy: {
//     '/api/**': {
//         target: 'http://192.168.9.11',
//             pathRewrite: {'^/api': ''},
//             secure: false
//     }
// }
module.exports = config;