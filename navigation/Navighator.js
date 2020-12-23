import React from "react";
import { Platform, Text } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
// import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { CATEGORIES } from "../data/dummy-data";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from "../screens/FiltersScreen";
import Colors from "../constants/Colors";
import { MEALS } from "../data/dummy-data";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
  },
  headerTintColor: "white",
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  // headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
  headerTitle: "A Screen",
};

const Stark = createStackNavigator();
const Starrk = createStackNavigator();

const Meal = () => (
  <Stark.Navigator screenOptions={defaultStackNavOptions}>
    <Stark.Screen
      name="Meal"
      component={CategoriesScreen}
      options={({ navigation }) => {
        return {
          headerTitle: "Meal Categories",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName="ios-menu"
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
        };
      }}
    />
    <Stark.Screen
      name="CategoryMeals"
      component={CategoryMealsScreen}
      options={({ route }) => {
        console.log(route.params);
        const catId = route.params.categoryId;
        const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);
        return {
          headerTitle: selectedCategory.title,
        };
      }}
    />
    <Stark.Screen
      name="MealDetail"
      component={MealDetailScreen}
      options={({ route }) => {
        const mealId = route.params.mealId;
        const selectedMeal = MEALS.find((meal) => meal.id === mealId);
        return {
          headerTitle: selectedMeal.title,
        };
      }}
    />
  </Stark.Navigator>
);

const FavNav = () => (
  <Starrk.Navigator screenOptions={defaultStackNavOptions}>
    <Starrk.Screen
      name="Fav"
      component={FavoritesScreen}
      options={{
        headerTitle: "Favorite Meal",
        headerStyle: {
          backgroundColor: Colors.accentColor,
        },
      }}
    />
    <Starrk.Screen
      name="Meal Detail"
      component={MealDetailScreen}
      options={() => ({
        headerStyle: {
          backgroundColor: Colors.accentColor,
        },
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Menu"
              iconName="ios-menu"
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          </HeaderButtons>
        ),
      })}
    />
  </Starrk.Navigator>
);

const BottomTab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();

const TabNav = () => (
  <Tab.Navigator
    //If focused variable is used
    // tabBarOptions={{
    //   activeTintColor: "tomato",
    //   inactiveTintColor: "gray",
    // }}
    //If focused variable is not used
    // activeTintColor="white"
    // inactiveColor="blue"
    shifting={true}
    // barStyle={{
    //   backgroundColor: Colors.primaryColor,
    // }}
  >
    <Tab.Screen
      name="Home"
      component={Meal}
      options={{
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons name="ios-restaurant" size={25} color={tabInfo.color} />
          );
        },
        tabBarColor: Colors.primaryColor,
        tabBarLabel:
          Platform.OS === "android" ? (
            <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>
          ) : (
            "Meals"
          ),
      }}
    />
    <Tab.Screen
      name="Fave"
      component={FavNav}
      options={{
        tabBarIcon: (tabInfo) => {
          return <Ionicons name="ios-star" size={25} color={tabInfo.color} />;
        },
        tabBarColor: Colors.accentColor,
        tabBarLabel:
          Platform.OS === "android" ? (
            <Text style={{ fontFamily: "open-sans-bold" }}>Favorites</Text>
          ) : (
            "Favorites"
          ),
      }}
    />
  </Tab.Navigator>
);

const MealFilter = () => (
  <Stark.Navigator screenOptions={defaultStackNavOptions}>
    <Stark.Screen
      name="Filter"
      component={FiltersScreen}
      initialParams={{ save: {} }}
      options={({ route, navigation }) => {
        return {
          headerTitle: "Filter Meals",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName="ios-menu"
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
          // headerRight: () => (
          //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
          //     <Item
          //       title="Save"
          //       iconName="ios-save"
          //       // onPress={route.params.saves}
          //     />
          //   </HeaderButtons>
          // ),
        };
      }}
    />
  </Stark.Navigator>
);

const Drawer = createDrawerNavigator();

const MealDrawer = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="MealTab" component={TabNav} />
    <Drawer.Screen name="Filter" component={MealFilter} />
  </Drawer.Navigator>
);

export default MealDrawer;
