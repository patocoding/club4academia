import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { StyleSheet, View, Alert, TouchableOpacity,Text } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { Session } from '@supabase/supabase-js'
import { THEME } from '../../theme'
import { useNavigation,NavigationContainer} from '@react-navigation/native'




export default function Account() {
  const [loading, setLoading] = useState(true)
  const [fullname, setFullName] = useState('')
  const [sex, setSex] = useState('')
  const [age, setAge] = useState('')

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
        .select(`full_name, sexo, idade`)
        .eq('id', id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullName(data.full_name)
        setSex(data.sexo)
        setAge(data.idade)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    full_name,
    sexo,
    idade,
  }: {
    full_name: string
    sexo: string
    idade: string
  }) {
    try {
      setLoading(true)

      const updates = {
        id: userId,
        full_name,
        sexo,
        idade,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
  
        <View style={styles.container}>
      <View style={styles.verticallySpaced}>
        <Input label="Nome completo" value={fullname || ''} inputStyle={styles.input} onChangeText={(text) => setFullName(text)} />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Sexo" value={sex || ''} inputStyle={styles.input} onChangeText={(text) => setSex(text)} />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Idade" value={age || ''} inputStyle={styles.input} onChangeText={(text) => setAge(text)} />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TouchableOpacity
          style={styles.btnSignIn}
          onPress={() => {updateProfile({ full_name: fullname, sexo: sex, idade: age }); }}
          disabled={loading}
        >
            <Text style={styles.textBtn}>{loading ? 'Carregando ...' : 'Atualizar Informações'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.verticallySpaced}>
        <TouchableOpacity style={styles.btnSignUp} onPress={() => navigation.navigate('home')}>
            <Text style={styles.textBtn}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    color: 'white', // Cor do texto do input (por exemplo, 'blue')
  },
  label:{
    color: 'gold'
  },
  icon: {
    color: 'gold',
    marginRight:10
  },
  logo:{
    width:120,
    height: 120,
    marginTop: 74    
  },
  horizontally: {
    display: "flex",
    justifyContent: "center",
    marginHorizontal:"auto",
    alignItems: "center",
  },
  btnSignIn:{
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10
  },
  btnSignUp:{
    backgroundColor: 'gold',
    padding: 10,
    borderRadius: 10
  },
  textBtn: {
    color: 'white',
    textAlign: 'center',
    fontFamily: THEME.FONT_FAMILY.BLACK
  }
})