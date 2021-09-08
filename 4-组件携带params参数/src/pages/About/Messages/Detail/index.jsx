import React, { Component } from 'react'

export default class Detail extends Component {
    state={
        show:[
            {id:'001',content:'今天'},
            {id:'002',content:'明天'},
            {id:'003',content:'后天'}
        ]
    }
    render() {
        // 接收传过来的id和标题。id作匹配，title去展示
        const {id,title} =this.props.match.params
        const {show} =this.state;
        // 找到和传过来id相符的数据
        const result =show.find((showObj)=>{
            return id === showObj.id;
        })
        return (
            <ul>
                <li>ID:{result.id}</li>
                <li>TITLE:{title}</li>
                <li>CONTENT:{result.content}</li>
            </ul>
        )
    }
}
