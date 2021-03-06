class Router {
    constructor() {
        this.routes = {};
        this.currentUrl = '';
        this.rootDom = null;
        window.addEventListener('load', this.refresh.bind(this), false);
        window.addEventListener('hashchange', this.refresh.bind(this), false);
    }

    route(path, controller) {
        this.routes[path] = controller || function () {};
    }

    refresh() {
        this.currentUrl = location.hash.slice(1) || '/';
        if (this.routes[this.currentUrl]) {
            if (window.routerController) {
                if (window.routerController.$onDestory) window.routerController.$onDestory();
                delete window.routerController;
            }
            const controller = new this.routes[this.currentUrl];
            window.routerController = controller;
            if (controller.$beforeInit) controller.$beforeInit();
            if (controller.$onInit) controller.$onInit();
            this.refreshDom(controller);
        }
    }

    init(arr) {
        if (arr && arr instanceof Array) {
            arr.forEach(route => {
                // this.route(route.path, route.controller);
                if (route.path && route.controller && route.controller instanceof Function) {
                    this.route(route.path, route.controller);
                } else {
                    console.error('need path or controller');
                    return false;
                }
            });
            const rootDom = document.querySelector('#root');
            this.rootDom = rootDom || null;
        } else {
            console.error('no routes exit');
        }
    }

    // 刷新DOM 更新钩子函数
    refreshDom(controller) {
        const template = controller.template;
        if (template && typeof template === 'string' && this.rootDom) {
            // 钩子函数 beforeMount()
            if (controller.$beforeMount) controller.$beforeMount();
            this.replaceDom(controller);
            // 钩子函数 afterMount()
            if (controller.$afterMount) controller.$afterMount();
        } else {
            console.error('refreshDom failed: template or rootDom is not exit');
        }
    }

    // 更新DOM 替换DOM
    replaceDom(controller) {
        const template = controller.template;
        if (this.rootDom.hasChildNodes()) {
            let childs = this.rootDom.childNodes;
            for (let i = childs.length - 1; i >= 0; i--) {
                this.rootDom.removeChild(childs.item(i));
            }
        }
        // window.routerController = controller;
        let templateDom = this.parseDom(template);
        // 文档碎片
        let fragment = document.createDocumentFragment();
        fragment.appendChild(templateDom);
        this.rootDom.appendChild(fragment);
    }

    parseDom(template) {
        const elementCreated = document.createElement('div');
        let newTemplate = null;
        if (window.routerController) {
            newTemplate = template.replace(/( )(rt)([A-Za-z]+="|[A-Za-z]+="')(this)/g, (...args) => `${args[1]}on${args[3]}window.routerController`);
        }
        elementCreated.innerHTML = newTemplate;
        return elementCreated;
    }
}