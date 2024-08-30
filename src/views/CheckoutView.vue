<script setup lang="ts">
import { reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import {
  helpers,
  maxLength,
  minLength,
  required,
  email,
} from "@vuelidate/validators";
import { useCartStore } from "@/stores/cart";
import { useCategoryStore } from "@/stores/category";
import { useOrderDetailsStore } from "@/stores/orderDetails";
import { isCreditCard, isMobilePhone } from "@/validators";
// import CheckoutFieldError from "@/components/CheckoutFieldError.vue";
import router from "@/router";
import { asDollarsAndCents } from "../main";
import type { OrderDetails, ServerErrorResponse } from "@/types";
import { ref } from "vue";

const cartStore = useCartStore();
const categoryStore = useCategoryStore();
const orderDetailsStore = useOrderDetailsStore();

const cart = cartStore.cart;

const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const defaultServerErrorMessage =
  "An unexpected error occurred, please try again.";
const serverErrorMessage = ref(defaultServerErrorMessage);

let years: number[] = [];

let selectedYear = new Date().getFullYear();
for (let i = 0; i < 15; i++) {
  years.push(selectedYear + i);
}

let selectedMonth = new Date().getMonth() + 1;

const form = reactive({
  name: "",
  address: "",
  phone: "",
  email: "",
  ccNumber: "",
  ccExpiryMonth: new Date().getMonth() + 1,
  ccExpiryYear: new Date().getFullYear(),
  checkoutStatus: "",
});

const rules = {
  name: {
    required: helpers.withMessage("Please provide a name.", required),
    minLength: helpers.withMessage(
      "Name must have at least 4 letters.",
      minLength(4)
    ),
    maxLength: helpers.withMessage(
      "Name can have at most 45 letters.",
      maxLength(45)
    ),
  },
  address: {
    required: helpers.withMessage("Please provide an address.", required),
    minLength: helpers.withMessage(
      "Address must have at least 4 letters.",
      minLength(4)
    ),
    maxLength: helpers.withMessage(
      "Address can have at most 45 letters.",
      maxLength(45)
    ),
  },
  phone: {
    required: helpers.withMessage("Please provide a phone.", required),
    validNumber: helpers.withMessage(
      "Please enter a valid phone number",
      isMobilePhone
    ),
  },
  email: {
    required: helpers.withMessage("Please provide an email.", required),
    email,
  },
  ccNumber: {
    required: helpers.withMessage(
      "Please provide a credit card number.",
      required
    ),
    ccNumber: helpers.withMessage(
      "Please provide a valid credit card number",
      isCreditCard
    ),
  },
  //   TODO: Add more validations for these and other fields that need more validation.
};
const v$ = useVuelidate(rules, form);

async function submitOrder() {
  console.log("Submit order");
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    form.checkoutStatus = "ERROR";
  } else {
    try {
      form.checkoutStatus = "PENDING";
      serverErrorMessage.value = defaultServerErrorMessage;

      const placeOrderResponse: OrderDetails | ServerErrorResponse =
        await cartStore
          .placeOrder({
            name: form.name,
            address: form.address,
            phone: form.phone,
            email: form.email,
            ccNumber: form.ccNumber,
            ccExpiryMonth: form.ccExpiryMonth,
            ccExpiryYear: form.ccExpiryYear,
          })

      if ("error" in placeOrderResponse) {
        form.checkoutStatus = "SERVER_ERROR";
        serverErrorMessage.value = placeOrderResponse.message
        console.log("Error placing order", placeOrderResponse);
      } else {
        form.checkoutStatus = "OK";
        orderDetailsStore.setOrderDetails(placeOrderResponse as OrderDetails);
        await router.push({name: "confirmation-view"});
      }

    } catch (e) {
      form.checkoutStatus = "SERVER_ERROR";
      serverErrorMessage.value = defaultServerErrorMessage;
      console.log("Error placing order", e);
    }
  }
}

/* NOTE: For example yearFrom(0) == <current_year> */
function yearFrom(index: number) {
  return new Date().getFullYear() + index;
}

const getSubTotal = function () {
  let subTotal = 0;
  for (let item of cartStore.cart.items) {
    subTotal += item.book.price * item.quantity;
  }
  return subTotal;
};

const surCharge = 500;

const getTotal = function () {
  return surCharge + getSubTotal();
};
</script>

<style scoped>
/* TODO: Adapt these styles to your page */
.checkout-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-bottom: 2.5px solid black;
}
.page-heading {
  font-size: 2rem;
  font-weight: 500;
}

form {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
}

.form-entry {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
  align-items: center;
}

.form-entry > input,
.form-entry > select {
  border: 1.5px solid #460303;
  padding: 0.25rem 0.5rem;
  width: 16rem;
  margin-left: 0.5rem;
}

.form-entry > select {
  width: 6.2rem;
}

form > .error {
  margin-bottom: 0.5rem;
  color: red;
  text-align: right;
}

