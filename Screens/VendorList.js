import React, { Component } from 'react'
import { Text, StyleSheet, View,ActivityIndicator,Image,TouchableOpacity,AsyncStorage } from 'react-native'
import axios from "axios"
import Config from "../Config"
import {Left,Right,Body,Header} from "native-base"
export default class VendorList extends Component {
constructor(props){
super(props);
this.state={
VendorData:null,
VendorID:null,
token:null
}

}
componentDidMount() {
this._reteveData()
        }
 _vendorInfo= async (data) =>{
          console.log("Vendor Data After Click",data._id);
          // const id = data._id
          this.setState({
            VendorID:data._id
          })
          await this._storeData()
          this.props.navigation.navigate("Thanks")
}
_reteveData = async () =>{
  const value = await AsyncStorage.getItem('UserToken');
  console.log("Value of token",value)
  this.setState({
    token:value
  })
  axios.get(Config.BaseURL+"api/vendors",{headers: {
    Authorization: `Bearer ${value}`,
    'Content-Type': 'application/json'
  }}).then(responce => {
            console.log("Vendor Responce",responce);
            this.setState({ VendorData: responce.data.vendors });
            console.log("VendorProducts",this.state.VendorData.data.vendors)
          })
          .catch(err => console.log("catch", err));
      
}
 _storeData = async () => {
   console.log("Hi")
          try {
            await AsyncStorage.setItem('VendorID',this.state.VendorID);
           
           
            //await AsyncStorage.setItem('UserId',this.state.UserID);
            console.log("VenderID here",this.state.VendorID)
            console.log("Stored")
          } catch (error) {
            console.log("Error WHile Storage")
          }
        };
   
    render() {
        let Product=null;
        let total = 0;
    if (this.state.VendorData == null) {
        Product = (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator color="red" size={15} />
          </View>
        );
      } else {
          if(this.state.VendorData.length > 0){
        Product =this.state.VendorData;

        Product = this.state.VendorData.map(product => (
            <View>
              
            <View style={{backgroundColor:"white",justifyContent:"center",alignItems:"center",alignSelf:"center",marginTop:10,borderRadius:10,elevation:3,width:"90%",height:65,flexDirection:'row'}}>
           
            <Left>
                <View style={{flexDirection:'row',margin:10}}>
                <Image source={{ uri:Config.BaseURL+product.image }} style={{width:50,height:50}}/>
                <TouchableOpacity 
               onPress={()=>this._vendorInfo(product)}
               // onPress={()=>this.props.navigation.navigate("Thanks")}
                >
                <View style={{marginTop:7,marginLeft:5 ,width:300}}>
                <Text style={{color:"grey"}}>Name: {product.name}</Text>
                <Text  style={{color:"grey"}}>Phone: {product.phone}</Text>
                <Text  style={{color:"grey"}}>Address: {product.address}</Text>
                </View>
                </TouchableOpacity>
                </View>
                </Left>
                <Right style={{marginRight:10}}>
                <View>
                </View>
                </Right>
            </View>
        </View>
            
        ));
    
    }
        // console.log("Products Container",Products)
      }
        return (
            <View style={{flex:1,backgroundColor:"white"}}>
                 <Header style={{backgroundColor:'#ee1c25',elevation:3}}>
                   <Left>
                   </Left>
                   <Body style={{marginLeft:40}}>
                        <Text style={{fontFamily:"",fontSize:18,color:"white",fontWeight:"bold"}}>Vendor List</Text>
                   </Body>
               </Header>
               {Product}
            </View>
        )
    }
}

const styles = StyleSheet.create({})
