import { computed, inject } from '@angular/core';
import { product } from './models/prodect';
import {
  patchState,
  signalMethod,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { produce } from 'immer';
import { Toaster } from './services/toaster';
import { CartItem } from './models/cart';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from './components/sign-in-dialog/sign-in-dialog';
import { signIpParams, signUpParams, User } from './models/user';
import { Router } from '@angular/router';
import { Order } from '../../../src/app/models/order';

export type EcommerceState = {
  products: product[];
  category: string;
  wishlistItems: product[];
  cartItems: CartItem[];
  user: User | undefined;

  loading: boolean;
};

export const EcommerceStore = signalStore(
  {
    providedIn: 'root',
  },

  withState({
    products: [
      {
        id: ' 1',
        name: 'ZenBook Pro 15',
        description:
          'A high-performance laptop with an OLED display, perfect for creative professionals and developers.',
        price: 1499.99,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH9EjnjJLjLKeAaH48iGxup4p-4bYskjvfXA&s',
        rating: 4.7,
        reviewCount: 320,
        inStock: true,
        category: 'laptops',
      },
      {
        id: '2',
        name: 'Pixel 8 Smartphone',
        description:
          'The latest smartphone with an advanced AI camera system and a vibrant 6.2-inch display.',
        price: 699.0,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk9JFT1m3LORit0Dxd-QLQW0cDmBNjebt8fA&s',
        rating: 4.5,
        reviewCount: 1150,
        inStock: true,
        category: 'Smartphones',
      },
      {
        id: ' 3',
        name: 'QuietComfort Ultra Headphones',
        description:
          'Industry-leading noise-cancelling wireless headphones with immersive audio and plush comfort.',
        price: 429.0,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIgO9K2aFl1MLcTckNw3nodaINcDUYDqSJsg&s',
        rating: 4.8,
        reviewCount: 890,
        inStock: true,
        category: 'electronics',
      },
      {
        id: '4',
        name: 'Galaxy Watch 6',
        description:
          'A sleek smartwatch with comprehensive health tracking, GPS, and a durable sapphire crystal display.',
        price: 299.99,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeDSwDFqC2jAc2fScX59OmoCLvt8VulcotZA&s',
        rating: 4.4,
        reviewCount: 540,
        inStock: false,
        category: 'home',
      },
      {
        id: '5',
        name: 'OLED 4K Smart TV (55-inch)',
        description:
          'A stunning 4K OLED TV with deep blacks, vibrant colors, and a smart platform for all your streaming needs.',
        price: 1297.99,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe3Lac5AeVSyTCM64w8pS-sIIsTyW_6iQy2Q&s',
        rating: 4.6,
        reviewCount: 412,
        inStock: false,
        category: 'home',
      },

      {
        id: '6',
        name: 'iPhone 15',
        description:
          'Features the Dynamic Island, a 48MP Main camera, and USB-C, all in a durable color-infused glass and aluminum design.',
        price: 799.0,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEvOzPMLPYFJgHPQfUUNj24HjmCAs6mt7r3A&s',
        rating: 4.6,
        reviewCount: 980,
        inStock: true,
        category: 'smartphones',
      },
      {
        id: '7',
        name: 'Spectre x360 14',
        description:
          'A versatile 2-in-1 laptop with a premium design, powerful Intel Core Ultra processor, and a 2.8K OLED display.',
        price: 1349.99,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR03_PojF9HUmvdkgF51myQI-pJSjnLtNdpsg&s',
        rating: 4.5,
        reviewCount: 230,
        inStock: true,
        category: 'laptops',
      },

      {
        id: '8',
        name: 'Classic Denim Jacket',
        description:
          'A timeless vintage-style denim jacket made from 100% organic cotton with sturdy button closures.',
        price: 89.99,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnYUs8neDB0HTS-cqfA2Ku012JRErL2s5sAQ&s',
        rating: 4.6,
        reviewCount: 215,
        inStock: true,
        category: 'all',
      },
      {
        id: '9',
        name: 'Premium Cotton Hoodie',
        description:
          'Soft, heavyweight fleece hoodie tailored for a relaxed fit, available in neutral earth tones.',
        price: 55.0,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb_aO6EW-Xrh1TF-q9ZQQ9kqsjv0jfzDYb7A&s',
        rating: 4.8,
        reviewCount: 530,
        inStock: true,
        category: 'clothing',
      },
      {
        id: '10',
        name: 'Slim Fit Chino Pants',
        description:
          'Versatile slim-fit trousers made with stretch fabric for all-day comfort and style.',
        price: 45.5,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYlF_ov2mWofLTMlkD7-HTBO2Hodhpnb9rUg&s',
        rating: 4.4,
        reviewCount: 180,
        inStock: true,
        category: 'clothing',
      },
      {
        id: '11',
        name: 'Luxury Chronograph Watch',
        description:
          'Stainless steel analog watch with a leather strap, water resistance, and a sapphire crystal face.',
        price: 249.0,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6UkRv6g0On8N0p4Uca-TlhS3m5AER1CfkQg&s',
        rating: 4.9,
        reviewCount: 85,
        inStock: true,
        category: 'home',
      },
      {
        id: '12',
        name: 'Minimalist Mesh Watch',
        description:
          'An elegant, ultra-thin quartz watch with a matte black dial and a gold stainless steel mesh strap.',
        price: 120.0,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNFgIG2SHfd0y0xi6MjaXxWoIM1UkfJ2Szw&s',
        rating: 4.5,
        reviewCount: 140,
        inStock: false,
        category: 'all',
      },
      {
        id: '13',
        name: 'Polarized Aviator Sunglasses',
        description:
          'Classic metal frame aviators with UV400 protection and anti-glare polarized lenses.',
        price: 135.0,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYbZZmA8HY0aKYQSqrzZiE1wJwCx-ajZbN9w&s',
        rating: 4.7,
        reviewCount: 310,
        inStock: true,
        category: 'home',
      },
      {
        id: '14',
        name: 'Blue Light Blocking Glasses',
        description:
          'Stylish acetate frames with non-prescription lenses designed to filter blue light from digital screens.',
        price: 45.0,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGkmsxT0LQsX4n2soToDicNoGk6pX3hu6DDA&s',
        rating: 4.3,
        reviewCount: 520,
        inStock: true,
        category: 'electronics',
      },
      {
        id: '15',
        name: 'Modern Oak Dining Set',
        description:
          'A solid oak dining table with four matching upholstered chairs, perfect for modern interiors.',
        price: 599.99,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-5_3yCyrqwRLEvqyARMWxb3bVq4rBnd4OCQ&s',
        rating: 4.6,
        reviewCount: 45,
        inStock: true,
        category: 'home',
      },
    ],

    category: 'all',
    wishlistItems: [],
    cartItems: [],
    user: undefined,
    loading: false,
  } as EcommerceState),
  withComputed(({ category, products, wishlistItems, cartItems }) => ({
    filteredProducts: computed(() => {
      if (category() === 'all') return products();

      return products().filter((p) => p.category === category().toLowerCase());
    }),
    wishlistCount: computed(() => wishlistItems().length),
    cartCount: computed(() => cartItems().reduce((acc, item) => acc + item.quantity, 0)),
  })),

  withMethods(
    (store, toaster = inject(Toaster), matDialog = inject(MatDialog), router = inject(Router)) => ({
      setCategory: signalMethod<string>((category: string) => {
        patchState(store, { category });
      }),

      addToWishlist: (product: product) => {
        const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
          if (!draft.find((p) => p.id === product.id)) {
            draft.push(product);
          }
        });
        patchState(store, { wishlistItems: updatedWishlistItems });
        toaster.success('Product added to wishlist');
      },

      removeFromWishlist: (product: product) => {
        patchState(store, {
          wishlistItems: store.wishlistItems().filter((p) => p.id !== product.id),
        });
        toaster.success('Product removed from wishlist');
      },

      clearWishlist: () => {
        patchState(store, { wishlistItems: [] });
      },

      addToCart: (product: product, quantity = 1) => {
        const existingItemIndex = store.cartItems().findIndex((i) => i.product.id === product.id);

        const updatedCartItems = produce(store.cartItems(), (draft) => {
          if (existingItemIndex !== -1) {
            draft[existingItemIndex].quantity += quantity;
            return;
          }

          draft.push({ product, quantity });
        });

        patchState(store, { cartItems: updatedCartItems });
        toaster.success(
          existingItemIndex !== -1 ? 'Product quantity updated in cart' : 'Product added to cart'
        );
      },

      setItemQuantity(params: { productId: string; quantity: number }) {
        const index = store.cartItems().findIndex((c) => c.product.id === params.productId);
        const updated = produce(store.cartItems(), (draft) => {
          draft[index].quantity = params.quantity;
        });
        patchState(store, { cartItems: updated });
      },

      addAllWishlistToCart: () => {
        const updatedCartItems = produce(store.cartItems(), (draft) => {
          store.wishlistItems().forEach((p) => {
            if (!draft.find((c) => c.product.id === p.id)) {
              draft.push({ product: p, quantity: 1 });
            }
          });
        });

        patchState(store, { cartItems: updatedCartItems, wishlistItems: [] });
      },

      moveToWishlist: (product: product) => {
        const updatedCartItems = store.cartItems().filter((p) => p.product.id !== product.id);
        const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
          if (!draft.find((p) => p.id === product.id)) {
            draft.push(product);
          }
        });
        patchState(store, { cartItems: updatedCartItems, wishlistItems: updatedWishlistItems });
      },

      removeFromCart: (product: product) => {
        patchState(store, {
          cartItems: store.cartItems().filter((c) => c.product.id !== product.id),
        });
      },

      proceedToCheckout: () => {
        if (!store.user()) {
          matDialog.open(SignInDialog, {
            disableClose: true,
            data: {
              checkout: true,
            },
          });
          return;
        }
        router.navigate(['/checkout']);
      },

      placeOrder: async () => {
        patchState(store, { loading: true });

        const user = store.user();

        if (!user) {
          toaster.error('Please login before placing order');
          return;
        }
        const order: Order = {
          id: crypto.randomUUID(),
          userId: user.id,
          total: Math.round(
            store.cartItems().reduce((acc, item) => acc + item.quantity * item.product.price, 0)
          ),
          items: store.cartItems(),
          paymentStatus: 'success',
        };
        await new Promise((resolve) => setTimeout(resolve, 1000));

        patchState(store, { loading: false, cartItems: [] });
        router.navigate(['order-success']);
      },

      signIn: ({ email, password, checkout, dialogId }: signIpParams) => {
        patchState(store, {
          user: {
            id: '1',
            email,
            name: ' Muhammad ',
            imageUrl:
              'https://media.licdn.com/dms/image/v2/D4D35AQF-7-igZrSqmQ/profile-framedphoto-shrink_400_400/B4DZmHRNpDH4Ac-/0/1758911060935?e=1764583200&v=beta&t=YN-q2wky1auice29LGvRisgYV4fOc0s5b_OKjMW7O44',
          },
        });

        matDialog.getDialogById(dialogId)?.close();

        if (checkout) {
          router.navigate(['/checkout']);
        }
      },

      signUp: ({ email, password, name, checkout, dialogId }: signUpParams) => {
        patchState(store, {
          user: {
            id: '1',
            email,
            name: ' Muhammad ',
            imageUrl:
              'https://media.licdn.com/dms/image/v2/D4D35AQF-7-igZrSqmQ/profile-framedphoto-shrink_400_400/B4DZmHRNpDH4Ac-/0/1758911060935?e=1764583200&v=beta&t=YN-q2wky1auice29LGvRisgYV4fOc0s5b_OKjMW7O44',
          },
        });

        matDialog.getDialogById(dialogId)?.close();

        if (checkout) {
          router.navigate(['/checkout']);
        }
      },

      signOut: () => {
        patchState(store, { user: undefined });
      },
    })
  )
);
