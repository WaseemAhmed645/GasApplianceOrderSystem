import React, { Component } from 'react'
import { Text, StyleSheet, View,FlatList,Dimensions,ActivityIndicator,ToastAndroid,TouchableOpacity,ScrollView,Image,AsyncStorage,ImageBackground } from 'react-native'
import {Header , Body , Left , Right} from "native-base"
import Icon from "react-native-vector-icons/FontAwesome"
import Slideshow from "react-native-image-slider-show";
import axios from "axios"
import Config from "../Config"
import io from "socket.io-client";
import { FlatGrid } from 'react-native-super-grid';
var f = require("../Image/s1.jpg");
import PubNubReact from "pubnub-react"
const PushNotification =  require('react-native-push-notification')
import * as jwt_decode from 'jwt-decode';
let localArray = [];
const width= Dimensions.get('window').width;
export default class Home extends Component {
    constructor(props) {
    
        super(props);
        this.state = {
          position: 1,
          interval: true,
          token:null,
          UserId:null,
          RespoceData:null,
          StoreProduct:null,
          // this.didBlurSubscription = "
          dataSource: [
            {
             // //title: "Cyliner Gas Hose",
             // caption: "$299.20",
              url: f
            }
          ]
        };
        this.didBlurSubscription = "";
        this.willFocusSubscription;
        this.pubnub = new PubNubReact({
          publishKey: 'pub-c-e94297bd-7a06-4b99-85d9-7469b844795e',
          subscribeKey: 'sub-c-39f68a60-ddf8-11e9-b2f2-9a66d3fcadaa'
      });
      this.pubnub.init(this);
      PushNotification.configure({
        // Called when Token is generated.
        onRegister: function(token) {
            console.log( 'TOKEN:', token );
            if (token.os == "ios") {
              this.pubnub.push.addChannels(
              {
                channels: ['notifications'],
                device: token.token,
                pushGateway: 'apns'
              });
              // Send iOS Notification from debug console: {"pn_apns":{"aps":{"alert":"Hello World."}}}
            } else if (token.os == "android"){
              this.pubnub.push.addChannels(
              {
                channels: ['notifications'],
                device: token.token,
                pushGateway: 'gcm' // apns, gcm, mpns
              });
              // Send Android Notification from debug console: {"pn_gcm":{"data":{"message":"Hello World."}}}
            }  
        }.bind(this),
        // Something not working?
        // See: https://support.pubnub.com/support/solutions/articles/14000043605-how-can-i-troubleshoot-my-push-notification-issues-
        // Called when a remote or local notification is opened or received.
        onNotification: function(notification) {
          console.log( 'NOTIFICATION:', notification );
          // Do something with the notification.
          // Required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
          // notification.finish(PushNotificationIOS.FetchResult.NoData);
        },
        // ANDROID: GCM or FCM Sender ID
        senderID: "76360634637",
    });
    this._OrderData();
      }      
      componentDidMount() {
        const state = this.state;
       
        this._storeData();
        console.log("Compnent will mOunt");
            console.log("Compnent will mOunt");
            // console.debug("willFocus", payload);
           
          //  this.socket.on("Complete", this.UserDataInfo)
          
        
    
        this.setState({
         interval: setInterval(() => {
            this.setState({
              position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
            });
          }, 2000)
        });
      
      }
      _OrderData = async product => {
        const ID = await AsyncStorage.getItem('UserId');
        const role = await AsyncStorage.getItem('role');
        this.socket = io(Config.BaseURL);
        let Data={
          "_id": ID,
          "role":role
        }
  
        this.socket.on('connect', () => {
          console.log('WASEEM CONNECTED TO BACKEND')
          this.socket.on('sub', (message) => {
         
            console.log("InSUbMethodOFSockit",Data)
             this.socket.emit("sub",Data)
          });
          this.socket.on("Thanks",(message)=>{
            console.log("thanks MEssage",message)
          })
          this.socket.on("orderAccepted",(order)=>{
            ToastAndroid.show("Your Order Has Accepted", ToastAndroid.SHORT);
            console.log("OrderAccepted",order,)
          })
          this.socket.on("orderRejected",(order)=>{
            ToastAndroid.show("Your Order Has Rejected", ToastAndroid.SHORT);
            console.log("OrderRejected",order,)
          })
        })
       
      }



