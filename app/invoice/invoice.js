"use strict";
var customer_1 = require("../customer/customer");
var Invoice = (function () {
    function Invoice() {
        this.id = -1;
        this.customer = new customer_1.Customer();
        this.createdOn = (new Date().getTime()).toString();
        this.updatedOn = (new Date().getTime()).toString();
    }
    return Invoice;
}());
exports.Invoice = Invoice;
var InvoiceItem = (function () {
    function InvoiceItem() {
        this.invoiceId = -1;
        this.itemId = -1;
        this.name = '';
        this.description = '';
        this.price = 0.00;
    }
    return InvoiceItem;
}());
exports.InvoiceItem = InvoiceItem;
//# sourceMappingURL=invoice.js.map