const PATH = "./data.json";
const fs = require("fs");

class Post {
  get() {
    return this.readData();
  }

  getIndividualBlog() {}

  add() {}

  readData() {
    let rawData = fs.readFileSync(PATH);
    let posts = JSON.parse(rawData);
    return posts;
  }
}

module.exports = Post;
