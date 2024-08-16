import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
// import vue from '@vitejs/plugin-vue';
// import viteSass from 'vite-plugin-sass';
import fs from 'fs';

// "@vitejs/plugin-vue": "^4.5.0",
/**
 *"dist": "cd ui && npm run build && cd .. && npm run build"
 */
export default defineConfig({
  build: {
    outDir: '../../public/build-vue',
    emptyOutDir: true,
    manifest: true,
  },
  plugins: [
    // vue({
    //     template: {
    //         transformAssetUrls: {
    //             base: null,
    //             includeAbsolute: false,
    //         },
    //     },
    // }),
    {
      name: 'prod-files',
      buildEnd() {
        const sourceIndexPath = 'quasar/dist/spa/ui/index.html';
        const destinationIndexPath = 'resources/views/app.blade.php';
        const sourceDir = 'quasar/dist/spa/ui';
        const destinationDir = '../../public/ui';

        console.log('Build started...');
        fs.copyFile(sourceIndexPath, destinationIndexPath, (err) => {
          if (err) {
            console.error('Error copying index.html:', err);
            return;
          }

          console.log('index.html copied to app.blade.php');

          fs.readFile(destinationIndexPath, 'utf-8', (err, contents) => {
            if (err) {
              console.error('Error reading app.blade.php:', err);
              return;
            }

            const csrfMetaTag = '<head><meta name="csrf-token" content="{{ csrf_token() }}">';
            const replacedContents = contents
              .replace(/<head>/g, csrfMetaTag);
              // .replace(/src="\//g, 'src="/ui/')
              // .replace(/href="\//g, 'href="/ui/');

            fs.writeFile(destinationIndexPath, replacedContents, 'utf-8', (err) => {
              if (err) {
                console.error('Error writing app.blade.php:', err);
                return;
              }

              console.log('CSRF token added and asset paths adjusted in app.blade.php');
            });
          });
        });

        fs.rm(destinationDir, { recursive: true, force: true }, (err) => {
          if (err) {
            console.error('Error emptying directory:', err);
          } else {
            fs.mkdir(destinationDir, { recursive: true }, (err) => {
              if (err) {
                console.error('Error creating directory:', err);
              } else {
                console.log('Empty directory created:', destinationDir);
              }
            });
            // Cp
            fs.cp(sourceDir, destinationDir, { recursive: true }, (err) => {
              if (err) {
                console.error('Error copying directory:', err);
                return;
              }

              console.log('SPA directory copied to public/ui');
            });
            console.log('Directory emptied successfully:', destinationDir);
          }
        });

      }
    }
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
});
