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

var timeoutID;


export const setNotification = (content, time) => {
    return async dispatch => {
        clearTimeout(timeoutID)
        await dispatch({
            type: 'SET_NOTIFICATION',
            content
        })
        timeoutID = setTimeout(() => { dispatch(resetNotification()) }, time * 1000)
    }
}



export const resetNotification = () => {
    return {
        type: 'RESET_NOTIFICATION'
    }
}

export default reducer