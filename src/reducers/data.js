import schema from '../schemas/index.js'
import { fromJS } from 'immutable'
import { SEARCH_ENTITIES } from '../action-types'

const initialState = fromJS({
  entities: schema.entities,
  categories: schema.result.categories,
  search: ''
})

function data (state = initialState, action) {
  switch (action.type) {
    case SEARCH_ENTITIES: {
      return state.set('search', action.payload.query)
    }
    break;
    default:
      return state
  }
}

export default data