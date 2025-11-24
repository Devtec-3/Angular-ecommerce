import { Component, computed, inject, input } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { MatIcon } from '@angular/material/icon';
import { product } from '../../models/prodect';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-toggle-wishlist-button',
  imports: [MatIcon, MatIconButton],
  template: `
    <button
      class=" !bg-white shadow-md transition-all duration-200 hover:scale-110 hover:shadow-lg "
      [class]="isInWishlist() ? '!text-red-500' : '!text-gray-400'"
      mat-icon-button
      (click)="toggleWishlist(product())"
    >
      <mat-icon class="text-red-500">{{
        isInWishlist() ? 'favorite' : 'favorite_border'
      }}</mat-icon>
    </button>
  `,
  styles: ``,
})
export class ToggleWishlistButton {
  product = input.required<product>();

  store = inject(EcommerceStore);

  isInWishlist = computed(() => this.store.wishlistItems().find((p) => p.id === this.product().id));

  toggleWishlist(product: product) {
    if (this.isInWishlist()) {
      this.store.removeFromWishlist(product);
    } else {
      this.store.addToWishlist(product);
    }
  }
}
