import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import * as SplashScreen from "expo-splash-screen";

import CategoriesScreen from "./screens/CategoriesScreen";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import EmergencyContactScreen from "./screens/EmergencyContactScreen";
import AboutScreen from "./screens/AboutScreen";
import FavoritesContextProvider from "./store/context/favorites-context";
import { store } from "./store/redux/store";
import { COLORS } from "./constants";
import { SCREENS } from "./constants/messages";
import Places from "./screens/Places";
import PlaceAdd from "./screens/PlaceAdd";
import IconButton from "./components/UI/IconButton";
import Map from "./screens/Map";
import { useCallback, useEffect, useState } from "react";
import { init } from "./util/database";
import PlaceDetails from "./screens/PlaceDetails";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.secondary },
        headerTintColor: COLORS.tertiary,
        sceneContainerStyle: { backgroundColor: COLORS.primary },
        drawerContentStyle: { backgroundColor: COLORS.primary },
        drawerInactiveTintColor: COLORS.tertiary,
        drawerActiveTintColor: COLORS.tertiary,
        drawerActiveBackgroundColor: COLORS.melon,
      }}
    >
      <Drawer.Screen
        name={SCREENS.PLACES.name}
        component={Places}
        options={({ navigation }) => ({
          title: SCREENS.PLACES.title,
          drawerIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name='earth' />
          ),
          headerRight: ({ tintColor }) => (
            <IconButton
              icon='add'
              size={24}
              color={tintColor}
              onPress={() => navigation.navigate(SCREENS.ADD_PLACE.name)}
            />
          ),
        })}
      />
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
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        init();
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setDbInitialized(true);
      }
    };
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (dbInitialized) {
      await SplashScreen.hideAsync();
    }
  }, [dbInitialized]);

  if (!dbInitialized) return null;

  return (
    <>
      <StatusBar style='dark' />
      {/* <FavoritesContextProvider> */}
      <Provider store={store}>
        <NavigationContainer onReady={onLayoutRootView}>
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
            <Stack.Screen
              name={SCREENS.ADD_PLACE.name}
              component={PlaceAdd}
              options={{
                title: SCREENS.ADD_PLACE.title,
              }}
            />
            <Stack.Screen
              name={SCREENS.MAP.name}
              component={Map}
              options={{
                title: SCREENS.MAP.title,
              }}
            />
            <Stack.Screen
              name={SCREENS.PLACE_DETAIL.name}
              component={PlaceDetails}
              options={{
                title: SCREENS.PLACE_DETAIL.title,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      {/* </FavoritesContextProvider> */}
    </>
  );
}
