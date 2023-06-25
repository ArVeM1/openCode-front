import {configureStore} from "@reduxjs/toolkit";
import {StatementReducer} from "./slices/statements";

export const store = configureStore({
    reducer: {
        statement: StatementReducer
    },
})