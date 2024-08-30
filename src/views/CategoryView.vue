<script setup lang="ts">
//import { provide } from "vue";

import type { BookItem } from "@/types";
import TheCategoryNav from "@/components/TheCategoryNav.vue";
import TheCategoryBookList from "@/components/TheCategoryBookList.vue";
import {useRoute} from "vue-router";
import {useRouter} from "vue-router";
import {apiUrl} from "@/api";
import {useBookStore} from "@/stores/book";
import { watch } from 'vue'

const route=useRoute();
const router =useRouter();
const bookStore = useBookStore();

watch(
    () => route.params.name,
    (newName) => {
      bookStore.fetchBooks(newName as string);
    },
    { immediate: true }
);


</script>

<style scoped>

.head{
  text-align: center;
}
</style>

<template>
  <div>

    <the-category-nav></the-category-nav>
    <div class="head">
      <h1> </h1>
    </div>

    <the-category-book-list :book-list ="bookStore.bookList"> </the-category-book-list>


  </div>
</template>
