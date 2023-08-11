import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {useEffect, useState} from 'react'
import { supabase } from '../lib/supabase'
import { HomeScreen } from "../screens/HomeScreen";
import Auth from '../screens/Auth'
import Account from "../screens/Account";

import Profile from '../screens/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabRoutes from './tab.routes';
import { Trainings } from '../screens/Trainings';
import { Exercises } from '../screens/Exercises';



export type RootStackParamList = {
    home: undefined;
    profile: undefined;
    auth: undefined;
    tabRoutes: undefined
    trainings: undefined;
    exercises: undefined;
  };
  
  const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();


export  function AppRoutes(){



    return(
        <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="home"
    >
        
      <Screen name="tabRoutes" component={TabRoutes} />
      <Screen name="profile" component={Profile} />
      <Screen name="auth" component={Auth} />
      <Screen name="trainings" component={Trainings} />
      <Screen name="exercises" component={Exercises} />
    </Navigator>
    )
}

