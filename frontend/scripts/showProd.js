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