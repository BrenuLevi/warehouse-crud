const update_infos_button = document.getElementById("update_infos_button");

update_infos_button.addEventListener("click", async (e) => {
    e.preventDefault();

    let inputs = Array.from(document.getElementById("update_infos_form").elements);

    let data = {
        id: inputs[0].value,
        name: inputs[1].value,
        type: inputs[2].value,
        qtd: inputs[3].value,
        description: inputs[4].value,
        vality: inputs[5].value,
        localization: inputs[6].value + "/" + inputs[7].value
    }

    if (inputs[0].value != "") {
        await axios.put(`http://localhost:3333/edit/${data.id}`, data, (result) => {
            console.log(result)
        })
    } else {
        alert("Insira um código")
    }
})