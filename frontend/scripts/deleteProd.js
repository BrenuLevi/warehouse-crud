const delete_button = document.getElementById("delete_button");
delete_button.addEventListener("click", async (e) => {
  e.preventDefault();

  const id = document.getElementById("delete_id_input").value;

  data = JSON.parse(localStorage.getItem("data"));

  data.forEach(product => {
    if (product.id == id) {
      createTableData(product, ".delete-bottom .sheet table");
    }
  });
  setTimeout(async () => {
    let answer = confirm("Tem certeza que quer deletar esse item?")
    if (answer == true) {
      await axios.delete(`http://localhost:3333/delete/${id}`, (result) => {
        console.log(result)
      })
    }
  }, 1000)
})