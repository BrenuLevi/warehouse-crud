async function firstApiCall() {
  await axios.get("http://localhost:3333/list").then(response => {
    let arr_types = [];
    response.data.products.forEach(product => {
      createTableData(product);
      createTypesArray(product, arr_types);
    })
    addOptionToTypes(arr_types);
    localStorage.setItem("data", JSON.stringify(response.data.products));
  })
}

function createTableData(product) {
  let info_arrays = ["id", "name", "type", "qtd", "description", "vality", "localization", "created_at", "last_edit"];

  if (product["vality"] == "no vality") {
    product["vality"] = "Sem validade";
  }

  let table = document.querySelector("#products table");
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

function createTypesArray(product, arr) {
  if (!arr.includes(product.type)) {
    arr.push(product.type);
  }
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

document.onload = firstApiCall();

//==========================================================================//

const create_submit_button = document.querySelector("#create_submit_button");
let canCreate = [];

create_submit_button.addEventListener("click", async (e) => {
  e.preventDefault();
  let name_input = document.getElementById("create_name_input").value;
  let type_input = "";
  if (document.getElementById("create_type_input").value == "create_type") {
    type_input = document.getElementById("create_new_type_input").value;
    JSON.parse(localStorage.getItem("data")).forEach(product => {
      if (type_input == product.type) {
        canCreate.push(false);
      }
    })
  } else {
    type_input = document.getElementById("create_type_input").value;
  }
  let qtd_input = document.getElementById("create_qtd_input").value;
  let desc_input = document.getElementById("create_desc_input").value;
  let vality_input = document.getElementById("create_vality_input").value;
  if (!vality_input) {
    vality_input = "no vality";
  }
  let loc_input = document.getElementById("loc_sector").value + "/" + document.getElementById("loc_shelf").value;

  let infos = {
    name: name_input,
    type: type_input,
    qtd: qtd_input,
    description: desc_input,
    vality: vality_input,
    localization: loc_input
  };

  if (!canCreate.includes(false)) {
    await axios.post("http://localhost:3333/create", infos, (result) => {
      console.log(result);
    })
  } else {
    alert("Tipo já existe");
  }
})