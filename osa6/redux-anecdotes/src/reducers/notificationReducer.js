const reducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.content
        case 'RESET_NOTIFICATION':
            return null
        default:
            return null
    }
    return state
}

export const setNotification = (content) => {
  return {
      type: 'SET_NOTIFICATION',
      content
  }
}

export const resetNotification = () => {
  return {
      type: 'RESET_NOTIFICATION'
  }
}

export default reducer