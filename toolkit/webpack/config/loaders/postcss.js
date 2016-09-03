import autoprefixer from 'autoprefixer';

export default [
  // Supported Browsers via `Autoprefixer`
  // see: https://github.com/ai/browserslist
  autoprefixer({
    browsers: [
      '> 0.8%',
      'last 2 versions',
      'Explorer >= 9',
    ],
  }),
];
