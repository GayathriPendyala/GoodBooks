<script setup lang="ts">
import TheHeaderDropdown from "@/components/TheHeaderDropdown.vue";
import {useCartStore} from "@/stores/cart";
const cartStore= useCartStore();
</script>

<style scoped>
header{
  background-color:  #333;
  color:white;
  padding:30px 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top:0;
  z-index: 100;
  height: 65px;
}
.badge:after{
  content:attr(value);
  font-size:18px;
  color: #fff;
  background: red;
  border-radius:70%;
  padding: 0 5px;
  position:relative;
  left:-8px;
  top:-10px;
  opacity:0.9;
  height: 20px;
  width: 20px;
}
.logo{
  font-size: 32px;
  font-weight: bold;
  font-family: cur;

}
.header-dropdown {
  position: relative;
  background-color: lightgray;
  display:inline-block;

  background-color:white;
  text-decoration:none;
  border-radius:5px;
  transition: 0.4s ease;
  position: relative;
  align-items: center;

}

.categories-button {
  background-color: var(--primary-color-dark);
  margin-top: 0.25em;
}

.header-dropdown ul {
  background-color: white;
  color: rgb(1, 1, 1);
  display: none;
}

.header-dropdown li {
  padding: 0.25em 0.5em;
}

.header-dropdown a {
  color: black;
  text-decoration: none;
}

.header-dropdown li:hover {
  background: lightgray;
}

.header-dropdown:hover ul {
  display: block;
  position: absolute;
  min-width: 8em;
  z-index: 1;
  cursor: pointer;
}

.logo img{
  color:#fff;
  text-decoration: none;
  margin-left: 20px;
  height: 50px;
  width: 40px;

}
form.example input[type=text] {
  padding: 10px;
  font-size: 17px;
  border: 1px solid grey;
  float: left;
  width: 300px;
  background: #f1f1f1;
}
.logo{
  text-decoration: none;
}
form.example button:hover {
  background: #0b7dda;
}

/* Clear floats */
form.example::after {
  content: "";
  clear: both;
  display: table;
  width: 300px;
  background-color: #111111;

}
form.example{
  width: 50%;
  padding: 0.5em;
}
form.example button {
  float: left;
  width: 10%;
  padding: 10px;
  background: black;
  color: white;
  font-size: 17px;
  border: 1px solid grey;
  border-left: none; /* Prevent double borders */
  cursor: pointer;


}

.cart-size
{
  position: absolute;
  top:20px;
  right:25px;
  color: white;
  size:1rem;
  font-size:large;
  font-weight: bold;
}
.cart{
  padding: 15px;
  position: relative;
}
.btn1{
  display:inline-block;
  padding: 8px 20px;
  background-color:white;
  color: #000;;
  text-decoration:none;
  border-radius:2px;
  transition: 0.4s ease;
  position: relative;
  font-weight: bold;
  font-size: 18px;
  flex-direction: row;
  width: 200px;
}
.tex{
  align-content: center;
}
form.example button:hover {
  background: #0b7dda;
}

.search-button {
  background:black;
  border: none;
  outline: none;
  margin-left: -55px;
  width:38px;
  height: 38px;
  border-radius: 5px;
  left: -55px;
  padding: 0.5em;
}

.search-button img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  background-color: black;
}
.text-logo {
  font-family: var(--title-font-family);
  font-size: 32px;
}
.tex{
  font-size: 20px;
  text-align: justify;
}
.btn1:hover{
  background: #0b7dda;
  cursor: pointer;
}
@media (max-width: 800px) {
  header {
    flex-direction: column;
  }
}

</style>

<template>
  <header class="container">
    <router-link to="/GayathriBookstoreTransact">
    <div class="logo">
      <img src="/site-images/book.png"  alt="GoodBooks Logo" width="150" height="auto"/>
    </div>
    </router-link>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <h1>
      <router-link to="/GayathriBookstoreTransact" class="text-logo" style="text-decoration: none" >GoodBooks </router-link>
    </h1>
    <!-- The form -->
    <form class="example">
      <input type="text" placeholder="Search by Author Name, Book Name" name="search">
      <button type="submit"><i class="fa fa-search"></i></button>
    </form>

    <div class="header-dropdown">
      <button class="btn1">Categories &nbsp;<i class="fa fa-angle-down"></i></button>

      <ul>
        <router-link to='/GayathriBookstoreTransact/category/New Releases'> <li>New Releases</li></router-link>
        <router-link to='/GayathriBookstoreTransact/category/Best Sellers'>  <li>Best Sellers</li></router-link>
        <router-link to='/GayathriBookstoreTransact/category/Top 100'> <li>Top 100</li></router-link>
        <router-link to='/GayathriBookstoreTransact/category/Readers Choice'> <li>Readers Choice</li></router-link>
      </ul>
    </div>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

    <div class="cart">
      <router-link to='/GayathriBookstoreTransact/cart'><i class="fas fa-shopping-cart fa-2x"></i> </router-link>

      <span class="cart-size">{{ cartStore.count }}</span>
    </div>

    <h1 class="tex"> Arjun &nbsp;&nbsp;</h1>
    &nbsp;&nbsp;
    <i class='fas fa-user-circle' style='font-size:48px;color:white'></i>
  </header>
</template>
