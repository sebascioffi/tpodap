import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TextInput, Pressable } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const GenerarClave = () => {
  return (
    <View style={styles.container}>
        <Image
        source={require('../imagenes/barrio.png')}
        style={styles.image}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre y apellido"
        placeholderTextColor="darkgrey"
        textAlign="center"
      />
      <TextInput
        style={styles.input}
        placeholder="DNI"
        placeholderTextColor="darkgrey"
        textAlign="center"
      />
        <TextInput
        style={styles.input}
        placeholder="Dirección"
        placeholderTextColor="darkgrey"
        textAlign="center"
      />
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Generar clave</Text>
      </Pressable>
      <Text style={styles.linkText}>Entrar como invitado</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: screenWidth,
    aspectRatio: 1.5,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 20,
    color: 'darkgrey',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
    width: '50%',
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  linkText: {
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold',
      textDecorationLine: 'underline',
      textAlign: 'center',
      marginTop: 10,
    },
});

export default GenerarClave;
