import { configureStore } from "@reduxjs/toolkit"
// import routeModalReducer from "./routeModalSlice"
import userSlice from "./userSlice"
import sideBarSlice from "./sideBarSlic"
// import transactionHeaderSlice from "./transactionHeaderSlice"

export const store = configureStore({
    reducer: {
        // routeModal: routeModalReducer,
        userReducer: userSlice,
        sidebarReducer: sideBarSlice,
        // transactionSubheader: transactionHeaderSlice
    }
})