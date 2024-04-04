function submitInputContact() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phoneNumber").value;
  let subject = document.getElementById("subject").value;
  let message = document.getElementById("massage").value;

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

  const data = {
    name,
    email,
    phone,
    subject,
    message,
  };

  const yourEmail = "ikhsanp34@gmail.com";

  let a = document.createElement("a");
  a.href = `mailto:${yourEmail}?subject=${subject}&body= Halo mas nama saya, ${name} saya ingin ${message}. bisakah anda menghubungi saya ${phone}`;

  a.click();

  console.log(data);
}
