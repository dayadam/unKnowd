module.exports = {
    apps : [
        {
          name: "unKnowd",
          script: "./server.js",
          watch: true,
          env: {
              "NODE_ENV": "development"
          },
          env_production: {
              "NODE_ENV": "production",
              exec_mode : "cluster",
              instances : "max"
          }
        }
    ]
  }