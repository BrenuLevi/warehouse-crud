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