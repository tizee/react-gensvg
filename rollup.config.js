// locates third party modules in node_modules
import resolve from '@rollup/plugin-node-resolve';
// typescript
import typescript from '@rollup/plugin-typescript';
// import { uglify } from 'rollup-plugin-uglify';
import copy from 'rollup-plugin-copy';

/* resolve options */
const extensions = ['.js', '.ts'];

export default {
  input: { index: 'src/file.ts' },
  external: ['prettier', 'fs', 'path', 'react-domproperty', 'svg-parser'],
  plugins: [
    resolve({ extensions: extensions }),
    typescript({
      tsconfig: false,
      exclude: ['node_modules', 'src/__test__/**/*'],
    }), // Convert TS to JS
    copy({
      targets: [
        {
          src: 'src/types/file.d.ts',
          dest: 'dist/types/',
          rename: 'index.d.ts',
        },
      ],
    }),
  ],
  output: { dir: 'dist', format: 'cjs' },
};
