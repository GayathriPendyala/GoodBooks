<script setup lang="ts">
import ConfirmationTable from "@/components/ConfirmationTable.vue";
import { useCategoryStore } from "@/stores/category";
import { useOrderDetailsStore } from "@/stores/orderDetails";
import { computed } from "vue";

const categoryStore = useCategoryStore();
const orderDetailsStore = useOrderDetailsStore();
const orderDetails = orderDetailsStore.orderDetails;

const orderDate = computed(function () {
  let date = new Date(orderDetails.order.dateCreated);
  return date.toLocaleTimeString();
});

function getCCExpYear() {
  return new Date(orderDetails.customer.ccExpDate).getFullYear();
}

function getCCExpMonth() {
  let month = new Date(orderDetails.customer.ccExpDate).getMonth();
  if (month < 10) {
    return "0" + month;
  } else {
    return month;
  }
}

function getMaskedCardNumber() {
  return orderDetails.customer.ccNumber.substring(
    orderDetails.customer.ccNumber.length - 4
  );
}

</script>


<style>

.align-center{
    display:flex;
    justify-content: center;
}

.continueShopping{
  color: #460303;
}

.check-mark{
  font-size: xxx-large;
}

</style>
<template>
<br><br>


<div class="check-mark align-center">
        <i class="icon-check-sign"></i>
      </div>
      
      <br>
  <div class="align-center">
    <h2> Your order is confirmed!</h2>  <br><br>

  </div>

<div class="align-center">
<confirmation-table> </confirmation-table> 
</div>
<br>
  <div class="align-center">
    Order confirmation number #{{ orderDetails.order.confirmationNumber }} <br><br>
    Time {{ new Date(orderDetails.order.dateCreated).toLocaleString() }}

  </div>


   <div class="align-center"><br></div>
        <br>
        <div class="align-center">
       <ul>
          <li>{{ orderDetails.customer.customerName }}</li><br>
          <li>{{ orderDetails.customer.address }}</li><br>
          <li>{{ orderDetails.customer.email }}</li><br>
          <li>Phone {{ orderDetails.customer.phone }}</li><br>
          <li>
            Card **** **** **** {{ getMaskedCardNumber() }} ({{
              getCCExpYear()
            }}
            /
            {{ getCCExpMonth() }})
          </li>
        </ul>
    </div>
  <br>
    <router-link to='/GayathriBookstoreTransact/category/New Releases' class="align-center" style="text-decoration: none">
      <button class="button continueShopping"> Continue Shopping </button></router-link> 

<br><br>
</template>
