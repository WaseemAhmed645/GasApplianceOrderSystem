import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import {createStackNavigator,createAppContainer,createBottomTabNavigator} from "react-navigation"
import Splash from "./Screens/Splash"
import Login from "./Screens/Login"
import SignUp from "./Screens/SignUp"
import Home from "./Screens/Home"
import Profile from "./Screens/Profile"
import Categories from "./Screens/Categories"
import Cart from "./Screens/Cart"
import Icon from "react-native-vector-icons/FontAwesome"
import Icon1 from "react-native-vector-icons/Entypo"
import VendorList from "./Screens/VendorList"
import Thanks from "./Screens/Thanks"
import MyOrders from "./Screens/MyOrders"
import EditProfile from "./Screens/EditProfile"
export default class App extends Component {
  render() {
    return (
    <StackNavigator />
    )
  }
}
const CartStack = createStackNavigator({
  Cart:Cart,
  VendorList:VendorList,
  Thanks:Thanks
},{

  navigationOptions:{
    header:null
  }
})
const ProfileStack = createStackNavigator({
  Profile:Profile,
  MyOrders:MyOrders
},{

  navigationOptions:{
    header:null
  }
})
const BotttomNavigator = createBottomTabNavigator
    ({
        Home: { 
          screen: Home,
          navigationOptions: {
                tabBarLabel: 'Home',
                tabBarIcon: ({tintColor}) => (
                   <Icon name="home" size={22}color={tintColor} />
                   )
              },
        },
        Categories:   { 
          screen: Categories,
          navigationOptions: {
                tabBarLabel: 'Categories',
                tabBarIcon: ({tintColor}) => (
                   <Icon1 name="text" size={22}color={tintColor} />
                   )
              }, 
     },
     Cart:   { 
      screen: CartStack,
      navigationOptions: {
            tabBarLabel: 'Cart',
            tabBarOnPress: ({ navigation, defaultHandler }) => {
              navigation.navigate("Cart");
              defaultHandler();
            },
            tabBarIcon: ({tintColor}) => (
               <Icon name="shopping-bag" size={22} color={tintColor} />
               )
          }, 
 },
 Profile:   { 
  screen:ProfileStack,
  navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({tintColor,activeTintColor}) => (
          <Icon name="user" size={22} color={tintColor} />
          )
      }, 
}
},

{
    initialRouteName: 'Home',
    tabBarOptions: {
       activeTintColor: '#ee1c25',
       inactiveTintColor: '#7e7b7b',
       showIcon: true,
      // style: { height: 54,backgroundColor: '#fff',borderTopWidth:0.5,borderTopColor: '#fb9800' },
       showLabel: true,
       labelStyle: {
        fontSize: 12,

       }
      }

});

const StackNavigator = createStackNavigator({
  Cart:Categories,
  Splash:Splash,
  Login:Login,
  SignUp:SignUp,
  Home : BotttomNavigator
},{
  navigationOptions:{
    header:null
  }
})

const styles = StyleSheet.create({})
