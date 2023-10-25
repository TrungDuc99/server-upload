const express = require("express");
const app = express();
const debug = require("debug")("myapp:server");
const path = require("path");
const multer = require("multer");
const logger = require("morgan");
const serveIndex = require("serve-index");
require("dotenv").config();
const port = process.env.PORT || 3000;

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

//will be using this for uplading
const upload = multer({ storage: storage });

//get the router
const userRouter = require("./routes/user.route");

app.use(logger("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(
  "/ftp",
  express.static("public"),
  serveIndex("public", { icons: true })
);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/uploadfile", upload.single("file"), function (req, res) {
  debug(req.file);

  return res.send({
    ...req.file,
    url: `http://localhost:${port}/ftp/uploads/${req.file.filename}`,
  });
});

app.post("/uploadmultiple", upload.array("files", 12), (req, res, next) => {
  debug(req.files);
  const files = req.files;
  let newFiles = files.map((file) => {
    return {
      ...file,
      url: `http://localhost:${port}/ftp/uploads/${file.filename}`,
    };
  });
  if (!files) {
    const error = new Error("Please choose files");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(newFiles);
});

//if end point is /users/, use the router.
app.use("/users", userRouter);

app.listen(port, () => {
  debug("Server is up and running on port ", port);
  console.log(`Server is running at port http://localhost:${port}`);
});
