function submitInputContact() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phoneNumber").value;
  let subject = document.getElementById("subject").value;
  let message = document.getElementById("massage").value;
  let body = `Hallo Saya ${name} apakah saya bisa ${message} tolong hubungi saya ${phone}`;

  if (name == "") {
    return alert("please entered your name!");
  } else if (email == "") {
    return alert("please entered your email!");
  } else if (phone == "") {
    return alert("please entered your phone!");
  } else if (subject == "") {
    return alert("please selected your subject!");
  } else if (message == "") {
    return alert("please entered your message!");
  }

  const yourEmail = "ikhsanp34@gmail.com";

  let a = document.createElement("a");
  a.href = `https://mail.google.com/mail?view=cm&fs=1&to=${yourEmail}&su=${subject}&body=${body}`;
  a.click();
}

const form = document.getElementById("contactForm");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  submitInputContact();
});

// Share WA

// function submitInputWA() {
//   const yourNumber = "+6282373210827";

//   window.open(
//     `https://wa.me/${yourNumber}?text=I%27m%20api%20msg%20hello%20${name}%20friend%20${message}`,
//     "_blank"
//   );
// }
