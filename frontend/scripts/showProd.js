async function firstCall() {
  await axios.get("http://localhost:3333/list").then(result => {
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

//==========================================================================//

// FILTER (TO DO)
// let _filter_form = document.forms[1].elements

// _filter_form[_filter_form.length - 1].addEventListener("click", e => {
//   e.preventDefault()

//   let name = _filter_form[0].value
//   let type = _filter_form[1].value
//   let qtd = _filter_form[2].value
//   let vality = _filter_form[3].value == "" ? "no vality" : _filter_form[3].value
//   let localization = _filter_form[4].value + "/" + _filter_form[5].value

//   let filters_str = ["name", "type", "qtd", "vality", "localization"]
//   let filters = [name, type, qtd, vality, localization]