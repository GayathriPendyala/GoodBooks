import { defineStore } from 'pinia'
import type { OrderDetails } from '@/types'

const ORDER_DETAILS_KEY = 'OrderDetails'

// @ts-ignore
// @ts-ignore
export const useOrderDetailsStore = defineStore('OrderDetailsStore', {
    state: () => {
        let orderDetailsState = {
            orderDetails: {} as OrderDetails
        }
        let orderDetailsString = sessionStorage.getItem(ORDER_DETAILS_KEY)
        if (orderDetailsString !== null) {
            let OrderDetailsFromSession: OrderDetails;
            OrderDetailsFromSession = JSON.parse(orderDetailsString) as OrderDetails
            orderDetailsState.orderDetails = OrderDetailsFromSession
        }
        return orderDetailsState;
    },

    actions: {
        clearOrderDetails() {
            this.orderDetails = {} as OrderDetails;
            sessionStorage.setItem(ORDER_DETAILS_KEY, JSON.stringify(this.orderDetails))
        },
        setOrderDetails(orderDetails: OrderDetails) {
            this.orderDetails = orderDetails;
            // @ts-ignore
            sessionStorage.setItem(ORDER_DETAILS_KEY, JSON.stringify(this.orderDetails))
        },
        hasOrderDetails() {
            // if(this.orderDetails.order.orderId === null) return false;
            // return true;
            // @ts-ignore
            return Object.keys(this.orderDetails).length  > 0;
        },
    }
})
