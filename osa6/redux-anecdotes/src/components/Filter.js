import React, { useReducer } from 'react'
import { setFilter } from '../reducers/filterReducer'
import { useSelector, useDispatch } from 'react-redux'

const Filter = () => {
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const handleChange = (event) => {
        dispatch(setFilter(event.target.value))
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            {filter}
            filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter