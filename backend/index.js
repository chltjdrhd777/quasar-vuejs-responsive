//? dependecies
const { response } = require("express");
const express = require("express");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceKey.json");

//? //////

//? config
const app = express();
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
//? //////

//? end point
app.get("/posts", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  let posts = [];

  db.collection("posts")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        posts.push(doc.data());
      });

      res.send(posts);
    });
});

app.post("/createPost", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.send(req.headers);
});
//? ////////

app.listen(process.env.PORT || 3000);
