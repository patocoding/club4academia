import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeScreen } from "../screens/HomeScreen";
import Profile from "../screens/Profile";
import {Feather} from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

export default function TabRoutes() {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen
                name="home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({color, size}) => <Feather name="home"  color={color} size={size} />,
                tabBarLabel:'Inicio'
                }}
            />
            <Tab.Screen
                name="profile"
                component={Profile}
                options={{
                    tabBarIcon: ({color, size}) => <Feather name="user" color={color} size={size} />,
                    tabBarLabel:'Perfil'
                }}
            />
        </Tab.Navigator>
    )
}