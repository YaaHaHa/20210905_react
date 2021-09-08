## 有一个可以发Ajax请求的，叫Fetch，是自带的全局属性，不需要引入，他在Window里。不支持拦截器。
没人用，仅停留在提一嘴阶段，他是关注与分离的，先告诉联系服务器成功了还是失败了，随后告诉数据获取成功还是失败。太麻烦了，就算是async...await，也要两下
## 路由。根据点击的东西，把路径给改了，前端路由器监视到了改变，就陈列出来不同的组件。

## 历史记录就是不断压入栈的过程，所以才能后退

## 如何不让a标签跳转(button也是)
onClick函数的调用者调用的是false
```html
                                    如果不写return，得到了却不返回false。
<a href='http://www.baidu.com' onclick="return demo()"></a>
```
```js
function demo(){
    return false;
}

点击后，把demo的返回值返回给调用onClick的那个人（return false就是onclick的回调函数）
```

## 路由HashRouter在路径后加#，#后的路径会被当做前端资源，不会去问服务器
点击渲染新组件，不发生跳转
## 要点：
1. 添加路径到浏览器上面的地址栏中
2. 不跳转
3. 渲染新组建，覆盖旧组件
（用到React-route-dom，仅用于浏览器。React-route-native是移动端的。React-route-anywhere通用但麻烦）

### 在原生的js中，有一个库叫histort.js封装了history，可以操作浏览器的历史记录，实现监听，还能让a标签不跳转（哈希值，锚点）
创建一个路由，一种是跳转的，一种是在地址前加#
点击以后往地址栏添加路径，如果地址前有#，就不跳转，不会发请求给服务器
```js
{/* 在React中，用link进行路径的切换 给一个跳转地址，底层也是两个return，不跳转页面，能传参数。路径是/about，去找接收/about的路由

NavLink会给被点击的添加一个active激活类，正好可以和bootstrap的class=active类对上，有高亮效果。Link没有
如果NavLink想自己写样式用activeClassName来指定类，注意权重，可能会被覆盖
*/}
								
    <NavLink className="list-group-item" to="/about">About</NavLink>



{/* 注册路由 处理路径是/about的请求，加载组件About*/}
    <Route path='/about' component={About} />
    
    
在所有路由相关的外面包裹上<BrowserRouter></BrowserRouter>或<HashRouter></HashRouter>，后者在路径加#了
```                                        

## 组件分一般组件和路由组件
* 我们自己去渲染的是一般组件。我们可以向传什么参数就传什么参数(props)    <About />
* 通过路径渲染的是路由组件。没有机会写<About />没机会传参(props)    <NavLink className="list-group-item" to="/about">About</NavLink>
路径组件被React给我们传入了三个属性。history,loaction,match


* 路由组件一般放在src的pages文件夹下。想象成一个页面，一点这个，这个组件就过来

## 路由组件与一般组件
			1.写法不同：
						一般组件：<Demo/>
						路由组件：<Route path="/demo" component={Demo}/>
			2.存放位置不同：
						一般组件：components
						路由组件：pages
			3.接收到的props不同：
						一般组件：写组件标签时传递了什么，就能收到什么
						路由组件：接收到三个固定的属性
										history:
												go: ƒ go(n)
												goBack: ƒ goBack()
												goForward: ƒ goForward()
												push: ƒ push(path, state)
												replace: ƒ replace(path, state)

										location:
												pathname: "/about"
												search: ""
												state: null

										match:
												isExact: true
												params: {}
												path: "/about"
												url: "/about"
## 如果注册路由时，有一个路径重复渲染不同组件
都会出现呈现，不会被覆盖。
如果外面包上<Switch></Switch>，只会匹配第一个，提高了匹配效率
```js
<Switch>
    <NavLink path='/about' component={About}>
    <NavLink path='/about' component={Test}>
</Switch>
仅显示About组件
```

## 如果请求的路径不对，React就给我们返回index.html
浏览器报错是因为找到的html，不是样式，就报错500
解决样式丢失，bootstrap.css丢失
### 解决样式丢失方案1：
* 在引入的时候，不要./css/bootstrap.css，
* 直接/css/bootstrap.css。因为如果直接/表示永远去开启的端口下找。
* ./css/bootstrap.css，去当前路径下。
如果:
```js
<NavLink className="list-group-item" to="/test/about">About</NavLink>

<Route path='/test/about' component={About} />
第一次引入没问题。bootstrap正常引入。因为寻找的路径是正常端口下的css/bootstrap.css
如果刷新，bootstrap丢失，因为去了test/下找bootstrap.css
```

