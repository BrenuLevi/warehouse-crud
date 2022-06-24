const _update_form = document.forms[3].elements

_update_form[_update_form.length - 1].addEventListener("click", async e => {
    e.preventDefault()

    let _data = {
        id: _update_form[0].value,
        name: _update_form[1].value,
        type: _update_form[2].value,
        qtd: _update_form[3].value,
        description: _update_form[4].value,
        vality: _update_form[5].value,
        localization: _update_form[6].value + "/" + _update_form[7].value
    }

    if (_update_form[0].value != "") {
        await axios.put(`http://localhost:3333/edit/${_data.id}`, _data).then(result => {
            if (result.status == 200) {
                alert("Item atualizado")
            }
        })
    } else {
        alert("Insira um código")
    }
})

// INCREASE OR DECREASE PRODUCT QUANTITY
const _quantity_form = document.forms[3].elements

_quantity_form[_quantity_form.length - 1].addEventListener("click", async e => {
    e.preventDefault();

    let _id = _quantity_form[0].value
    let _operation = _quantity_form[1].value
    let _to_add = parseInt(_quantity_form[2].value)
    let qtd

    let _database = JSON.parse(localStorage.getItem("products"))

    _database.forEach(async item => {
        if (item.id == _id) {
            if(_operation == "+") {
                qtd = item.qtd + _to_add
            } else if (_operation == "-" && item.qtd - _to_add > 0) {
                qtd = item.qtd - _to_add
            } else {
                alert("Não foi possível realizar a operação")
            }
            
            await axios.put(`http://localhost:3333/edit/${_id}`, {
                name: "",
                type: "",
                qtd,
                description: "",
                vality: "no vality",
                localization: "/"
            }).then(result => {
                if(result.status == 200) {
                    alert("Operação feita!")
                }
            })
        }
    })
})

