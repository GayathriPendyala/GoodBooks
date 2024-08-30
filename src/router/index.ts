import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CategoryView from "@/views/CategoryView.vue";
import CartView from "@/views/CartView.vue";
import ConfirmationView from "@/views/ConfirmationView.vue";
import CheckoutView from "@/views/CheckoutView.vue";
import PageNotFoundView from "@/views/PageNotFoundView.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/GayathriBookstoreTransact/category/:name",
      name: "category-view",
      component: CategoryView,
    },
    {
      path: "/GayathriBookstoreTransact",
      name: "home",
      component: HomeView,
    },
    {
      path: "/GayathriBookstoreTransact/home",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/GayathriBookstoreTransact/index.html",
      name: "Home1",
      component: HomeView,
    },
    {
      path: "/GayathriBookstoreTransact/",
      name: "Home2",
      component: HomeView,
    },
    {
      path: "/GayathriBookstoreTransact/cart",
      name: "cart-view",
      component: CartView,
    },
    {
      path: "/GayathriBookstoreTransact/checkout",
      name: "checkout-view",
      component: CheckoutView,
    },
    {
      path: "/GayathriBookstoreTransact/confirmation",
      name: "confirmation-view",
      component: ConfirmationView,
    },
    {
      path: "/:catchAll(.*)",
      name: "404",
      component: PageNotFoundView,
    },
  ],
});

export default router;
