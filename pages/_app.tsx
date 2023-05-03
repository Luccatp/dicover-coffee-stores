import { Dispatch, createContext, useReducer } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextComponentType, NextPageContext } from "next/types";

interface IStoreContext {
  dispatch: Dispatch<{
    type: string;
    payload: any;
  }>;
  state: {
    latLong?: string;
    coffeeStores?: any;
  };
}

export const StoreContext = createContext<IStoreContext>({} as IStoreContext);

export const ACTION_TYPES = {
  SET_LAT_LONG: "SET_LAT_LONG",
  SET_COFFEE_STORES: "SET_COFFEE_STORES",
};

const storeReducer = (
  state: {
    latLong?: string;
    coffeeStores?: any;
  },
  action: { type: string; payload: { latLong: string; coffeeStores: any } }
) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {
      return { ...state, latLong: action.payload.latLong };
    }
    case ACTION_TYPES.SET_COFFEE_STORES: {
      return { ...state, coffeeStores: action.payload.coffeeStores };
    }
    default:
      throw new Error(`unhandled action type: ${action.type}`);
  }
};

const StoreProvider = ({ children }: { children: JSX.Element }) => {
  const initialState = {
    latLong: "",
    coffeeStores: [],
  };

  const [state, dispatch] = useReducer(storeReducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </>
  );
}
