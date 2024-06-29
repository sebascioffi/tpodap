import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TextInput, Pressable } from 'react-native';
import { Modal } from 'react-native';
import { Link, useNavigate, useParams } from 'react-router-native';

const screenWidth = Dimensions.get('window').width;

const VecinoRegistrado = () => {

  const navigate = useNavigate();
  const { dni } = useParams();

  const [modalErrorVisible, setModalErrorVisible] = useState(false);
  const [modalError2Visible, setModalError2Visible] = useState(false);
  const [modalError3Visible, setModalError3Visible] = useState(false);
  const [modalError4Visible, setModalError4Visible] = useState(false);
  const [modalExitoVisible, setModalExitoVisible] = useState(false);


  const [formData, setFormData] = useState({
    contraseña: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
};

const handleSubmit = async (event) => {
  if (formData.contraseña == ""){
    setModalError2Visible(true)
  } else{
    event.preventDefault();
    try {
      const response2 = await fetch('http://localhost:8080/api/usuario/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({dni:dni, password:formData.contraseña})
        });
            const responseData2 = await response2.json();
            if (responseData2.status === 200){
              console.log(responseData2);
              await AsyncStorage.setItem('userDni', dni);
              if (!responseData2.user.claveGenerada){
               setModalExitoVisible(true);
              } else{
               navigate(`/vecino/${dni}`)
              }
             }
            
             if (responseData2.status === 403){
              setModalError4Visible(true)
           }
            if (responseData2.status === 404){
              setModalError3Visible(true)
            }
            if (responseData2.status === 401){
                setModalErrorVisible(true)
              }
  } catch (error) {
      console.error("Error:", error);
  }
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
        placeholder="Contraseña"
        placeholderTextColor="darkgrey"
        textAlign="center"
        secureTextEntry={true} 
        selectionColor="transparent"
        name="contraseña"
        value={formData.contraseña}
        onChangeText={(text) => handleInputChange({ target: { name: 'contraseña', value: text } })}
      />
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Entrar</Text>
      </Pressable>
      <Link to="/introducirContraseña">
        <Text style={styles.linkText}>Olvidé mi clave</Text>
      </Link>

      <Modal
        visible={modalErrorVisible}
        transparent={true}      >
        <View style={styles.modalErrorContainer}>
          <View style={styles.redModal}>
            <Text style={styles.modalErrorText}>Contraseña Incorrecta</Text>
          </View>
          <Pressable onPress={() => setModalErrorVisible(false)} style={styles.closeErrorButton}>
            <Image source={require('../imagenes/cerrar.png')} style={styles.closeIcon} />
          </Pressable>
        </View>
      </Modal>
      <Modal
        visible={modalError2Visible}
        transparent={true}      >
        <View style={styles.modalErrorContainer}>
          <View style={styles.redModal}>
            <Text style={styles.modalErrorText}>Debes completar todos los datos</Text>
          </View>
          <Pressable onPress={() => setModalError2Visible(false)} style={styles.closeErrorButton}>
            <Image source={require('../imagenes/cerrar.png')} style={styles.closeIcon} />
          </Pressable>
        </View>
      </Modal>
      <Modal
        visible={modalError3Visible}
        transparent={true}      >
        <View style={styles.modalErrorContainer}>
          <View style={styles.redModal}>
            <Text style={styles.modalErrorText}>Vecino no encontrado</Text>
          </View>
          <Pressable onPress={() => setModalError3Visible(false)} style={styles.closeErrorButton}>
            <Image source={require('../imagenes/cerrar.png')} style={styles.closeIcon} />
          </Pressable>
        </View>
      </Modal>
      <Modal
        visible={modalError4Visible}
        transparent={true}      >
        <View style={styles.modalErrorContainer}>
          <View style={styles.redModal}>
            <Text style={styles.modalErrorText}>Vecino no habilitado</Text>
          </View>
          <Pressable onPress={() => setModalError4Visible(false)} style={styles.closeErrorButton}>
            <Image source={require('../imagenes/cerrar.png')} style={styles.closeIcon} />
          </Pressable>
        </View>
      </Modal>
      <Modal
        visible={modalExitoVisible}
        transparent={false}
      >
        <View style={styles.modalExitoContainer}>
        <Pressable onPress={() => navigate(-1)} style={styles.backArrow}>
        <Image
          source={require('../imagenes/volver.png')} 
          style={styles.arrowImage}
        />
        </Pressable>
          <Image source={require("../imagenes/correcto.png")} resizeMode="contain" />
          <Text style={styles.boldText}>Debes cambiar tu clave para ingresar</Text>
          <Link to={`/generarContraseña/${dni}`} component={Pressable} style={[styles.buttonaceptar, styles.acceptButton]}>
          <Text style={styles.buttonText}>Aceptar</Text>
        </Link>
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
  buttonaceptar: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    borderRadius: 25, // More rounded corners for a modern look
    shadowColor: '#000', // Adding shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  acceptButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: "bold",
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
    modalExitoContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5', // Softer background color
    },
      boldText: {
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
      },
    acceptButton: {
      backgroundColor: 'green',
      marginRight: 10,
    },
});

export default VecinoRegistrado;
