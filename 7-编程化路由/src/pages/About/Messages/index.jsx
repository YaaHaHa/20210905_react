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
    // 需要传参，push是被推进的路径
    inpush=(id,title)=>{
        return ()=>{
            this.props.history.push(`/about/messages/detail/${id}/${title}`);
          
        }
    }
    // 替换上一个路径
    /* 
        点击About >Message >push你好1 >replace你好2 >replace你好3
        你好1被你好3覆盖，所以如果现在返回，是到Message
    
    */
    inreplace=(id,title)=>{
        return ()=>{
            this.props.history.replace(`/about/messages/detail/${id}/${title}`);
        }
    }
    forward=()=>{
        this.props.history.goForward()
    }
    back=()=>{
        this.props.history.goBack()
    }
    go=()=>{
        this.props.history.go(1)
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
                                    <Link to={`/about/messages/detail/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link>&nbsp;&nbsp;
                                    <button onClick={this.inpush(msgObj.id,msgObj.title)}>push</button>
                                    <button onClick={this.inreplace(msgObj.id,msgObj.title)}>replace</button>
                                    {/* Searcha传参 */}
                                    {/* <Link to={`/about/messages/detail?id=${msgObj.id}&title=${msgObj.title}`}>{msgObj.title}</Link>&nbsp;&nbsp; */}

                                    {/* state传参，不是组件的三大属性那个 */}
                                    {/* <Link to={{pathname:'/about/messages/detail',state:{id:msgObj.id,title:msgObj.title}}}>{msgObj.title}</Link>&nbsp;&nbsp; */}
                                </li>
                                )
                        })
                    }
                </ul>
                <hr />
                <hr />
                <button onClick={this.forward}>前进</button>
                <button onClick={this.back}>后退</button>
                <button onClick={this.go}>go</button>
                {/* 路由那里也要以params的形式接参数。传到的数据在路由组件的props.match.params中 */}
                <Route path='/about/messages/detail/:id/:title' component={Detail}/>
                {/* 接Search参数不用声明 */}
                {/* <Route path='/about/messages/detail' component={Detail}/> */}
            </div>
        )
    }
}
