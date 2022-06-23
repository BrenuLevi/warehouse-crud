const delete_button = document.getElementById("delete_button");
delete_button.addEventListener("click", async (e) => {
  e.preventDefault();

  const _id = document.getElementById("delete_id_input").value;

  data = JSON.parse(localStorage.getItem("data"));

  let answer = confirm("Tem certeza que quer deletar esse item?")
  if (answer == true) {
    await axios.delete(`http://localhost:3333/delete/${_id}`).then(result => {
      if(result.status == 200) {
        alert("Item deletado!")
      }
    })
  }
})