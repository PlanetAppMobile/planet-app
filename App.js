import React, { useState } from "react";
import * as Font from "expo-font"
import Navigator from "./navigation/Navigator"
import AppLoading from 'expo-app-loading';
// import คอมโพเนนต์ที่จำเป็น
const getFonts = () => Font.loadAsync({
  'Jura': require('./assets/fonts/Jura-Bold.ttf'),
  'JockeyOne': require('./assets/fonts/JockeyOne-Regular.ttf'),
})

export default function App() {
  const [fontLoad, setFontLoad] = useState(false)
  if (fontLoad) {
    return (
      <Navigator />
    )
  }
  else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontLoad(true)}
        onError={console.warn}
      />
    );
  }
}

