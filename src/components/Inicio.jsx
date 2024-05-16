import React from 'react'
import Constants from "expo-constants"
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Pressable } from 'react-native'
import { Link } from 'react-router-native';

const screenWidth = Dimensions.get('window').width;

const Inicio = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../imagenes/barrio.png')}
        style={styles.image}
      />
      <Link to="/logininspector" component={TouchableOpacity} style={styles.button}>
        <Text style={styles.buttonText}>Inspector</Text>
      </Link>
      <Link to="/loginvecino" component={TouchableOpacity} style={styles.button}>
        <Text style={styles.buttonText}>Vecino</Text>
      </Link>
      <Link to="/invitado" component={Pressable} style={styles.button}>
        <Text style={styles.buttonText}>Invitado</Text>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: screenWidth,
    aspectRatio: 1.5,
    resizeMode: 'contain',
    marginBottom: 20
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginVertical: 10,
    width: screenWidth * 0.8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Inicio

