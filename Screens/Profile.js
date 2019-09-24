import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  AsyncStorage,
  TouchableWithoutFeedback,
  ScrollView,
  StatusBar,
  ActivityIndicator
} from "react-native";
import { Header, Left, Right, Body, Title } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
const { height, width } = Dimensions.get("window");
import Config from "../Config"
import axios from "axios"
import ImagePicker from "react-native-image-picker";
import Icon1 from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/Entypo";
// import { userInfo } from "os";
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.didBlurSubscription = "";
    this.state = {
      avatarSource: "",
          photoUrl: "",
          imageResponse: "",
          imageAdded: "",
          isLoading:false,
          picture: "",
      token: "",
      firstName: "",
      userId:"",
      email: "",
      olldpicture:"",
      lastName: "",
      name:"",
      pic:false,
      phone:"",
      Usertoken:"",
      address:"",
      photoUrl: "",
      editInfo:false,
      UserInfo:null,
      image:"",
      isloadingImage: true
    };
    this.selectImage = this.selectImage.bind(this);
  }
  // const options = {
  //   title: 'Select Avatar',
  //   customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  //   storageOptions: {
  //     skipBackup: true,
  //     path: 'images',
  //   }
  // };
  componentDidMount(){
    this._retrieveData()
    // this.imagedata()
  }
  Logout = async () =>{
    await AsyncStorage.removeItem("UserToken")
    this.props.navigation.navigate("Login")
   }
  UpdateProfilePicture = () => {
    this.setState({
      isLoading:true
    })
    const { imageResponse } = this.state;
    let formdata = new FormData();

    formdata.append("name", this.state.name);
    formdata.append("address", this.state.address);
    formdata.append("phone", this.state.phone);
    formdata.append("oldImage", this.state.image);
if(this.state.pic){
    formdata.append("image", {
      uri: imageResponse.uri,
      type: imageResponse.type,
      name: imageResponse.fileName
    });
  }
    var putUrl = Config.BaseURL + "api/profile/" + this.state.userId;
    console.log("PUT URL", putUrl);
    console.log("UserId",this.state.userId)
    console.log("UserId",this.state.Usertoken)
    // let tokwn = {
    //   headers: {
    //     'Authorization': 'Bearer ' +this.state.Usertoken
    //   }
    // }
    const tk = this.state.Usertoken
    const config = {headers: {
      "Authorization": `Bearer ${tk}`,
    }};
  console.log("PutRequest",Config.BaseURL + "api/profile/" + this.state.userId,formdata,config)
    axios.put(Config.BaseURL + "api/profile/" + this.state.userId,formdata,config)
     .then(response => {
        // alert("test");
        // this.props.navigation.navigate("OtherProfile", {
        //   response: response.data
        // });
       
        console.log("Responce",response)
     
        console.log("Response Profile Image", response);
        const  value = response;
        this.setState({
          editInfo:false,
          name:value.data.name,
          isLoading:false,
          phone:value.data.phone,
          address:value.data.address,
          image:value.data.image
        })
        // this.UpdateUserPicture();
        // this.setState({
        //   favourite: false
        // });
      })
      .catch(error => {
        console.log("Error Profile Image", error);
        this.setState({
          isLoading:false
        })
      });
  };
  selectImage=()=> {
    const options = {
      title: "Select Avatar",
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };
   



  ImagePicker.showImagePicker(options, response => {
    console.log("Response = ", response);

    if (response.didCancel) {
      console.log("User cancelled photo picker");
    } else if (response.error) {
      console.log("ImagePicker Error: ", response.error);
    } else if (response.customButton) {
      console.log("User tapped custom button: ", response.customButton);
    } else {
      //let source = { uri: response.uri };

      // You can also display the image using data:
      let source = {
        uri: "data:image/jpeg;base64," + response.data
      };

      this.setState(
        {
          avatarSource: source,
          photoUrl: response.uri,
          imageResponse: response,
          imageAdded: true,
          pic:true,
          picture: source.uri
         }
         ,
        // () => {
        //   this.UpdateProfilePicture();
        // }
      );
      console.log(
        "AvatarSource: ",
        this.state.avatarSource,
        "Photo Url: ",
        this.state.photoUrl,
        "state",
        this.state
      );
    }
  });
}
handleEditProfile =()=> {
  this.selectImage() ;
}


  _retrieveData = async () => {
    try {
      // const value = await AsyncStorage.getItem('UserToken');
      const user = await AsyncStorage.getItem('UserInformation');
      const id = await AsyncStorage.getItem('UserId');
      const token = await AsyncStorage.getItem('UserToken');
      // UserToken
      const data = JSON.parse(user)
      this.setState({
        UserInfo:data,
        name:data.data.user.name,
        email:data.data.user.email,
        phone:data.data.user.phone,
        address:data.data.user.address,
        image:data.data.user.image,
        userId:id,
        Usertoken:token
      })
      console.log("UserInformation",this.state.UserInfo)
      console.log("UserInformation",this.state.UserInfo.data.user.name)  
       console.log("UserInformation",this.state.UserInfo.data.user.email)
       console.log("UserImage",this.state.image)
      console.log("Retrived")
    
    } catch (error) {
      console.log("Error WHile retrive",error)
    }
  };
  UpdateUser=()=>{
    this.setState({
      editInfo:true
    })
  
  }
  PostRequest = ()=>{
//post a request
  }
  render() {
    return (
    <View style={{flex:1,backgroundColor:'white'}}>
        {/* <StatusBar backgroundColor="#15a7ee" barStyle="light-content" /> */}
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <View style={{ backgroundColor: "white", flex: 1 }}>
            <View style={{ backgroundColor: "white", flex: 1 }}>
              <Header
                style={{
                  backgroundColor: "#ee1c25"
                }}
              >
            {/* <StatusBar backgroundColor="#15a7ee" barStyle="light-content" /> */}

                <Left style={{ left: 40 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "white",
                      width: 200
                    }}
                  >
                    Profile
                  </Text>
                </Left>
              </Header>

              <View
                style={{
                  height: 0.5,
                  width: width,
                  borderWidth: 0.5,
                  borderColor: "grey"
                }}
              />

              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20
                }}
              >
                <Image
                   source={{ uri:Config.BaseURL+this.state.image }}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 80,
                    borderWidth: 2,
                    borderColor: "grey"
                  }}
                />
              </View>
              <View
                      style={{
                        width: 30,
                        height: 30,
                        position: "absolute",
                        alignItems: "center",
                        right:120,
                        top:180,
                        justifyContent: "center"
                     
                      }}
                    >
                        {this.state.editInfo ? (
                      <TouchableOpacity onPress={this.handleEditProfile}>
                        <Icon
                          name="camera"
                          size={25}
                          color="grey"
                          // onPress={this.handleEditProfile}
                        />
                      </TouchableOpacity>):
                    <View></View> 
                    }
                    </View>
              <TouchableWithoutFeedback
              onPress={this.UpdateUser}
              >
              <Icon style={{position:'absolute',right:20,top:10,color:'white'}} name="edit" size={30} />
              </TouchableWithoutFeedback>
              <View style={{alignSelf:"center",flexDirection:"row",marginTop:10}}>
                <Text style={{fontWeight:"bold",fontSize:14}}>
                  Email: 
                </Text>
                <Text> {this.state.email}</Text>
              </View>
              <View style={{flexDirection:"row",justifyContent:"space-around"}}>
              <View style={{ marginTop: 10, alignSelf: "center" ,flexDirection:"row"}}>
                {this.state.editInfo ? (
                         <TextInput 
                         placeholder="Enter Your Name"
                         onChangeText={text =>
                          this.setState({
                            name: text
                          })
                        }
                         style={{marginTop:0,alignSelf:'center'}}
                         />
                    ) : (
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          color: "black",
                          fontFamily: ""
                        }}
                      >
                     Name: {this.state.name}
                      </Text>
                    )}
                          
                </View>
   
              </View>
              {this.state.isLoading ? (
  <ActivityIndicator
    style={{
      alignSelf: "center",
      position: "absolute",
      top:200,
    }}
    size="large"
    color="red"
  />
) : null}
              <View style={{flexDirection:"row",width:"100%"}}>
              <Left style={{marginLeft:10}}>
              <View style={{ marginTop: 10, alignSelf: "center",marginBottom:20,flexDirection:'row' }}>
              {this.state.editInfo ? (
                         <TextInput 
                         placeholder="Enter Your Phone"
                         onChangeText={text =>
                          this.setState({
                            phone: text
                          })
                        }
                         style={{marginTop:0,alignSelf:'center'}}
                         />
                    ) : (
                      <Text> Phone: {this.state.phone}
                      </Text>
                    )}
              </View>
              </Left>
              <Right style={{marginRight:20}}>
              <View style={{ marginTop: 0, alignSelf: "center",marginBottom:20,flexDirection:'row' }}>
              {this.state.editInfo ? (
                         <TextInput 
                         placeholder="Enter Your Address"
                         onChangeText={text =>
                          this.setState({
                            address: text
                          })
                        }
                         style={{marginTop:10,alignSelf:'center'}}
                         />
                    ) : (
                      <Text numberOfLines={1} style={{flexDirection:"row",marginTop:5}}>Address: {this.state.address}</Text>
                    )}
              </View>
              </Right>
              </View>
              <View>
              {this.state.editInfo ? (
                         <TouchableOpacity 
                         style={{justifyContent:"center",margin:10,alignItems:"center",alignSelf:'center',
                         backgroundColor:'red',borderRadius:25,width:150,height:40}}
                         onPress={()=>this.UpdateProfilePicture()}
                         >
                         <Text style={{color:"white"}}>Done</Text>
                       </TouchableOpacity>
                    ) : (
                      <Text> 
                      </Text>
                    )}
               
              </View>
            <ScrollView>
              <View
                style={{
                  height: 0.2,
                  width: width,
                  borderWidth: 0.2,
                  borderColor: "grey"
                }}
              />

              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <Icon2
                  name="list"
                  size={35}
                  style={{
                    marginLeft: 10,
                    marginRight: 8,
                    marginTop: 10,
                    color: "black"
                  }}
                />
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("MyOrders")}
                >
                  <View>
                    <Text style={styles.text}>Orders</Text>
                    <Text style={styles.normalText}>
                      Find out what's going on !
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
           

              <View
                style={{
                  height: 0.2,
                  width: width,
                  borderWidth: 0.2,
                  borderColor: "grey"
                }}
              />
                    <TouchableOpacity 
            onPress={()=> this.Logout()}
            >
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <Icon1
                  name="poweroff"
                  size={27}
                  style={{
                    marginLeft: 20,
                    marginRight: 10,
                    marginTop: 10,
                    color: "black"
                  }}
                />
                <View>
                  <Text style={styles.text}>Logout</Text>
                  <Text style={styles.normalText}>For Logout !</Text>
                </View>
              </View>
            </TouchableOpacity>
            </ScrollView>
            </View>
          </View>
     

        </View>
     </View>
    );
  }
}
const styles = StyleSheet.create({
  headText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    margin: 15
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 20,
    marginTop: 10
  },
  normalText: {
    color: "black",
    fontSize: 10,
    marginLeft: 20,
    marginTop: 8,
    marginBottom: 15
  }
});
