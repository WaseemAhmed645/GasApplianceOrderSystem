import React, { Component } from 'react'
import { Text, StyleSheet,AsyncStorage, View,ScrollView ,Image,ActivityIndicator,TouchableOpacity} from 'react-native'
import {Header , Body , Left , Right} from "native-base"
import Icon from "react-native-vector-icons/FontAwesome"
import axios from "axios"
import Config from "../Config"
export default class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
          position: 1,
          interval: true,
          token:null,
          RespoceData:null
      }
    }
    componentDidMount() {
      this._storeData()
     }

    _storeData = async product => {
      const value = await AsyncStorage.getItem('UserToken');
      console.log("Value of token",value)
      this.setState({
        token:value
      })
      axios.get(Config.BaseURL+"api/categories/",{headers: {
        Authorization: `Bearer ${this.state.token}`,
        'Content-Type': 'application/json'
      }})
      .then(responce => {
        // console.log(responce);
        this.setState({ RespoceData: responce });
        console.log("Products",this.state.RespoceData.data.categories)
      }).catch(err => console.warn("catch", err));

    }
  
    render() {
        let Product=null;
        if (this.state.RespoceData == null) {
            Product = (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator color="red" size={15} />
              </View>
            );
          } else {
              if(this.state.RespoceData){
            Product =this.state.RespoceData;
            Product = this.state.RespoceData.data.categories.map(product => (
                <View style={{width:"47%",backgroundColor:'white',elevation:3,height:180,borderRadius:5}}>
                <Image source={{ uri:Config.BaseURL+product.image }} style={{width:"100%",height:125,resizeMode:"cover"}} />
                
                <View style={{width:1,borderWidth:1,borderColor:"grey",width:"80%",alignSelf:"center",marginTop:10}}></View>
               <View style={{marginLeft:10,marginTop:10}}>
                   <View>
                       <Text style={{fontFamily:"",fontSize:16,color:"black",fontWeight:"bold",alignSelf:"center"}}>{product.name}</Text>
                   </View>
                   <View  numberOfLines={1} style={{flexDirection:"row"}}>
                     
                   </View>
    
               </View>
                </View>
            ));
        }
            // console.log("Products Container",Products)
          }
        return (
            <View style={{flex:1,backgroundColor:'white'}}>
                  <Header style={{backgroundColor:'#ee1c25'}}>
                   <Left>
                   </Left>
                   <Body style={{alignSelf:"center",marginLeft:40}}>
                        <Text style={{fontFamily:"",fontSize:18,color:"white",fontWeight:"bold"}}>Categories</Text>
                   </Body>
               </Header>
               <View style={{flex:2,backgroundColor:'#F6F6F6'}}>
<ScrollView showsVerticalScrollIndicator={false}>
      
            <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:10,marginBottom:10}}>
                {Product}
            {/* <View style={{width:"47%",backgroundColor:'white',marginBottom:10,elevation:3,height:180,borderRadius:5}}>
                <Image source={require("../Image/99.jpeg")} style={{width:"100%",height:125,resizeMode:"contain"}} />
            
            <View style={{width:1,borderWidth:1,borderColor:"grey",width:"80%",alignSelf:"center"}}></View>
           <View style={{marginLeft:10,marginTop:15}}>
               <View>
                   <Text  numberOfLines={1} style={{fontFamily:"",fontSize:16,color:"black",fontWeight:"bold",alignSelf:"center"}}>Accessiores </Text>
               </View>
               <View style={{flexDirection:"row"}}>
            
               </View>
           </View>
            </View>
            <View style={{width:"47%",backgroundColor:'white',elevation:3,height:180,borderRadius:5}}>
            <Image source={require("../Image/33.jpeg")} style={{width:"100%",height:125,resizeMode:"contain"}} />
            
            <View style={{width:1,borderWidth:1,borderColor:"grey",width:"80%",alignSelf:"center"}}></View>
           <View style={{marginLeft:10,marginTop:15}}>
               <View>
                   <Text style={{fontFamily:"",fontSize:16,color:"black",fontWeight:"bold",alignSelf:"center"}}>Cylinders</Text>
               </View>
               <View  numberOfLines={1} style={{flexDirection:"row"}}>
                 
               </View>

           </View>
            </View>
         
          */}
         
            </View>
            
          
          
            </ScrollView>
        
        
          </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
