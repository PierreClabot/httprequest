import Api from "../apis/api.js";

class App{
    constructor(){
        this.main();
    }

    main(){
        const api = new Api();
    }
}

var app = new App();
