import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';

export default {
  input: 'material_imports.js', // Specify the entry point here
  output: {
    file: 'dist/material.js', // Output file
    format: 'iife' // Output format
  },
  plugins: [
    resolve(),
    // copy({
    //   targets: [
    //     { src: 'node_modules/@material/web/**/*.css.map', dest: 'public/build/material' }
    //   ]
    // })
  ]
};