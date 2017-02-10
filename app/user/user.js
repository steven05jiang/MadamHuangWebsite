"use strict";
var User = (function () {
    function User() {
        this.id = -1;
        this.username = '';
        this.password = '';
        this.lastlogOn = (new Date().getTime()).toString();
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map