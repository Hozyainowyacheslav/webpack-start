const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PATHS = {
    src: path.resolve(__dirname, 'src'),
    dist: path.resolve(__dirname, 'dist'),
    assets: 'assets/',
    js: path.resolve(__dirname, 'src/js'),
}

let conf = {
    externals: {
        paths: PATHS
    },
    //entry: './src/index.js',

    entry: [
        
        './src/scss/main.scss',
        PATHS.js,
    ],

    // entry: {
    //     app: './src/index.js',
    //     module: './src/scss/main.scss'
    // },

    output: {
        path: PATHS.dist,
        filename: `${PATHS.assets}js/main.js`,
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.m?js$/, // все файлы с расширением js                
                exclude: /(node_modules|bower_components)/,
                
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "@babel/preset-env",
                        ]
                    }
                }
            },

            {
                test: /\.scss$/,
                //fallback: 'style-loader',
                use:  [  
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true, url: false }
                    },
                    {
                        loader: 'postcss-loader',
                        options: { 
                            sourceMap: true,
                            config: {
                                path: 'postcss.config.js'
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    },
                ]
              }, 
              
              {
                test: /\.css$/,
                use: [
                  'style-loader',
                  MiniCssExtractPlugin.loader,
                  {
                    loader: 'css-loader',
                    options: { sourceMap: true }
                  }, {
                    loader: 'postcss-loader',
                    options: { sourceMap: true, config: { path: `./postcss.config.js` } }
                  }
                ]
              },

              {
                  test: /\.(png|jpg|svg|gif)$/,
                  loader: 'file-loader',
                  options: {
                      name: '[name].[ext]'
                  }
              }
       
        ]
    },

    // Регистрация плагинов
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].css`,
            publicPath: '../',
        }),
        new HtmlWebpackPlugin({
            hash: false,
            template: `${PATHS.src}/index.html`,
            filename: './index.html',
        }),
        new CopyWebpackPlugin([
            { from: `${PATHS.src}/images`, to: `${PATHS.assets}images` },
            { from: `${PATHS.src}/favicon.ico`, to: `${PATHS.dist}` },
        ])
    ]
}

module.exports = conf;