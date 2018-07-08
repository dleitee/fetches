import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/module.js',
    format: 'cjs',
  },
  plugins: [
    resolve({
      modulesOnly: true,
      jsnext: true,
      customResolveOptions: {
        moduleDirectory: 'node_modules',
      },
    }),
    commonjs(),
    babel({ exclude: 'node_modules/**', runtimeHelpers: true }),
  ],
  external: ['is-string', 'is-array', 'normalize-url', 'deepmerge', 'unfetch'],
}
