import { StyleSheet } from "react-native"
import { THEME } from "../../theme"

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    exerciseContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
        
        
       
        
    },
    exerciseText: {
        fontFamily: THEME.FONT_FAMILY.BOLD,
        marginHorizontal: 10
        
    },
    innerExerciseText:{
        color: '#232323',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        marginVertical: 30,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10
    },
    heading:{
        fontFamily: THEME.FONT_FAMILY.BOLD,
        color: 'gold'
    },

    header:{
        width: '100%',
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: 'black',
        fontFamily: THEME.FONT_FAMILY.BOLD,
        color: 'gold'
        
    }
})

export default styles