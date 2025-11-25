import { Component } from '@angular/core';
import { BackButton } from "../../components/back-button/back-button";
import { ShippingForm } from "./shipping-form/shipping-form";
import { PaymentForm } from "./payment-form/payment-form";

@Component({
  selector: 'app-checkout',
  imports: [BackButton, ShippingForm, PaymentForm],
  template: `
  <div class="mx-auto max-w-[1200px] py-6">
    <app-back-button class="mb-4" navigateTo="/cart"> Back to Cart </app-back-button>
     
    <h1 class="text-3xl font-extrabold mb-4 "> Checkout </h1>

    <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
<div class="lg:col-span-3 flex-col flex gap-6"> 
<app-shipping-form />
<app-payment-form />
</div>

<div class="lg:col-span-2">
  
</div>

</div>

</div>
  `,
  styles: ``,
})
export default class Checkout {}
