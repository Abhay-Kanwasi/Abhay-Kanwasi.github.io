import AppRoutes from './routes/AppRouts';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import ThemeContextProvider from './themeprovider/ThemeContent';
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeContextProvider>
            <AppRoutes />
        </ThemeContextProvider>
      </PersistGate>
  </Provider>
  )
}

export default App
