import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/imgs',
          dest: 'assets/imgs'
        },
        {
          src: 'src/assets/vectors',
          dest: 'assets/vectors'
        }
      ]
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ]
})
