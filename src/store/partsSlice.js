import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchParts } from "../api/api";

const createEmptyList = () => ({
  items: [],
  status: "idle",
  selected: null,
  error: null,
  reqId: null,
});

export const loadBrands = createAsyncThunk(
  "parts/loadBrands",
  async (number) => {
    const data = await fetchParts({ number });
    return [
      ...new Set(data.map((item) => item.brand).filter((item) => !!item)),
    ];
  },
);

export const loadOffers = createAsyncThunk(
  "parts/loadOffers",
  async ({ number, brand }) => {
    const data = await fetchParts({ number, brand, analogues: "on" });
    return data
      .flatMap((item) => [item, ...(item.analogues || [])])
      .filter((item) => item.brand);
  },
);

const initialState = {
  brands: createEmptyList(),
  offers: createEmptyList(),

  partNumber: null,
};

const addThunk = (builder, thunk, key, onPending) => {
  builder
    .addCase(thunk.pending, (state, action) => {
      state[key].selected = null;

      state[key].status = "loading";
      state[key].error = null;
      state[key].reqId = action.meta.requestId;
      onPending?.(state, action);
    })
    .addCase(thunk.fulfilled, (state, action) => {
      if (state[key].reqId !== action.meta.requestId) return;

      state[key].items = action.payload;
      state[key].status = "success";
      state[key].selected = null;
    })
    .addCase(thunk.rejected, (state, action) => {
      if (state[key].reqId !== action.meta.requestId) return;

      state[key].error = action.error.message;
      state[key].status = "error";
    });
};

const partsSlice = createSlice({
  name: "parts",
  initialState,

  selectors: {
    selectIsLoading: (state) =>
      state.brands.status === "loading" || state.offers.status === "loading",

    selectHasError: (state) => state.brands.error || state.offers.error,
    selectIsEmpty: (state) =>
      (state.brands.status === "success" && !state.brands.items.length) ||
      (state.offers.status === "success" && !state.offers.items.length),
  },

  reducers: {
    reset: () => initialState,
    setPartNumber: (state, action) => {
      state.partNumber = action.payload;
    },
    selectBrand: (state, action) => {
      state.brands.selected = action.payload;
    },
  },

  extraReducers: (builder) => {
    addThunk(builder, loadBrands, "brands", (state, action) => {
      state.offers = createEmptyList();
      state.partNumber = action.meta.arg;
    });
    addThunk(builder, loadOffers, "offers");
  },
});

export const { selectIsLoading, selectHasError, selectIsEmpty } =
  partsSlice.selectors;
export const { reset, setPartNumber, selectBrand } = partsSlice.actions;
export default partsSlice.reducer;
