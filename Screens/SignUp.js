import React, { Component } from 'react'
import { Text, StyleSheet, View,Image,ActivityIndicator ,ToastAndroid,ScrollView,TextInput,TouchableOpacity } from 'react-native'
import {Header,Right,Left,Body} from "native-base"
import axios from "axios"
import Config from "../Config"
export default class SignUp extends Component {
constructor(props){
super(props);

this.state = {
    Name: "",
    Email: "",
    isLoading:false,
    Password: "",
    role:"user",
    ErrorEmail:false,
ErrorObj:""
    // Confirmpassowrd: ""
  };
}
    
      onNameChange = text => {
        this.setState({ Name: text });
      };
  
      onEmailChange = text => {
        this.setState({ Email: text });
      };
      onPassowrdChange = text => {
        this.setState({ Password: text });
      };
   
      SignupReq = () => {
        this.setState({
          isLoading:true
        })
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(this.state.Email) === false)
        {
            ToastAndroid.show("Wrong Email Address", ToastAndroid.SHORT);
        // this.setState({Email:text})
        return false;
          }
        else {
          console.log("Correct")
        }
        let Signup = null;
 
        Signup = {
          name: this.state.Name,
          email: this.state.Email,
          password: this.state.Password,
          role:this.state.role
        };
      
    console.log("Axios comiing",Signup)
    if(this.state.Name!=""){
      axios.post(Config.BaseURL+"api/register/user", Signup)
      .then(response => {
        this.props.navigation.navigate("Login2");
        console.log("SignUp request Responce",response)
        ToastAndroid.show("Register Sucessfully", ToastAndroid.SHORT);
        this.setState({
          isLoading:false
        })
        this.props.navigation.navigate("Login")
      })
      .catch(e => {
        // console.log(e['response'])
        console.log(e.response.data.error)
        this.setState({
          ErrorObj:e.response.data.error,
          isLoading:false
        })
        ToastAndroid.show(this.state.ErrorObj, ToastAndroid.SHORT);
      });
    }
    else{
      console.log("Complete Cradentials")
    }
        
      };
    render() {
        return (
            <View style={{flex:1 ,backgroundColor:"white",justifyContent:'center',alignItems:"center",paddingTop:65}}>
                <View>
                    <Image source={require("../Image/icon.jpg")} style={{width:190,height:60,alignSelf:'center',marginBottom:20,marginTop:20}}/>
                </View>
 <View style={{justifyContent:'center',alignItems:'center',alignSelf:'center',alignContent:'center',
 backgroundColor:'white',elevation:3,borderRadius:5,width:"90%",height:350}}>
<ScrollView>
<TextInput
    style={{height: 40,width:300, borderColor: 'gray', borderWidth: 0.5,textAlign:"center",marginBottom:10,marginTop:50,borderRadius:5}}
    placeholder="Enter Your Name"
    name="Name"
    placeholderTextColor="#cccccc"
    onChangeText={this.onNameChange}
    
    // onChangeText={(City) => this.setState({City})}
    value={this.state.Name}
  />
    <TextInput
    style={{height: 40, borderColor: 'gray', borderWidth: 0.5,textAlign:"center",width:300,marginBottom:10,borderRadius:5}}
    placeholder="Enter Your Email"
    value={this.state.Email}
    onChangeText={this.onEmailChange}
    placeholderTextColor="#cccccc"
    textContentType="emailAddress"
   
  />
  <TextInput
    style={{height: 40,width:300, borderColor: 'gray', borderWidth: 0.5,textAlign:"center",marginBottom:10,borderRadius:5}}
    placeholder="Enter Your Password"
    name="Password"
   secureTextEntry
   placeholderTextColor="#cccccc"
    onChangeText={this.onPassowrdChange}
    // onChangeText={(City) => this.setState({City})}
    value={this.state.Password}
   // onChangeText={(text) => this.setState({input: text})}
  />
    {/* <TextInput
    style={{height: 40, borderColor: 'gray', borderWidth: 0.5,textAlign:"center",width:300,borderRadius:5}}
    placeholder="Confirm Your password"
    //onChangeText={(text) => this.setState({input: text})}
  /> */}
  <TouchableOpacity style={{width:250,height:40,borderRadius:5,marginTop:20,justifyContent:'center',
  alignItems:'center',alignSelf:'center',backgroundColor:'#ee1c25'}}
   onPress={this.SignupReq}
  >
      <Text style={{fontSize:14,color:'white'}}>SignUp</Text>
  </TouchableOpacity>
</ScrollView>
                </View>
                {this.state.isLoading ? (
            <ActivityIndicator
              style={{
                alignSelf: "center",
                position: "absolute",
                bottom:50,
              }}
              size="large"
              color="red"
            />
          ) : null}
<View style={{flexDirection:'row',marginTop:20}}>
    <Text>Already have an Account ?</Text>
    <TouchableOpacity
    onPress={()=>this.props.navigation.navigate("Login")}
    >
    <Text style={{marginLeft:5,color:'#ee1c25'}}>Click Here</Text>
    </TouchableOpacity>
</View>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
