import React, { useState, useEffect } from 'react';
import { Text,View, TextInput, Button ,Alert,FlatList   } from 'react-native';
import { supabase } from '../../lib/supabase'


export default function ExerciseInput() {
    const [exerciseText, setExerciseText] = useState('');
    const [exercises, setExercises] = useState<string[]>([]);
    const [users, setUsers] = useState<{ id: number; full_name: string }[]>([]);
    const [instructor, setInstructor] = useState('');
    const [selectedUser, setSelectedUser] = useState<{ id: number; full_name: string } | null>(null);
  
    const addExercise = () => {
      if (exerciseText.trim() !== '') {
        setExercises([...exercises, exerciseText]);
        setExerciseText('');
      }
    };

    useEffect(() => {
        fetchUsers();
      }, []);
      const fetchUsers = async () => {
        try {
          const { data, error } = await supabase.from('profiles').select('id, full_name');
    
          if (error) {
            console.error('Error fetching users:', error.message);
          } else {
            setUsers(data);
          }
        } catch (error : any) {
          console.error('Error fetching users:', error.message);
        }
      };
    
  
    const submitExercises = async () => {
      try {
        const { data, error } = await supabase
          .from('trainings')
          .upsert([
            {
              // Provide the appropriate data for your table
              exercises: exercises,
            },
          ]);
        if (error) {
          console.error('Error adding exercises:', error.message);
        } else {
          console.log('Exercises added successfully:', data);
          setExercises([]); // Clear the exercises array
        }
      } catch (error : any) {
        console.error('Error submitting exercises:', error.message);
      }
    };

    
  const submitTraining = async () => {
    try {
      const { data, error } = await supabase.from('trainings').upsert([
        {
          user_id: selectedUser.id,
          instructor: instructor,
          exercises: exercises,
        },
      ]);

      if (error) {
        console.error('Error creating training:', error.message);
        Alert.alert('Error creating training');
      } else {
        console.log('Training created successfully:', data);
        Alert.alert('Training created successfully');
        // Clear form data
        setSelectedUser(null);
        setInstructor('');
        setExercises([]);
      }
    } catch (error: any) {
      console.error('Error creating training:', error.message);
      Alert.alert('Error creating training');
    }
  };
  
    return (
        <View>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Button
              title={item.full_name}
              onPress={() => setSelectedUser(item)}
              disabled={selectedUser ? selectedUser.id === item.id : false}
            />
          )}
        />
        {selectedUser && <Text>Selected user: {selectedUser.name}</Text>}
        <TextInput
          placeholder="Instructor"
          value={instructor}
          onChangeText={(text) => setInstructor(text)}
        />
        <TextInput
          placeholder="Enter exercise"
          value={exerciseText}
          onChangeText={(text) => setExerciseText(text)}
        />
        <Button title="Add Exercise" onPress={addExercise} />
        <Button title="Submit Training" onPress={submitTraining} />
      </View>
    );
  }