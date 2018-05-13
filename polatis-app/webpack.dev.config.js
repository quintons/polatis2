const webpack              = require('webpack'); // main webpack component part
const path                 = require('path');
const ExtractTextPlugin    = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin    = require('html-webpack-plugin'); //
const CopyWebpackPlugin    = require('copy-webpack-plugin');
const apiMocker            = require('connect-api-mocker');
const projectConfig        = require(path.resolve(__dirname, './config/project.config'));
const flowBabelWebpackPlugin = require('flow-babel-webpack-plugin');
const glob                 = require('glob');
const PurifyCSSPlugin      = require('purifycss-webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const Paths = {
    dist:           path.resolve(__dirname, 'dist'),
    src:            path.resolve(__dirname, 'src'),
    indexFile:      path.resolve(__dirname, 'src/index.jsx'),
    nodeModulesDir: path.resolve(__dirname, 'node_modules'),
    sassFile:       path.resolve(__dirname, 'assets/css/main.scss')
};


const config = {
    devtool: '#source-map',
    entry: {
        main: ['react-hot-loader/patch', 'babel-polyfill', Paths.indexFile, Paths.sassFile] // 'babel-polyfill',
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
                                modules: false,
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
        extensions: ['.js', '.jsx', '.scss', '.css'],
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
        new flowBabelWebpackPlugin({
            warn: true,
            formatter: function (errorCode, errorDetails) {
                return 'A Flow error was detected: ' + errorCode + '\n\n' + errorDetails;
            },
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new HtmlWebpackPlugin({
            template: path.join(Paths.src, 'index.html')
        }),
        new ExtractTextPlugin({filename: "[name].[contenthash].css", allChunks: true }),
        // new PurifyCSSPlugin({
        //     paths: glob.sync(path.join(__dirname, 'src/*.html')),
        // }),
        new CopyWebpackPlugin([
            {from: 'assets/images/**/*', to: ''},
            {from: 'assets/fonts/**/*', to: ''},
            {from: 'assets/lang/**/*', to: ''},
            {from: 'assets/js/**/*', to: ''},
            {from: 'src/static/**/*', to: ''}
            ]),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
    devServer: {
        before: function(app) {
            if (projectConfig.offline) {
                app.use(apiMocker('/api/data/port-config/port', '__endpoint-mocks/api/data/port-config/port'));
                app.use(apiMocker('/api/data/product-information', '__endpoint-mocks/api/data/product-information'));
                app.use(apiMocker('/api/data/cross-connects/pair', '__endpoint-mocks/api/data/cross-connects/pair'));
                app.use(apiMocker('/api/data/system-config/user', '__endpoint-mocks/api/data/system-config/user'));
                app.use(apiMocker('/auth/login.ss', '__endpoint-mocks/auth/login'));
                app.use(apiMocker('/auth/logout.ss', '__endpoint-mocks/api/logout'));
            }
        },
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

module.exports = config;