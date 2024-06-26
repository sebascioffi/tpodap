import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TextInput, Pressable } from 'react-native';
import { Modal } from 'react-native';
import { Link, useNavigate, useParams } from 'react-router-native';

const screenWidth = Dimensions.get('window').width;

const GenerarContraseña = () => {

  const navigate = useNavigate();
  const { dni } = useParams();

  const [modalErrorVisible, setModalErrorVisible] = useState(false);
  const [modalError2Visible, setModalError2Visible] = useState(false);
  const [modalError3Visible, setModalError3Visible] = useState(false);

  const [formData, setFormData] = useState({
    clave: '',
    reclave: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
};

const handleSubmit = async (event) => {
  if (formData.clave == "" || formData.reclave == ""){
    setModalError2Visible(true)
  }
  else if (formData.clave != formData.reclave){
    setModalErrorVisible(true)
  } 
  else{
    event.preventDefault();
    try {
      const response2 = await fetch('http://localhost:8080/api/usuario/generarClave', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({dni:dni, password:formData.clave})
        });
            const responseData2 = await response2.json();
            console.log(responseData2);
            if (responseData2.message === "Created!"){
                navigate(`/vecino/${dni}`);
            }
            if (responseData2.message === "Vecino no registrado"){
              setModalError3Visible(true)
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
        placeholder="Nueva Clave"
        placeholderTextColor="darkgrey"
        secureTextEntry={true} 
        textAlign="center"
        selectionColor="transparent"
        name="clave"
        value={formData.clave}
        onChangeText={(text) => handleInputChange({ target: { name: 'clave', value: text } })}
      />
      <TextInput
        style={styles.input}
        placeholder="Repita nueva clave"
        placeholderTextColor="darkgrey"
        secureTextEntry={true} 
        textAlign="center"
        selectionColor="transparent"
        name="reclave"
        value={formData.reclave}
        onChangeText={(text) => handleInputChange({ target: { name: 'reclave', value: text } })}
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
        visible={modalErrorVisible}
        transparent={true}      >
        <View style={styles.modalErrorContainer}>
          <View style={styles.redModal}>
            <Text style={styles.modalErrorText}>Las claves no coinciden</Text>
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
    color: 'black',
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
  buttonaceptar: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
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
      backgroundColor: 'transparent',
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

export default GenerarContraseña;
