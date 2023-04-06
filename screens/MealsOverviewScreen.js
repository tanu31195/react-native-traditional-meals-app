import { useLayoutEffect } from "react";
// import { MEALS, CATEGORIES } from "../data/dummy-data";
import MealsList from "../components/MealsList/MealsList";
import useFetch from "../hook/useFetch";
import NoDataMessage from "../components/NoDataMessage";
import { MESSAGES } from "../constants/messages";

export default function MealsOverviewScreen({ route, navigation }) {
  const categoryId = route.params.categoryId;

  const { data: MEALS, isLoading, error } = useFetch("meals", {});
  const { data: CATEGORIES } = useFetch("categories", {});

  const categoryMeals = MEALS.filter((meal) => {
    return meal.categoryIds.indexOf(categoryId) >= 0;
  });

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === categoryId
    )?.title;

    navigation.setOptions({ title: categoryTitle });
  }, [categoryId, navigation]);

  if (categoryMeals.length === 0) {
    return <NoDataMessage>{MESSAGES.NO_CATEGORY_MEALS}</NoDataMessage>;
  }

  return <MealsList items={categoryMeals} />;
}
