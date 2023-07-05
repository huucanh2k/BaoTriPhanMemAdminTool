import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import TemplateService from "src/adapters/services/template"
import { RootState } from "src/app/store"

export const fetchListTemplate = createAsyncThunk(
  "template/fetchListTemplate",
  async (params: {}) => {
    const response = await TemplateService.getListTemplate(params)
    return {
      data: response.data,
      total: response.metadata?.total,
    }
  }
)

// Define a type for the slice state
interface ListTempalteState {
  listTemplate: []
  total: number
}

// Define the initial state using that type
const initialState: ListTempalteState = {
  listTemplate: [],
  total: 0,
}

export const listTemplateSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchListTemplate.fulfilled, (state, action) => {
      const { data, total } = action.payload
      state.listTemplate = data
      state.total = total
    })
  },
})

export const {} = listTemplateSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectListTemplate = (state: RootState) =>
  state.templates.listTemplate
export const selectTotalTemplate = (state: RootState) => state.templates.total

export default listTemplateSlice.reducer
