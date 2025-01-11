import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the
  // `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // vite config
    define: {
      __REACT_APP_BASE_URL__: JSON.stringify(env.REACT_APP_BASE_URL),
    },
    plugins: [
      react(),
      svgr({ 
        svgrOptions: {
          prettier: true,
          svgo: false,
          svgoConfig: {
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    // disable plugins
                    cleanupIDs: false,
                    removeDimensions: false,
                    removeViewBox: false,
                  },
                },
              }
            ],
          },
          titleProp: true,
        },
      }),
    ],
    // server: {
    //   port: 3000,
    // },
    // build: {
    //   outDir: 'dist',
    // }
  }
})