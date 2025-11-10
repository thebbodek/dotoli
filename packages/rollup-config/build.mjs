import typescript from 'rollup-plugin-typescript2';

export default {
  plugins: [
    typescript({
      tsconfig: './tsconfig.build.json',
      useTsconfigDeclarationDir: true,
      clean: true,
      tsconfigOverride: {
        compilerOptions: {
          emitDeclarationOnly: false,
        },
      },
    }),
  ],
};
