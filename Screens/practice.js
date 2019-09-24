import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ToastAndroid,
  Dimensions
} from "react-native";
const { height, width } = Dimensions.get("window");
import LinearGradient from "react-native-linear-gradient";
import DatePicker from 'react-native-datepicker'

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
    //  Name: "",
      firstName: "",
      lastName: "",
      Email: "",
      Password: "",
      date:"",
      ErrorName: false,
      ErrorEmail: false,
      ErrorPassword: false
    };
  }
  // handleName = text => {
  //   this.setState({
  //     Name: text
  //   });
  // };
  handlefirstName = text => {
    this.setState({
      firstName: text
    });
  };
  handlelastName = text => {
    this.setState({
      lastName: text
    });
  };
  // validateName = text => {
  //   var value = text;
  //   if (value.match(/^[a-zA-Z]+(\s{1}[a-zA-Z]+)*$/)) {
  //     this.setState({
  //       ErrorName: false
  //     });
  //     return true;
  //   } else {
  //     this.setState({
  //       ErrorName: true
  //     });
  //     return false;
  //   }
  // };
  validateFirstName = text => {
    var value = text;
    if (value.match(/^[a-zA-Z]+(\s{1}[a-zA-Z]+)*$/)) {
      this.setState({
        ErrorName: false
      });
      return true;
    } else {
      this.setState({
        ErrorName: true
      });
      return false;
    }
  };
  validateLastName = text => {
    var value = text;
    if (value.match(/^[a-zA-Z]+(\s{1}[a-zA-Z]+)*$/)) {
      this.setState({
        ErrorName: false
      });
      return true;
    } else {
      this.setState({
        ErrorName: true
      });
      return false;
    }
  };
  handleEmail = text => {
    this.setState({
      Email: text
    });
  };

  handlePassword = text => {
    this.setState({
      Password: text,
      ErrorPassword: false
    });
  };
  validate = text => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      this.setState({ ErrorEmail: true, Email: text });
      return false;
    } else {
      this.setState({ ErrorEmail: false, Email: text });
      console.log("Email is Correct");
    }
  };
  handleNext = () => {
    if (this.state.Password == "") {
      this.setState({
        ErrorPassword: true
      });
      ToastAndroid.show("Empty password field", ToastAndroid.SHORT);
    }
    if (this.state.Email == "") {
      this.setState({
        ErrorEmail: true
      });
      ToastAndroid.show("Empty email field", ToastAndroid.SHORT);
    }
    if (this.state.firstName =="") {
      this.setState({
        ErrorName: true
      });
      ToastAndroid.show("Empty name field", ToastAndroid.SHORT);
    }
    if (this.state.lastName == "") {
      this.setState({
        ErrorName: true
      });
      ToastAndroid.show("Empty name field", ToastAndroid.SHORT);
    }
    if (this.state.ErrorEmail !== false) {
      ToastAndroid.show("Wrong email field", ToastAndroid.SHORT);
    }
    if (this.state.lastName !== "") {
      this.setState({
        ErrorName: false
      });
    }
    if (this.state.firstName !== "") {
      this.setState({
        ErrorName: false
      });
    }
    if (this.state.Password !== "") {
      this.setState({
        ErrorPassword: false
      });
    }
    if (
      this.state.Email !== "" &&
      this.state.Password !== "" &&
     // this.state.Name !== "" &&
      this.state.firstName !== "" &&
      this.state.lastName !== "" &&
      this.state.ErrorName == false &&
      this.state.ErrorEmail == false &&
      this.state.ErrorName == false
    ) {
      this.setState({
        ErrorName: false,
        ErrorEmail: false,
        ErrorPassword: false
      });
      this.props.navigation.navigate("SignUp1", {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        Email: this.state.Email,
        Password: this.state.Password,
        Date:this.state.date
      });
    }
  };
  render() {
    return (
      <ImageBackground source={require("../assets/bg.jpg")} style={{ flex: 1 }}>
        <View style={{ marginLeft: 20, marginTop: 50, position: "absolute" }}>
        
          <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>
            Welcome to Dating App
          </Text>
          <Text style={{ color: "white", fontSize: 12 }}>
            HopeFully you'll find a perfect partner for you,Please
          </Text>
          <Text style={{ color: "white", fontSize: 12 }}>
            Sign up to your account as we care your privacy
          </Text>
        </View>
        <ScrollView keyboardShouldPersistTaps={"always"}>
          <View
            style={{
              height: height,
              width: width,
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                // marginTop: 100,
                marginBottom: 80
                // backgroundColor: "red"
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: "white",
                  fontFamily: ""
                }}
              >
                Signup
              </Text>
            </View>
            <View
              style={{
                width: 300,
                height: 400,
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                elevation: 1,
                backgroundColor: "white",
                borderRadius: 10
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center"
                }}
              >
                {/* <View
                  style={{
                    borderRadius: 5,
                    width: 250,
                    height: 50,
                    borderWidth: 2,
                    borderColor: this.state.ErrorName ? "red" : "grey"
                  }}
                >
                  <TextInput
                    placeholder="Your Name"
                    placeholderTextColor="#cccccc"
                    underlineColorAndroid="transparent"
                    // onFocus=""
                    returnKeyType={"next"}
                    onSubmitEditing={() => {
                      this.secondTextInput.focus();
                      this.setState({
                        ErrorName: false
                      });
                      // this.validateName(this.state.Name);
                    }}
                    value={this.state.Name}
                    blurOnSubmit={false}
                    value={this.state.Name}
                    style={{
                      fontSize: 15,
                      textAlign: "center",
                      color: "grey"
                    }}
                    onChangeText={this.handleName}
                  />
                </View> */}
                <View
                  style={{
                    borderRadius: 5,
                    width: 250,
                    height: 50,
                    borderWidth: 2,
                    marginBottom:10,
                    borderColor: this.state.ErrorName ? "red" : "grey",
                    marginTop:25
                  }}
                >
                  <TextInput
                    placeholder="First Name"
                    placeholderTextColor="#cccccc"
                    underlineColorAndroid="transparent"
                    // onFocus=""
                    returnKeyType={"next"}
                    onSubmitEditing={() => {
                      this.secondTextInput.focus();
                      this.setState({
                        ErrorName: false
                      });
                      this.validateFirstName(this.state.firstName);
                    }}
                    value={this.state.firstName}
                    blurOnSubmit={false}
                    value={this.state.firstName}
                    style={{
                      fontSize: 15,
                      textAlign: "center",
                      color: "grey"
                    }}
                    onChangeText={this.handlefirstName}
                  />
                </View>
                <View
                  style={{
                    borderRadius: 5,
                    width: 250,
                    height: 50,
                    borderWidth: 2,
                    borderColor: this.state.ErrorName ? "red" : "grey"
                  }}
                >
                  <TextInput
                    placeholder="Last Name"
                    placeholderTextColor="#cccccc"
                    underlineColorAndroid="transparent"
                    // onFocus=""
                    returnKeyType={"next"}
                    onSubmitEditing={() => {
                      this.secondTextInput.focus();
                      this.setState({
                        ErrorName: false
                      });
                      this.validateLastName(this.state.lastName);
                    }}
                    value={this.state.lastame}
                    blurOnSubmit={false}
                    value={this.state.lastame}
                    style={{
                      fontSize: 15,
                      textAlign: "center",
                      color: "grey"
                    }}
                    onChangeText={this.handlelastName}
                  />
                </View>
                
                <View
                  style={{
                    borderRadius: 5,
                    width: 250,
                    height: 50,
                    borderWidth: 2,
                    borderColor: this.state.ErrorEmail ? "red" : "grey",
                    marginTop: 10
                  }}
                >
                  <TextInput
                    placeholder="Your Email"
                    ref={input => {
                      this.secondTextInput = input;
                    }}
                    returnKeyType={"next"}
                    onSubmitEditing={() => {
                      this.thirdTextInput.focus();
                      this.validate(this.state.Email);
                    }}
                    value={this.state.Email}
                    placeholderTextColor="#cccccc"
                    textContentType="emailAddress"
                    style={{
                      fontSize: 15,
                      textAlign: "center",
                      color: "grey"
                    }}
                    onChangeText={this.handleEmail}
                  />
                </View>
                <View
                  style={{
                    borderRadius: 5,
                    width: 250,
                    height: 50,
                    borderWidth: 2,
                    borderColor: this.state.ErrorPassword ? "red" : "grey",
                    marginTop: 10
                  }}
                >
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="#cccccc"
                    textContentType="password"
                    ref={input => {
                      this.thirdTextInput = input;
                    }}
                    secureTextEntry={true}
                    style={{
                      fontSize: 15,
                      textAlign: "center",
                      color: "grey"
                    }}
                    onChangeText={this.handlePassword}
                  />
                </View>
              </View>
              <View 
                style={{
                  borderRadius: 5,
                  width: 249,
                  height: 50,
                  borderWidth: 2,
                  borderColor: this.state.ErrorPassword ? "red" : "grey",
                  marginTop: 10
                }}
               >
              <DatePicker
                style={{width: 240,marginTop:1}}
                date={this.state.date}
                mode="date"
                placeholder="Select Your Date of Birth"
                format="YYYY-MM-DD"
                minDate="1980-05-01"
                maxDate="2001-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36,
                    borderColor:"white"
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {this.setState({date: date})}}
      />
      </View>

              <View>
                <TouchableOpacity
                  style={{
                    // backgroundColor: "#38d68b",
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                   marginTop:10,
                   marginBottom:25,
                    borderRadius: 5
                  }}
                  onPress={() => {
                    this.validate(this.state.Email);
                    // this.validateName(this.state.Name);
                    setTimeout(() => {
                      this.handleNext();
                    }, 300);
                    // this.handleNext();
                    console.log("Data",this.state)
                  }}
                >
                  <LinearGradient
                    colors={["#f02157", "#f13d5a", "#f45c68"]}
                    style={{
                      height: 40,
                      width: 250,
                      borderRadius: 5,
                    //  marginBottom:25,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "300",
                        color: "white",
                        fontFamily: ""
                      }}
                    >
                      Next
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({});
