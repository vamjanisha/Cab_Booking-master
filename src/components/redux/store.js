import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./rootReducer";

const store = configureStore ({
    reducer:rootReducer,
    reducerDrive:rootReducer
})

export default store;