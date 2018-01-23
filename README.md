### 初探create-react-app手机网站

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