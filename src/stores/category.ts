import { defineStore } from "pinia";
import type { CategoryItem } from "@/types";
import { apiUrl } from "@/api";

export const useCategoryStore = defineStore("category", {
    state: () => ({
        categoryList: [] as CategoryItem[],
        selectedCategoryName: "",
    }),
    actions: {
        async fetchCategories() {
            let response = await fetch(`${apiUrl}/categories/`);
            let data = await response.json();
            this.categoryList = data as CategoryItem[];
        },
        updateSelectedCategoryName(name: string) {
            this.selectedCategoryName = name;
        }
    },
    getters: {
        getSelectedCategoryName(): string {
            return this.selectedCategoryName;
        }
    },
});
