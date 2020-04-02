const reducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.content
        case 'RESET_NOTIFICATION':
            return null
        default:
            return state
    }
}

export const setNotification = (content, time) => {
    return async dispatch => {
        await dispatch({
            type: 'SET_NOTIFICATION',
            content
        })
        setTimeout(() => { dispatch(resetNotification()) }, time * 1000)
    }
}



export const resetNotification = () => {
    return {
        type: 'RESET_NOTIFICATION'
    }
}

export default reducer