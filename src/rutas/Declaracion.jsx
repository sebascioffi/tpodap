import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Modal, Opacity, Pressable } from 'react-native';
import { Link, useNavigate, useParams } from 'react-router-native';

const screenWidth = Dimensions.get('window').width;

const Declaracion = () => {
  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigate(-1)} style={styles.backArrow}>
        <Image
          source={require('../imagenes/volver.png')} // Asegúrate de tener una imagen de flecha en tu proyecto
          style={styles.arrowImage}
        />
      </Pressable>

      <Text style={styles.title}>Declaración Jurada</Text>
      <Text style={styles.subtitle}>Para continuar, debes aceptar la declaración jurada</Text>
      <Text style={styles.bodyText}>
        Yo, en calidad de vecino, acepto que la falsedad de lo indicado en el objeto de la denuncia y pruebas aportadas puede dar lugar a una acción judicial por parte del municipio y/o los denunciados
      </Text>
      <View style={styles.buttonContainer}>
        <Link to={`/gendenuncia`} component={Pressable} style={[styles.button, styles.acceptButton]}>
          <Text style={styles.buttonText}>Aceptar</Text>
        </Link>
        <Pressable style={[styles.button, styles.denyButton]} onPress={() => navigate(-1)}>
          <Text style={styles.buttonText}>Denegar</Text>
        </Pressable>
      </View>
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
  menuIcon: {
    position: 'absolute',
    top: 20, // Ajusta según sea necesario para que esté bien alineado
    left: 20,
  },
  iconImage: {
    width: 24, // Ajusta el tamaño del icono según sea necesario
    height: 24,
  },
  userContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  userImage: {
    width: 40, // Ajusta el tamaño del icono de usuario según sea necesario
    height: 40,
    marginBottom: 10,
  },
  desc: {
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  boldText: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  bodyText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: 'green',
    marginRight: 10,
  },
  denyButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Declaracion;
