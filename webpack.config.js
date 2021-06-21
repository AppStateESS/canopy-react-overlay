/* global __dirname, module */
const path = require('path')
module.exports = (env, argv) => {
  const inDevelopment = argv.mode === 'development'

  const settings = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'index.js',
      libraryTarget: 'commonjs2',
    },
    resolve: {
      alias: {
        react: path.resolve(__dirname, './node_modules/react'),
        'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      },
    },
    module: {
      rules: [
        {
          test: /\.s?css$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.jsx?/,
          resolve: {
            extensions: ['.js', '.jsx'],
          },
          include: path.resolve(__dirname, 'src'),
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
      ],
    },
  }

  if (inDevelopment) {
    settings.devtool = 'inline-source-map'
  }
  return settings
}
