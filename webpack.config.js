/**
 * @author: addyxu;zimyuan;
 * @last-edit-date: 2016-10-05
 */

var webpack = require('webpack');
var path    = require('path');

module.exports = {
    entry: [
        path.resolve(__dirname, 'src/index.js')
    ],
    output: {
        path           : __dirname + '/dist',
        publicPath     : '/',
        filename       : './mini_jsonp.js',
        library        : 'miniJsonp',
        libraryTarget  : 'umd',
        umdNamedDefine : true
    },
    module: {
        loaders:[
            { test: /\.js[x]?$/, include: path.resolve(__dirname, 'src'), exclude: /node_modules/, loader: 'babel-loader' },
        ]
    },
    resolve: {
        extensions: ['', '.js']
    }
};
