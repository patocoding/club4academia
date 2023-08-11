import { StyleSheet } from "react-native"
import { THEME } from "../../theme"

const styles = StyleSheet.create({
    yourProfileView:{
        marginTop: 20,
        width: "100%"
    },
    container: {
        marginTop: 40,
        padding: 12,
        backgroundColor: '#232323'
      },
      textBtn: {
        color: 'gold',
        textAlign: 'center',
        fontFamily: THEME.FONT_FAMILY.BLACK,
        marginLeft: 20
      },
      iconBack:{
        color: 'white',
        fontSize: 16,
      },
      verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
        width:'100%'
      },
      userIcon:{
        fontSize:160,
        textAlign: 'center',
        color:'white',
        marginTop: 20
      },
      fullName:{
        fontFamily: THEME.FONT_FAMILY.BLACK,
        color: 'white',
        textAlign: 'center',
        marginTop: 30
      }
      ,
      textWhite: {
        color: 'white',
      },
      flexRow:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      },
      situation: {
        color: 'gold',
        textAlign: 'center',
        fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
        marginTop: 20
      }
})

export default styles