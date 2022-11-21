# 每一个React应用的入口 -- ReactDOM.render

`react-dom`包提供的`render`函数为每个react应用的入口, 接受三个参数:
 1. `element` 需要挂载的组件, `babel`会调用`react.createElement`进行处理, 变成react-dom可以识别的`ReactElement`对象;
 2. `container` react应用挂载的父节点, `create-react-app`创建的应用默认为`id="root"`的div元素;
 3. `callback` 待补充。
 
 `ReactDOM.render(<App />, document.getElementById('root'));`, 开发环境进行一些warning的处理之后直接调用
 `legacyRenderSubtreeIntoContainer(null, element, container, false,callback)`函数
 
## legacyRenderSubtreeIntoContainer的作用 
 该方法接受5个参数:
 1. `parentComponent` 当前需要挂载元素的父组件
 2. `children` 当前需要挂载的组件
 3. `container` 真实dom节点容器
 4. `forceHydrate` "注水", 在react中是ssr相关的，因为ssr时服务器输出的是字符串，而浏览器端需要根据这些字符串完成react的初始化工作，比如创建组件实例，这样才能响应用户操作。
 5. `callback`
 
 首先, 取`container._reactRootContainer`属性, 若该属性不存在则为初次渲染会先去创建`_reactRootContainer`属性, 并且在调用`updateContainer`时使用`BatchedContext`模式;
 
 其次, 对入参`callback`进行一些处理;
 
 最后, 调用`updateContainer(children, fiberRoot, parentComponent, callback)`, 其中`_internalRoot`为`_reactRootContainer`的属性,
 
## _reactRootContainer属性的创建
 通过`legacyCreateRootFromDOMContainer(container, forceHydrate)`方法创建。
 
 首先, `shouldHydrate`为`false`时, 会清空`container`所有的子节点;
 
 其次, 创建RootContainer, 调用`createLegacyRoot(container, options)` -> `new ReactDOMBlockingRoot(container, LegacyRoot, options)`, 其中`options`为hydrate; 
  `LegacyRoot`为tag标记, 等于0; `_reactRootContainer`为ReactDOMBlockingRoot的实例对象挂载的`FiberRoot`实例; 
 
 
 
 