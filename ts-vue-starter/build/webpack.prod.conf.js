'use strict'

const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const prodConfig = merge(baseWebpackConfig, {
    mode: "production"
})

module.exports = prodConfig;