### 解决样式丢失方案2：
```html
<link rel="stylesheet" href="%PUBLIC_URL%/css/bootstrap.css">仅在React脚手架中使用
```
直接设置了绝对路径，去public中找css


### 解决样式丢失方案3：
使用HashRouter，直接#后面的不看了，不发给端口3000。因为bootstrap第一次就过来了，当做前端资源了

>方案1最常见，方案2仅在React脚手架中使用，方案3兼容性好，因为IE都能用锚点

## Redirect
```js
<Redirect to='/about' >
```
访问地址最后虽然我们没加/，浏览器给我们加了

### 他用来兜底，如果没有路由被选中，他就出现了，指了一条路，去处理/about的路由。
可以做初始化，也可以展示404页面

## 路径匹配原理
输入进去的路径像是被转换成了数组 以/为分割，一个一个推进数组。比如/at/homne转成了['at','home']
### 模糊匹配
如果路由中只有接收/at的，就会接收到/at/home做出反应，路由要求的地址，请求中必须有，顺序还必须一样，不然匹配不上
### 精准匹配
在注册路由中添加exact={true}属性，请求的和接收的路径必须一样，多了少了都不行。不能随便开，所有的后代路由废掉了
```js
<Route path='/home' exact={true} component={Home} /> 
```
>总结：观察请求路径与路由处理的路径是否对得上，请求可以比路由要求的多，路由中的全被对上才行，就能展示，如果路由精准匹配就必须路径一模一样，不能多不能少

## push与replace
这一次的历史记录是被push进去，还是被replace。
push还可以返回，replace不能返回，没有退路。
```js
replace要为true才能替换
<NavLink className="list-group-item" replace={true} to="/test/about">About</NavLink>
```

##	二级路由使用的前提是所属的一级路由组件存在，在一级路由下请求二级路由。
比如App下的About下嵌套Message。About中的路径必须是/about/message。/about在外面已经挂载上了About组件，才能访问About组件里面的Message组件
* 写嵌套路由的时候要带上他的一级路由
App.js中都是一级路由，先被匹配，App中组件最先装载。
如果路由开启精准匹配。他的所有后代路由都将受到影响
```js
<NavLink className="list-group-item" to="/about/news">About</NavLink>
在about一级路径后，About组件已经被装载后，才可以访问about下的news路由
```

## 跳转路由携带params参数，路由那里也要以params的形式接参数。传到的数据在路由组件的props.match.params中

## 其余笔记在各自文件夹中


## 优化找不到目标
找到和传过来id相符的数据，如果找不到就赋空对象，不至于result.content报错
```js
   const result =show.find( showObj => id === showObj.id )  || {}
```


## 编程化路由
不通过<Link />和<NavLink />跳转
* 路由组件的props.history下的方法push(path)和replace(path)，参数是路径，用于处理历史记录
* 还有go(跳转次数)，为正正向条，为负往后条
* goBack()，goForward()回退1与前进1
>不再依赖Link标签与NavLink，自己操作跳转与操作历史记录
### 路由组件与一般组件
			1.写法不同：
						一般组件：<Demo/>
						路由组件：<Route path="/demo" component={Demo}/>
			2.存放位置不同：
						一般组件：components
						路由组件：pages
			3.接收到的props不同：
						一般组件：写组件标签时传递了什么，就能收到什么
						路由组件：接收到三个固定的属性，因为不敢大改，就留下了，很多属性功能类似
										history:
												action:"PUSH"	程序员的动作  不常用
												block: f block(prompt)	内部一个反转的函数  不常用
												go: ƒ go(n)			
												goBack: ƒ goBack()
												goForward: ƒ goForward()
												listen: f listen(listener)  监听路径变化 不常用
												length: 2  路径有几层，不常用
												push: ƒ push(path, state)
												replace: ƒ replace(path, state)

										location:
												hash: ""  不用记
												key: "ndkhwh"	刷新一次变一次，是内部在维护的唯一标识
												pathname: "/about"		当前路径
												search: ""				
												state: null

										match:
												isExact: true
												params: {}
												path: "/about"
												url: "/about"
												
## 非路由组件可以通过withRouter得到路由组件的属性
操作方法，在一般组件从react-router-dom引入withRouter。这是一个函数
把原本暴露的Header经过withRouter处理，加上了那三个属性，把加工后的Header暴露了出去
export default withRouter(Header)
>Vue就不用这样，直接用，他就给准备好了

## 为什么要在上面引入React
```js
import React from 'react'
```
因为经过babel转换，标签会变成React.createElement()的格式

## 订阅发布传数据，如果传的多了，要注意名字不能冲突了，发布的名字不能重复