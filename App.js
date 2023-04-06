import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";

import CategoriesScreen from "./screens/CategoriesScreen";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import EmergencyContactScreen from "./screens/EmergencyContactScreen";
import FavoritesContextProvider from "./store/context/favorites-context";
import { store } from "./store/redux/store";
import { COLORS } from "./constants";
import { SCREENS } from "./constants/messages";
import AboutScreen from "./screens/AboutScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#FAA249" },
        headerTintColor: COLORS.tertiary,
        sceneContainerStyle: { backgroundColor: COLORS.primary },
        drawerContentStyle: { backgroundColor: COLORS.primary },
        drawerInactiveTintColor: COLORS.tertiary,
        drawerActiveTintColor: COLORS.tertiary,
        drawerActiveBackgroundColor: "#FCBAB4",
      }}
    >
      <Drawer.Screen
        name={SCREENS.EMERGENCY.name}
        component={EmergencyContactScreen}
        options={{
          title: SCREENS.EMERGENCY.title,
          drawerIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name='call-outline' />
          ),
        }}
      />
      <Drawer.Screen
        name={SCREENS.FOOD_DRINKS.name}
        component={CategoriesScreen}
        options={{
          title: SCREENS.FOOD_DRINKS.title,
          drawerIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name='restaurant-outline' />
          ),
        }}
      />
      <Drawer.Screen
        name={SCREENS.FAVORITES.name}
        component={FavoritesScreen}
        options={{
          title: SCREENS.FAVORITES.title,
          drawerIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name='star' />
          ),
        }}
      />
      <Drawer.Screen
        name={SCREENS.ABOUT.name}
        component={AboutScreen}
        options={{
          title: SCREENS.ABOUT.title,
          drawerIcon: ({ color, size }) => (
            <Ionicons
              color={color}
              size={size}
              name='information-circle-outline'
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style='dark' />
      {/* <FavoritesContextProvider> */}
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: COLORS.secondary },
              headerTintColor: COLORS.tertiary,
              contentStyle: { backgroundColor: COLORS.primary },
            }}
          >
            <Stack.Screen
              // name='MealCategories'
              // component={CategoriesScreen}
              name='Drawer'
              component={DrawerNavigator}
              options={{
                // title: "All Categories",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={SCREENS.MEALS_OVERVIEW.name}
              component={MealsOverviewScreen}
              options={{
                title: SCREENS.MEALS_OVERVIEW.title,
              }}
            />
            <Stack.Screen
              name={SCREENS.MEAL_DETAIL.name}
              component={MealDetailScreen}
              options={{
                title: SCREENS.MEAL_DETAIL.title,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      {/* </FavoritesContextProvider> */}
    </>
  );
}
