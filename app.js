const express = require("express");
const {
  MONGO_IP_Address,
  MONGO_PORT,
  MONGO_USER,
  MONGO_PASSWORD,
  SESSION_SECRET,
  REDIS_PORT,
  REDIS_URL,
} = require("./config");
const app = require("express")();
const mongoose = require("mongoose");
const port = process.env.PORT;
const protectRoutes = require("./middleware/protect");
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/user");
const redis = require("redis");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const cors = require("cors");
const redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});

app.use(cors());
const repeatConnection = () => {
  mongoose
    .connect(
      `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP_Address}:${MONGO_PORT}/?authSource=admin`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
      }
    )
    .then(() => {
      console.log("connected to mongo");
    })
    .catch((e) => {
      console.log(e);
      setTimeout(() => {
        repeatConnection();
      }, 1000);
    });
};
repeatConnection();

app.enable("trust proxy"); //to trust nginx proxy in producation
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 30000,
    },
  })
);
app.use(express.json());
app.get("/api", (req, res) => {
  console.log("hello docker cpurse");
  res.send("hello docker!!!");
});
app.use("/api/posts", protectRoutes, postRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log("listening on 3000");
});
