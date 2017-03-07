export class SquareMoney{
	amount: number;
	currency = 'USD';

	constructor(){}
}

export class SquareAddress{
	address_line_1: string;
	address_line_2: string;
	address_line_3: string;
	locality: string;
	sublocality: string;
	sublocality_2: string;
	sublocality_3: string;
	administrative_district_level_1: string;
	administrative_district_level_2: string;
	administrative_district_level_3: string;
	postal_code: string;
	country: string;
	first_name: string;
	last_name: string;
	organization: string;

	constructor(){}
}

export class SquareCharge{
	amount_money: SquareMoney;
	card_nonce: string;
	customer_card_id: string;
	delay_capture: boolean;
	reference_id: string;
	note: string;
	customer_id: string;
	billing_address: SquareAddress;
	shipping_address: SquareAddress;
	buyer_email_address: string;

	constructor(){}
}

export class ProductInfo{
	id: number;
	note: string;
	productCategory: number;
	productId: number;
	baseQuantity: number;
	basePrice: number;
	memberQuantity: number;
	memberPrice: number;
	totalPrice: number
	comment: string;
	createdDate: Date;
	receiver: string;
	email: string;
	shippingAddr: string;
	billingAddr: string;
	transactionId: string;
	discount: Discount;

	constructor(){}
}

export class Discount{
	id: number;
	minQuantity: number;
	discountPrice: number;
	isEnable: boolean;
	newTotal: number;

	constructor(){}
}