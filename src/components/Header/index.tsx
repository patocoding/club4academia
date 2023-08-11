import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, Text, StyleSheet, Button } from 'react-native';
import { Feather, } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import Ionicons from '@expo/vector-icons/Ionicons';
import { Background } from '../Background';
import { THEME } from '../../theme';
import { supabase } from '../../lib/supabase';


const Header = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  return (
      <View style={styles.container}>
      <TouchableOpacity onPress={openModal}>
        <Feather name="menu" size={24} color="yellow" />
      </TouchableOpacity>
      <Text style={styles.headerTxt}>Bem vindo</Text>

      <Modal
        animationType="slide"
        
        visible={modalVisible}
        onRequestClose={closeModal}
      >
       <TouchableOpacity onPress={closeModal}>
        <Ionicons name="close-circle" size={32} color="gold" />
       </TouchableOpacity>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}></Text>
          <Button title='account'  />
          
        </View>
        <View >
        <Button title="Sair" onPress={() => supabase.auth.signOut()} color={THEME.COLORS.SUCCESS} />
      </View>
        
      </Modal>
    </View>

    
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#232323',
  },
  headerTxt:{
    color: 'white',
    fontFamily: THEME.FONT_FAMILY.BLACK
    
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 1r)',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  closeButton: {
    fontSize: 16,
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'blue',
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default Header;