
export const mockFoodItems = [
  {
    id: 1,
    name: "Leftover rice",
    icon: "🍚",
    expiresIn: 2,
    urgent: true,
  },
  {
    id: 2,
    name: "Vegetables",
    icon: "🥬",
    expiresIn: 1,
    urgent: true,
  },
  {
    id: 3,
    name: "Eggs",
    icon: "🥚",
    expiresIn: 5,
    urgent: false,
  },
  {
    id: 4,
    name: "Carrots",
    icon: "🥕",
    expiresIn: 3,
    urgent: false,
  },
];

export const mockRecommendations = [
  {
    id: 1,
    title: "Leftover rice + vegetables",
    description: "A quick way to use the food that needs attention first.",
    steps: [
      "Heat the leftover rice in a pan",
      "Add vegetables and stir-fry",
      "Mix everything together and serve",
    ],
  },
  {
    id: 2,
    title: "Egg + spinach fried rice",
    description: "Simple, filling and ready in just a few steps.",
    steps: [
      "Scramble the eggs",
      "Add rice and stir",
      "Add spinach and mix well",
    ],
  },
  {
    id: 3,
    title: "Carrot & egg stir-fry",
    description: "A light meal that helps use your fresh ingredients.",
    steps: [
      "Chop the carrots",
      "Fry the eggs until golden",
      "Add carrots and mix well",
    ],
  },
];

export const mockStats = {
  savedThisWeek: 12.5,
  wasteReduced: 1.2,
  mealsSaved: 4,
};

