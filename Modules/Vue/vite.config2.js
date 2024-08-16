import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
// import viteSass from 'vite-plugin-sass';
import fs from 'fs';

/**
 *"dist": "cd ui && npm run build && cd .. && npm run build"
 */
export default defineConfig({
    // build: {
    //     outDir: '../../public/build-vue',
    //     emptyOutDir: true,
    //     manifest: true,
    // },
    plugins: [
        // laravel({
        //     publicDirectory: '../../public',
        //     buildDirectory: 'build-vue',
        //     input: [
        //         __dirname + '/resources/sass/app.scss',
        //         __dirname + '/resources/js/app.js',
        //     ],
        //     refresh: true,
        // }),
        // laravel({
        //     input: [
        //         'resources/sass/app.scss',
        //         'resources/js/app.js',
        //     ],
        //     refresh: true,
        // }),
        // vue({
        //     template: {
        //         transformAssetUrls: {
        //             base: null,
        //             includeAbsolute: false,
        //         },
        //     },
        // }),
        // {
        //     name: 'prod-files',
        //     buildEnd() {
        //         const sourceIndexPath = 'quasar/dist/spa/index.html';
        //         const destinationIndexPath = 'resources/views/app.blade.php';
        //         const sourceDir = 'ui/dist/spa';
        //         const destinationDir = '../../public_test/ui';

        //         console.log('Build started...');
        //         fs.copyFile(sourceIndexPath, destinationIndexPath, (err) => {
        //             if (err) {
        //                 console.error('Error copying index.html:', err);
        //                 return;
        //             }

        //             console.log('index.html copied to app.blade.php');

        //             fs.readFile(destinationIndexPath, 'utf-8', (err, contents) => {
        //                 if (err) {
        //                     console.error('Error reading app.blade.php:', err);
        //                     return;
        //                 }

        //                 const csrfMetaTag = '<head><meta name="csrf-token" content="{{ csrf_token() }}">';
        //                 const replacedContents = contents
        //                     .replace(/<head>/g, csrfMetaTag)
        //                     .replace(/src="\//g, 'src="/ui/')
        //                     .replace(/href="\//g, 'href="/ui/');

        //                 fs.writeFile(destinationIndexPath, replacedContents, 'utf-8', (err) => {
        //                     if (err) {
        //                         console.error('Error writing app.blade.php:', err);
        //                         return;
        //                     }

        //                     console.log('CSRF token added and asset paths adjusted in app.blade.php');
        //                 });
        //             });
        //         });

        //         fs.cp(sourceDir, destinationDir, { recursive: true }, (err) => {
        //             if (err) {
        //                 console.error('Error copying directory:', err);
        //                 return;
        //             }

        //             console.log('SPA directory copied to public/ui');
        //         });
        //     }
        // }
    ],
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm-bundler.js',
        },
    },
});
