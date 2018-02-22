### 初探create-react-app手机网站

> 书写流程
1. 首先写好列表和详情模块==>设置路由
2. 列表模块设置好```<Link to={`/hothome/hot/${item.id}`}></Link>```

> 路由注意点:
* 由首页进入的列表页尽量使用路由渲染,否则获取当前url有麻烦

> 遇到的问题
1. 服务器部署:
    * ```build```之后的文件夹要直接放在根目录
    * 尽量使用```HashRouter```,不要使用```BrowserRouter```,否则通过路由进入的详情页刷新会报404错误

2. 浏览器后退功能:
    * 需要安装```history```库来进行配合
    ```
    按照文档引入
    import createHistory from "history/createBrowserHistory";
    创建一个history
    const history = createHistory();
    在元素上使用
    onClick={history.goBack}
    ```

3. 获取当前加载页路径:
    使用此命令既可:
    ```this.props.match.url```
    但是要注意,此命令只是用于路由渲染的组件
    * 由路由渲染的组件都会自动的往组件中传递一个参数，这个参数包含了路由信息

4. 合并对象:
    ```
    var o1 = { a: 1 };
    var o2 = { b: 2 };
    var o3 = { c: 3 };

    var obj = Object.assign(o1, o2, o3);
    console.log(obj); // { a: 1, b: 2, c: 3 }
    console.log(o1);  // { a: 1, b: 2, c: 3 }, 注意目标对象自身也会改变。
    ```

5. 获取父级路由进行再次处理:
   ```
   <Route path="/hothome/:id/list/:id" component={HotContent}></Route>
   <Route path="/hothome/:id/list/" component={HotList}></Route>
   <Route path="/hothome/" component={HtListParent}></Route>

   <Link to={`${this.props.match.url}${item.id}`}></Link>
   ```

6. 刷新当前模块:
   ```
   只需要执行this.setState()方法既可
   ```

7. 刷新当前页面:
   ```
   window.location.reload();
   ```

8. 本地储存实现不同城市切换数据:
   ```
   localStorage.cityID = 8;
   ```