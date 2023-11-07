import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import React from 'react'
import COLORS from '../../constants/colors';
import { TextInput } from 'react-native';



const InputField = (props) => {
    const filledBgColor = props.color || COLORS.primary;
    const outlinedColor = COLORS.white;
    // const bgColor = props.filled ? filledBgColor : outlinedColor;
    // const textColor = props.buttonColor ? props.buttonColor : COLORS.white

    return (
        <View>
            {/* <Text style={styles.inputtext}>{props.title}</Text> */}
            <View style={styles.inputbox}>

                <TextInput
                    placeholder={props.placeholder}
                    keyboardType={props.keypad}
                    placeholderTextColor={COLORS.black}
                    style={styles.inputtextbox}
                    value={props.value}
                    onChangeText={ props.onChangeText}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {

        width: "80%",
        height: 48,
        backgroundColor: "white",
        borderColor: COLORS.black,
        // borderWidth: 1,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 22,
    },
    // inputtext: {
    //     fontSize: 16,
    //     fontWeight: '400',
    //     backgroundColor: "black",
    //     height:0
      
    //      },
    inputtextbox: {
        width: "100%",
        
    },

    inputbox: {
      
        height: 48,
        backgroundColor: "white",
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 22,
        

    },
   
})
export default InputField