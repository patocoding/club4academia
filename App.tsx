import { Background } from './src/components/Background';
import { View, TouchableOpacity, Text, StatusBar} from 'react-native';
import Header from './src/components/Header'

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter'

import { HomeScreen } from './src/screens/HomeScreen';
import { Loading } from './src/components/Loading';
import { supabase } from './src/lib/supabase'
import Auth from './src/screens/Auth';
import { AppRoutes } from './src/routes/routes';
import {NavigationContainer} from '@react-navigation/native'
import { Routes } from './src/routes';
import 'react-native-gesture-handler'

export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  })
  const userId = async () => {
    const user = (await supabase.auth.getUser()).data.user?.id
    return user
  }

  const id = userId()
console.log(id)
  return (

    <Background>
       
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      { fontsLoaded ? <Routes/> : <Loading/>}
   
    </Background>
    

  );
}

