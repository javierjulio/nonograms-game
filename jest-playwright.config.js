module.exports = {
  // browsers: ["chromium", "firefox", "webkit"],
  // devices: [],
  launchOptions: {
    headless: true
  },
  serverOptions: {
    // create-react-app start command will open browser by default
    command: `BROWSER=none npm run start`,
    port: 3000,
    launchTimeout: 10000,
    debug: true
  }
}
