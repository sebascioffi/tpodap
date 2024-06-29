import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, Dimensions } from 'react-native';
import { Link, useNavigate } from 'react-router-native';

const screenWidth = Dimensions.get('window').width;

const Promociones = () => {

  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigate(-1)} style={styles.backArrow}>
        <Image
          source={require('../imagenes/volver.png')} // Asegúrate de tener una imagen de flecha en tu proyecto
          style={styles.arrowImage}
        />
      </Pressable>

      <Link to="/comercios" component={Pressable} style={styles.button}>
        <Text style={styles.buttonText}>Comercio</Text>
      </Link>

      <Image
        source={require('../imagenes/barrio.png')}
        style={styles.image}
      />

      <Link to="/servicios" component={Pressable} style={styles.button}>
        <Text style={styles.buttonText}>Servicio</Text>
      </Link>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Softer background color
  },
  title: {
    fontSize: 24,
  },
  backArrow: {
    position: 'absolute',
    top: 20, // Ajusta según sea necesario para que esté bien alineado
    left: 20,
  },
  arrowImage: {
    width: 24, // Ajusta el tamaño de la flecha según sea necesario
    height: 24,
  },
  image: {
    width: screenWidth,
    aspectRatio: 1.5,
    resizeMode: 'contain',
    marginBottom: 0,
  },
  button: {
    backgroundColor: '#5D9DCE',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    width: '50%',
    shadowColor: '#000', // Adding shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: "bold"
  },
});

export default Promociones;
