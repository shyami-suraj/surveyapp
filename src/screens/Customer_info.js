import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import COLORS from '../../constants/colors'

import Button from '../components/Button';
import InputField from '../components/InputField';
// import DropDown from '../components/DropDown';
import AsyncStorage from '@react-native-async-storage/async-storage';




const Customer_info = ({ navigation }) => {
    const data = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Others', value: 'Others' },
    ];

    // fetching data from database using api
    // const [user, setUser] = useState([])
    // async function getDataFromApi() {
    //     const apiResponse = await fetch('http://192.168.1.75:8000/api/user/' + await AsyncStorage.getItem('user_id'));
    //     const finalData = await apiResponse.json()
    //     console.log("userdata:", finalData);
    //     setUser(finalData.data);
    // }
    // useEffect(() => {

    //     getDataFromApi()

    // }, [])



    return (

        <View style={{ backgroundColor: '#007260', height: '100%' ,alignSelf:'center', width:'100%'} }>
            {/* <Text>{user.user ? user.user.name : ""}</Text>
            <Text>{user.user ? user.user.phone : ""}</Text>
            <Text>{user.project}</Text>
            <Text>{user.activity}</Text> */}



<View style={{ marginBottom: 12, alignSelf:'center' ,width:'90%'}}>
            <View style={styles.fieldbox} >
                <Text style={styles.fieldtext}>Name</Text>
                <InputField
                    placeholder="Enter Customer Name"
                />
            </View>
            <View style={styles.fieldbox} >
                <Text style={styles.fieldtext}>Phone</Text>
                <InputField

                    placeholder="Enter Customer Phone no."
                    keypad="numeric"
                />
            </View>
            <View style={styles.fieldbox} >
                <Text style={styles.fieldtext}>Email</Text>
                <InputField
                    placeholder="Enter Customer Email "
                />
            </View>
            <View style={styles.fieldbox} >
                <Text style={styles.fieldtext}>Address</Text>
                <InputField
                    placeholder="Enter Customer Address "
                />
            </View>
            {/* <DropDown
                title="Gender"
                data={data}

            /> */}
            </View>
            <View style={{ marginBottom: 12, alignItems:'center' }}>
                <Button
                        title="Start"
                        filled
                        style={{
                            backgroundColor: '#f90',
                            width: '78%',
                            borderWidth: 1,
                        }}
                        buttonColor="white"
                        onPress={()=>navigation.navigate('Questions')}
                        
                    />
                
            </View>
        </View>


    )
}

export default Customer_info;
const styles = StyleSheet.create({
    fieldtext: {
        color: 'white',
        fontSize: 20,
      
       
    },
    fieldbox: {
        margin: 10,
    }


});  