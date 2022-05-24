/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
 import type {Node} from 'react';
 import {
   StyleSheet,
   Text,
   useColorScheme,
   View,
   Button,
   TouchableHighlight,
   TouchableOpacity,
   Image,
   
 } from 'react-native';
 
 import {Picker} from '@react-native-picker/picker';
 import {
 
 } from 'react-native/Libraries/NewAppScreen';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
 
const AppContext = React.createContext();
const ENDPOINT = 'http://192.168.237.212:5000/transversalApi';

let sendDataToServer = (mode, commande_manuelle="none", commande_auto="none", objet_recherche="carre rouge") => {
  fetch(ENDPOINT, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    mode: mode,
    commande_manuelle: commande_manuelle,
    commande_auto : commande_auto,
    objet_recherche : objet_recherche

  })
})//.then((response) => response.json()).then((json)=>alert(JSON.stringify(json)))
.catch((error) => {
  console.error(error);
});;
}



export class AutoScreen extends React.Component{

  constructor(props){
    //alert(JSON.stringify(props)); 
    super(props);
    this.state ={selectedSearchItem : "carre rouge",
    searchState : false,
  toggleSearchText : "Démarrer la recherche",
  chronoValue : 0,
  chronoInterval : null};
    
  }

  increaseChrono = () =>{
    this.setState({chronoValue : 1 + this.state.chronoValue})
  }
  startChrono = () =>{
    this.setState({chronoInterval : setInterval( this.increaseChrono,1000)})
  }

  stopChrono = () =>{
    clearInterval(this.state.chronoInterval)
    this.setState({chronoValue : 0})
  }
  startSearch = () =>{
    if (!this.state.searchState){
      this.setState({toggleSearchText : "Arrêter la recherche", searchState : true})
      sendDataToServer(1, "none", "start", this.state.selectedSearchItem)
      this.startChrono()
    }
    else {
      this.setState({toggleSearchText : "Démarrer la recherche", searchState : false})
      sendDataToServer(0,"none", "stop", this.state.selectedSearchItem)
      this.stopChrono()
    }
    
  }

  render(){
  return(
  <View style={styles.mainContainer}>
    <Text style={styles.title}>{this.state.chronoValue}</Text>
  <View><Picker style={[styles.buttonStyle, {backgroundColor : '#2196F3'}]}
  selectedValue={this.state.selectedSearchItem}
  onValueChange={(itemValue, itemIndex) =>
    {
    this.setState({selectedSearchItem : itemValue})
    }
  }>
  <Picker.Item label="Carré Rouge" value="carre rouge"/>
  <Picker.Item label="Carré Bleu" value="carre bleu" />
</Picker></View>
  <View style={styles.buttonView}>
    <Button
      style={[styles.buttonView, styles.blackText]}
      title={this.state.toggleSearchText}
      onPress={this.startSearch}
    />
      </View>
      
    </View>);}
    }



export class ManualScreen extends React.Component {
  constructor(props){
    //alert(JSON.stringify(props)); 
    super(props);
    this.state ={
      up : false,
      down : false,
      right : false,
      left : false
    }
  }

  
  onPressIn =(dir)=>{
    if(dir=='up'){
      this.setState({ up : true});
      sendDataToServer(0,  "forward", "none")
    }
    else if(dir=="down"){
      this.setState({ down : true});
      sendDataToServer(0, "backward", "none")
    }
    else if(dir=="right"){
      this.setState({ right : true});
      sendDataToServer(0, "right", "none")
    }
    else if(dir=="left"){
      this.setState({ left : true});
      sendDataToServer(0, "left", "none")
    }
    
}
  onPressOut =(dir)=>{
    if(dir=='up'){
      this.setState({ up : false});
      sendDataToServer(0, "none", "none")
    }
    else if(dir=="down"){
      this.setState({ down : false});
      sendDataToServer(0, "none", "none")
    }
    else if(dir=="right"){
      this.setState({ right : false});
      sendDataToServer(0, "none", "none")
    }
    else if(dir=="left"){
      this.setState({ left : false});
      sendDataToServer(0, "none", "none")
    }
}

  render() {
      return (
        <View style={styles.mainContainer}>
        <View style={styles.videoFeedback}>
        <WebView
        source={{
          uri: ENDPOINT + '/video'
        }}
        style={{ marginTop: 20 }}
      />
        </View>
      <View style={styles.directionnalPadView}>
        <View style={styles.topPadView}>
        <TouchableOpacity onPressIn={()=>this.onPressIn('up')}
        onPressOut={()=>this.onPressOut('up')}>
      <Image style={styles.imageStyle} source={require('./key_up.png')} />
        </TouchableOpacity>
        </View>
        <View style={styles.midPadView}>
        <TouchableOpacity  onPressIn={()=>this.onPressIn('left')}
        onPressOut={()=>this.onPressOut('left')}>
      <Image style={styles.imageStyle}  source={require('./key_left.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPressIn={()=>this.onPressIn('right')}
        onPressOut={()=>this.onPressOut('right')}>
      <Image style={styles.imageStyle} source={require('./key_right.png')} />
        </TouchableOpacity>
        </View>
        <View style={styles.botPadView}>
        <TouchableOpacity onPressIn={()=>this.onPressIn('down')}
        onPressOut={()=>this.onPressOut('down')}>
      <Image style={styles.imageStyle} source={require('./key_down.png')} />
        </TouchableOpacity>
        </View>
          </View>
        </View>);
  }
}
ManualScreen.contextType = AppContext;

 
 const Stack = createNativeStackNavigator();

 export class HomeScreen extends React.Component{
   constructor(props){
    super(props);
   }
  render(){
    return(<React.Fragment>
   <View style={styles.mainContainer}>
   <View style={styles.buttonView}>
     <Button
       style={styles.buttonStyle}
       title="Entrer en mode automatique"
       onPress={() => this.props.navigation.navigate('Auto')}
     /><Button
       title="Entrer en mode manuel"
       onPress={() => this.props.navigation.navigate('Manual')}/>
       </View>
     </View></React.Fragment>);
     }
}
class App extends React.Component  {
   constructor(props){
     super(props);
     this.state = {
      debugText : "Default"
    }
   }
   render(){
     return(
   <AppContext.Provider value={{
    debugText : "Default"
  }}><NavigationContainer>
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="Manual" component={ManualScreen}/>
      <Stack.Screen name="Auto" component={AutoScreen} />
    </Stack.Navigator>
  </NavigationContainer></AppContext.Provider>
   );
  }
 };
 
 const styles = StyleSheet.create({
   title :{
     fontSize : 30,
     textAlign : 'center',
     color : 'black'
   },
   buttonView:{
     flex : 1,
     justifyContent: 'space-around'
   },
   buttonStyle:{
     height : 30,
   },
   mainContainer :{
     flex : 1,
     
   },
   directionnalPadView:{
    flex : 1,
    paddingTop : 0,
    backgroundColor : 'grey'
  },
  topPadView:{
    flex:1,
    justifyContent :'space-around',
    flexDirection:'row'
  },
  botPadView:{
    flex:1,
    flexDirection:'row',
    justifyContent :'space-around'
  },
  midPadView:{
    flex:1,
    flexDirection:'row',
    justifyContent :'space-around'
  },
  videoFeedback:{
    flex:1
  },
  imageStyle :{
    height: 100,
    width: 100
  }

 });
 
 export default App;
 