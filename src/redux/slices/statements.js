import {getStatementItems} from "../../utils/getStatementItems";
import {createSlice} from "@reduxjs/toolkit";

const initialState = getStatementItems();

const StatementSlice = createSlice({
    name: "statement",
    initialState,
    reducers: {
        addStatement: (state, action) => {
            state.statements.push(action.payload);
        },
        editStatement: (state, action) => {
            state.statements = state.statements.map(obj => {
                if (obj.id === action.payload.id) {
                    return action.payload;
                }
                return obj;
            });
            localStorage.removeItem(action.payload.id.toString());
            localStorage.setItem(action.payload.id.toString(), JSON.stringify(action.payload));
        },
        setSearch: (state, action) => {
            state.searchValue = action.payload;
        },
    },
});


export const {
    addStatement,
    editStatement,
    setSearch,

} = StatementSlice.actions;
export const StatementReducer = StatementSlice.reducer;