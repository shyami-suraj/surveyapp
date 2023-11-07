import { View, Text, Image , TextInput, TouchableOpacity } from 'react-native'
import React, { useContext,useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/authContext';
import LoginForm from '../components/LoginForm';
import { axiosInstance } from '../util/axios';





import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import COLORS from '../../constants/colors'
import InputField from '../components/InputField';
import AsyncStorage from '@react-native-async-storage/async-storage';



function LoginScreen() {
    const [isAuthenticating, setAuthenticating] = useState(false)
  
    const authCtx = useContext(AuthContext)
    const navigation = useNavigation();
  
    const logInHandler = async (phoneNumber,password) => {
       setAuthenticating(true)
      
      try {
        const response = await axiosInstance.post('login', { phone: phoneNumber, password:password })
        //  console.log("login",response);
        if (response.data.status === 'success') {
          // console.log('response',response);
          authCtx.login(response.data.user_id.toString())
          AsyncStorage.setItem('token', response.data.token)
          authCtx.authenticate(response.data.token);

          console.log('token',response.data.token)
          setAuthenticating(false)
     
        }else{
          Alert.alert('Could not log you in. Please check your phone number and try again')
          setAuthenticating(false)
        }
  
      } catch (e) {
        console.log('loggin error',e)
        Alert.alert('Could not log you in. Please check your internet connection and try again')
        setAuthenticating(false)
      }
    }
  
    if (isAuthenticating)
      return <LoadingOverlay message='Logging in...' />
    return <LoginForm isLogin onAuthenticate={logInHandler} />;
  }
  
  export default LoginScreen;
  





// const Login = ({ navigation }) => {
//     const [isPasswordShown, setIsPasswordShown] = useState(false);
//     const [phone,setPhone]=useState();
//     const [password,setPassword]=useState();

//     signup= async()=>{
        
//         await fetch('http://192.168.1.75:8000/api/login',{
//             method:'POST',
//             headers:{
//                 'Accept':'application/json',
//                 'Content-Type':'application/json'
//             },
//             body:JSON.stringify({"phone": phone,"password":password})
//         }).then(res => res.json())
//         .then(resData=>{
//             if (resData.status=="success") {
//                 AsyncStorage.setItem('user_id', resData.user_id.toString())
//                .then(navigation.navigate("Customer_info"));

                
//             }
//             else{
//             alert(resData.message)
//             }
//                 console.log(resData);
//         });
//      }
//      return (
//         <View style={{ flex: 1, backgroundColor: COLORS.white }}>
//             <View style={{ flex: 1, marginHorizontal: 22 }}>
//             <View style={{  alignItems: 'center',}}>
//                     <Image
//                         source={require("../../assets/logo.png")}
//                         style={{
//                             top:5,
//                             borderRadius: 20,
//                         }}
//                     />

//                 </View>
//                 <View style={{ marginVertical: 22 }}>
//                     <Text style={{
//                         fontSize: 22,
//                         fontWeight: 'bold',
//                         marginVertical: 12,
//                         color: COLORS.black
//                     }}>
//                         Hi Welcome Back ! 👋
//                     </Text>

                    
//                 </View>

//                 <View style={{ marginBottom: 12 }}>
//                     <Text style={{
//                         fontSize: 16,
//                         fontWeight: 400,
//                         marginVertical: 8
//                     }}>Phone Number</Text>

//                     <View style={{
//                         width: "100%",
//                         height: 48,
//                         borderColor: COLORS.black,
//                         borderWidth: 1,
//                         borderRadius: 8,
//                         alignItems: "center",
//                         justifyContent: "center",
//                         paddingLeft: 22
//                     }}>
//                         <TextInput
//                             placeholder='Enter your Phone number'
//                             placeholderTextColor={COLORS.black}
//                             keyboardType='numeric'
//                             value={phone} 
//                             onChangeText={(value)=>setPhone(value)}
//                             style={{
//                                 width: "100%"
//                             }}
//                         />
//                     </View>
//                 </View>
              

//                 <View style={{ marginBottom: 12 }}>
//                     <Text style={{
//                         fontSize: 16,
//                         fontWeight: 400,
//                         marginVertical: 8
//                     }}>Password</Text>

//                     <View style={{
//                         width: "100%",
//                         height: 48,
//                         borderColor: COLORS.black,
//                         borderWidth: 1,
//                         borderRadius: 8,
//                         alignItems: "center",
//                         justifyContent: "center",
//                         paddingLeft: 22
//                     }}>
//                         <TextInput
//                             placeholder='Enter your password'
//                             placeholderTextColor={COLORS.black}
//                             secureTextEntry={isPasswordShown}
//                             value={password} 
//                             onChangeText={(value)=>setPassword(value)}
//                             style={{
//                                 width: "100%"
//                             }}
//                         />

//                         <TouchableOpacity
//                             onPress={() => setIsPasswordShown(!isPasswordShown)}
//                             style={{
//                                 position: "absolute",
//                                 right: 12
//                             }}
//                         >
//                             {
//                                 isPasswordShown == true ? (
//                                     <Ionicons name="eye-off" size={24} color={COLORS.black} />
//                                 ) : (
//                                     <Ionicons name="eye" size={24} color={COLORS.black} />
//                                 )
//                             }

//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             <Button
//                     title="Login"
//                     filled
//                     style={{
//                         marginTop: 18,
//                         marginBottom: 4,
//                     }}
//                     onPress={signup}
//                 />
                
//             </View>
//         </View>
//     )
// }

// export default Login