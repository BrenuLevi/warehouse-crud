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

function removeTableData(table_to_append) {
  let table_childs = document.querySelector(table_to_append).children;

  let i = Array.from(table_childs).length - 1;
  
  while(Array.from(table_childs).length > 1) {
    table_childs[i].remove()
    i--
  }
}

function delete_Filter() {
  removeTableData(".delete-bottom .sheet table")
  let input = document.getElementById("delete_id_input").value
  console.log(input)
  if(input == "") {
    removeTableData(".delete-bottom .sheet table")
  }
  

  let _db = JSON.parse(localStorage.getItem("products"))

  _db.forEach(product => {
    if(product.id.indexOf(input) > -1) {
      createTableData(product, ".delete-bottom .sheet table")
    }
  })
}

//86975906