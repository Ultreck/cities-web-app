"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
       <QueryClientProvider client={queryClient}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
       </QueryClientProvider>
    </Provider>
  );
}
