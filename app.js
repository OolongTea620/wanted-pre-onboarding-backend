require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const routes = require("./routes");

const { sequelize } = require("./models/connectDB");

const app = express();
const port = process.env.PORT || 3000;
app.set("port", port);

app.use(morgan("dev"));
app.use(express.json());
app.use(routes);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터 베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

const start = async () => {
  try {
    app.listen(port, () => console.log(`${port}번 포트에서 대기중...`));
  } catch (err) {
    console.error(err);
  }
};
app.get("/", (req, res) => {
  res.send("Hello express");
});

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

start();

//통합 테스트
module.exports = app;
