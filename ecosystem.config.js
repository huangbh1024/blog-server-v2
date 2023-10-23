module.exports = {
  apps: [
    {
      name: 'blog-server-v2',
      port: '7001',
      exec_mode: 'cluster',
      instances: 'max',
      script: './bootstrap.js',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
