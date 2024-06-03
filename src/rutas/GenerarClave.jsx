import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TextInput, Pressable, Modal } from 'react-native';
import { Link, useNavigate } from 'react-router-native';

const screenWidth = Dimensions.get('window').width;

const GenerarClave = () => {
  const navigate = useNavigate();

  const [modalExitoVisible, setModalExitoVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    dni: '',
    direccion: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
};

const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      const response = await fetch('http://localhost:8080/api/usuario', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
      });
          const responseData = await response.json(); // Parsea los datos de la respuesta
          console.log(responseData);
  } catch (error) {
      console.error("Error:", error);
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
        placeholder="Nombre y apellido"
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
        <Text style={styles.buttonText}>Generar clave</Text>
      </Pressable>
      <Link to="/buscarprom">
        <Text style={styles.linkText}>Entrar como invitado</Text>
      </Link>

      <Modal
        visible={modalExitoVisible}
        transparent={false}
      >
        <View style={styles.modalExitoContainer}>
        <Pressable onPress={() => navigate(-1)} style={styles.backArrow}>
        <Image
          source={require('../imagenes/volver.png')} // Asegúrate de tener una imagen de flecha en tu proyecto
          style={styles.arrowImage}
        />
        </Pressable>
          <Image source={require("../imagenes/correcto.png")} resizeMode="contain" />
          <Text style={styles.boldText}>Su clave ha sido solicitada correctamente</Text>
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
    outlineStyle: 'none',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
    width: '30%',
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: "center"
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
      backgroundColor: 'transparent',
    },
});

export default GenerarClave;
