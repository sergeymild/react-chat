import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import sass from 'node-sass';

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
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs(),
    postcss({
      extensions: ['.css', '.scss'],
      modules: true,
      preprocessor: (content, id) => new Promise((resolve) => {
        const result = sass.renderSync({ file: id });
        resolve({ code: result.css.toString() });
      })
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    resolve()
  ]
};

export default config;
