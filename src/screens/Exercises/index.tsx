import React, { useEffect, useState } from 'react';
import { View,Text } from 'react-native';

import  styles  from './styles';
import { useRoute, RouteProp     } from '@react-navigation/native';
import { supabase } from '../../lib/supabase';
import { AddExercise } from '../../components/addExercise';

type RootStackParamList = {
    exercises: { trainingId: string };
  };

  type Exercise = {
    exercise: string;
    repetitions: number;
  };

export function Exercises() {
    const [exercises, setExercises] = useState<any[]>([]);

    const route = useRoute<RouteProp<RootStackParamList, 'exercises'>>();
    const { trainingId } = route.params;
    useEffect(() => {    
        console.log(trainingId)
        getExercises()
      }, [])

    async function getExercises(){
        const { data, error } = await supabase
        .from('exercises')
        .select('exercise_name')
        .eq('training_id', trainingId)

        if (data){
            
            setExercises(data[0]?.exercise_name || []);
            console.log(data)
        }
        if (error){
            console.log(error)
        }
    }
    
   
    

  return (
    <View style={styles.container}>
        
        <Text>{trainingId}</Text>
        <View>
      <Text>Exercises for Training {trainingId}:</Text>
      {exercises.map((exercise, index) => (
        <View key={index}>
          <Text>{exercise.exercise}</Text>
          <Text>Repetições: {exercise.repetitions}</Text>
        </View>
      ))}
    </View>
    <AddExercise/>
        </View>
        
        
    
  );
}