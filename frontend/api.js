async function apiCall() {
  await axios.get("http://localhost:3333/list").then(response => {
    response.data.products.forEach(product => {
      createTableData(product);
    })
  })
}

function createTableData(product) {
  let info_arrays = ["id", "name", "type", "qtd", "description", "created_at", "last_edit"];

  let table = document.querySelector("#products table");
  let table_row = document.createElement("tr");

  for (let i = 0; i < info_arrays.length; i++) {
    let table_data = document.createElement("td");
    table_data.innerText = product[info_arrays[i]]

    table_row.append(table_data);
  }

  let status = document.createElement("td");
  if(product.qtd < 50) {
    status.innerText = "Necessário repor";
  } else {
    status.innerText = "Tudo correto";
  }

  table_row.append(status);

  table.append(table_row);
}

document.onload = apiCall();