      componentWillUnmount() {
          console.log('GONEEEE')
        //  this.didBlurSubscription.remove();
        this.willFocusSubscription.remove();
        clearInterval(this.state.interval);
      }
      _storeData = async product => {
        console.log("Instore Data .........................")
        localArray = await AsyncStorage.getItem("StoreProduct");
        const value = await AsyncStorage.getItem('UserToken');
        const ID = await AsyncStorage.getItem('UserId');
        const role = await AsyncStorage.getItem('role');
        console.log("Value of token",value)
        // this.socket = io(Config.BaseURL);
        console.log("Emited Data",ID,role)
        
   
console.log("UserRole",role)
console.log("ID oF the USer",ID)
this.setState({
role:role,
UserId:ID
},()=>{
console.log("Here is SetState",this.state.UserId,this.state.role)
}
)
        console.log("User TOken",this.state.token)
        axios.get(Config.BaseURL+"api/products",{headers: {
          Authorization: `Bearer ${value}`,
          'Content-Type': 'application/json'
        }}).then(responce => {
          // console.log(responce);
          this.setState({ RespoceData: responce });
          console.log("Products",this.state.RespoceData.data.products)
        })
        .catch(err => console.log("catch", err));
      
        this.setState((state,props) =>  {
          console.log("In State")
         state.role=role
         state.UserId=ID
        })
        localArray = JSON.parse(localArray);
        if (localArray) {
          //  console.warn("in if case")
          const foundIndex = localArray.findIndex(pro => pro._id === product._id);
          if (foundIndex > 0 || foundIndex === 0) {
            //console.warn("in found index case")
    
            localArray[foundIndex].productQuantity =
              localArray[foundIndex].productQuantity + 1;
            await AsyncStorage.setItem("StoreProduct", JSON.stringify(localArray));
          } else {
            //console.warn("in found index case")
    
            product.productQuantity = 1;
            localArray.push(product);
            await AsyncStorage.setItem("StoreProduct", JSON.stringify(localArray));
          }
        } else {
          localArray1 = [];
          product.productQuantity = 1;
          localArray1.push(product);
          await AsyncStorage.setItem("StoreProduct", JSON.stringify(localArray1));
        }
        ToastAndroid.show("Product Sucessfully Added", ToastAndroid.SHORT);
    
    
      };
      // Logout = async () =>{
      //  await AsyncStorage.removeItem("UserToken")
      //  this.props.navigation.navigate("Login")
      // }
    render() {
        return (
            <View style={{flex:1 , backgroundColor:"white"}}>
               <Header style={{width:width,backgroundColor:'#ee1c25',justifyContent:"center",alignItems:"center",elevation:3}}>
                   
                   <Body style={{alignSelf:"center",marginRight:"41%",marginLeft:"41%",justifyContent:"center",alignItems:"center"}}> 
                        <Text style={{fontFamily:"",fontSize:18,color:"white",fontWeight:"bold"}}>Home</Text>
                   </Body>
                   {/* <Right>
                     <TouchableOpacity onPress={()=> this.Logout()}>
                     <Text style={{fontWeight:"bold",color:"white",fontSize:16}}>LogOut</Text>
                     </TouchableOpacity>
                    
                   </Right> */}
                 
               </Header>
               <View style={{flex:1.5, backgroundColor:'white'}}>
        
          <Image source={require("../Image/s1.jpg")} style={{width:"100%",height:185}} />
          </View>
          <View style={{flex:3,backgroundColor:'white'}}>
{
    this.state.RespoceData ?
    <View style={{marginBottom:10,marginTop:0,backgroundColor:"white",flex:1}}>
      <ScrollView>
    <FlatGrid
  itemDimension={150}
  items={this.state.RespoceData.data.products} 
  //style={styles.gridView}
  // staticDimension={300}
  // fixed
  // spacing={20}
  renderItem={({ item, index }) => (
      <View style={{width:"100%",backgroundColor:'white',elevation:3,height:173,borderRadius:5}}>
        {/* {console.log("FlatItem",item)} */}
      <Image source={{ uri:Config.BaseURL+item.image }} style={{width:"100%",height:100,resizeMode:"contain"}} />
  
  <View style={{width:1,borderWidth:1,borderColor:"grey",width:"80%",alignSelf:"center"}}></View>
 <View style={{marginLeft:5,marginTop:2}}>
     <View>
         <Text  numberOfLines={1} style={{fontFamily:"",fontSize:16,color:"black",fontWeight:"bold"}}>{item.name}</Text>
     
     </View>
     
     <View style={{flexDirection:"column"}}>
     <Text numberOfLines={1} style={{fontSize:14,color:"grey",marginRight:5,marginTop:2}}>
           Price: {item.price} Tsh
         </Text>
        
         
     </View>
     <Text  numberOfLines={1} style={{fontSize:14,color:"grey",marginRight:5,marginTop:5}}>
           {item.description}
         </Text>
     <TouchableOpacity style={{width:35,position:"absolute",height:35,right:5,bottom:20,marginTop:2,backgroundColor:"#ee1c25",justifyContent:"center",alignItems:"center",borderRadius:20,elevation:3}}
     onPress={this._storeData.bind(this,item)}
     >
             <Icon name="plus" size={20} color="white" />
         </TouchableOpacity>
 </View>


  </View>
   
  )}
  /> 
    <Image source={require("../Image/offer.jpg")} style={{resizeMode:"contain",width:"100%",height:185,marginBottom:10}} />
    
  </ScrollView>
  </View>:
  <View style={{ justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator color="red" size={15} />
          
          
          </View>
}
{/* <ScrollView>
    <View style={{backgroundColor:"white",width:"95%",height:205,bottom:5,marginTop:4,alignSelf:"center",elevation:3}}>
  <Image source={require("../Image/offer.jpg")} style={{width:"100%",height:"100%",resizeMode:"cover"}} />
   </View> 
   </ScrollView> */}
          </View>
      
            </View>
        )
    }
}

const styles = StyleSheet.create({})
