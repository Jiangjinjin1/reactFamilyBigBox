import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import getStore from './store/store'
import { ConnectedRouter } from 'react-router-redux'
import history from './utils/history'
import Root from './components/Root'

const mountingElement: HTMLElement = document.getElementById('app')
const store = getStore()

if (process.env.NODE_ENV === 'development') {
    const render = (Component: React.ComponentClass<any>) => {
        ReactDOM.render(
            <AppContainer>
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <Component />
                    </ConnectedRouter>
                </Provider>
            </AppContainer>,
            mountingElement
        )
    }

    render(Root)

    if (module.hot) {
        module.hot.accept('./components/Root', () => {
            const Root = require('./components/Root').default
            render(Root)
        })
    }
} else {
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Root />
            </ConnectedRouter>
        </Provider>,
        mountingElement
    )
}
