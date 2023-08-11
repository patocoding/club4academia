import { StyleSheet } from "react-native"
import { THEME } from "../../theme"

export const styles = StyleSheet.create({
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