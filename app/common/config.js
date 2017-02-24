"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config = (function () {
    function Config() {
    }
    Config.formatDate = function (secondStr) {
        var date = new Date();
        var seconds = parseInt(secondStr);
        date.setTime(seconds);
        console.log("ISO Time String: " + date.toISOString());
        return date.toISOString();
    };
    Config.getToken = function () {
        return localStorage.getItem('token');
    };
    return Config;
}());
Config.api_host = 'http://madamhuang.com:9000/api';
Config.user_header_folder = 'image/headImage';
//public static api_host: string = 'http://10.7.40.108:9000';
//public static api_host: string = 'http://api.pureilab.com:9000';
Config.PAGE_NUM = 50;
exports.Config = Config;
exports.TEXTS = [
    { id: 0, val: "Please login" },
    { id: 100, val: "Invalid user name/password" },
    { id: 200, val: "Your session has timed out or you are not authorized" },
    { id: 300, val: "You have successfully logged out" },
    { id: 500, val: "Server error: Please try again later" }
];
var Text = (function () {
    function Text(id, val) {
        this.id = id;
        this.val = val;
    }
    Text.val = function (id) {
        // [note]: forEach cannot break!
        var isGoing = true;
        var value = '';
        exports.TEXTS.forEach(function (text) {
            if (isGoing) {
                if (id == text.id) {
                    console.log(text.val);
                    value = text.val;
                    isGoing = false;
                }
            }
        });
        return value;
    };
    return Text;
}());
exports.Text = Text;
//export const TEXTS: {[key:number]:string}[] = [
//{[0]:'test'},
//{[100]:'test'},
//{[200]:'test'},
//{[300]:'Failed - invalid user name or password!'}
//];
//# sourceMappingURL=config.js.map