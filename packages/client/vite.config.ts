import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
const defaultConfig = {
  base: '/',
  plugins: [react()],
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ['VITE', 'WEB', 'API']);

  return {
    ...defaultConfig,
    server: {
      port: Number(env.WEB_PORT),
      strictPort: true,
      host: true,
    },
    define: {
      env: JSON.stringify(env),
    },
  };
});

