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
};
