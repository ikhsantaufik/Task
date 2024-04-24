(function () {
  // Scoping function to avoid creating globals
  // Loading
  var users = JSON.parse(localStorage.getItem("users") || "[]");
  console.log("# of users: " + users.length);
  users.forEach(function (user, index) {
    console.log("[" + index + "]: " + user.id);
  });

  // Modifying
  var user = {
    id: Math.floor(Math.random() * 1000000),
  };
  users.push(user);
  console.log("Added user #" + user.id);

  // Saving
  localStorage.setItem("users", JSON.stringify(users));
})();
