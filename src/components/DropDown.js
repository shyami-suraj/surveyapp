import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../constants/colors';
import { Dropdown } from 'react-native-element-dropdown'
import AntDesign from '@expo/vector-icons/AntDesign';


const DropDown = (props) => {
    const [value, setValue] = useState(null);
    const [option, setOption] = useState([]);
    

    React.useEffect(()=>{
        console.log('data', props.data);
        const data = props.data;
        const row_data = data.split('|')
        console.log('row_data', row_data);
        let arr = [];
        row_data.map(item=>{
            const each_item = item.split(':');
            arr.push({label:each_item[0], value:each_item[1]})
        })

        console.log('arr', arr);
        setOption(arr)
    }, [])
    



    return (
        <View>
        <View style={styles.inputdropdown}>
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                iconStyle={styles.iconStyle}
                data={option}
                // maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select item"
                value={value}
                onChange={item => {
                    setValue(item.value);
                }}
                renderLeftIcon={() => (
                    <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                )}


            />
        </View>
    </View>
        
    )
}

const styles = StyleSheet.create({
   
    inputdropdown: {
        width: "95%",
        height: 48,
        backgroundColor: "white",
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: "center",
        paddingLeft: 10,

    },
 
    
    dropdown: {
        
        height: 50,
        width:'100%',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        // backgroundColor:'red',
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
   
    iconStyle: {
        width: 20,
        height: 20,
    },
   

   
})
export default DropDown