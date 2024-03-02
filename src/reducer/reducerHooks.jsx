export default function reducerHooks(state, action) {
  switch (action.type) {
    case 'SET_TEXT': {
      console.log(action.payload)
      return { ...state, text: action.payload }
    }
    case 'SET_CATEGORY': {
      console.log(action.payload)
      return { ...state, addCategory: action.payload }
    }
    case 'CLEAR_CATEGORY': {
      console.log('clear')
      return { ...state, addCategory: '' }
    }
    case 'SET_COLOR': {
      console.log(action.payload)
      return { ...state, addColor: action.payload }
    }
    case 'SET_ADD_DATE': {
      console.log(action.payload)
      return { ...state, addDate: action.payload }
    }
    case 'SET_ADD_AMOUNT': {
      console.log(action.payload)
      return { ...state, addAmount: action.payload }
    }
    default:
      return state
  }
}
