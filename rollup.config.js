import sass from 'rollup-plugin-sass';
import { defineConfig } from 'rollup';
import typescript from 'rollup-plugin-typescript2';
import terser from '@rollup/plugin-terser';
import pkg from './package.json' assert { type: 'json' };

export default defineConfig({
  input: 'src/hooks/useInappManager/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'auto',
    },
    {
      file: 'dist/index.es.js',
      format: 'es',
      sourcemap: true,
      exports: 'auto',
    },
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
    }),
    terser(),
  ],
  external: ['react', 'react-dom', 'socket.io-client', 'react-native-device-info'],
});
