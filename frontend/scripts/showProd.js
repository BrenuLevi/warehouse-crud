async function firstCall() {
  await axios.get("http://localhost:3333/list").then(result => {
    console.log(result)
    if (result.status == 200) {
      let arr_types = [];
      localStorage.setItem("products", JSON.stringify(result.data.products))
      result.data.products.forEach(product => {
        createTableData(product, "#products table");
        if (!arr_types.includes(product.type)) {
          arr_types.push(product.type);
        }
      })
      addOptionToTypes(arr_types);
    }
  })
}

function createTableData(product, table_to_append) {
  let info_arrays = ["id", "name", "type", "qtd", "description", "vality", "localization", "created_at", "last_edit"];

  if (product["vality"] == "no vality") {
    product["vality"] = "Sem validade";
  }

  let table = document.querySelector(table_to_append);
  let table_row = document.createElement("tr");

  for (let i = 0; i < info_arrays.length; i++) {
    let table_data = document.createElement("td");
    table_data.innerText = product[info_arrays[i]]

    table_row.append(table_data);
  }

  let status = document.createElement("td");
  if (product.qtd < 50) {
    status.innerText = "Necessário repor";
    status.style.backgroundColor = "red";
  } else {
    status.innerText = "Tudo correto";
    status.style.backgroundColor = "lightgreen";
  }

  table_row.append(status);

  table.append(table_row);
}

function addOptionToTypes(arr) {
  let types = document.getElementsByClassName("type");
  for (let i = 0; i < types.length; i++) {
    for (let k = 0; k < arr.length; k++) {
      let option_tag = document.createElement("option");

      option_tag.setAttribute("value", arr[k])
      option_tag.innerText = arr[k];
      
      types[i].appendChild(option_tag);
    }
  }
}

document.onload = firstCall();

//================================================================================//
const filter_button = document.getElementById("filter_button");

filter_button.addEventListener("click", (e) => {
  e.preventDefault();

  let inputs = document.forms[0].elements;

  let name = inputs[0].value;
  let type = inputs[1].value;
  let qtd = inputs[2].value;
  let desc = inputs[3].value;
  let vality = inputs[4].value;
  let localization = inputs[5].value;


})