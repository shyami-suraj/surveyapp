import { View, Text } from 'react-native'
import React ,{ useState,useEffect } from 'react'
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = () => {
    const [user, setUser] = useState()
  const getData = async () => {
    const user = await AsyncStorage.getItem('user_id');
    console.log('user',user);
    setUser(user);
 
  };
  useEffect(() => {
      
    getData()
    
   }, [])
    logout = async() => {
        
        AsyncStorage.clear();
        console.log(user);
      
    }
    
  return (
    <View>
      <Text>Dashboard</Text>
      <Button
                        title="Start"
                        filled
                        style={{
                            backgroundColor: '#f90',
                            width: '80%',
                        }}
                        buttonColor="white"
                        onPress={this.logout}

                    />
    </View>
  )
}

export default Dashboard