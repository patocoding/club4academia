import {NavigationContainer} from '@react-navigation/native'
import { AppRoutes } from './routes'
import Auth from '../screens/Auth'
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';



export const Routes =()=> {
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
  
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
    }, [])

    return(
        <NavigationContainer>
            {session && session.user ? <AppRoutes/> : <Auth />}
        </NavigationContainer>
    )

}