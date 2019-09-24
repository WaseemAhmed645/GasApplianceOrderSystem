import React, { Component } from 'react'
import { Text, StyleSheet, View,AsyncStorage,ScrollView,ActivityIndicator,Image,Dimensions } from 'react-native'
import axios from "axios"
import {Header , Body , Left , Right} from "native-base"
import Config from "../Config"
const width= Dimensions.get('window').width;
export default class MyOrders extends Component {
constructor(props){
super(props);
this.state={
    UserId:"",
    UserToken:"",
    RespoceData:"",
    pro:"",
    Order:[],
    Products:[],
}
}

componentDidMount(){
    this._retrieveData()
}
    _retrieveData = async () => {
    
          const id = await AsyncStorage.getItem('UserId');
          const token = await AsyncStorage.getItem('UserToken');
        //   this.setState({
        //     userId:id,
        //     Usertoken:token
        //   })
          console.log("UserToken",token)
          console.log("UserId",id)  
          const config = {headers: {
            "Authorization": `Bearer ${token}`,
          }};
axios.get(Config.BaseURL + "api/u-orders/" + id,config).then(responce => {
        this.setState({ RespoceData: responce,
        Order:responce.data.orders});
        let Product=[]
        Product= this.state.Order.products;
        console.log("OrdersArray",this.state.Order)
        console.log("ProductsArray",responce.data.orders.products)
        console.log("Orders",this.state.RespoceData)
      })
      .catch(err => console.log("catch",JSON.stringify( err)));
          console.log("Retrived")
      };
      WholeNews=()=> {
        return this.state.Order.map(function(pro, i){
        return(
            <View >
              <ScrollView key={i}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              >
              <View style={{width:230,backgroundColor:"#eee",marginRight:10,marginLeft:10,marginTop:15,marginBottom:10,alignSelf:"center",height:250,elevation:3,marginTop:10,backgroundColor:"white"}}>
              <Text style={{alignSelf:"center",marginTop:15}}>status: {pro.status}</Text>
              <Text style={{alignSelf:"center"}}>vendorName: {pro.vendorId.name}</Text>
              <Text style={{alignSelf:"center"}}>vendorPhone: {pro.vendorId.phone}</Text>
              <Text style={{fontSize:15,fontWeight:"bold",marginTop:10,alignSelf:"center"}}>
               Products
                    </Text>
            {
      
        pro.products.map(element => {
                return(
                
                <View style={{flexDirection:'row'}}>
                  <ScrollView style={{flexDirection:'row'}}
                  horizontal={true}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  >
                    <View style={{flexDirection:"row",backgroundColor:"#f7f7f7",width:"100%",marginBottom:10}}>
                    <View style={{flexDirection:"row",width:230,marginLeft:10,marginTop:10,marginBottom:10}}>
                      <Image source={{ uri:Config.BaseURL+element.image }} style={{width:50,height:50,borderRadius:25}} />
                      <View style={{marginLeft:15,marginTop:5}}>
                    <Text>
                    Name:{element.name}
                    </Text>
                    <Text>
                    Price:{element.price}
                    </Text>
                    </View>
                    </View>
               
                    </View>
                    </ScrollView>
                    </View>
                    )
              })
            }  
            </View>
            </ScrollView>
            </View>
         
          );
        });
      }

    render() {
        
    
        return (
            <View style={{flex:1,backgroundColor:"white"}}>
                <Header style={{width:width,backgroundColor:'#ee1c25',justifyContent:"center",alignItems:"center",elevation:3}}>
                   
                   <Body style={{alignSelf:"center",marginRight:"38%",marginLeft:"38%",justifyContent:"center",alignItems:"center"}}> 
                        <Text style={{fontFamily:"",fontSize:18,color:"white",fontWeight:"bold"}}>MyOrders</Text>
                   </Body>
            
                 
               </Header>
              <ScrollView horizontal={true}>
          <View style={{flexDirection:'row'}}>
               {this.WholeNews()}
               </View>
               </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
