# router.js

a front-end router and DOM render 一个前端路由和 DOM 渲染 a simple and naive front-end router and DOM render 一个图样、图乃义务的前端路由和 DOM 渲染

## log

1. init program

- add route and Life cycle

2. add watcher

- add new life cycle:`$watchState` and `$beforeInit`
- add new class:`Controller` and `Component`
- add watcher for state in `Controller` and `Component`

## Basic Usage

1. create a root DOM for route which id is root:

```html
<div id="root"></div>
```

2. create a router:
   Create a router:

```javascript
const router = new Router();
```

3. Create a controller for path:

```javascript
class R1 extends Controller {
  constructor() {
    super();
    this.template = `<p rtClick="this.showAlert()">点我！！！！！啊哈哈</p>`;
    this.console = document.getElementById("console");
    this.state = { a: 1 };
  }
  $onInit() {
    this.console.innerText = "is $onInit";
    console.log("is $onInit");
  }
  $beforeMount() {
    this.console.innerText = "is $beforeMount";
    console.log("is $beforeMount");
  }
  $afterMount() {
    this.console.innerText = "is $afterMount";
    console.log("is $afterMount");
  }
  $onDestory() {
    this.console.innerText = "is $onDestory";
    console.log("is $onDestory");
  }
  $watchState(oldData, newData) {
    console.log("oldData Component:", oldData);
    console.log("newData Component:", newData);
  }
  showAlert() {
    this.setState("a", 2);
    alert("1111111111111");
  }
}
```

4. Create an array for routes, and init a router:

```javascript
const routes = [
  {
    path: "R1",
    controller: R1
  },
  {
    path: "R2",
    controller: R2
  }
];
router.init(routes);
```

5. Life cycle is:

```javascript
constructor;
$beforeInit  // don't use this, because it's prepare for watch state
$onInit
$beforeMount
$afterMount
$onDestory
$watchState
```

## To do

改用 history 模块的 pushState 方法去触发 url 更新
双向绑定
数据监听
动态渲染 DOM