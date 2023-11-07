import  { useState} from 'react';
import {  StyleSheet, View,TouchableOpacity } from 'react-native';
import Header from './Header';
import TextInput from './TextInput';

import Logo from './Logo';
import { Text } from 'react-native-paper';
import { phoneValidator } from '../core/utils';
import { passwordValidator } from '../core/utils';
import Button from '../components/Button';
import { Ionicons } from "@expo/vector-icons";
import COLORS from '../../constants/colors';




export default function LoginForm({onAuthenticate}) {
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [phone, setPhone] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });


  const onLoginPressed = () => {

    const phoneError = phoneValidator(phone.value);

    if (phoneError) {
      setPhone({ ...phone, error: phoneError });
      return;
    }
    const passwordError = passwordValidator(password.value);

    if (passwordError) {
      setPassword({ ...password, error: passwordError });
      return;
    }

    onAuthenticate(phone.value,password.value)
  };

  return (
    <View>

      <Logo />

      <Header>Please Enter Your Phone Number & Password</Header>

      <View style={styles.input}>
        <Text variant="headlineSmall" style={{paddingTop: 24, paddingRight: 10}}>
        
        </Text>
        <TextInput
          label="Phone Number"
          returnKeyType="done"
          value={phone.value}
          onChangeText={text => setPhone({ value: text, error: '' })}
          error={!!phone.error}
          errorText={phone.error}
          textContentType="telephoneNumber"
          keyboardType="phone-pad"
          
        />
      </View>
      <View style={styles.input}>
        <Text variant="headlineSmall" style={{paddingTop: 24, paddingRight: 10, }}>
          
        </Text>
        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                zIndex:10,
                                right: 25,
                                top:"38%", 
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.black} />
                                )
                            }

          </TouchableOpacity>
        
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          secureTextEntry={isPasswordShown}
          onChangeText={text => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          textContentType="password"          
          // style={{width:'90%'}}
        />
         
      </View>
      
      



      <Button mode="contained"
      title="Login"
       filled
      onPress={onLoginPressed}>
       
      </Button>

    </View>
  )
}
const styles = StyleSheet.create({
  input: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },


}); 