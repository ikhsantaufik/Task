const express = require("express");
const app = express();
const port = 5000;

const projects = [];

app.set("view engine", "hbs");
app.set("views", "./views");

// app.set("view engine", "hbs");
// app.set("views", path.join(__dirname, "./views")); // hbs dimana

app.use("/assets", express.static("./assets"));
// client request => middleware => /addProject

app.use(express.urlencoded({ extended: false }));
// localhost:5000/project/1
// req.params

app.get("/", home);
app.get("/contactMe", contacMe);
app.get("/detailProject/:id", detailProject);
app.get("/addProject", addProject);
app.get("/testimonials", testimonials);

app.post("/addProjectPost", addProjectPost);

function home(req, res) {
  res.render("index");
}

function contacMe(req, res) {
  res.render("contactMe");
}

function detailProject(req, res) {
  res.render("detailProject");
}

function addProject(req, res) {
  res.render("addProject", projects);
}

function testimonials(req, res) {
  res.render("testimonials");
}

function addProjectPost(req, res) {
  // const project = req.body;

  // projects.unshift(project);
  // console.log(project);
  res.send({ status: "Success!" });

  const {
    projectName,
    startDate,
    endDate,
    description,
    nodeJs,
    nextJs,
    reactJs,
    typeScript,
    file,
  } = req.body;

  console.log("Name :", projectName);
  console.log("Name :", startDate);
  console.log("Name :", endDate);
  console.log("Name :", description);
  console.log("Name :", nodeJs);
  console.log("Name :", nextJs);
  console.log("Name :", reactJs);
  console.log("Name :", typeScript);
  console.log("Name :", file);
}

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
