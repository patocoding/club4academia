import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
    safeArea: {
      flex: 1,
    },
    imageWrapper: {
      height: 70,
      width: 300,
      overflow : "hidden",
      borderRadius: 10,
      shadowOffset: {width: -2, height: 4},
    shadowOpacity: 1,
    shadowRadius: 3,
      shadowColor : "#171717",
  },
  theImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    
},
insideTextView:{
  paddingTop: 10,
  paddingLeft: 10
},
  logo:{
    width:120,
    height: 120,
    marginTop: 74,
    marginBottom: 48
  },

  texts:{
    color: THEME.COLORS.TEXT,
    fontSize: THEME.FONT_SIZE.LG,
    fontFamily: THEME.FONT_FAMILY.BLACK
  },

  workoutImg:{
    borderRadius: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
        
    
  }
});