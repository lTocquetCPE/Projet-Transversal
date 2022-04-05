/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import { NavigationContainer } from '@react-navigation/native';
 import type {Node} from 'react';
 import {
   StyleSheet,
   Text,
   useColorScheme,
   View,
   Button
   
 } from 'react-native';
 
 import {
 
 } from 'react-native/Libraries/NewAppScreen';
 
 
 const App: () => Node = () => {
 
   return (<NavigationContainer>
     <View style={styles.mainContainer}>
       <Text style={styles.title}>Accueil</Text>
     <View style={styles.buttonView}>
       <Button
         style={styles.buttonStyle}
         title="Entrer en mode automatique"
       /><Button
         title="Entrer en mode manuel"
 
       />
         </View>
       </View></NavigationContainer>
   );
 };
 
 const styles = StyleSheet.create({
   title :{
     fontSize : 30,
     textAlign : 'center',
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
     
   }
 });
 
 export default App;
 