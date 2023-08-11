import React, { useEffect, useState } from 'react';
import { View,Text, SafeAreaView, TouchableOpacity } from 'react-native';

import  styles  from './styles';
import { supabase } from '../../lib/supabase';
import { Background } from '../../components/Background';
import { useNavigation } from '@react-navigation/native';

export function Trainings() {

    const [exercises, setExercises] = useState<any[]>([])
    const [trainingId, setTrainingId] = useState<string | null>(null);
    const userId = async () => {
        const user = (await supabase.auth.getUser()).data.user?.id
        return user
      }
    
    const navigation = useNavigation();
    
    useEffect(() => {
      getTrainings()  
    }, [])

    function handleTrainingPress(trainingId: string) {
        navigation.navigate('exercises', { trainingId });
      }
    

    async function getTrainings() {
        const id = await userId();
        const {data, error} = await 
        supabase
        .from('trainings')
        .select('id,exercises')
        .eq('user_id', id)
        if (data) {
            const updatedExercises = data.map((item: any) => ({
                trainingId: item.id,
                exercises: item.exercises
              }));
              setExercises(updatedExercises);
              console.log(data)
        }
        if (error) {
            console.log(error)
        }
    }

  return (  
    <Background>
            <View style={styles.container}>
                <View>
                    <Text style={styles.header}>Meus Treinos</Text>
                </View>
                {exercises.map((exerciseList, index) => (
                <TouchableOpacity key={index} style={styles.exerciseContainer} onPress={() => handleTrainingPress(exerciseList.trainingId)}>
                    
                    <Text style={styles.heading}>Começar treino {index + 1}:</Text>
                    <View style={styles.innerExerciseText}>
                    {exerciseList.exercises.map((exercise: any, exerciseIndex: any) => (
                    <Text key={exerciseIndex} style={styles.exerciseText}>
                         {exercise}
                    </Text>
                        ))}
                       
                    </View>
                </TouchableOpacity>
        
        ))}
            </View>
       
            </Background>
  );
}