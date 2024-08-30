<script setup lang="ts">
//import TheHomeCategoryList from "@/components/TheHomeCategoryList.vue";
import TheCategoryNav from "@/components/TheCategoryNav.vue";
import TheCategoryBookList from "@/components/TheCategoryBookList.vue";
</script>

<style scoped>
*{
  margin:0px;
  padding:0px;
  box-sizing:border-box;
  font-family:"Arial",sans-serif;
}

.Bodytext{
  padding: 10px 10px;
  display:flex;
  align-items:center;
  flex-direction: column;
  text-align:center;
  background-color: #F4C2C2;
}
.main-content{
  background-color: lightpink;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
  height:505px;
}
.btn{
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
  text-align: center;
}
.Bodytext h1{
  font-size: 48px;
  color:#000;
}
.main-content{
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
  height:515px;
}

.books{
  display:grid;
  grid-template-columns: repeat(3,1fr);
  grid-gap: 5px;
  margin-bottom:2px;
}

.book{
  display: flex;
  height: 800px;
  width: 300px;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.book img{
  max-width : 100%;
  margin-bottom:10px;

}

.buttonAlign{
  text-align: center;
  cursor: pointer;
}

.btn:hover{
  cursor: pointer;
  background:#0b7dda ;
}

</style>
<template>
  <the-category-nav></the-category-nav>


  <div class="Bodytext">
    <div class="body-content">
      <h1>Welcome to GoodBooks</h1>
      <h2>The Best Sellers</h2>
      <p>These are the books everyone are talking about</p>
    </div>
  </div>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

  <div class="buttonAlign">
    <router-link to='/GayathriBookstoreTransact/category/New Releases'> <button class="btn">Shop For Books here</button></router-link>
</div>
  <div class="main-content">
    <h2>Best Sellers</h2>
    <div class="books">
      <div class="book">
        <img src="/site-images/sweetness.jpeg">
        <h3>The Sweetness of Water</h3>
        <p>Nathan Harris</p>
        <p>$11.99</p>
      </div>


      <div class="book">
        <img src="/site-images/whenthevibe.jpeg">
        <h3>When The Vibe is Right</h3>
        <p>Sarah Dass</p>
        <p>$13.99</p>
      </div>


      <div class="book">
        <img src="/site-images/whispers.jpeg">
        <h3>The Whispers</h3>
        <p>Ashley Audrain</p>
        <p>$10.99</p>
      </div>
    </div>

  </div>
<div>&nbsp;</div>
</template>
