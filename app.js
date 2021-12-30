const express = require("express");
const path = require("path");
const morgan = require("morgan");
const nunjucks = require("nunjucks");

const connect = require("./schemas");

const indexRouter = require("./routes");
const usersRouter = require("./routes/users");
const commentsRouter = require("./routes/comments");

const app = express();

app.set("port", process.env.PORT || 3002);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

connect();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/comments", commentsRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  /* 개발 단계에서만 에러를 나타내 준다  -> 개발 단계이면 err객체를 그냥 쳐 넘겨 */
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
