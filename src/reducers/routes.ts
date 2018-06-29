import { LOCATION_CHANGE } from 'react-router-redux'
import * as Immutable from 'immutable'

const initState = Immutable.fromJS({
    location: null
})

export default function (state = initState, action: { type: string, payload: object}) {
    if (action.type === LOCATION_CHANGE) {
        return state.merge(action.payload)
    }
    return state
}
