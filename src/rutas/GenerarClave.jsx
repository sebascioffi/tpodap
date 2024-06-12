import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TextInput, Pressable, Modal } from 'react-native';
import { Link, useNavigate } from 'react-router-native';

const screenWidth = Dimensions.get('window').width;

const GenerarClave = () => {
  const navigate = useNavigate();

  const [modalExitoVisible, setModalExitoVisible] = useState(false);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);
  const [modalError2Visible, setModalError2Visible] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    apellido: '',
    dni: '',
    direccion: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
};

const handleSubmit = async (event) => {
    if (formData.name == "" || formData.dni == "" || formData.apellido == "" || formData.direccion == "" || formData.password == ""){
      setModalErrorVisible(true);
    } else {
      event.preventDefault();
      try {
  
        const response = await fetch('http://localhost:8080/api/usuario/solicitudClave', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({nombre: formData.name, dni:formData.dni, apellido:formData.apellido, direccion:formData.direccion})
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Something went wrong');
        }
        const responseData = await response.json();
  
        const response2 = await fetch('http://localhost:8080/api/usuario/generarClave', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({dni:formData.dni, password:formData.password})
      });
            const responseData2 = await response2.json();
            if (responseData.message == "Created!"){
              setModalExitoVisible(true);
            }
    } catch (error) {
      if (error.message === 'Error in solicitudClave Service') {
        setModalError2Visible(true);
      } else {
        console.error(error);
      }
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
        placeholder="Apellido"
        placeholderTextColor="darkgrey"
        textAlign="center"
        selectionColor="transparent"
        name="apellido"
        value={formData.apellido}
        onChangeText={(text) => handleInputChange({ target: { name: 'apellido', value: text } })}
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

        <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="darkgrey"
        textAlign="center"
        selectionColor="transparent"
        name="password"
        secureTextEntry={true}
        value={formData.password}
        onChangeText={(text) => handleInputChange({ target: { name: 'password', value: text } })}
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
          <Text style={styles.boldText}>Su clave ha sido generada correctamente</Text>
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
      <Modal
        visible={modalError2Visible}
        transparent={true}
      >
        <View style={styles.modalErrorContainer}>
          <View style={styles.redModal}>
            <Text style={styles.modalErrorText}>Ya has generado tu clave</Text>
          </View>
          <Pressable onPress={() => setModalError2Visible(false)} style={styles.closeErrorButton}>
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
