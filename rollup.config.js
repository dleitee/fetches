import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.js',
  output: {
    file: 'build/bundle.js',
    format: 'cjs',
  },
  plugins: [
    resolve({ modulesOnly: true, jsnext: true }),
    commonjs(),
    babel({ exclude: 'node_modules/**' }),
  ],
  external: ['is-string', 'is-array', 'normalize-url', 'deepmerge', 'unfetch'],
}
