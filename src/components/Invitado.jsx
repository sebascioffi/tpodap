import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useNavigate } from 'react-router-native';

const Invitado = () => {

  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigate(-1)} style={styles.backArrow}>
        <Image
          source={require('../imagenes/volver.png')} // Asegúrate de tener una imagen de flecha en tu proyecto
          style={styles.arrowImage}
        />
      </Pressable>
      <Text style={styles.title}>Invitado</Text>
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
});

export default Invitado;
