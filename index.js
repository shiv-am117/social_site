const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

var db = mysql.createConnection({
  user: "YMoFeGpUo0",

  password: "ecwwogVuGT",

  database: "YMoFeGpUo0",

  host: "remotemysql.com",

  port: "3306"
});
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log("MYsql Connected...");
});
function to_hex(srcData) {
  const buffer = Buffer.from(srcData, "base64");
  let bufString = buffer.toString("hex");
  bufString = "0x" + bufString;
  return bufString;
}
app.post("/user/add", (req, res) => {
  let user = req.body;

  sql = `INSERT INTO users(firstname,lastname,username,email,password,dob,gender)\
   VALUES('${user.fname}',
  '${user.lname}','${user.uname}','${user.email}','${user.pass}','${
    user.dob
  }','${user.gender}')`;
  db.query(sql, (err, result) => {
    if (err) return res.send(err);
    else {
      return res.send(result);
    }
  });
});

app.post("/login", (req, res) => {
  let user = req.body;
  let sql = `SELECT user_id FROM users WHERE username='${
    user.name
  }' AND password='${user.pass}' `;
  db.query(sql, (err, result) => {
    if (err) return res.send(err);
    else if (result.length > 0) {
      return res.send(result);
    } else return res.send("incorrect username or password");
  });
});

app.get("/user_info", (req, res) => {
  let id = req.query.user_id;
  let sql = `SELECT * FROM users WHERE user_id='${id}' `;
  db.query(sql, (err, result) => {
    if (err) return res.send(err);
    else if (result.length > 0) {
      return res.send(result);
    } else return res.send("incorrect username or password");
  });
});

app.get("/part_info", (req, res) => {
  let id = req.query.id;
  let info = req.query.info;
  let table = req.query.table;
  let sql = `SELECT ${info} FROM ${table} WHERE user_id=${id} `;
  db.query(sql, (err, result) => {
    if (err) return res.send(err);
    else if (result.length > 0) {
      return res.send(result);
    } else return res.send(false);
  });
});

app.post("/image", (req, res) => {
  let id = req.body.id;
  let im = req.body.image;
  let date = req.body.date;
  im = to_hex(im);

  let sql = `INSERT INTO image(user_id,images,image_date) values('${id}',${im},'${date}')`;
  db.query(sql, (err, result) => {
    if (err) return res.send(err);
    else if (result.length > 0) {
      return res.send("Added");
    } else return res.send("Not Added");
  });
});

app.get("/check_follow", (req, res) => {
  let user1 = req.query.user1;
  let user2 = req.query.user2;
  let sql = `SELECT ind FROM follow WHERE user1=${user1} AND user2=${user2} `;
  db.query(sql, (err, result) => {
    if (err) return res.send(err);
    else if (result.length > 0) {
      return res.send(true);
    } else return res.send(false);
  });
});
app.get("/follow", (req, res) => {
  let user1 = req.query.user1;
  let user2 = req.query.user2;

  let sql = `INSERT INTO follow(user1,user2) values(${user1},${user2})`;
  db.query(sql, (err, result) => {
    console.log(result);
    if (err) return res.send(err);
    else if (result.affectedRows > 0) {
      return res.send(true);
    } else return res.send(false);
  });
});

app.delete("/unfollow", (req, res) => {
  let user1 = req.query.user1;
  let user2 = req.query.user2;
  let sql = `DELETE FROM follow where user1=${user1} AND user2=${user2}`;
  db.query(sql, (err, result) => {
    console.log(result);
    if (err) return res.send(err);
    else if (result.affectedRows > 0) {
      return res.send(true);
    } else return res.send(false);
  });
});

app.get("/get_users", (req, res) => {
  let sql = `SELECT * FROM users`;
  db.query(sql, (err, result) => {
    if (err) return res.send(err);
    else if (result) {
      return res.send(result);
    } else return res.send(false);
  });
});

app.get("/all_images", (req, res) => {
  let id = req.query.id;
  let sql = `SELECT image.image_id,image.user_id,image.images,users.username FROM image inner join follow  on image.user_id=follow.user2 inner join users on users.user_id=follow.user2 where follow.user1=${id} order by image.image_date DESC`;
  db.query(sql, (err, result) => {
    if (err) return res.send(err);
    else if (result.length > 0) {
      return res.send(result);
    } else return res.send(false);
  });
});

app.get("/check_like", (req, res) => {
  let image_id = req.query.image_id;
  let user_id = req.query.user_id;
  let sql = `SELECT * from likes where user_id=${user_id} and image_id=${image_id}`;
  db.query(sql, (err, result) => {
    if (err) return res.send(err);
    else if (result.length > 0) {
      return res.send(true);
    } else return res.send(false);
  });
});

app.get("/add_like", (req, res) => {
  let image_id = req.query.image_id;
  let user_id = req.query.user_id;

  let sql = `INSERT INTO likes(image_id,user_id) values(${image_id},${user_id})`;
  db.query(sql, (err, result) => {
    if (err) return res.send(err);
    else if (result.affectedRows > 0) {
      return res.send(true);
    } else return res.send(false);
  });
});

app.get("/count_like", (req, res) => {
  let image_id = req.query.image_id;

  let sql = `SELECT image_id,count(user_id) c FROM likes GROUP BY image_id HAVING image_id='${image_id}'`;
  db.query(sql, (err, result) => {
    if (err) return res.send(err);
    else return res.send(result);
  });
});

app.delete("/remove_like", (req, res) => {
  let image_id = req.query.image_id;
  let user_id = req.query.user_id;
  let sql = `DELETE FROM likes where user_id=${user_id} and image_id=${image_id}`;
  db.query(sql, (err, result) => {
    if (err) return res.send(err);
    else if (result.affectedRows > 0) {
      return res.send(true);
    } else return res.send(false);
  });
});
app.get("/count_comment", (req, res) => {
  let image_id = req.query.image_id;

  let sql = `SELECT image_id,count(user_id) c from comments group by image_id having image_id=${image_id}`;
  db.query(sql, (err, result) => {
    if (err) return res.send(err);
    else return res.send(result);
  });
});

app.get("/add_comment", (req, res) => {
  let image_id = req.query.image_id;
  let user_id = req.query.user_id;
  let comm = req.query.comm;
  let sql = `INSERT INTO comments(image_id,user_id,comment) values(${image_id},${user_id},'${comm}')`;
  db.query(sql, (err, result) => {
    if (err) return res.send(err);
    else if (result.affectedRows > 0) {
      return res.send(result);
    } else return res.send(false);
  });
});

app.get("/get_comments", (req, res) => {
  let image_id = req.query.image_id;

  let sql = `SELECT users.username,comments.comment,comments.comment_id from comments inner join users on users.user_id=comments.user_id where comments.image_id=${image_id}`;
  db.query(sql, (err, result) => {
    if (err) return res.send(err);
    else return res.send(result);
  });
});
app.listen("5000", () => console.log("Server started at port 5000"));
