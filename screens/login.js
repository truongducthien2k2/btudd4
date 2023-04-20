import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  useColorScheme,
  View,
} from 'react-native';

const App = () => {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [isLogin,setIsLogin] = useState(false);
  const navtigation = useNavigation();

  function loginCheck(){
    if(username=='user' && password=='123456')
    {
      setIsLogin(true);
    }
  }

  if(isLogin==true)
  {
    navtigation.navigate('ClassList');
  }
  else{
    return (
      <View style={[styles.container]}>

        <Text style={[styles.title]}>
          LOGIN
        </Text>

        <Text style={[styles.label]}>
          Username
        </Text>

        <TextInput 
          style={[styles.textbox]} 
          onChangeText={(text)=>setUsername(text)} 
          value={username}   >
        </TextInput>

        <Text style={[styles.label]}>
          Password
        </Text>

        <TextInput 
          secureTextEntry={true}
          style={[styles.textbox]}
          onChangeText={(text)=>setPassword(text)}
          value={password}>
        </TextInput>
       
        <TouchableHighlight style={[styles.button]}
        onPress={loginCheck} >
          <Text style={[styles.lbLogin]}>
            LOGIN
          </Text>
        </TouchableHighlight>
        
      </View>
    );
  }
 
};

const styles=StyleSheet.create({

  //container for global:
  container:{    
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 40,
    flexDirection: 'column',
  },

  //textboxes:
  textbox:{
    backgroundColor: '#d9d9d9',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 40,
    minWidth: 300,
    height: 50,
  },

  //titles:
  title:{
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 40,
    marginBottom: 40,
  },

  //labels:
  label:{
    fontWeight: '400',
    fontSize: 20,
  },

  //buttons:
  button:{
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#1FA97C',
    width: 100,
    height: 40,
    marginTop: 20,
    borderRadius: 5,
  },

  //Login text:
  lbLogin:{
    color: 'white',
    fontSize: 16,
    fontWeight: '300',
  }
})

export default App;