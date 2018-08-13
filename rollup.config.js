import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [
  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // the `targets` option which can specify `dest` and `format`)
  {
    input: 'lib/index.js',
    external: ['axios'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      babel({
        babelrc: true,
        exclude: ['node_modules/**'],
        // plugins: ['@babel/plugin-external-helpers'],
        // presets: [
        //   ['env', { modules: false }],
        // ],
      }),
    ],
  },
];
