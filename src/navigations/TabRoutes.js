import React from 'react';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BottomTab = createBottomTabNavigator();

const TabRoutes = () => {
    return (
        <BottomTab.Navigator
            tabBar={(tabsProps) => (
                <>
                    <BottomTabBar {...tabsProps} />
                </>
            )}
            initialRouteName="Home"
        >
            <BottomTab.Screen name="Home" component={Home} options={{ headerShown: false, tabBarIcon: () => (
                        <Icon name="home" color={'lightcoral'} size={20} />
                    ), }} />
            {/* <BottomTab.Screen name="Profile" component={Profile} /> */}
        </BottomTab.Navigator>

    )
}

export default TabRoutes