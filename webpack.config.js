module.exports = {
  entry: [
    './source/entry.jsx',
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'babel-loader' },
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
