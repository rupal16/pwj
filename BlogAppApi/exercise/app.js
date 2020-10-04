const express = require("express");
const app = express();
const Post = require("./api/models/posts");
const postsData = new Post();

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
  }
});

app.listen(3000, () => console.log("Listening on http://localhost:3000"));
