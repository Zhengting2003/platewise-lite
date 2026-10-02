export const mockFoodItems = [
  { id: 1, name: "Leftover rice", expiresIn: 2, urgent: true },
  { id: 2, name: "Vegetables", expiresIn: 1, urgent: true },
  { id: 3, name: "Eggs", expiresIn: 5, urgent: false },
  { id: 4, name: "Carrots", expiresIn: 3, urgent: false },
];

export const mockRecommendations = [
  {
    id: 1,
    title: "Leftover rice + vegetables",
    steps: ["Heat rice in a pan", "Stir-fry vegetables", "Mix together and serve"],
  },
  {
    id: 2,
    title: "Egg + spinach fried rice",
    steps: ["Scramble eggs", "Add rice and stir", "Add spinach, mix well"],
  },
  {
    id: 3,
    title: "Carrot & egg stir-fry",
    steps: ["Chop carrots", "Fry eggs until golden", "Add carrots, mix and serve"],
  },
];

export const mockStats = {
  savedThisWeek: 12.5,
  wasteReduced: 1.2,
  mealsSaved: 4,
};