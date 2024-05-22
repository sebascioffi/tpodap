import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Modal, Opacity, Pressable } from 'react-native';
import { Link, useParams } from 'react-router-native';
import vecinos from '../ejemploVecinos.js'; // Asegúrate de tener el array de inspectores en este archivo

const screenWidth = Dimensions.get('window').width;

const Vecino = () => {
  const { id } = useParams();
  const vecino = vecinos.find(ins => ins.id === parseInt(id));

  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setMenuVisible(true)} style={styles.menuIcon}>
        <Image
          source={require('../imagenes/menu.png')} // Asegúrate de tener una imagen de menú hamburguesa en tu proyecto
          style={styles.iconImage}
        />
      </Pressable>

      <View style={styles.userContainer}>
        <Image
          source={require('../imagenes/user.png')} // Asegúrate de tener una imagen de usuario en tu proyecto
          style={styles.userImage}
        />
        <Text style={styles.desc}>Vecino {vecino.usuario}</Text>
      </View>

      <Text style={styles.boldText}>Bienvenido Vecino!</Text>

      <Image
        source={require('../imagenes/barrio.png')}
        style={styles.image}
      />

      <Modal
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Pressable onPress={() => setMenuVisible(false)} style={styles.closeIcon}>
              <Image
                source={require('../imagenes/cerrar.png')} // Asegúrate de tener una imagen de cerrar en tu proyecto
                style={styles.iconImage}
              />
            </Pressable>
            <Text style={styles.modalText}>Nombre de Usuario</Text>
            <View style={styles.textContainer}>
              <Pressable onPress={() => setMenuVisible(false)} style={styles.pressableContainer}>
                <>
                <Image
                    source={require("../imagenes/home.png")}
                    style={styles.iconImageModal}
                    />
                <Text style={styles.textItemModal}>Inicio</Text>
                </>
              </Pressable>

              <Link to={`/buscarprom`} component={Pressable} style={styles.pressableContainer}>
                <>
                <Image
                 source={require("../imagenes/lupa.png")}
                 style={styles.iconImageModal}
                 />
                 <Text style={styles.textItemModal}>Buscar Promociones</Text>
                 </>
              </Link>

              <Link to={`/agregarprom`} component={Pressable} style={styles.pressableContainer}>
                <>
                <Image
                 source={require("../imagenes/agregarservicio.png")}
                 style={styles.iconImageModal}
                 />
                 <Text style={styles.textItemModal}>Agregar Promoción</Text>
                 </>
              </Link>

              <Link to={`/reclamos`} component={Pressable} style={styles.pressableContainer}>
                <>
                <Image
                 source={require("../imagenes/reclamos.png")}
                 style={styles.iconImageModal}
                 />
                 <Text style={styles.textItemModal}>Reclamos</Text>
                 </>
              </Link>

              <Link to={`/genreclamo`} component={Pressable} style={styles.pressableContainer}>
                <>
                <Image
                 source={require("../imagenes/genreclamo.png")}
                 style={styles.iconImageModal}
                 />
                 <Text style={styles.textItemModal}>Generar Reclamo</Text>
                 </>
              </Link>

              <Link to={`/denuncias`} component={Pressable} style={styles.pressableContainer}>
                <>
                <Image
                 source={require("../imagenes/denuncias.png")}
                 style={styles.iconImageModal}
                 />
                 <Text style={styles.textItemModal}>Denuncias</Text>
                 </>
              </Link>

              <Link to={`/gendenuncia`} component={Pressable} style={styles.pressableContainer}>
                <>
                <Image
                 source={require("../imagenes/gendenuncia.png")}
                 style={styles.iconImageModal}
                 />
                 <Text style={styles.textItemModal}>Generar Denuncia</Text>
                 </>
              </Link>

              <Link to={`/perfil/${id}`} component={Pressable} style={styles.pressableContainer}>
                <>
                <Image
                 source={require("../imagenes/user.png")}
                 style={styles.iconImageModal}
                 />
                 <Text style={styles.textItemModal}>Mi Perfil</Text>
                 </>
              </Link>

              <Link to={`/`} component={Pressable} style={styles.pressableContainer}>
                <>
                <Image
                 source={require("../imagenes/cerrarsesion.png")}
                 style={styles.iconImageModal}
                 />
                 <Text style={styles.textItemModal}>Cerrar Sesión</Text>
                 </>
              </Link>
            </View>
          </View>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: screenWidth * 0.8,
    height: '100%',
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textContainer: {
    marginTop: 20, // Ajusta este margen según sea necesario
  },
  textItem: {
    fontSize: 16,
    marginVertical: 5, // Espacio entre los textos
  },
  pressableContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Alinea verticalmente en el centro
    marginBottom: 20,
  },
  iconImageModal: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  textItemModal: {
    fontSize: 20,
  }
});

export default Vecino;
