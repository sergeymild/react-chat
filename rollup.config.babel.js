import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';

const moduleProps = {
  moduleName: 'ReactChat',
  globals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  sourcemap: true
};

const config = {
  input: 'src/index.js',
  external: [
    'react',
    'react-dom'
  ],
  output: [
    {
      ...moduleProps,
      file: 'build/reactchat.js',
      format: 'umd'
    },
    {
      ...moduleProps,
      file: 'build/reactchat.module.js',
      format: 'es'
    },
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs(),
    postcss({
      modules: true
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    resolve()
  ]
};

export default config;
