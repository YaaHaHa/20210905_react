import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
class Header extends Component {

    back=()=>{
        this.props.history.goBack()
    }
    forward=()=>{
        this.props.history.goForward()
    }
    render() {
        return (
            <div className="row">
                <div className="col-xs-offset-2 col-xs-8">
                    <div className="page-header"><h2>React Router Demo</h2></div>
                    <button onClick={this.back}>后退</button>
                    <button onClick={this.forward}>前进</button>
                </div>
            </div>
        )
    }
}
// 把处理后的Header交出去
export default withRouter(Header);