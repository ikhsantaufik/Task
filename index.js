const express = require("express");
const app = express();
const formatTime = require("./util/formatTime.js");
const port = 5000;
const path = require("path");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views")); // hbs dimana

// set => middleware
app.use("/assets", express.static("./assets"));

//body.parser
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
// extended : false => querystring bawaan dari express
// extended : true = > menggunakan query strign third party

app.get("/", home);
app.get("/contactMe", contacMe);
app.get("/testimonials", testimonials);
app.get("/detailProject/:id", detailProject);
app.get("/addProject", addProjectView);
app.get("/updateProject/:id", updateProject);
// app.post("/delete/:id", deleteProject);

app.post("/", addProjectPost);
app.post("/updateProject/:id", updateProjectPut);
app.delete("/delete/:id", deleteProject);

const projects = [];

function home(req, res) {
  res.render("index", { projects });
}

function contacMe(req, res) {
  res.render("contactMe");
}

function testimonials(req, res) {
  res.render("testimonials");
}

function detailProject(req, res) {
  const { id } = req.params;
  const data = projects[id];

  res.render("detailProject", { projects: data });
}

function addProjectView(req, res) {
  res.render("addProject");
}

function updateProject(req, res) {
  const { id } = req.params;
  // anbil data di array projects yg indexnya adalah id (projects adalah array)
  const dataProject = projects[id];
  dataProject.techbox.forEach((items) => {
    // buat key baru dengan nama 'items' di dalam object dataProject (dataProject adalah object)
    dataProject[items] = "checked";
  });

  dataProject.id = id;
  res.render("updateProject", { projects: dataProject });
}

function addProjectPost(req, res) {
  const {
    projectName,
    startDate,
    endDate,
    description,
    techbox,
    // file,
  } = req.body;
  projects.unshift({
    projectName,
    duration: formatTime.getDisDate(startDate, endDate),
    startDate,
    endDate,
    description,
    techbox: Array.isArray(techbox) ? techbox : [techbox],
    file: "https://cdn-u1-gnfi.imgix.net/post/large-melatih-skill-keramahan-yang-tidak-hanya-sekadar-sifat1694664260.jpg?fit=crop&crop=faces%2Centropy&lossless=true&auto=compress%2Cformat&w=730&h=486",
  });
  res.redirect("/");
}

function updateProjectPut(req, res) {
  const { id, projectName, startDate, endDate, description, techbox, file } =
    req.body;
  projects[id] = {
    projectName,
    duration: formatTime.getDisDate(startDate, endDate),
    startDate,
    endDate,
    description,
    techbox,
    file: "https://cdn-u1-gnfi.imgix.net/post/large-melatih-skill-keramahan-yang-tidak-hanya-sekadar-sifat1694664260.jpg?fit=crop&crop=faces%2Centropy&lossless=true&auto=compress%2Cformat&w=730&h=486",
  };
  res.redirect("/");
}

function deleteProject(req, res) {
  const { id } = req.params;
  projects.splice(id, 1);
  res.redirect("/");
}

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
