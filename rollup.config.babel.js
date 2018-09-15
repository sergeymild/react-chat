import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';

const config = {
  input: 'src/index.js',
  external: [
    'react',
    'react-dom'
  ],
  output: [
    {
      moduleName: 'ReactChat',
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
      },
      sourcemap: true,
      file: 'build/reactchat.js',
      format: 'umd'
    },
    {
      moduleName: 'ReactChat',
      globals: {
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
      modules: true
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    resolve({
      extensions: [ '.scss', '.css', '.js', '.jsx', '.json' ]
    }),
    commonjs()
  ]
};

export default config;
