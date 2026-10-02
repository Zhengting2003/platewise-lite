export const mockFoodItems = [
  { id: 1, name: "Leftover rice", expiresIn: 2 },
  { id: 2, name: "Vegetables", expiresIn: 1 },
  { id: 3, name: "Eggs", expiresIn: 5 },
  { id: 4, name: "Carrots", expiresIn: 3 },
];

export const mockRecommendations = [
  {
    id: 1,
    title: "Leftover rice + vegetables",
    steps: ["Heat rice", "Stir-fry vegetables", "Mix together"],
  },
  {
    id: 2,
    title: "Egg + spinach fried rice",
    steps: ["Cook eggs", "Add rice", "Add spinach and stir"],
  },
  {
    id: 3,
    title: "Carrot & egg stir-fry",
    steps: ["Chop carrots", "Fry eggs", "Add carrots and mix"],
  },
];

export const mockStats = {
  savedThisWeek: 12.5,
  wasteReduced: 1.2,
  mealsSaved: 4,
};