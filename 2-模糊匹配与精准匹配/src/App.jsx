import React, { Component } from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Test from './pages/Test'
import {NavLink,Route,Switch,Redirect} from 'react-router-dom'

export default class App extends Component {
	render() {
		return (
			<div>
				<div>
					<div className="row">
						<div className="col-xs-offset-2 col-xs-8">
							<div className="page-header"><h2>React Router Demo</h2></div>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-2 col-xs-offset-2">
							<div className="list-group">
								{/* 在React中，用link进行路径的切换 */}
								
										{/* <Link className="list-group-item" to="/about">About</Link>
										<Link className="list-group-item" to="/home">Home</Link> 
										NavLink会给被点击的添加一个active类，正好可以和bootstrap对上，有高亮效果
										*/}
										<NavLink className="list-group-item" to="/about">About</NavLink>
										<NavLink className="list-group-item" to="/home/a/b">Home</NavLink>
								
							</div>
						</div>
						<div className="col-xs-6">
							<div className="panel">
								<div className="panel-body">
								{/* 注册路由 */}
								<Switch>
									<Route path='/about' component={About} /> 
									<Route path='/home' exact={true} component={Home} /> 
									
								</Switch>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
