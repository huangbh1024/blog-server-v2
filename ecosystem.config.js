module.exports = {
  apps: [
    {
      name: 'blog-server-v2',
      port: '7001',
      exec_mode: 'cluster',
      script: './bootstrap.js',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
