//Change active main tab
let main_tabs_link = document.getElementsByClassName('link-tabs')
for (let i = 0; i < main_tabs_link.length; i++) {
  main_tabs_link[i].addEventListener('click', changeTabs)
}

function changeTabs(e) {
  for (let i = 0; i < main_tabs_link.length; i++) {
    if (main_tabs_link[i].classList.contains("header-active")) {
      main_tabs_link[i].classList.toggle("header-active")
    }
  }
  this.classList.add("header-active")

  let main_tabs = document.getElementsByClassName('tabs')

  for (let i = 0; i < main_tabs.length; i++) {
    if (main_tabs[i].classList.contains("show-tab")) {
      main_tabs[i].classList.toggle("show-tab")
    }
  }
  document.getElementById(e.target.getAttribute("pointTo")).classList.add("show-tab")
}

//==========================================================================//

//Change active content of management tab
let tabs_page = document.getElementsByClassName('management-tabs-page')
for (let i = 0; i < tabs_page.length; i++) {
  tabs_page[i].addEventListener('click', changeActiveContentMainTab)
}

function changeActiveContentMainTab(e) {
  for (let i = 0; i < tabs_page.length; i++) {
    if (tabs_page[i].classList.contains("management-tab-active")) {
      tabs_page[i].classList.toggle("management-tab-active")
    }
  }
  this.classList.add("management-tab-active")

  let management_tabs = document.getElementsByClassName('management-tabs')

  for (let i = 0; i < management_tabs.length; i++) {
    if (management_tabs[i].classList.contains("show-tab")) {
      management_tabs[i].classList.toggle("show-tab")
    }
  }
  document.getElementById(e.target.getAttribute("pointTo")).classList.add("show-tab")
}

//==========================================================================//

//Show or hide input for a new type
let type_select = document.getElementById("create_type_input")
let new_type_input = document.getElementsByClassName("new-type")

type_select.addEventListener("change", () => {
  if (type_select.value == "create_type") {
    new_type_input[0].style.display = "flex"
  } else {
    new_type_input[0].style.display = "none"
  }
})

//==========================================================================//