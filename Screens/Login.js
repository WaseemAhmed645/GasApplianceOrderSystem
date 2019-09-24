import React, { Component } from 'react'
import { Text, StyleSheet, AsyncStorage,View,Image,ScrollView,ToastAndroid,TextInput,TouchableOpacity,ActivityIndicator } from 'react-native'
import {Header,Right,Left,Body} from "native-base"
import axios from "axios"
import SignUp from './SignUp';
import Config from "../Config"
export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            password: "",
            Email: "",
            token:"",
            role:"",
            isLoading:false,
            UserID:"",
            LoginResponce:{},
            ErrorEmail:false,
            SignInError:""
            // Confirmpassowrd: ""
          };
          this.didBlurSubscription = "";
        }
         
        componentWillMount(){
         
          this.didBlurSubscription = this.props.navigation.addListener(
            "willFocus",
            payload => {
              console.debug("didBlur", payload);
              this._retrieveData();
              // if (this.state.token !== null) {
              //   this.props.navigation.navigate("Home")
              //  }
            }
          );
         
        }
        SigninReq = async () => {
          this.setState({
            isLoading: true
          });
          let Signin = null;
          Signin = {
            email: this.state.Email,
            password: this.state.password
          };
          console.log("Login Infoo",Signin)
          let u = Config.BaseURL +"api/login";
          console.log('UIRLLSLADL', u);
          axios.post(u,Signin)
            .then(response => {
              const Login = JSON.stringify(response);
              console.log("Login Responce here",response.data.user.role);
              console.log("Login ID",response.data.user._id);
              console.log("Login Token",response.data.token);
if(response.data.user.role != "user"){
//  AsyncStorage.removeItem('UserToken');
  this.props.navigation.navigate("Login")
  ToastAndroid.show("unauthorized Email", ToastAndroid.SHORT);
  this.setState({
    isLoading:false
  })

}else{
  this.setState((state,props) =>  {
    console.log("In State")
    state.isLoading=false;
    state.role = response.data.user.role
 state.token=response.data.token;
 state.UserID=response.data.user._id;
 state.LoginResponce= Login;


 // alert("Login"+JSON.stringify(response))
// console.log("User Token",this.state.token)

   this._storeData();
})
  this.props.navigation.navigate("Home")
}
            
             
              // this.setState({
              //   token:response.data.token,
              //   UserID:response.data.user._id,
              //   LoginResponce: Login
              // })
              console("After SetState")
              console.log("User Responce of Login",this.state.LoginResponce)
             
             
              // this.props.navigation.navigate("Profile");
            })
            .catch(error => {
              // alert(JSON.stringify(error.response.data));
              console.log(error.response.data.error);
              //alert("Error"+JSON.stringify(error))
              this.setState({
                SignInError:error.response.data.error,
                isLoading:false
              })
              ToastAndroid.show(this.state.SignInError, ToastAndroid.SHORT);
            });
          //  alert("new Order"+ JSON.stringify(newOrder))
        };
        _storeData = async () => {
          try {
            await AsyncStorage.setItem('UserToken',this.state.token);
            await AsyncStorage.setItem('UserId',this.state.UserID);
            await AsyncStorage.setItem('role',this.state.role);
            await AsyncStorage.setItem('UserInformation',this.state.LoginResponce);
            console.log("LoginTOken",this.state.token)
            console.log("Stored")
         
          } catch (error) {
            console.log("Error WHile Storage",JSON.stringify(error))
          }
        };
        _retrieveData = async () => {
          try {
            const value = await AsyncStorage.getItem('UserToken');
            const id = await AsyncStorage.getItem('UserId');
            this.setState({
              token:value,
              UserID:id
            })
            console.log("UserId",id)
            console.log("Retrived")
             if (this.state.token !== null) {
             this.props.navigation.navigate("Home")
            }
          } catch (error) {
            console.log("Error WHile retrive")
          }
        };
        componentWillUnmount() {
          this.didBlurSubscription.remove();
        }
    
    onEmailChange = text => {
        this.setState({ Email: text });
      };
      onPassowrdChange = text => {
        this.setState({ password: text });
      };
      
 
  

    render() {
        return (
            <View style={{flex:1 ,backgroundColor:"white",paddingBottom:20,justifyContent:'center',alignItems:"center"}}>
                <View>
                    <Image source={require("../Image/icon.jpg")} style={{width:190,height:60,alignSelf:'center',marginBottom:30,marginTop:20}}/>
                </View>

                <View style={{justifyContent:'center',alignItems:'center',alignSelf:'center',alignContent:'center',backgroundColor:'white',elevation:3,borderRadius:5,width:"90%",height:250}}>
<ScrollView>
<TextInput
    style={{height: 40,width:300, borderColor: 'gray', borderWidth: 0.5,borderRadius:5,textAlign:"center",marginBottom:10,marginTop:50}}
    placeholder="Enter Your Email"
    value={this.state.Email}
    onChangeText={this.onEmailChange}
   // onChangeText={(text) => this.setState({input: text})}
  />
    <TextInput
    style={{height: 40, borderColor: 'gray', borderWidth: 0.5,borderRadius:5,textAlign:"center",width:300}}
    placeholder="Enter Your Password"
    value={this.state.password}
    secureTextEntry
    onChangeText={this.onPassowrdChange}
    //onChangeText={(text) => this.setState({input: text})}
  />
  <TouchableOpacity style={{width:250,height:40,borderRadius:5,marginTop:20,justifyContent:'center',alignItems:'center',alignSelf:'center',backgroundColor:'#ee1c25'}}
   onPress={this.SigninReq}
  >
      <Text style={{fontSize:14,color:'white'}}>Login</Text>
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
    <Text>Don't have an account ?</Text>
    <TouchableOpacity
    onPress={()=>this.props.navigation.navigate("SignUp")}
    >
    <Text style={{marginLeft:5,color:'#ee1c25'}}>Click Here</Text>
    </TouchableOpacity>
</View>
 </View>
        )
    }
}

const styles = StyleSheet.create({})
