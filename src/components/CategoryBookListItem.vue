<script setup lang="ts">
//import { defineProps } from "vue";
import type { BookItem } from "@/types";
import {useCartStore} from "@/stores/cart";
const cartStore = useCartStore();
//import {URL} from "node:url";
const props = defineProps<{
  book: BookItem;
}>();
const bookImageFileName = function (book: BookItem): string {
  let name = book.title.toLowerCase();
  name = name.replace(/ /g, "-");
  name = name.replace(/'/g, "");
  return new URL(`../../public/book-images/${name}.jpeg`, import.meta.url).href;
};
</script>
<style scoped>

.book-box {
  display: flex;
  flex-direction: column;
  background-color:lightgray;
  padding: 1em;
  gap: 0.25em;
}
.im1{
  width: 280px;
  height: 400px
}

  .book-title{
    font-size: 24px;
  }

  .book-author{
    font-size: 18px;

  }

  .book-price{
    font-size: 14px;
  }


.button.unselected-category-button,
.button.unselected-category-button:visited {
  background-color: var(--neutral-color);
}

.button.unselected-category-button:hover,
.button.unselected-category-button:active {
  background-color: var(--primary-color);
}

.button{
  display:inline-block;
  padding: 12px 30px;
  background-color:#333;
  color:#fff;
  text-decoration:none;
  border-radius:5px;
  transition: 0.4s ease;
  position: relative;
  align-items: center;
  font-weight: bold;
}

.button-readme
{
  width: 50px;
  background-color: #333;
  color: #FFFFFF;
  height: 30px;
  top: -162px;
  left: 235px;
  position: relative;
}

</style>

<template>
  <ul id="book-boxes">
  <li class="book-box">
    <div class="book-image">
      <img
          :src="bookImageFileName(props.book)"
          :alt="book.title"
      />
    </div>
    <div class="book-title">{{ book.title }}</div>
    <div class="book-author">{{ book.author }}</div>
    <div class="book-price">${{ (book.price / 100).toFixed(2) }}</div>
    <button class="button" @click="cartStore.addToCart(book)">Add to Cart</button>
    <button v-if="book.isPublic" class="button-readme"><i class="fa fa-eye"></i></button>
  </li>
  </ul>
</template>
