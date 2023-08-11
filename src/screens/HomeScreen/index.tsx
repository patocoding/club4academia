import React from 'react';
import { View, ImageBackground, TouchableOpacity,Text, Button} from 'react-native';
import Tabs from 'react-native-tabs'
import logoImg from '../../assets/Logo-club4.png'

import { styles } from './styles';
import { Heading } from '../../components/Heading';

import workoutWoman from '../../assets/workout-woman.png'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import Header from '../../components/Header';
import { supabase } from '../../lib/supabase';
import { THEME } from '../../theme';
import ExerciseInput from '../../components/ExerciseInput';
import InfiniteDateComponent from '../../components/Calendar';

import { useNavigation } from '@react-navigation/native';

export function HomeScreen() {

  const navigation = useNavigation()


  return (
    <Background>
      <SafeAreaView style={styles.safeArea}>
      <Header/>
      <View style={styles.container}>
      

      <InfiniteDateComponent/>
      <Heading title="Próximo treino" subtitle=''/>
      
       <View>
        
      <TouchableOpacity onPress={() => navigation.navigate('trainings')}>
        <View style={styles.imageWrapper}>
          <ImageBackground style={styles.theImage} source={workoutWoman}>
            <View style={styles.insideTextView}>
              <Text style={styles.texts}>Acessar meu treino</Text>
            </View>
          </ImageBackground>
        </View>   
      </TouchableOpacity>
      
    </View>
    </View>
    <View>
    
    </View>
      </SafeAreaView>
    </Background>
    
  );
}