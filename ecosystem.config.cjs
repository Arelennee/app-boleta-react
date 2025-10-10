module.exports = {
  apps: [
    {
      name: 'boleta-api',
      script: 'src/backend/server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 4000, // Puerto definido en tu archivo .env
      },
    },
    {
      name: 'boleta-web',
      script: 'serve',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        PM2_SERVE_PATH: 'dist',
        PM2_SERVE_PORT: 8080, // Puerto para el frontend
        PM2_SERVE_SPA: 'true',
        PM2_SERVE_HOMEPAGE: '/index.html',
      },
    },
  ],
};
