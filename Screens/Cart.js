import React, { Component } from 'react'
import { Text, StyleSheet, View,ScrollView,Image,AsyncStorage,ToastAndroid,ActivityIndicator,TouchableOpacity } from 'react-native'
import {Header , Body , Left , Right} from "native-base"
import Icon from "react-native-vector-icons/FontAwesome"
import Icon1 from "react-native-vector-icons/AntDesign"
import { CheckBox } from 'react-native-elements'
import  Config  from "../Config"

export default class Cart extends Component {
    constructor(props){
        super(props);
        this.state={
            checked:true,
            Cart:null
        }
        this.didBlurSubscription = "";
    }
    componentDidMount(){
        console.log("M in Cart Mount COmpnent")
        console.log(Config.BaseURL)
        this.didBlurSubscription = this.props.navigation.addListener(
            "willFocus",
            payload => {
              console.debug("didBlur", payload);
              this._retrieveData();
            }
          );
    }
    componentWillUnmount() {
        this.didBlurSubscription.remove();
      }

    dlt = data => {
        console.log("Delete Data", data);
        var item = this.state.Cart;
        console.log("Item for delee", item);
        console.log("Keys", AsyncStorage.getAllKeys());
        AsyncStorage.removeItem("StoreProduct");
        var Arrays = item.filter(value => {
          return value._id !== data._id;
        });
       this.setState({ Cart: Arrays });
    //    this._storeData(Arrays);
       
      };
    //   _storeData = async data => {
    //     try {
    //       // filter.push(data)
    //       await AsyncStorage.setItem("StoreProduct", JSON.stringify(data));
    //       // console.log("ASynStorage",filter)
    //     } catch (error) {
    //       console.log("Error While Storage");
    //     }
    //   };
    
    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem("StoreProduct");
     console.log(value)
          let CartData;
          if (value !== null) {
            // We have data!!
            CartData = JSON.parse(value);
            this.setState({ Cart: CartData });
            await AsyncStorage.setItem("CartData", JSON.stringify(CartData));
            console.log(CartData);
          } else {
            this.setState({ Cart: null });
          }
        } catch (error) {
          console.log("RETRIVE",error)
        }
      };
      
    render() {
        
        let Product=null;
        let total = 0;
    if (this.state.Cart == null) {
        Product = (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
           <Text>Empty Cart</Text>
            {/* <ActivityIndicator color="red" size={15} /> */}
          </View>
        );
      } else {
          if(this.state.Cart.length > 0){
        Product =this.state.Cart;

        Product = this.state.Cart.map(product => (
            (total += product.price),
            (
            <View>
            <View style={{backgroundColor:"white",justifyContent:"center",alignItems:"center",alignSelf:"center",marginTop:10,borderRadius:10,elevation:3,width:"90%",height:65,flexDirection:'row'}}>
            <Left>
                <View style={{flexDirection:'row',margin:10}}>
                <Image source={{ uri:Config.BaseURL+product.image }} style={{width:50,height:50}}/>
                <View style={{marginTop:7,marginLeft:10}}>
                <Text>{product.name}</Text>
                <Text>Price: {product.price} Tsh</Text>
                </View>
                </View>
                </Left>
                <Right style={{marginRight:10}}>
                <View>
                    <TouchableOpacity  onPress={() => {
              this.dlt(product);
            }}>
                    <Icon name="close" size={18} color='#ee1c25' />
                    </TouchableOpacity>
                </View>
                </Right>
            </View>
        </View>
            )
        ));
    
    }
        // console.log("Products Container",Products)
      }
        return (
            <View style={{flex:1,backgroundColor:"white"}}>
  <Header style={{backgroundColor:'#ee1c25',elevation:3}}>
                   <Left>
                   </Left>
                   <Body style={{marginLeft:10,marginLeft:70}}>
                        <Text style={{fontFamily:"",fontSize:18,color:"white",fontWeight:"bold"}}>Cart</Text>
                   </Body>
               </Header>

              <View style={{flex:2,backgroundColor:"white",borderBottomColor:'grey',borderBottomWidth:2}}>
<ScrollView 
showsVerticalScrollIndicator={false}
>
    <View style={{marginBottom:10,height:300}}>
    {Product}
    </View>
</ScrollView>
              </View>
              <View style={{flex:2,backgroundColor:"white"}}>
                  <ScrollView>
             
             <View style={{flexDirection:"row",marginTop:40}}>
                 <Left style={{marginLeft:10}}>
                 <Text style={{fontSize:16,fontFamily:"",fontWeight:"bold"}}>Total Ammount</Text>
                 </Left>
                 <Right style={{marginRight:50}}>
                 <Text>{total} Tsh</Text>
                 </Right>
             </View>
                <View style={{width:"95%",height:50,marginTop:10,alignSelf:"center"}}>
                <CheckBox
                checkedColor='#ee1c25'
                size={20}
                title='Refill Must Be O-GAS to O-GAS If Customer Doesnt have O-GAS Must Buy The Complete Cylinder'
                checked={this.state.checked}
                />
                </View>

                <View style={{flexDirection:"row",marginTop:40,justifyContent:"center",alignItems:"center",alignSelf:"center"}}>
                    <Icon1 name="warning" size={20} style={{marginRight:2}} color='#ee1c25' />
                    <Text style={{fontFamily:"",}}>Dilevery Work Hours Is 7:00-AM To 8:30 PM</Text>
                </View>
             <TouchableOpacity style={{width:200,justifyContent:"center",alignItems:"center",alignSelf:'center',marginTop:15,marginBottom:10,height:40,justifyContent:"center",alignItems:"center",borderRadius:5,backgroundColor:'#ee1c25'}}
             onPress={()=>this.props.navigation.navigate("VendorList")}
             >

                 <Text style={{fontSize:14,color:"white",fontFamily:""}}>Check Out</Text>
             </TouchableOpacity>
             </ScrollView>
              </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
