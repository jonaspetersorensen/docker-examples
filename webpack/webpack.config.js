const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RemovePlugin = require('remove-files-webpack-plugin'); // https://github.com/Amaimersion/remove-files-webpack-plugin

module.exports = {
   entry: {
      app: './src/index.js',
   },
   devtool: 'inline-source-map',
   devServer: {
      contentBase: './dist',
      port: 3000
   },
   plugins: [
      new RemovePlugin({
         before: {
            // parameters for "before normal compilation" stage.
            // expects what your output folder is 'dist'.
            test: [
               {
                  folder: './dist',
                  method: () => true
               }
            ],
            exclude: [
               './dist/.gitkeep'
            ]
         },
         watch: {
            // parameters for "before watch compilation" stage.
         },
         after: {
            // parameters for "after normal and watch compilation" stage.
         }
      }),
      new HtmlWebpackPlugin({
         title: 'Output Management',
      }),
   ],
   output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
   },
};