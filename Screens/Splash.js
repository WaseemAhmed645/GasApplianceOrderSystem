import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  ImageBackground,
  Animated,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  View
} from "react-native";

import * as Animatable from "react-native-animatable";

export default class Splash extends Component {
 
  componentWillMount() {
    setTimeout(() => {
      this.props.navigation.navigate("Login");
    }, 2000);
  }
  render() {
    return (
      <Animatable.View style={{ flex: 1 }}>
        <ImageBackground  style={{ flex: 1,backgroundColor:"white" }}>
          <Animatable.View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 120
            }}
            animation="zoomIn"
            iterationCount={1}
          >
            <View
              style={{
                height: 300,
                width: 250,
                marginRight: 50,
                marginBottom: 40
              }}
            >
              <Image
                source={require("../Image/icon.jpg")}
                style={{
                  width: 300,
                  height: 250,
                  resizeMode:'contain',
                  justifyContent: "center",
                  alignItems: "center"
                }}
              />
            </View>
          </Animatable.View>
        </ImageBackground>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#2980b6",
    paddingVertical: 15
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700"
  }
});
