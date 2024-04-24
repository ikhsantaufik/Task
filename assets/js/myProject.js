// Penampungan hasil inputan
let dataProjects = [];
function submitInputProject(event) {
  // Agar Browser tidak Reload Halaman
  event.preventDefault();

  let projectName = document.getElementById("projectName").value;
  let startDate = new Date(document.getElementById("startDate").value);
  let endDate = new Date(document.getElementById("endDate").value);
  let description = document.getElementById("description").value;
  let nodeJs = document.getElementById("nodeJs").checked;
  let nextJs = document.getElementById("nextJs").checked;
  let reactJs = document.getElementById("reactJs").checked;
  let typeScript = document.getElementById("typeScript").checked;
  let Image = document.getElementById("inputFile").files;
  let ImageURL = URL.createObjectURL(Image[0]);

  if (projectName == "") {
    return alert("please entered your name!");
  } else if (startDate == "") {
    return alert("please entered your email!");
  } else if (endDate == "") {
    return alert("please entered your phone!");
  } else if (description == "") {
    return alert("please selected your subject!");
  }

  // Penampungan dalam function
  let dataProject = {
    projectName,
    startDate,
    endDate,
    description,
    nodeJs,
    nextJs,
    reactJs,
    typeScript,
    ImageURL,
  };
  // Mengeluarkan data ke tampungan luar function
  dataProjects.unshift(dataProject);

  // localStorage.setItem("data", JSON.stringify(dataProjects));

  // Looping hasil inputan
  renderProject();
}

// Function untuk looping halaman
function renderProject() {
  document.getElementById("myProject").innerHTML = "";
  dataProjects.forEach((project, index) => {
    // for (let index = 0; index < dataProjects.length; index++) {
    let nodeSvg = "";
    let nextSvg = "";
    let reactSvg = "";
    let typeSvg = "";
    // Pengkondisian untuk menampilkan icon
    if (project.nodeJs == true) {
      nodeSvg = "<img src='./assets/img/icons/node.svg' />";
    }

    if (project.nextJs == true) {
      nextSvg = "<img src='./assets/img/icons/next.svg' />";
    }

    if (project.reactJs == true) {
      reactSvg = "<img src='./assets/img/icons/react.svg' />";
    }

    if (project.typeScript == true) {
      typeSvg = "<img src='../assets/img/icons/type.svg' />";
    }

    // Untuk menampilkan script yang telah dipanggil sesuai data yg telah diinput dan menampilkan sesuai dengan lokasi id element
    document.getElementById("myProject").innerHTML += `
      <div class="cardContent">
        <img src="${project.ImageURL}" alt="" />
        <div class="isi">
          <div class="judul"><a href="detailProject.html?index=${index}">${
      project.projectName
    }</a></div>
          <div class="durasi">${getDisDate(
            project.startDate,
            project.endDate
          )}</div>
          <p>${project.description}</p>
          <div class="technologi">
          ${nodeSvg}
          ${nextSvg}
          ${reactSvg}
          ${typeSvg}
          </div>
          <div class="button">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      </div>
        `;
  });
}

// Function untuk mengatur lama atau jarak hari, bulan, tahun sesuai yg diinputkan
function getDisDate(startDate, endDate) {
  const diffInMs = Math.abs(endDate - startDate);
  const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (days === 1) {
    return "1 day";
  }

  if (days < 30) {
    return days + " days";
  }

  if (months === 1) {
    return "1 month";
  }

  if (months < 12) {
    return months + " months";
  }

  if (years === 1) {
    return "1 year";
  }

  return years + " years";
}
