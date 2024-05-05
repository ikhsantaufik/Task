const express = require("express");
const app = express();
const formatTime = require("./util/formatTime.js");
const port = 5000;
const path = require("path");
const config = require("./config/config.json");
const { Sequelize, QueryTypes, where } = require("sequelize");
const sequelize = new Sequelize(config.development);
const projectsModel = require("./models").tbProjects;

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

async function home(req, res) {
  const query = `SELECT * FROM "tbProjects"`;
  const data = await sequelize.query(query, { type: QueryTypes.SELECT });

  res.render("index", { projects: data });
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
  res.render("updateProject", { Project });
}

async function addProjectPost(req, res) {
  const {
    projectName,
    startDate,
    endDate,
    description,
    techbox,
    // file,
  } = req.body;

  const file =
    "https://cdn-u1-gnfi.imgix.net/post/large-melatih-skill-keramahan-yang-tidak-hanya-sekadar-sifat1694664260.jpg?fit=crop&crop=faces%2Centropy&lossless=true&auto=compress%2Cformat&w=730&h=486";
  const duration = formatTime.getDisDate(startDate, endDate);
  const techs = Array.isArray(techbox) ? techbox : [techbox];
  const techArray = "{" + techs.join(",") + "}";

  const query = `INSERT INTO "tbProjects"("nameProjects", "duration", "startDate", "endDate", "description", "techbox", "file") VALUES ('${projectName}', '${duration}', '${startDate}', '${endDate}', '${description}', '${techArray}','${file}')`;
  console.log("iniquery", query);

  await sequelize.query(query, { type: QueryTypes.INSERT });

  res.redirect("/");
}

async function updateProjectPut(req, res) {
  const { id, projectName, startDate, endDate, description, techbox } =
    req.body;

  const duration = formatTime.getDisDate(startDate, endDate);
  const techs = Array.isArray(techbox) ? techbox : [techbox];
  const techArray = "{" + techs.join(",") + "}";

  const query = `UPDATE "tbProjects" SET 
  "nameProjects"='${projectName}', 
  "startDate"='${startDate}', 
      "endDate"='${endDate}', 
      "duration"='${duration}', 
      "description"='${description}', 
      "techbox"='${techArray}'
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
