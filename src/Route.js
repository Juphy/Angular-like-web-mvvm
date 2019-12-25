class Router {
    constructor() {
        this.routes = {};
        this.currentUrl = '';
        this.rootDom = null;
        window.addEventListener('load', this.refresh.bind(this), false);
        window.addEventListener('hashchange', this.refresh.bind(this), false);
    }
}