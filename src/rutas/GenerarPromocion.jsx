import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, Dimensions } from 'react-native';
import { Link, useNavigate } from 'react-router-native';

const screenWidth = Dimensions.get('window').width;

const GenerarPromocion = () => {

  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigate(-1)} style={styles.backArrow}>
        <Image
          source={require('../imagenes/volver.png')} // Asegúrate de tener una imagen de flecha en tu proyecto
          style={styles.arrowImage}
        />
      </Pressable>

      <Link to="/gencomercio" component={Pressable} style={styles.button}>
        <Text style={styles.buttonText}>Crear Comercio</Text>
      </Link>

      <Link to="/genservicio" component={Pressable} style={styles.button}>
        <Text style={styles.buttonText}>Crear Servicio</Text>
      </Link>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#0066FF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
    width: '50%',
    margin: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default GenerarPromocion;
