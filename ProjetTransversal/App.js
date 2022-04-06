/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import type {Node} from 'react';
 import {
   StyleSheet,
   Text,
   useColorScheme,
   View,
   Button,
   TouchableHighlight
   
 } from 'react-native';
 
 import {
 
 } from 'react-native/Libraries/NewAppScreen';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
 
const AppContext = React.createContext();

let AutoScreen =({navigation})=>{return(
  <View style={styles.mainContainer}>
    <Text style={styles.title}>Automatique</Text>
  <View style={styles.buttonView}>
    <Button
      style={styles.buttonStyle}
      title="Entrer en mode automatique"
    /><Button
      title="Entrer en mode manuel"
      onPress={() => navigation.navigate('Manual')}/>
      </View>
    </View>);}


export class ManualScreen extends React.Component {
  constructor(props){
    alert(JSON.stringify(props)); 
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
    }
    else if(dir=="down"){
      this.setState({ down : true});
    }
    else if(dir=="right"){
      this.setState({ right : true});
    }
    else if(dir=="left"){
      this.setState({ left : true});
    }
    
}
  onPressOut =(dir)=>{
    if(dir=='up'){
      this.setState({ up : false});
    }
    else if(dir=="down"){
      this.setState({ down : false});
    }
    else if(dir=="right"){
      this.setState({ right : false});
    }
    else if(dir=="left"){
      this.setState({ left : false});
    }
}

  render() {
      return (
        <View style={styles.mainContainer}>
        <Text style={styles.title}>Ecran Manuel, {this.state.up ? "UP" : "NOTUP"}, {this.state.right ? "RIGHT" : "NOTRIGHT"}, {this.state.down ? "DOWN" : "NOTDOWN"}, {this.state.left ? "LEFT" : "NOTLEFT"}</Text>
        <View style={styles.videoFeedback}></View>
      <View style={styles.directionnalPadView}>
        <View style={styles.topPadView}>
        <Pressable onPressIn={()=>this.onPressIn('up')}
        onPressOut={()=>this.onPressOut('up')}>
          <Text>UP</Text>
        </Pressable>
        </View>
        <View style={styles.midPadView}>
        <Pressable onPressIn={()=>this.onPressIn('left')}
        onPressOut={()=>this.onPressOut('left')}><Text>Left</Text></Pressable>
        <Pressable onPressIn={()=>this.onPressIn('right')}
        onPressOut={()=>this.onPressOut('right')}><Text>Right</Text></Pressable>
        </View>
        <View style={styles.botPadView}>
        <Pressable onPressIn={()=>this.onPressIn('down')}
        onPressOut={()=>this.onPressOut('down')}>
          <Text>Down</Text>
        </Pressable>
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
     <Text style={styles.title}>Accueil, {JSON.stringify(this.props)}</Text>
   <View style={styles.buttonView}>
     <Button
       style={styles.buttonStyle}
       title="Entrer en mode automatique"
       onPress={() => this.props.navigation.navigate('Auto', {state : state})}
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
    paddingTop : 30,
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
  }
 });
 
 export default App;
 