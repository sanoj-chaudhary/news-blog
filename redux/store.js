import { configureStore } from '@reduxjs/toolkit';

import categoryReducer from './categorySlice';
import countryReducer from './countrySlice';
import adsSlice from './addBannerSlice'
const store = configureStore({
    reducer: {
        country:countryReducer,
        category: categoryReducer,
        ads:adsSlice,
    },
});

export default store;