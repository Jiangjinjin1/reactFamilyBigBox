import { createStore, compose, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import * as Immutable from 'immutable'

import reducers from '../reducers/index'
import history from '../utils/history'

const initState = Immutable.fromJS({
    firstTest: {}
})

export default function (initialState = initState) {
    const middleWares = [routerMiddleware(history)] // ~~~

    if (process.env.NODE_ENV === 'development') {
        const { persistState } = require('redux-devtools')

        const enhancers = compose(
            applyMiddleware(...middleWares),
            (window as any).devToolsExtension ? (window as any).devToolsExtension() : (f) => f,
            persistState(
                window.location.href.match(/[?&]debug_session=([^&#]+)\b/)
            )
        )

        const store = createStore(reducers, initialState, enhancers)

        if (module.hot) {
            module.hot.accept('../reducers/index', () => {
                const reducers = require('../reducers/index').default
                store.replaceReducer(reducers)
            })
        }

        return store
    } else {
        const store = createStore(reducers, initialState, applyMiddleware(...middleWares))
        return store
    }
}