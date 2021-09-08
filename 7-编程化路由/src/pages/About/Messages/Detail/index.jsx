import React, { Component } from 'react'
// 引入quertstring库处理search参数
// import qs from 'querystring'

export default class Detail extends Component {
    state={
        show:[
            {id:'001',content:'今天'},
            {id:'002',content:'明天'},
            {id:'003',content:'后天'}
        ]
    }
    render() {
        console.log(this)
        const {show} =this.state;
        // 接收传过来的id和标题。id作匹配，title去展示
        const {id,title} =this.props.match.params

        /* // search接到的不是key:value形式的，要解析一下才好用
        const {search} =this.props.location;
        const {id,title} =qs.parse(search.slice(1)); */

        // 接state参数
        // const {id,title} =this.props.location.state;
        // 找到和传过来id相符的数据，如果找不到就赋空对象，不至于result.content报错
        const result =show.find( showObj => id === showObj.id )  || {}
        return (
            <ul>
                <li>ID:{id}</li>
                <li>TITLE:{title}</li>
                <li>CONTENT:{result.content}</li>
            </ul>
        )
    }
}
