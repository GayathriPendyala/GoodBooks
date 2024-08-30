<script setup lang="ts">

import type { BookItem } from "@/types";
import { useCartStore } from "@/stores/cart";
import { asDollarsAndCents } from "../main";
import { useCategoryStore } from "@/stores/category";
const cartStore = useCartStore();
const categoryStore = useCategoryStore();



const bookImageFileName = function (book: BookItem): string {
  let name = book.title.toLowerCase();
  name = name.replace(/ /g, "-");
  name = name.replace(/'/g, "");
  return new URL(`../../public/book-images/${name}.jpeg`, import.meta.url).href;
};

const updateCart = function (book: BookItem, quantity: number) {
  cartStore.cart.update(book, quantity);

}

const getSubTotal = function () {
  let subTotal = 0;
  for (let item of cartStore.cart.items) {
    subTotal += item.book.price * item.quantity;
  }
  return subTotal;
};


const booksCountMessage = function () {
  let bookGrammar = "books";
  if (cartStore.count == 1) {
    bookGrammar = "book";
  }
  let message =
      "You Cart Contains" +
      " " +
      cartStore.count +
      " " +
      bookGrammar + ".";

  return message;
};

</script>

<style scoped>
.cart-table {
  display: grid;
  grid-template-columns: max-content minmax(10em, 20em) repeat(3, max-content);
  row-gap: 1em;
  width: fit-content;
  margin: 0 auto;
  background-color: aliceblue;
}

ul {
  display: contents;
}



ul > li {
  display: contents;
}

.table-heading {
  background-color: #333;
  color: white;
}

.table-heading > * {
  background-color: #333;
  padding: 0.5em;
}

.heading-book {
  grid-column: 1 / 3;
}

.heading-price {
  grid-column: 3 / 5;
  text-align: right;
}

.heading-subtotal {
  text-align: right;
  grid-column: -2 / -1;
}

.cart-book-image {
  padding: 0 1em;
}
.btn{
  display:inline-block;
  padding: 12px 30px;
  background-color: darkgrey;
  color:#fff;
  text-decoration:none;
  border-radius:5px;
  transition: 0.4s ease;
  position: relative;
  align-items: center;
  font-weight: bold;
  text-align: center;
}

.btn1{
  display:inline-block;
  padding: 12px 30px;
  background-color: dimgrey;
  color:#fff;
  text-decoration:none;
  border-radius:5px;
  transition: 0.4s ease;
  position: relative;
  align-items: center;
  font-weight: bold;
  text-align: center;
}
.cart-book-image > * {
  margin-left: auto;
  margin-right: 0;
}

img {
  display: block;
  width: 100px;
  height: auto;
}

.rect {
  background-color: var(--primary-color-dark);
}

.narrow-rect {
  width: 75px;
  height: 100px;
}

.square {
  width: 100px;
  height: 100px;
}

.wide-rect {
  width: 125px;
  height: 100px;
}

.cart-book-price {
  padding-left: 1em;
  text-align: right;
}

.cart-book-quantity {
  padding-left: 1em;
  padding-right: 1em;
}

.cart-book-subtotal {
  text-align: right;
  padding-left: 1em;
  padding-right: 1em;
}

/* Row separators in the table */

.line-sep {
  display: block;
  height: 2px;
  background-color: gray;
  grid-column: 1 / -1;
}

/* Increment/decrement buttons */

.icon-button {
  border: none;
  cursor: pointer;
}

.inc-button {
  font-size: 1.125rem;
  color: var(--primary-color);
  margin-right: 0.25em;
}

.inc-button:hover {
  color: var(--primary-color-dark);
}

.dec-button {
  font-size: 1.125rem;
  color: #ccc;

}

.dec-button:hover {
  color: #aaa;
}

/* Chevron buttons */

.dec-arrow-button,
.inc-arrow-button {
  font-size: 1rem;
  color: var(--primary-color);
}

.dec-arrow-button:hover,
.inc-arrow-button:hover {
  color: var(--primary-color-dark);
}

input[type="number"] {
  width: 4em;
}
.alignBtn{
  display: flex;
  justify-content: center;
  align-items: center;
}

select {
  background-color: var(--primary-color);
  color: white;
  border: 2px solid var(--primary-color-dark);
  border-radius: 3px;
}

.container{
  display: flex;
  justify-content: center;
}
</style>

<template>
  <div class="container" style="font-size: 18px">{{  booksCountMessage() }} </div>
  <div class="container">
    <button class="btn" @click="cartStore.clearCart()">Clear Cart</button>

    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<router-link
      :to=" '/GayathriBookstoreTransact/category/' + categoryStore.selectedCategoryName"
  ><button class="btn">Continue Shopping</button></router-link>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </div>
  <div class="cart-table">
    <ul v-if="cartStore.count > 0">
      <li class="table-heading">
        <div class="heading-book">Book</div>
        <div class="heading-price">Price / Quantity</div>
        <div class="heading-subtotal">Amount</div>
      </li>

      <template v-for="item in cartStore.cart.items" :key="item.book.bookId">
        <li>
          <div class="cart-book-image">
            <img
                :src="bookImageFileName(item.book)"
              :alt="item.book.title"
              width="100px"
              height="auto"
            />
          </div>
          <div class="cart-book-title">{{ item.book.title }}</div>
          <div class="cart-book-price">
            ${{ (item.book.price / 100).toFixed(2) }}
          </div>
          <div class="cart-book-quantity">
            <span class="quantity">{{ item.quantity }}</span
            >&nbsp;
            <button
              class="icon-button inc-button"
              @click="updateCart(item.book, item.quantity + 1)"
            >
              <i class="fas fa-plus-circle"></i>
            </button>
            <button
              class="icon-button dec-button"
              @click="updateCart(item.book, item.quantity - 1)"
            >
              <i class="fas fa-minus-circle"></i>
            </button>
          </div>
          <div class="cart-book-subtotal"> ${{ (item.book.price/100)  *  (item.quantity) }} </div>

        </li>
        <li class="line-sep"></li>

      </template>
      <div class="alignBtn">
        &nbsp;&nbsp;&nbsp;&nbsp;
      Cart Total: {{ asDollarsAndCents(Number(getSubTotal().toFixed(2))) }}
        &nbsp;&nbsp;&nbsp;&nbsp;
      <router-link to='/GayathriBookstoreTransact/checkout'><button class="btn1">Checkout</button></router-link>
      </div>
    </ul>


  </div>
  <br>
</template>
