import * as React from 'react'
import {Route, Link} from 'react-router-dom'

import Hello from '../page/Hello'
import World from '../page/World'

export default class Root extends React.Component<object, object> {

    componentWillMount () {
        this.test()
    }

    test = () => {
        console.log(console.log(this))
    }

    render () {
        return (
          <div>
             <ul>
                 <li><Link to={'/hello'}>hello</Link></li>
                 <li><Link to={'/world'}>world</Link></li>
             </ul>

              <hr/>

              <Route path='/hello' component={Hello} />
              <Route path='/world' component={World} />
          </div>
        )
    }
}