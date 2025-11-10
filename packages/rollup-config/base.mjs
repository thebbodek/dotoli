import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.ts',
  watch: {
    include: 'src/**',
  },
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: true,
    entryFileNames: '[name].es.js',
  },
  plugins: [
    terser({
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    }),
  ],
};
