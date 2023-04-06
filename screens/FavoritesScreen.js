import React, { useContext } from "react";
import { useSelector } from "react-redux";

import MealsList from "../components/MealsList/MealsList";
import { FavoritesContext } from "../store/context/favorites-context";
import { MEALS } from "../data/dummy-data";
import useFetch from "../hook/useFetch";
import { MESSAGES } from "../constants/messages";
import NoDataMessage from "../components/NoDataMessage";

export default function FavoritesScreen() {
  // const favoriteMealsContext = useContext(FavoritesContext);
  const favoriteMealsIds = useSelector((state) => state.favoriteMeals.ids);

  const { data: MEALS, isLoading, error } = useFetch("meals", {});

  // const favoriteMeals = MEALS.filter((meal) =>
  const favoriteMeals = MEALS.filter((meal) =>
    // favoriteMealsContext.ids.includes(meal.id)
    favoriteMealsIds.includes(meal.id)
  );

  if (favoriteMeals.length === 0) {
    return <NoDataMessage>{MESSAGES.NO_FAVORITES}</NoDataMessage>;
  }
  return <MealsList items={favoriteMeals} />;
}
