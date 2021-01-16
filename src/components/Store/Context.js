import { createContext } from 'react';

const StoreContext = createContext({
  token: null,
  setToken: (token) => {},
});

export default StoreContext;