.checkoutStatusBox {
  margin: 1em;
  padding: 1em;
  text-align: center;
}
.submit-button-row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.secondary-button {
  color: black;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  margin-top: 1rem;
  font-size: 1rem;
  text-decoration: none;
  border: 2.5px solid black;
}
.secondary-button:hover {
  cursor: pointer;
}
.empty-cart-message {
  padding: 0.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.bill-info {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.bill-info > div {
  display: flex;
  justify-content: center;
}
.bill-info-val {
  text-align: center;
  width: 3rem;
  margin-left: 0.5rem;
}

.form-inputs
{
  border-radius: 3px;
}

.continueShopping{
  color: #460303;
}

.completePurchase{
  color: #460303;
}
</style>

<template>
  <div class="checkout-page">
    <div class="page-heading">Checkout</div><br>
    <!-- TODO: Add an HTML section to display when checking out with an empty cart -->
    <section class="empty-cart-message" v-if="cart.empty">
      <span> Your cart is empty. Please add an item to checkout </span><br>
      <router-link to='/ChandralekhaBookstoreTransact/category/Recommended'>
      <button class="button continueShopping"> Continue Shopping </button></router-link> 

    </section>
    <section class="checkout-page-body" v-if="!cart.empty">
      <form @submit.prevent="submitOrder">
        <div class="form-entry">
          <label for="name">Name</label>&nbsp;&nbsp;&nbsp;
          <input class="form-inputs"
            type="text"
            size="20"
            id="name"
            name="name"
            v-model.lazy="v$.name.$model"
          />
        </div>
        <template v-if="v$.name.$error">
          <span
            class="error"
            v-for="error of v$.name.$errors"
            :key="error.$uid"
            >{{ error.$message }}</span
          >
        </template><br>
        <!-- TODO: Add address input and validation messages -->

        <div class="form-entry">
          <label for="address">Address</label>&nbsp;&nbsp;&nbsp;
          <input
            type="text"
            size="20"
            id="address"
            name="address"
            v-model.lazy="v$.address.$model"
          />
        </div>
        <template v-if="v$.address.$error">
          <span
            class="error"
            v-for="error of v$.address.$errors"
            :key="error.$uid"
            >{{ error.$message }}</span
          >
        </template><br>

        <div class="form-entry">
          <label for="phone">Phone Number</label>&nbsp;&nbsp;&nbsp;
          <input
            class="textField"
            type="text"
            size="20"
            id="phone"
            name="phone"
            v-model.lazy="v$.phone.$model"
          />
        </div>
        <!-- TODO: Add phone validation message(s) -->
        <template v-if="v$.phone.$error">
          <span
            class="error"
            v-for="error of v$.phone.$errors"
            :key="error.$uid"
            >{{ error.$message }}</span
          >
        </template><br>

        <div class="form-entry">
          <label for="email">Email Address</label>&nbsp;&nbsp;&nbsp;
          <input
            type="text"
            size="20"
            id="email"
            name="email"
            v-model.lazy="v$.email.$model"
          />
        </div>
        <!-- TODO: Add email validation message(s) -->
        <template v-if="v$.email.$error">
          <span
            class="error"
            v-for="error of v$.email.$errors"
            :key="error.$uid"
            >{{ error.$message }}</span
          >
        </template><br>

        <div class="form-entry">
          <label for="ccNumber">Credit card</label>&nbsp;&nbsp;&nbsp;
          <input
            type="text"
            size="20"
            id="ccNumber"
            name="ccNumber"
            v-model.lazy="v$.ccNumber.$model"
          />
        </div>
        <!-- TODO: Add credit card validation message(s) -->
        <template v-if="v$.ccNumber.$error">
          <span
            class="error"
            v-for="error of v$.ccNumber.$errors"
            :key="error.$uid"
            >{{ error.$message }}</span
          >
        </template><br>

        <div class="form-entry">
          <label>Exp Month</label>&nbsp;&nbsp;&nbsp;
          <select v-model="selectedMonth">
            <option
              v-for="(month, index) in months"
              :key="index"
              :value="index + 1"
            >
              {{ month }} ({{ index + 1 }})
            </option>
          </select>
          <select v-model="selectedYear">
            <option v-for="(year, index) in years" :key="index" :value="year">
              {{ year }}
            </option>
          </select>
        </div><br>

        <!-- TODO (style): Use a single label for both month and date and put the on the same line. -->
        <!-- TODO (style): For example: Exp Date {Month} {Year}, with space between month/year selectors. -->
        <div class="bill-info">
          <div>
            <span>Sub-Total: </span>
            <span class="bill-info-val">{{
              asDollarsAndCents(Number(getSubTotal().toFixed(2)))
            }}</span>
          </div><br>
          <div>
            <span>Surcharge</span>
            <span class="bill-info-val">{{
              asDollarsAndCents(surCharge)
            }}</span>
          </div><br>
          <div>
            <span>Total: </span>
            <span class="bill-info-val">
              {{ asDollarsAndCents(getTotal()) }}
            </span>
          </div>
        </div><br>
        <div class="submit-button-row">
         <input
            type="submit"
            name="submit"
            class="button"
            :disabled="form.checkoutStatus === 'PENDING'"
            value="Complete Purchase"
          />
          <!-- <router-link to='/ChandralekhaBookstoreTransact/confirmation'> <button class="button completePurchase"> Complete Purchase </button></router-link> -->
        </div>

        <!-- TODO (style): The submit button should not take up the entire width of the form. -->
        <!-- TODO (style): The submit button should be styled consistent with your own site. -->
      </form>
      <!-- TODO (style): Fix error message placement so they nearer to the correct fields. -->
      <!-- TODO (style): HINT: Use another <div> and label, input, and error, and use flexbox to style. -->

      <!-- TODO: Display the cart total, subtotal and surcharge. -->
    </section>
    <section v-show="form.checkoutStatus !== ''" class="checkoutStatusBox">
      <div v-if="form.checkoutStatus === 'ERROR'">
        Error: Please fix the problems above and try again.
      </div>

      <div v-else-if="form.checkoutStatus === 'PENDING'">Processing...</div>

      <div v-else-if="form.checkoutStatus === 'OK'">Order placed...</div>

      <div v-else>{{serverErrorMessage}}</div>
    </section>
  </div>
</template>
