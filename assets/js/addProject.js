async function deletePost(index) {
 await fetch(`http://localhost:5000/delete/${index}`, {
    method: "DELETE",
  });
}
