const create_form = document.forms[1].elements

async function createProduct(e) {
  e.preventDefault()

  let canCreate = []

  let name = create_form[0].value
  let type = create_form[1].value == "create_type" ? create_form[2].value : create_form[1].value
  let qtd = create_form[3].value
  let description = create_form[4].value
  let vality = create_form[5].value == "" ? "no vality" : create_form[5].value
  let localization = create_form[6].value + "/" + create_form[7].value

  let _arr = [name, type, qtd, description, vality, localization]

  _arr.forEach(item => {
    if (item == "" || item == " " || item == "/"){
      canCreate.push(false)
    } else {
      canCreate.push(true)
    }
  })

  canCreate[4] = true

  if(!canCreate.includes(false)) {
    let _to_submit = {
      name,
      type,
      qtd,
      description,
      vality,
      localization
    }

    await axios.post("http://localhost:3333/create", _to_submit).then(result => {
      if(result.status == 200) {
        alert("Item criado!")
      }
    })

  } else {
    alert("Preencha os campos!")
  }
}