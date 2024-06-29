import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TextInput, Pressable, Modal } from 'react-native';
import { Link, useNavigate } from 'react-router-native';

const screenWidth = Dimensions.get('window').width;

const LoginInspector = () => {

  const navigate = useNavigate();

  const [modalErrorVisible, setModalErrorVisible] = useState(false);

  const handleCloseModal = () => {
    setModalErrorVisible(false);
  };


  const [formData, setFormData] = useState({
    legajo: '',
    password: ''
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
  try {
    const response = await fetch('http://localhost:8080/api/personal/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({legajo:formData.legajo, password:formData.password})
    });
        const responseData = await response.json();
        if (responseData.message === "Usuario no encontrado"){
          setModalErrorVisible(true);
        } else{
          await AsyncStorage.setItem('userDni', responseData.documento);
          await AsyncStorage.setItem('legajoInspector', responseData.legajo);
          console.log(responseData.legajo);
          navigate(`/inspector/${formData.legajo}`)
        }
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
        placeholder="Legajo"
        placeholderTextColor="darkgrey"
        textAlign="center"
        selectionColor="transparent"
        name="legajo"
        value={formData.legajo}
        onChangeText={(text) => handleInputChange({ target: { name: 'legajo', value: text } })}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="darkgrey"
        secureTextEntry={true}
        textAlign="center"
        selectionColor="transparent"
        name="password"
        value={formData.password}
        onChangeText={(text) => handleInputChange({ target: { name: 'password', value: text } })}
      />
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Entrar</Text>
      </Pressable>
      <Link to="/buscarprom">
        <Text style={styles.linkText}>Entrar como invitado</Text>
      </Link>
      <Link to="/loginvecino">
        <Text style={styles.linkText}>Entrar como vecino</Text>
      </Link>
      <Link to="/generarclave">
        <Text style={styles.linkText}>Generar clave como vecino</Text>
      </Link>

      <Modal
        visible={modalErrorVisible}
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalErrorContainer}>
          <View style={styles.redModal}>
            <Text style={styles.modalErrorText}>Los datos son incorrectos</Text>
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
      fontWeight: 'bold', // Bold text for better readability
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
        top: 20, // Ajusta según sea necesario para que esté bien alineado
        left: 20,
      },
      arrowImage: {
        width: 24, // Ajusta el tamaño de la flecha según sea necesario
        height: 24,
      },
      redModal: {
        backgroundColor: '#EC5454', // Fondo rojo semi-transparente
        width: '80%',
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
      },
      modalErrorContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 22,
      },
      modalErrorText: {
        color: 'white',
        fontSize: 16,
      },
      closeIcon: {
        width: 24,
        height: 24,
      },
      closeErrorButton: {
        position: 'absolute',
        top: 20,
        right: 50,
        zIndex: 1,
      },
  });

export default LoginInspector;
