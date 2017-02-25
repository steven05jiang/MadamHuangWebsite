import { Component, OnInit } from '@angular/core';
import { Config } from '../common/config'

@Component({
    moduleId: module.id,
    selector: 'my-payment',
    templateUrl: 'payment.component.html',
    styleUrls: [ 'payment.component.css' ]
})

export class PaymentComponent implements OnInit {

	applicationId = Config.applicationId;
	paymentForm: any;

  	constructor() {
	}

	ngOnInit(): void {
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
		      elementId: 'sq-postal-code'
		      placeholder: 'Enter Zipcode here'
		    },
		    callbacks: {

		      // Called when the SqPaymentForm completes a request to generate a card
		      // nonce, even if the request failed because of an error.
		      cardNonceResponseReceived(errors: any, nonce: any, cardData: any)  {
		        if (errors) {
		          console.log("Encountered errors:");

		          // This logs all errors encountered during nonce generation to the
		          // Javascript console.
		          errors.forEach((error:any) => {
		            console.log('  ' + error.message);
		          });

		        // No errors occurred. Extract the card nonce.
		        } else {

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

		      unsupportedBrowserDetected() {
		        // Fill in this callback to alert buyers when their browser is not supported.
		      },

		      // Fill in these cases to respond to various events that can occur while a
		      // buyer is using the payment form.
		      inputEventReceived(inputEvent:any) {
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

		      paymentFormLoaded() {
		        // Fill in this callback to perform actions after the payment form is
		        // done loading (such as setting the postal code field programmatically).
		        // paymentForm.setPostalCode('94103');
		      }
		    }
		  });
	}

	ngAfterViewInit(){
		this.paymentForm.build();
	}

	ngOnDestroy() {
	    this.paymentForm.destroy();
	  }

	// This function is called when a buyer clicks the Submit button on the webpage
  // to charge their card.
  	requestCardNonce(event:any) {

    // This prevents the Submit button from submitting its associated form.
    // Instead, clicking the Submit button should tell the SqPaymentForm to generate
    // a card nonce, which the next line does.
    //event.preventDefault();

    this.paymentForm.requestCardNonce();
  }
}
