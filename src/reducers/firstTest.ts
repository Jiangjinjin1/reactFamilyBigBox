import { THISIAATEST } from '../actions/firstTest'
import * as Immutable from 'immutable'

const testState = Immutable.fromJS({
    anyState: ''
})

export default function (state = testState, action: { type: string, payload: string }) {
    return {
        anyState: action.payload
    }
}