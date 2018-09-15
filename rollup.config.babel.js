import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import includePaths from 'rollup-plugin-includepaths';
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
    includePaths({
      include: {},
      paths: ['src/'],
      external: [],
      extensions: ['.js', '.jsx', '.css', '.scss']
    }),
    postcss({
      extensions: ['.css', '.scss'],
      modules: true
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    resolve(),
    commonjs()
  ]
};

export default config;
