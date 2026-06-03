export const mockRestaurants = [
  { id: 1, name: "McDonald's", cuisine: "Burger, Fast Food", rating: 4.2, time: "25 min" },
  { id: 2, name: "Domino's Pizza", cuisine: "Pizza, Fast Food", rating: 4.1, time: "30 min" },
  { id: 3, name: "EatFit", cuisine: "Healthy Food, Salads", rating: 4.5, time: "20 min" },
  { id: 4, name: "Haldiram's", cuisine: "North Indian, Mithai", rating: 4.3, time: "35 min" },
  { id: 5, name: "Subway", cuisine: "Healthy Food, Wraps", rating: 4.0, time: "15 min" },
  { id: 6, name: "Faasos", cuisine: "Rolls, Wraps", rating: 4.2, time: "28 min" }
];

export const restaurantMenus = {
  "McDonald's": [
    { name: "McChicken Burger", price: 120, protein: "15g", calories: "400 kcal" },
    { name: "Veg Aloo Tikki", price: 60, protein: "5g", calories: "350 kcal" },
    { name: "French Fries", price: 100, protein: "3g", calories: "320 kcal" },
    { name: "Coke", price: 80, protein: "0g", calories: "150 kcal" },
    { name: "Chicken McNuggets (6pc)", price: 150, protein: "12g", calories: "250 kcal" }
  ],
  "Domino's Pizza": [
    { name: "Margherita Pizza", price: 200, protein: "12g", calories: "600 kcal" },
    { name: "Peppy Paneer Pizza", price: 250, protein: "16g", calories: "700 kcal" },
    { name: "Garlic Breadsticks", price: 110, protein: "6g", calories: "350 kcal" },
    { name: "Choco Lava Cake", price: 100, protein: "4g", calories: "350 kcal" }
  ],
  "EatFit": [
    { name: "High Protein Grilled Chicken Salad", price: 280, protein: "42g", calories: "350 kcal" },
    { name: "Tofu Power Bowl", price: 250, protein: "30g", calories: "400 kcal" },
    { name: "Fruit Salad", price: 150, protein: "2g", calories: "120 kcal" },
    { name: "Detox Juice", price: 120, protein: "1g", calories: "80 kcal" }
  ],
  "Haldiram's": [
    { name: "Chole Bhature", price: 180, protein: "10g", calories: "550 kcal" },
    { name: "Rajma Chawal Bowl", price: 160, protein: "14g", calories: "450 kcal" },
    { name: "Paneer Tikka", price: 220, protein: "18g", calories: "350 kcal" },
    { name: "Gulab Jamun (2pc)", price: 60, protein: "2g", calories: "300 kcal" }
  ],
  "Subway": [
    { name: "Grilled Chicken Wrap", price: 250, protein: "35g", calories: "420 kcal" },
    { name: "Paneer Tikka Sub", price: 220, protein: "18g", calories: "450 kcal" },
    { name: "Veggie Delight Sub", price: 180, protein: "10g", calories: "350 kcal" }
  ]
};

export const demoScenarios = {
  muscle: {
    type: 'recommendations',
    items: [
      {
        mealName: "High Protein Grilled Chicken Salad",
        restaurant: "EatFit",
        price: "₹280",
        deliveryTime: "20 min",
        protein: "42g",
        calories: "350 kcal",
        rating: "4.5",
        img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80",
        reason: "Packs 42g of protein to support your muscle gain goal, stays under your ₹300 budget, and arrives fast."
      },
      {
        mealName: "Grilled Chicken Wrap",
        restaurant: "Subway",
        price: "₹250",
        deliveryTime: "15 min",
        protein: "35g",
        calories: "420 kcal",
        rating: "4.2",
        img: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=500&q=80",
        reason: "A quick, high-protein alternative with fresh veggies."
      }
    ]
  },
  group: {
    type: 'group_cart',
    restaurant: "Faasos & EatFit (Combined Cart)",
    deliveryTime: "30 min",
    totalCost: "₹1420",
    perPerson: "₹284",
    items: [
      { quantity: 2, name: "Paneer Tikka Wrap", for: "Veg (2)", price: "₹380" },
      { quantity: 1, name: "Tofu Power Bowl", for: "Vegan (1)", price: "₹250" },
      { quantity: 2, name: "Chicken Rice Bowl", for: "Non-Veg (2)", price: "₹790" }
    ]
  },
  mood: {
    type: 'recommendations',
    items: [
      {
        mealName: "Warm Chocolate Lava Cake & Mac n Cheese",
        restaurant: "Domino's Pizza",
        price: "₹350",
        deliveryTime: "30 min",
        protein: "15g",
        calories: "850 kcal",
        rating: "4.8",
        img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80",
        reason: "You mentioned feeling stressed. We selected the highest-rated comfort foods known to boost dopamine, delivered warm."
      }
    ]
  },
  fallback: {
    type: 'recommendations',
    items: [
      {
        mealName: "Balanced Rajma Bowl",
        restaurant: "Haldiram's",
        price: "₹180",
        deliveryTime: "25 min",
        protein: "18g",
        calories: "450 kcal",
        rating: "4.3",
        img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&q=80",
        reason: "A great balance of complex carbs and plant protein. Perfect for a quick, filling meal."
      }
    ]
  }
};
