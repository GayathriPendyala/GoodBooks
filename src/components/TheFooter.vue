<script setup lang="ts">
</script>

<style scoped>
footer{
  background-color:  #333;
  color:#fff;
  padding:20px 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top:0;
  z-index: 100;
  height: 65px;
}
ul.social > li {
  display: inline-block;
}

ul.social > li > a {
  padding: 15px;
  display: inline-block;
  font-size: 26px;
  line-height: 30px;
  width: 50px;
  height: 50px;
  border-radius: 48px;
  background-color: #fff;
  color: #000;
  margin: 0 4px 4px 0;
}

ul.social > li > a:hover {
  text-decoration: none;
  background-color: #ee7c22;
}
.foot{
  font-size: 20px;
}

</style>

<template>
  <footer>
    <p>&copy; 2023 GoodBooks,Inc. All rights reserved</p>

<div class="foot" >
    <a> About us </a>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <a>Contact us </a>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <a>Locate us </a>
</div>


    <ul class="social">
      <li>
        <a href="https://twitter.com/" title="">
          <span class="icon fa fa-twitter"></span>
        </a>
      </li>
      <li>
        <a href="https://www.facebook.com/" title="">
          <span class="icon fa fa-facebook"></span>
        </a>
      </li>
      <li>
        <a href="https://plus.google.com/" title="">
          <span class="icon fa fa-google-plus"></span>
        </a>
      </li>
    </ul>
  </footer>
</template>
