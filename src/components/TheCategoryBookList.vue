<script setup lang="ts">
import { defineComponent, watch } from "vue"; // needed if you don't want an error below
import { useBookStore } from "@/stores/book";
import { useRoute } from "vue-router";
import CategoryBookListItem from "@/components/CategoryBookListItem.vue";
import { useCategoryStore } from "@/stores/category";


const route = useRoute();
const bookStore = useBookStore();
const categoryStore = useCategoryStore();
watch(
    () => route.params.name,
    () => {
      categoryStore.updateSelectedCategoryName(String(route.params.name));
    },
    {
      immediate: true,
    }
);
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  padding: 1em;
  gap: 1em;
}
</style>

<template>
  <ul>
    <template v-for="book in bookStore.bookList" :key="book.bookId">
      <category-book-list-item :book="book"></category-book-list-item>
    </template>
  </ul>
</template>
