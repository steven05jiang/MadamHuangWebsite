"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var config_1 = require("../common/config");
var PaymentComponent = (function () {
    function PaymentComponent() {
        this.applicationId = config_1.Config.applicationId;
    }
    PaymentComponent.prototype.ngOnInit = function () {
        this.paymentForm = new SqPaymentForm({
            applicationId: this.applicationId,
            inputClass: 'sq-input',
            inputStyles: [
                {
                    fontSize: '15px'
                }
            ],
            cardNumber: {
                elementId: 'sq-card-number',
                placeholder: '•••• •••• •••• ••••'
            },
            cvv: {
                elementId: 'sq-cvv',
                placeholder: 'CVV'
            },
            expirationDate: {
                elementId: 'sq-expiration-date',
                placeholder: 'MM/YY'
            },
            postalCode: {
                elementId: 'sq-postal-code',
                placeholder: 'Enter Zipcode here'
            },
            callbacks: {
                // Called when the SqPaymentForm completes a request to generate a card
                // nonce, even if the request failed because of an error.
                cardNonceResponseReceived: function (errors, nonce, cardData) {
                    if (errors) {
                        console.log("Encountered errors:");
                        // This logs all errors encountered during nonce generation to the
                        // Javascript console.
                        errors.forEach(function (error) {
                            console.log('  ' + error.message);
                        });
                        // No errors occurred. Extract the card nonce.
                    }
                    else {
                        // Delete this line and uncomment the lines below when you're ready
                        // to start submitting nonces to your server.
                        alert('Nonce received: ' + nonce);
                        /*
                          These lines assign the generated card nonce to a hidden input
                          field, then submit that field to your server.
                          Uncomment them when you're ready to test out submitting nonces.
      
                          You'll also need to set the action attribute of the form element
                          at the bottom of this sample, to correspond to the URL you want to
                          submit the nonce to.
                        */
                        // document.getElementById('card-nonce').value = nonce;
                        // document.getElementById('nonce-form').submit();
                    }
                },
                unsupportedBrowserDetected: function () {
                    // Fill in this callback to alert buyers when their browser is not supported.
                },
                // Fill in these cases to respond to various events that can occur while a
                // buyer is using the payment form.
                inputEventReceived: function (inputEvent) {
                    switch (inputEvent.eventType) {
                        case 'focusClassAdded':
                            // Handle as desired
                            break;
                        case 'focusClassRemoved':
                            // Handle as desired
                            break;
                        case 'errorClassAdded':
                            // Handle as desired
                            break;
                        case 'errorClassRemoved':
                            // Handle as desired
                            break;
                        case 'cardBrandChanged':
                            // Handle as desired
                            break;
                        case 'postalCodeChanged':
                            // Handle as desired
                            break;
                    }
                },
                paymentFormLoaded: function () {
                    // Fill in this callback to perform actions after the payment form is
                    // done loading (such as setting the postal code field programmatically).
                    // paymentForm.setPostalCode('94103');
                }
            }
        });
    };
    PaymentComponent.prototype.ngAfterViewInit = function () {
        this.paymentForm.build();
    };
    PaymentComponent.prototype.ngOnDestroy = function () {
        this.paymentForm.destroy();
    };
    // This function is called when a buyer clicks the Submit button on the webpage
    // to charge their card.
    PaymentComponent.prototype.requestCardNonce = function (event) {
        // This prevents the Submit button from submitting its associated form.
        // Instead, clicking the Submit button should tell the SqPaymentForm to generate
        // a card nonce, which the next line does.
        //event.preventDefault();
        this.paymentForm.requestCardNonce();
    };
    return PaymentComponent;
}());
PaymentComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-payment',
        templateUrl: 'payment.component.html',
        styleUrls: ['payment.component.css']
    }),
    __metadata("design:paramtypes", [])
], PaymentComponent);
exports.PaymentComponent = PaymentComponent;
//# sourceMappingURL=payment.component.js.map