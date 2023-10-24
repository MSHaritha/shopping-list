const form = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const clear = document.getElementById('clear')
const filter = document.getElementById('filter')


function displayItems() {
  const itemsFromStorage = getItemfromStorage()

  itemsFromStorage.forEach((item) => addItemtoDom(item))

  checkUI()
}

function onAddItemToSubmit(e) {
  e.preventDefault();
  const newItem = itemInput.value

  if (newItem === '') {
    alert('please add the Item')
    return
  }

  addItemtoDom(newItem)

  addItemtoStorage(newItem)

  checkUI()

  itemInput.value = ''
}

function addItemtoDom(newItem) {
  const li = document.createElement('li')

  li.appendChild(document.createTextNode(newItem))

  const btn = createButton("remove-item btn-link text-red")

  li.appendChild(btn)

  itemList.appendChild(li)
}

function addItemtoStorage(newItem) {
  let itemsFromStorage = getItemfromStorage()

  itemsFromStorage.push(newItem)

  localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function createButton(classes) {
  const btn = document.createElement('button')
  btn.className = classes

  const icon = createIcon("fa-solid fa-xmark")
  btn.appendChild(icon)

  return btn
}

function createIcon(classes) {

  const icon = document.createElement('i')
  icon.className = classes

  return icon
}

function getItemfromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = []
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'))
  }

  return itemsFromStorage
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement)
  }
}

function removeItem(item) {
  if (confirm('Are you sure you want to delete?')) {
    item.remove()
  }
  removeItemFromStorage(item.textContent)

  checkUI()
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemfromStorage();

  console.log(itemsFromStorage)

  itemsFromStorage = itemsFromStorage.filter((i) => i !== item)

  localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function clearItems(e) {

  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  localStorage.removeItem('items')

  checkUI()
}

function filterItem(e) {
  const items = itemList.querySelectorAll('li')
  const text = e.target.value.toLowerCase()

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex'
    } else {
      item.style.display = 'none'
    }
  })
}

function checkUI() {
  const items = itemList.querySelectorAll('li')
  if (items.length == 0) {
    clear.style.display = 'none'
    filter.style.display = 'none'
  } else {
    clear.style.display = 'block'
    filter.style.display = 'block'
  }
}

function init() {
  form.addEventListener('submit', onAddItemToSubmit)
  itemList.addEventListener('click', onClickItem)
  clear.addEventListener('click', clearItems)
  filter.addEventListener('input', filterItem)
  document.addEventListener('DOMContentLoaded', displayItems)
  checkUI()
}

init()
