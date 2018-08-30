import { createStore } from 'redux'

const $form = document.getElementById('form')
$form.addEventListener('submit', handleSubmit)

function handleSubmit(e) {
  e.preventDefault()
  const data = new FormData($form)
  const title = data.get('title')
  console.log(title)
  store.dispatch({
    type: 'ADD_SONG',
    payload: { title }
  })
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_SONG':
      return [...state, action.payload]
    default:
      return state
  }
}
const initialState = [
  { "title": "Despacito" },
  { "title": "One more time" },
  { "title": "Echame la chulpa" }
]

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

function render () {
  const $container = document.getElementById('playlist')
  const playlist = store.getState()
  $container.innerHTML = ''
  playlist.forEach(e => {
    const template = document.createElement('p')
    template.textContent = e.title
    $container.appendChild(template)
  })
}

render()

function handleChange() {
  console.log('Haciendo el change')
  render()
}

store.subscribe(handleChange)

console.log(store.getState())
