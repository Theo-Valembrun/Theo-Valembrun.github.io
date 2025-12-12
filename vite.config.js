import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createHtmlPlugin } from 'vite-plugin-html';
import { readFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: 'src',
  publicDir: resolve(__dirname, 'public'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html')
      }
    }
  },
  css: {
    postcss: './postcss.config.cjs'
  },
  plugins: [
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          header: readFileSync(resolve(__dirname, 'src/partials/header.html'), 'utf-8'),
          main: readFileSync(resolve(__dirname, 'src/partials/main.html'), 'utf-8'),
          footer: readFileSync(resolve(__dirname, 'src/partials/footer.html'), 'utf-8')
        }
      }
    })
  ]
});
