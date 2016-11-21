var webpack = require("webpack"),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    pxtorem = require('postcss-pxtorem');


var pxtoremOpts = {
    rootValue: 37.5,
    unitPrecision: 5,
    propWhiteList: [],
    selectorBlackList: [],
    replace: true,
    mediaQuery: false,
    minPixelValue: 2
};

var src = path.resolve(__dirname, './src'); // 源码目录

var mockport, hashType, devtool;

var isProductEnv = process.env.NODE_ENV === 'production';
//default to dev environment
function env(dev, product) {
    if (!product) {
        product = dev;
    }
    return isProductEnv ? product : dev;
}
//开发环境和上线环境需要区分
if (process.env.NODE_ENV === 'production') {
    //上线环境
    // 配置2：hasType
    // 在上线环境使用chunkhash
    hashType = 'chunkhash';
    // 配置3：devtool
    // 在上线环境中，devtool为空值
    devtool = '';
} else { //其他都是开发环境

    //配置1：mockport
    //bizdp在启动webpack-dev-server时会默认把bizmock监听的随机端口号从命令行中传递过来
    //eg:webpack-dev-server --mockport 8888
    process.argv.forEach(function(val, index) {
        if (val === '--mockport') {
            mockport = process.argv[index + 1];
            return false;
        }
    });

    //配置2：hasType
    // 在开发环境中要使用hash代替chunkhash
    // webpack-dev-server不支持chunkhash
    hashType = 'hash';
    // 配置3：devtool
    // 在上线环境中，devtool为source-map
    devtool = 'source-map';
}

var config = {
    entry: {
        app: "./index.js",
        vendor: [
            'history',
            'react',
            'react-dom',
            'react-router',
            'es6-promise',
            'fetch-polyfill',
            '@bizfe/biz-mobile-ui'
        ],

    },
    output: {
        path: 'dist',
        filename: env('[name].js', '[name].[' + hashType + '].js'),
        publicPath: '/dist/',
        chunkFilename: env('[name].js', '[name].[' + hashType + '].js')
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json', '.es6.js'],
    },
    // resolveLoader: {
    //     root: path.join(__dirname, 'node_modules')
    // },

    module: {
        loaders: [{
            test: /\.less$/,
            //loaders: ['style', 'css?sourceMap', 'postcss?sourceMap','less?sourceMap'],
            loader: ExtractTextPlugin.extract("css?sourceMap!postcss?sourceMap!less?sourceMap")
        }, {
            test: /\.(css)$/i,
            loader: ExtractTextPlugin.extract('css?sourceMap!postcss?sourceMap')

        }, {
            //eot文件等后面会加上?v=4.0.0导致loader匹配不上，所以后面再加上正则匹配
            test: /\.(jpg|png|jpg|png|woff|woff2|eot|ttf|svg|gif)([\?]?.*)$/,
            loader: "url?name=[name].[ext]"
                // }, {
                //     //     test: /\.(jpe?g|png|gif|svg|ico)/i,
                //     //     loader: 'file?name=img_[hash:8].[ext]',
                //     // }, {
                //     test: /\.(jpe?g|png|gif)$/i,
                //     loaders: ['url?limit=10000&name=image/[hash:8].[name].[ext]'],
                //     exclude: /node_modules/
        }, {
            test: /\.(js|jsx)$/i,
            exclude: /node_modules/,
            loader: 'babel',
            query: {

            }
            // }, {
            //     test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            //     loader: 'file-loader'
        }]
    },
    postcss: function() {
        return [require('postcss-flexboxfixer'), require('autoprefixer'), pxtorem(pxtoremOpts)];
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /^\.\/zh\-cn$/),
        // //生成vendor chunk，抽取第三方模块单独打包成独立的chunk
        // new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[hash].js'),
        // //抽取webpack loader公共部分的代码到manifest.js中，避免每次打包时hash发生变化
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ['vendor', 'manifest']
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: env('vendor.js', 'vendor.[' + hashType + '].js'),
            chunks: ['app', 'vendor']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            filename: env('manifest.js', 'manifest.[' + hashType + '].js'), //仅包含webpack运行时环境和映射表
            chunks: ['vendor']
        }),

        // new HtmlWebpackPlugin({
        //     template: './src/views/app.html',
        //     filename: './index.html',
        //     inject: true,
        //     chunks: ['app', 'vendor', 'manifest']
        // }),

        new ExtractTextPlugin(env('[name].css', '[name].[' + hashType + '].css'), {
            allChunks: false
        }),
    ],
    devServer: {
        proxy: {
            '*.action': {
                target: 'http://localhost:' + mockport,
                bypass: function(req, res, proxyOptions) {
                    //处理jsp页面默认的action
                    if (req.headers.accept.indexOf('html') != -1) {
                        return 'app.html';
                    }
                }
            },
            '*/mobile/*': {
                target: 'http://localhost:' + mockport,
            }
        }
    },
    devtool: devtool
}

if (process.env.NODE_ENV === 'production') {

    config.plugins.push(
        new HtmlWebpackPlugin({
            template: './appBuild.html',
            filename: 'index.html',
            inject: true,
            chunks: ['app', 'vendor', 'manifest']
        })
    );
    //只有线上环境和qa环境在build的时候才需要压缩
    //devserver不能压缩，因为如果压缩，内存打包非常慢
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: false,
        sourceMap: false
    }))
}

module.exports = config;
