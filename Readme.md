# back-end

## entidades

### user

id
first name
last name
sexo
idade
isAdmin?
CPF
createdAt
isMatriculado?

###  exercicios

id
name
numeroMaquina
user_id

#### casos de uso

<Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home';
            } else if (route.name === 'Perfil') {
              iconName = focused ? 'person' : 'person';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'gold',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle:{backgroundColor:'#232323'}
        })}

      >
            <Tab.Screen name='Home' component={HomeScreen} options={{headerShown: false}}/>
            <Tab.Screen name='Perfil' component={Profile}/>


        </Tab.Navigator>