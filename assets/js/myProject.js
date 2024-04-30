async function deletePost(index) {
  await fetch(`http://localhost:5000/myProject/${index}`, {
    method: "DELETE",
  });
}

async function updatePost(e, index) {
  e.preventDefault();
  console.log("tets");
  await fetch(`http://localhost:5000/updateProject/${index}`, {
    method: "PUT",
  });
}
