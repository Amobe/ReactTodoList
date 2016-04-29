var path = require('path');
var webpack = require('webpack');

var config = {
    entry: {
        app: ['webpack/hot/dev-server', path.resolve(__dirname, 'app/main.js')],
        vendors: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    resolve: {
        alias: {},
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ],
    module: {
        noParse: [],
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    addVendor: function(name, path) {
        this.resolve.alias[name] = path;
        this.module.noParse.push(new RegExp('^' + name + '$'));
    }
};


var bowerDir = 'bower_components';
var libReactPath = path.resolve(__dirname, bowerDir + '/react/react.min.js');
var libReactDomPath = path.resolve(__dirname, bowerDir + '/react/react-dom.min.js');
config.addVendor('react', libReactPath);
config.addVendor('react-dom', libReactDomPath);

module.exports = config;
