import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { supabase } from '../../lib/supabase';

export function AddExercise() {
    type TrainingOption = { label: string; value: string };
    const [exerciseInputs, setExerciseInputs] = useState([{ exercise: '', repetitions: '' }]);
  const [exercise, setExercise] = useState('');
  const [repetitions, setRepetitions] = useState('');
  const [selectedTrainingId, setSelectedTrainingId] = useState('');
  const [userOptions, setUserOptions] = useState<any[]>([]);
  const [trainingOptions, setTrainingOptions] = useState<TrainingOption[]>([]);

 

   useEffect(() => {
    
    fetchUsers()
  }, []);

  useEffect(() => {
    fetchTrainingOptions();
  }, [userOptions]);

  const fetchUsers = async () => {
    try {
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('id, full_name');

      if (usersData) {
        setUserOptions(usersData);
      }

      if (usersError) {
        console.error('Error fetching user options:', usersError.message);
      }
    } catch (error: any) {
      console.error('Error fetching user options:', error.message);
    }
  };

  const fetchTrainingOptions = async () => {
    try {
      const { data: trainingsData, error: trainingsError } = await supabase
        .from('trainings')
        .select('id, user_id');

      if (trainingsData) {
        const options = await Promise.all(
          trainingsData.map(async (training) => {
            const userProfile = userOptions.find((user) => user.id === training.user_id);
            if (userProfile) {
              return {
                label: `Training ID: ${training.id} - ${userProfile.full_name}`,
                value: training.id.toString(),
              };
            }
          })
        );
        setTrainingOptions(options.filter((option) => option !== undefined) as TrainingOption[]);
      }

      if (trainingsError) {
        console.error('Error fetching training options:', trainingsError.message);
      }
    } catch (error: any) {
      console.error('Error fetching training options:', error.message);
    }
  };
  
  const handleAddExercise = async () => {
    if (selectedTrainingId !== '') {
      const newExercises = exerciseInputs.map((input) => ({
        exercise: input.exercise,
        repetitions: parseInt(input.repetitions),
      }));

      const { data, error } = await supabase
        .from('exercises')
        .upsert([
          {
            training_id: selectedTrainingId,
            exercise_name: newExercises,
          },
        ]);

      if (data) {
        console.log('Exercises added successfully');
        setExerciseInputs([{ exercise: '', repetitions: '' }]);
        setSelectedTrainingId('');
      }
      if (error) {
        console.log('Error adding exercises:', error.message);
      }
    }
  };

  return (
    <ScrollView>
      <Text>Add Exercises</Text>
      {exerciseInputs.map((input, index) => (
        <View key={index}>
          <TextInput
            placeholder="Exercise"
            value={input.exercise}
            onChangeText={(text) => {
              const updatedInputs = [...exerciseInputs];
              updatedInputs[index].exercise = text;
              setExerciseInputs(updatedInputs);
            }}
          />
          <TextInput
            placeholder="Repetitions"
            value={input.repetitions}
            onChangeText={(text) => {
              const updatedInputs = [...exerciseInputs];
              updatedInputs[index].repetitions = text;
              setExerciseInputs(updatedInputs);
            }}
            keyboardType="numeric"
          />
        </View>
      ))}
      <Picker
        selectedValue={selectedTrainingId}
        onValueChange={(itemValue) => setSelectedTrainingId(itemValue)}
      >
        <Picker.Item label="Select Training" value="" />
        {trainingOptions.map((option) => (
          <Picker.Item key={option.value} label={option.label} value={option.value} />
        ))}
      </Picker>
      <Button title="Add Exercises" onPress={handleAddExercise} />
      <Button
        title="Add Another Exercise"
        onPress={() => setExerciseInputs([...exerciseInputs, { exercise: '', repetitions: '' }])}
      />
    </ScrollView>
  );
}