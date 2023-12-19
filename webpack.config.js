const config =  {
    mode: 'production',

    entry: {
        index: './app/js/index.js',
        main: './app/js/main.js',
    },

    output: {
      filename: '[name].bundle.js',
    },

    module: {
        rules:[
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
  };

  module.exports = config;

