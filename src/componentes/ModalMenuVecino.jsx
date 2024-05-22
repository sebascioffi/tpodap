import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, Dimensions, Pressable, Modal } from 'react-native'
import { Link } from 'react-router-native';

const screenWidth = Dimensions.get('window').width;


const ModalMenuVecino = () => {

    const [menuVisible, setMenuVisible] = useState(false);


  return (
    <>
    <Pressable onPress={() => setMenuVisible(true)} style={styles.menuIcon}>
    <Image
      source={require('../imagenes/menu.png')} // Asegúrate de tener una imagen de menú hamburguesa en tu proyecto
      style={styles.iconImage}
    />
  </Pressable>
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

          <Link to={`/perfil/1`} component={Pressable} style={styles.pressableContainer}>
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
  </>
  )
}

const styles = StyleSheet.create({
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
      iconImage: {
        width: 24, // Ajusta el tamaño del icono según sea necesario
        height: 24,
      },
      modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      textContainer: {
        marginTop: 20, // Ajusta este margen según sea necesario
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
      menuIcon: {
        position: 'absolute',
        top: 20, // Ajusta según sea necesario para que esté bien alineado
        left: 20,
      },
      iconImage: {
        width: 24, // Ajusta el tamaño del icono según sea necesario
        height: 24,
      },
      textItemModal: {
        fontSize: 20,
      }
});

export default ModalMenuVecino

