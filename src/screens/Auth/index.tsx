import React, { useState } from 'react'
import { Alert, Text,  View, Image, TouchableOpacity } from 'react-native'
import { supabase } from '../../lib/supabase'
import { Button, Input,  } from 'react-native-elements'
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native'
import { Background } from '../../components/Background'
import logoImg from '../../assets/Logo-club4.png'


export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)



  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      Alert.alert(error.message)
    }
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })
    Alert.alert('conta criada com sucesso')
    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  return (
      <Background>
      <View style={styles.horizontally}>
      <Image 
      source={logoImg}
      style={styles.logo}
      />
      </View>
       <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope', iconStyle: styles.icon  }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="seuemail@address.com"
          autoCapitalize={'none'}
          labelStyle={styles.label}
          inputStyle={ styles.input}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Senha"
          leftIcon={{ type: 'font-awesome', name: 'lock', iconStyle: styles.icon }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Digite sua senha..."
          autoCapitalize={'none'}
          inputStyle={ styles.input}
          labelStyle={styles.label}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TouchableOpacity style={styles.btnSignIn}  disabled={loading} onPress={() => signInWithEmail()} >
          <Text style={styles.textBtn}>Entrar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.verticallySpaced}>
      <TouchableOpacity style={styles.btnSignUp}  disabled={loading} onPress={() => signUpWithEmail()} >
          <Text style={styles.textBtn}>Criar Conta</Text>
        </TouchableOpacity>
      </View>
    </View>
    </Background>
    
   
  )
}

