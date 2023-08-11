import { Text, StyleSheet, View, SafeAreaView } from 'react-native'
import React, { Component } from 'react'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Background } from '../../components/Background'
import styles  from './styles'
import {Feather} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'

export default function Profile(){

  const [loading, setLoading] = useState(true)
  const [fullname, setFullName] = useState('')
  const [sex, setSex] = useState('')
  const [age, setAge] = useState('')
  const [situation, setSituation] = useState(Boolean)

  const navigation = useNavigation()

  const userId = async () => {
    const user = (await supabase.auth.getUser()).data.user?.id
    return user
  }

  useEffect(() => {
    getProfile() // Call the getProfile function once when the component mounts
  }, []) 


  async function getProfile() {
    try {
      setLoading(true)
      
      const id = await userId()
      console.log(id)
      let { data, error, status } = await supabase
        .from('profiles')
        .select("*")
        .eq('id', id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullName(data.full_name)
        setSex(data.sexo)
        setAge(data.idade)
        setSituation(data.isMatriculaActive)
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  } 

    return (
      <Background>
      <SafeAreaView style={styles.container}> 
          <View style={styles.flexRow} >
          <Feather name='arrow-left' style={styles.iconBack} onPress={()=> navigation.navigate('home')}/>
            <Text style={styles.textBtn}>
            
              Seu <Text style={styles.textWhite}>Perfil</Text>
            </Text>
          </View>
          
      </SafeAreaView>
      <View style={styles.verticallySpaced}>
        <Feather name="user" style={styles.userIcon}/>
        <View>
          <Text style={styles.fullName}>{fullname}</Text>
          <Text style={styles.situation}>Situação: {situation === true ? 'Ativo' : 'Não Ativo'}</Text>
        </View>
      </View>
      </Background>
    )
  }
