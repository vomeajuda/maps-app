//imports
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MapComponent } from './components/map';

export default function App() {
  return (
    //define a safearea
    <SafeAreaProvider>
      {/*define o tema da statusbar*/}
      <StatusBar barStyle="dark-content"/>
      <MapComponent />
    </SafeAreaProvider>
  );
}