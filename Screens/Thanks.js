import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  ListView,
  TouchableOpacity,
  View,
  Image,
  Text,
  AsyncStorage,
  TouchableHighlight,ToastAndroid
} from 'react-native';
import axios from "axios"
import Config from "../Config"
export default class Thanks extends Component {
constructor(props){
  super(props);
  this.state= {
      U_ID:null,
      V_ID:null,
      S_Product:[]
  }
}
componentDidMount(){
  this._retrieveData();
  
  
}
  _retrieveData = async () => {
    try {
      const Product = await AsyncStorage.getItem("StoreProduct");
      const UserID = await AsyncStorage.getItem("UserId");
      const VendorID = await AsyncStorage.getItem("VendorID");
      const value = await AsyncStorage.getItem('UserToken');
      const Pro = Product
      this.setState({
        U_ID:UserID,
        V_ID:VendorID,
        S_Product:Pro
      })
 console.log("Data FOR PLACE ORDERS")
 console.log("UserID",this.state.U_ID)
 console.log("VendorID",this.state.V_ID)
 console.log("StoreProduct",this.state.S_Product)
 let OrderObj={
  vendorId:this.state.V_ID,
  userId:this.state.U_ID,
  products:this.state.S_Product
}
const config = {headers: {
  "Authorization": `Bearer ${value}`,
}};
console.log("Befor Post Order",OrderObj)
  axios.post(Config.BaseURL+"api/create/order",OrderObj,config)
  .then(response => {
   /// this.props.navigation.navigate("Login2");
    console.log("Order request Responce",response)
    console.log(OrderObj)
    ToastAndroid.show("Order Place Succesfully", ToastAndroid.SHORT);
    //this.props.navigation.navigate("Home")
    this.clear()
  })
  .catch(e => {
    console.log(e)
    // console.log(e.response.data.error)
    // this.setState({
    //   ErrorObj:e.response.data.error
    // })
    // ToastAndroid.show(this.state.ErrorObj, ToastAndroid.SHORT);
  });

    } catch (error) {
      console.log("RETRIVE DATA",error)
    }
  };
  clear = async () => {
await AsyncStorage.removeItem("StoreProduct");
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.icon} source={require("../Image/thumb.png")} />
        <Text style={styles.title}>Congratulation, your order is accepted</Text>
        <Text style={styles.description}>Lorem ipsum dolor sit amet, sed te sumo euismod, doming molestiae consetetur nec ne. Cu quem aeterno labores eos</Text>
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.props.navigation.navigate("Home")}>
          <Text style={styles.buttonText}>Go Back To Home</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop:50,
  },
  icon:{
    width:200,
    height:200,
  },
  title:{
    fontSize:24,
    textAlign: 'center',
    marginTop:22,
    color: "#5F6D7A"
  },
  description: {
    marginTop:20,
    textAlign: 'center',
    color: "#A9A9A9",
    fontSize:16,
    margin:40,
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize:20,
  }
});