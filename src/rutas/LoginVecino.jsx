import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TextInput, Pressable } from 'react-native';
import { Modal } from 'react-native';
import { Link, useNavigate } from 'react-router-native';

const screenWidth = Dimensions.get('window').width;

const LoginVecino = () => {

  const navigate = useNavigate();

  const [modalError2Visible, setModalError2Visible] = useState(false);
  const [modalError3Visible, setModalError3Visible] = useState(false);
  const [modalMailVisible, setModalMailVisible] = useState(false);
  const [modalExitoVisible, setModalExitoVisible] = useState(false);


  const [formData, setFormData] = useState({
    dni: '',
    email: ''
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
};

const handleSubmit = async (event) => {
  if (formData.dni === "" || formData.email === "") {
    setModalError2Visible(true);
  } else if (!validateEmail(formData.email)) {
    setModalMailVisible(true);
  } else {
    event.preventDefault();
    try {
      const response2 = await fetch('http://localhost:8080/api/usuario/solicitudClave', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({dni:formData.dni, email:formData.email})
        });
            const responseData2 = await response2.json();
            console.log(responseData2);
            if (responseData2.message === "Created!"){
              setModalExitoVisible(true)
            }
            if (responseData2.message === "Vecino Inexistente"){
              setModalError3Visible(true)
            }
            if (responseData2.message === "Vecino ya registrado"){
              navigate(`/vecinoRegistrado/${formData.dni}`);
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
        placeholder="Email"
        placeholderTextColor="darkgrey"
        textAlign="center"
        selectionColor="transparent"
        name="email"
        value={formData.email}
        onChangeText={(text) => handleInputChange({ target: { name: 'email', value: text } })}
      />
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Entrar</Text>
      </Pressable>
      <Link to="/buscarprom">
        <Text style={styles.linkText}>Entrar como invitado</Text>
      </Link>
      <Link to="/generarclave">
        <Text style={styles.linkText}>Generar clave</Text>
      </Link>

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
        visible={modalMailVisible}
        transparent={true}      >
        <View style={styles.modalErrorContainer}>
          <View style={styles.redModal}>
            <Text style={styles.modalErrorText}>Email inválido</Text>
          </View>
          <Pressable onPress={() => setModalMailVisible(false)} style={styles.closeErrorButton}>
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
          <Text style={styles.boldText}>Tu solicitud fue creada correctamente. Te enviaremos la clave cuando esté aprobada.</Text>
          <Link to={`/introducirContraseña`} component={Pressable} style={[styles.buttonaceptar, styles.acceptButton]}>
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
    },
});

export default LoginVecino;
