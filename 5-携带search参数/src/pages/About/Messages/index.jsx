import React, { Component } from 'react'
import {Link,Route} from 'react-router-dom'
import Detail from './Detail'
export default class Messages extends Component {
    // id作为连接Deatil展示的媒介
    state={
        msg:[
            {id:'001',title:'你好1'},
            {id:'002',title:'你好2'},
            {id:'003',title:'你好3'}
        ]
    }
    render() {
        return (
            <div>
                <ul>
                    {
                        this.state.msg.map((msgObj)=>{
                            return (
                                <li key={msgObj.id}>
                                    {/* 跳转路由携带params参数， */}
                                    {/* <Link to={`/about/messages/detail/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link>&nbsp;&nbsp; */}
                                    <Link to={`/about/messages/detail?id=${msgObj.id}&title=${msgObj.title}`}>{msgObj.title}</Link>&nbsp;&nbsp;
                                </li>
                                )
                        })
                    }
                </ul>
                <hr />
                <hr />
                {/* 路由那里也要以params的形式接参数。传到的数据在路由组件的props.match.params中 */}
                {/* <Route path='/about/messages/detail/:id/:title' component={Detail}/> */}
                {/* 接Search参数不用声明 */}
                <Route path='/about/messages/detail' component={Detail}/>
            </div>
        )
    }
}
