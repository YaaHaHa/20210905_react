import React, { Component } from 'react'
import Messages from './Messages'
import News from './News'
import {Route,NavLink} from 'react-router-dom'
export default class About extends Component {
 /*  componentDidMount(){
    setTimeout(()=>{
      this.props.history.push('/about/messages');
    },3000)
  } */

    render() {
        return (
            <div>
              <h2>Home组件内容</h2>
              <ul className="nav nav-tabs">
                  <li>
                    <NavLink className="list-group-item" to="/about/news">News</NavLink>
                  </li>
                  <li>
                    <NavLink className="list-group-item" to="/about/messages">Message</NavLink>
                  </li>
                </ul>
              <div>
                  <Route path='/about/messages' component={Messages}/>
                  <Route path='/about/news' component={News}/>
              </div>
            </div>
        )
    }
}
