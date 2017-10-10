const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        filename:'./src/js/app.jsx'
    },
    output: {
        filename: './public/js/app.js'
    },
    module: {
        loaders: [
            { 
                test: /\.jsx$/, 
                loaders: ['react-hot', 'jsx', 'babel'], 
                exclude: /node_modules/ 
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass')
            }
        ]
       },
    plugins: [
        new ExtractTextPlugin('./public/css/style.css',{allChunks:true}),
        new CleanWebpackPlugin(['./public'], {
          exclude: ['index.html']
        })
    ],
    watch: true
};

