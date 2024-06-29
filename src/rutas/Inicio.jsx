import React from 'react'
import Constants from "expo-constants"
import { View, Text, Image, StyleSheet, Dimensions, Pressable } from 'react-native'
import { Link } from 'react-router-native';

const screenWidth = Dimensions.get('window').width;

const Inicio = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../imagenes/barrio.png')}
        style={styles.image}
      />
      <Link to="/logininspector" component={Pressable} style={styles.button}>
        <Text style={styles.buttonText}>Inspector</Text>
      </Link>
      <Link to="/loginvecino" component={Pressable} style={styles.button}>
        <Text style={styles.buttonText}>Vecino</Text>
      </Link>
      <Link to="/buscarprom" component={Pressable} style={styles.button}>
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
    backgroundColor: '#f5f5f5', // Softer background color
  },
  image: {
    width: screenWidth,
    aspectRatio: 1.5,
    resizeMode: 'contain',
    marginBottom: 30, // Adjusted margin for better spacing
  },
  button: {
    backgroundColor: '#6BAADB', // Softer, more appealing color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25, // More rounded corners for a modern look
    marginVertical: 10,
    width: screenWidth * 0.8,
    alignItems: 'center',
    shadowColor: '#000', // Adding shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold', // Bold text for better readability
  },
});

export default Inicio

