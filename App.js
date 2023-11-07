import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Customer_info, Dashboard, Login } from "./src/screens";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';

import { AuthContext, AuthContextProvider } from "./src/store/authContext";
import LoginScreen from './src/screens/LoginScreen';
import { theme } from './src/core/theme';
import { IconButton } from 'react-native-paper';
import { ScheduleContextProvider } from './src/store/scheduleContext';

import { axiosInstance } from './src/util/axios';
import Questions from './src/screens/Questions';



const Stack = createNativeStackNavigator()
function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
   
    </Stack.Navigator>
  );
}
function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       // get users/0 
  //       const response = await axiosInstance.get('user_id')
  //       console.log("RESPONSE profile", response.data);
  //       setCollectors(response.data)

  //     } catch (error) {
  //       console.log('profile error', error);
  //     }
  //   }
  //   fetchData();
  // }, []);



  return (
    <Stack.Navigator
      screenOptions={{
        // headerStyle: { backgroundColor: theme.colors.primary },
        // headerTintColor: "white",
        headerLeft: ({ tintColor }) => ( 
          <IconButton
            icon="logout"
            color="#FFF"
            size={24}
            onPress={authCtx.logOut}
          />
        ),
      }}
    >
      {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
      <Stack.Screen name="Customer_info" component={Customer_info} />
      <Stack.Screen name="Questions" component={Questions} />

    </Stack.Navigator>




  );
}
function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
      
    </NavigationContainer>
  );
}
function Root(navigation) {
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function fetchToken() {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        const userId = await AsyncStorage.getItem("user_id");

        if (userId) authCtx.login(userId);
        if (storedToken) authCtx.authenticate(storedToken);
        console.log("user",userId);
        console.log('token',storedToken);
        
        if (storedToken) {
          navigation.navigate('AuthenticatedStack');
        }
           // const deviceToken = (await Notifications.getDevicePushTokenAsync()).data;
        // await postDeviceToken(deviceToken)
      } catch (e) {
        console.log("E", e);
        
      }
    }
   
   
    fetchToken();
    
  }, []);
  

  return <Navigation />;
}
export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <ScheduleContextProvider>
        <AuthContextProvider>
          <Root />
        </AuthContextProvider>
      </ScheduleContextProvider>
    </>
  );
}
// const postDeviceToken = async (deviceToken) => {
//   try {
//     const response =  axiosInstance.post('set-device-token',{push_token: deviceToken})
//     console.log('set-device-token RESPONSE', response)
//   } catch (error) {
//     console.log('error', error)
//   }
// }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



