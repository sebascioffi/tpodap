import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TextInput, Pressable, Modal } from 'react-native';
import { Link, useNavigate } from 'react-router-native';

const screenWidth = Dimensions.get('window').width;

const GenerarClave = () => {
  const navigate = useNavigate();

  const [modalExitoVisible, setModalExitoVisible] = useState(false);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    dni: '',
    direccion: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
};

const handleSubmit = async (event) => {
    if (formData.name == "" || formData.dni == "" || formData.direccion == ""){
      setModalErrorVisible(true);
    } else{
      setModalExitoVisible(true);
    }
};

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigate(-1)} style={styles.backArrow}>
        <Image
          source={require('../imagenes/volver.png')} // Asegúrate de tener una imagen de flecha en tu proyecto
          style={styles.arrowImage}
        />
      </Pressable>
        <Image
        source={require('../imagenes/barrio.png')}
        style={styles.image}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="darkgrey"
        textAlign="center"
        selectionColor="transparent"
        name="name"
        value={formData.name}
        onChangeText={(text) => handleInputChange({ target: { name: 'name', value: text } })}
      />
      <TextInput
        style={styles.input}
        placeholder="DNI"
        placeholderTextColor="darkgrey"
        textAlign="center"
        selectionColor="transparent"
        name="dni"
        value={formData.dni}
        onChangeText={(text) => handleInputChange({ target: { name: 'dni', value: text } })}
      />
      <TextInput
        style={styles.input}
        placeholder="Dirección"
        placeholderTextColor="darkgrey"
        textAlign="center"
        selectionColor="transparent"
        name="direccion"
        value={formData.direccion}
        onChangeText={(text) => handleInputChange({ target: { name: 'direccion', value: text } })}
        />
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar</Text>
      </Pressable>
      <Link to="/buscarprom">
        <Text style={styles.linkText}>Entrar como invitado</Text>
      </Link>

      <Modal
        visible={modalExitoVisible}
        transparent={false}
      >
        <View style={styles.modalExitoContainer}>
        <Pressable onPress={() => navigate(-2)} style={styles.backArrow}>
        <Image
          source={require('../imagenes/volver.png')} // Asegúrate de tener una imagen de flecha en tu proyecto
          style={styles.arrowImage}
        />
        </Pressable>
          <Image source={require("../imagenes/correcto.png")} resizeMode="contain" />
          <Text style={styles.boldText}>Su solicitud de clave ha sido recibida y la estamos evaluando.</Text>
        </View>
      </Modal>
      <Modal
        visible={modalErrorVisible}
        transparent={true}
      >
        <View style={styles.modalErrorContainer}>
          <View style={styles.redModal}>
            <Text style={styles.modalErrorText}>Debes completar todos los datos</Text>
          </View>
          <Pressable onPress={() => setModalErrorVisible(false)} style={styles.closeErrorButton}>
            <Image source={require('../imagenes/cerrar.png')} style={styles.closeIcon} />
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5', // Softer background color
  },
  image: {
    width: screenWidth,
    aspectRatio: 1.5,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  input: {
    width: '80%', // Ajustar el ancho para un mejor diseño
    height: 50, // Aumentar la altura para una mejor accesibilidad
    borderWidth: 1, // Borde alrededor del input
    borderColor: '#6BAADB', // Color de borde que combina con los botones
    borderRadius: 10, // Bordes redondeados para un aspecto moderno
    marginBottom: 20, // Espacio entre los inputs
    color: 'black', // Color del texto
    fontSize: 16, // Tamaño de la fuente
    backgroundColor: '#fff', // Fondo blanco para contraste
    shadowColor: '#000', // Sombra para profundidad
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    textAlign: 'center', // Alinear texto al centro
    outlineStyle: 'none',
  },
  button: {
    backgroundColor: '#6BAADB', // Softer, more appealing color
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    width: '30%',
    marginBottom: 30,
    borderRadius: 25, // More rounded corners for a modern look
    shadowColor: '#000', // Adding shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold"
  },
  linkText: {
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold',
      textDecorationLine: 'underline',
      textAlign: 'center',
      marginTop: 10,
    },
    backArrow: {
      position: 'absolute',
      top: 10, // Ajusta según sea necesario para que esté bien alineado
      left: 10,
    },
    arrowImage: {
      width: 24, // Ajusta el tamaño de la flecha según sea necesario
      height: 24,
    },
    boldText: {
      fontSize: 23,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    modalExitoContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5', // Softer background color
    },
    modalErrorContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 22,
    },
    redModal: {
      backgroundColor: '#EC5454', // Fondo rojo semi-transparente
      width: '80%',
      alignItems: 'center',
      padding: 20,
      borderRadius: 10,
    },
    modalErrorText: {
      color: 'white',
      fontSize: 16,
    },
    closeErrorButton: {
      position: 'absolute',
      top: 20,
      right: 50,
      zIndex: 1,
    },
    closeIcon: {
      width: 24,
      height: 24,
    },
});

export default GenerarClave;
