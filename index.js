const express = require("express");
const app = express();
const formatTime = require("./util/formatTime.js");
const port = 5000;
const path = require("path");
const config = require("./config/config.json");
const { Sequelize, QueryTypes, where } = require("sequelize");
const sequelize = new Sequelize(config.development);
const projectsModel = require("./models").tbProjects;
const User = require("./models").User;
const bcrypt = require("bcrypt");
const flash = require("express-flash");
const session = require("express-session");
const multer = require("multer");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views")); // hbs dimana

// set => middleware
app.use("/assets", express.static("./assets"));
app.use("/uploads", express.static("./uploads"));
//body.parser
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
// extended : false => querystring bawaan dari express
// extended : true = > menggunakan query strign third party

app.use(flash());

app.use(
  session({
    name: "mysession",
    secret: "rahasiadeh",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24, // 1 hari
    },
  })
);

const uploader = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "./uploads/");
    },
    filename: function (req, file, callback) {
      callback(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  }),
});

app.get("/", home);
app.get("/contactMe", contacMe);
app.get("/testimonials", testimonials);
app.get("/detailProject/:id", detailProject);
app.get("/addProject", addProjectView);
app.get("/updateProject/:id", updateProject);
app.get("/login", loginView);
app.get("/register", registerView);
// app.post("/delete/:id", deleteProject);

app.post("/login", login);
app.post("/register", register);
app.post("/logout", logout);
app.post("/", uploader.single("file"), addProjectPost);
app.post("/updateProject/:id", uploader.single("file"), updateProjectPut);
app.delete("/delete/:id", deleteProject);

async function home(req, res) {
  const query = `SELECT * FROM "tbProjects"`;
  const data = await sequelize.query(query, { type: QueryTypes.SELECT });
  const isLogin = req.session.isLogin;
  const user = req.session.user;

  res.render("index", { projects: data, isLogin, user });
}

function contacMe(req, res) {
  const isLogin = req.session.isLogin;
  const user = req.session.user;
  res.render("contactMe", { isLogin, user });
}

function testimonials(req, res) {
  res.render("testimonials");
}

async function detailProject(req, res) {
  const { id } = req.params;

  const query = `SELECT * FROM "tbProjects" WHERE id=${id}`;
  const data = await sequelize.query(query, { type: QueryTypes.SELECT });

  const isLogin = req.session.isLogin;
  const user = req.session.user;
  res.render("detailProject", { projects: data[0], isLogin, user });
}

function addProjectView(req, res) {
  const isLogin = req.session.isLogin;
  const user = req.session.user;
  res.render("addProject", { isLogin, user });
}

async function updateProject(req, res) {
  const { id } = req.params;
  const response = await projectsModel.findOne({
    where: { id: id },
  });
  const Project = response.dataValues;
  // anbil data di array projects yg indexnya adalah id (projects adalah array)
  Project.techbox.forEach((items) => {
    // buat key baru dengan nama 'items' di dalam object dataProject (dataProject adalah object)
    Project[items] = "checked";
  });
  const isLogin = req.session.isLogin;
  const user = req.session.user;
  res.render("updateProject", { Project, isLogin, user });
}

function loginView(req, res) {
  const isLogin = req.session.isLogin;
  const user = req.session.user;
  res.render("login", { isLogin, user });
}

function registerView(req, res) {
  const isLogin = req.session.isLogin;
  const user = req.session.user;
  res.render("register", { isLogin, user });
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email },
  });
  if (!user) {
    req.flash("danger", "Email is not found!");
    return res.redirect("/login");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    req.flash("danger", "Password is wrong!");
    return res.redirect("/login");
  }

  req.session.isLogin = true;
  req.session.user = {
    id: user.id,
    userName: user.userName,
    email: user.email,
  };

  req.flash("success", "Login berhasil!");
  res.redirect("/");
}

async function register(req, res) {
  const { userName, email, password } = req.body;

  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);

  await User.create({
    userName,
    email,
    password: hashedPassword,
  });

  res.redirect("/");
}

async function logout(req, res) {
  req.session.destroy(function (err) {
    if (err) return console.error("Logout failed!");

    console.log("Logout success!");
    res.redirect("/");
  });
}

async function addProjectPost(req, res) {
  const { projectName, startDate, endDate, description, techbox, file } =
    req.body;

  const fileImage = req.file.filename;
  const duration = formatTime.getDisDate(startDate, endDate);
  const techs = Array.isArray(techbox) ? techbox : [techbox];
  const techArray = "{" + techs.join(",") + "}";

  const query = `INSERT INTO "tbProjects"("nameProjects", "duration", "startDate", "endDate", "description", "techbox", "file") VALUES ('${projectName}', '${duration}', '${startDate}', '${endDate}', '${description}', '${techArray}','${fileImage}')`;

  await sequelize.query(query, { type: QueryTypes.INSERT });

  res.redirect("/");
}

async function updateProjectPut(req, res) {
  const { id, projectName, startDate, endDate, description, techbox } =
    req.body;
  const fileImage = req.file.filename;
  const duration = formatTime.getDisDate(startDate, endDate);
  const techs = Array.isArray(techbox) ? techbox : [techbox];
  const techArray = "{" + techs.join(",") + "}";

  const query = `UPDATE "tbProjects" SET 
  "nameProjects"='${projectName}', 
  "startDate"='${startDate}', 
      "endDate"='${endDate}', 
      "duration"='${duration}', 
      "description"='${description}', 
      "techbox"='${techArray}',
      "file"='${fileImage}'
      WHERE "id" = ${id}`;

  await sequelize.query(query, { type: QueryTypes.UPDATE });

  res.redirect("/");
}

async function deleteProject(req, res) {
  const { id } = req.params;
  const query = `DELETE FROM "tbProjects" WHERE id=${id}`;
  const data = await sequelize.query(query, { type: QueryTypes.DELETE });

  data.splice(id, 1);
  res.redirect("/");
}

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
