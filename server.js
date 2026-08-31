/**
 * Startup file for cPanel / Phusion Passenger (o2switch "Setup Node.js App").
 *
 * Passenger boots this file instead of running `next start`, and injects the
 * port to listen on via the PORT environment variable. Run `npm run build`
 * before (re)starting the application — this only serves an existing build.
 */
const { createServer } = require("http");
const next = require("next");

const port = parseInt(process.env.PORT || "3000", 10);
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(`Ready on port ${port}`);
  });
});
