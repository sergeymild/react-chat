import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';

const env = process.env.NODE_ENV;

const config = {
  input: 'src/index.js',
  external: [
    'classnames',
    'dompurify',
    'prop-types',
    'react-dom',
    'react'
  ],
  output: [
    {
      moduleName: 'ReactChat',
      name: 'ReactChat',
      globals: {
        'classnames': 'cx',
        'dompurify': 'DOMPurify',
        'prop-types': 'PropTypes',
        'react': 'React',
        'react-dom': 'ReactDOM'
      },
      sourcemap: true,
      file: 'build/reactchat.js',
      format: 'umd'
    },
    {
      moduleName: 'ReactChat',
      name: 'ReactChat',
      globals: {
        'classnames': 'cx',
        'dompurify': 'DOMPurify',
        'prop-types': 'PropTypes',
        'react': 'React',
        'react-dom': 'ReactDOM'
      },
      sourcemap: true,
      file: 'build/reactchat.module.js',
      format: 'es'
    },
  ],
  plugins: [
    postcss({
      extensions: ['.css', '.scss'],
      modules: true
    }),
    resolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    }),
    sizeSnapshot()
  ]
};

export default config;
