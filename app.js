import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import express from "express";
import { engine } from "express-handlebars";
import session from "express-session";
import bodyParser from "body-parser";
import createMemoryStore from "memorystore";
import Grant from "grant-express";
// import tumblr from 'tumblr.js';

import indexRoute from "./routes/index.js";
import connectTumblrRoute from "./routes/connect-tumblr.js";
import callbackRoute from "./routes/callback.js";
import disconnectRoute from "./routes/disconnect.js";

const app = express();
const MemoryStore = createMemoryStore(session);

app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

const grant = new Grant({
  server: {
    protocol: "https",
    host: `${process.env.PROJECT_DOMAIN}.glitch.me`,
    callback: "/callback",
    transport: "session",
  },
  tumblr: {
    request_url: "https://www.tumblr.com/oauth/request_token",
    authorize_url: "https://www.tumblr.com/oauth/authorize",
    access_url: "https://www.tumblr.com/oauth/access_token",
    oauth: 1,
    /* Change these based on which bot you need to authenticate. */
    key: process.env.BOT_1_TUMBLR_CONSUMER_KEY,
    secret: process.env.BOT_1_TUMBLR_CONSUMER_SECRET,
  },
});

if (process.env.SESSION_SECRET) {
  app.use(
    session({
      store: new MemoryStore({
        checkPeriod: 86400000,
      }),
      secure: true,
      resave: false,
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
    })
  );
}

app.use(grant);

console.log("loading app...");

app.use("/", indexRoute);
app.use("/connect-tumblr", connectTumblrRoute);
app.use("/callback", callbackRoute);
app.use("/disconnect", disconnectRoute);

app.use("/images", express.static(__dirname + "/temp/"));

app.use(express.static("public"));
app.use(express.static("views"));

export default app;
