const express = require("express");
const app = express();
const Post = require("./api/models/posts");
var multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`);
  },
});

const getExt = (mimetype) => {
  switch (mimetype) {
    case "image/png":
      return ".png";
    case "image/jpeg":
      return ".jpeg";
  }
};

var upload = multer({ storage: storage });
const postsData = new Post();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.get("/api/posts", (req, res) => {
  res.status(200).send(postsData.get());
});

app.get("/api/posts/:postId", (req, res) => {
  const postId = req.params.postId;
  const foundPost = postsData.getIndividualBlog(postId);
  if (foundPost) {
    res.status(200).send(foundPost);
  } else {
    res.status(404).send("Not found");
    console.log("error");
  }
});

app.post("/api/posts", upload.single("post-image"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const newPost = {
    id: `${Date.now()}`,
    title: req.body.title,
    content: req.body.content,
    post_image: `uploads/${req.file.filename}`,
    added_date: `${Date.now()}`,
  };
  postsData.add(newPost);
  res.status(201).send("ok"); //201 means something has been created
});

app.listen(3000, () => console.log("Listening on http://localhost:3000"));
