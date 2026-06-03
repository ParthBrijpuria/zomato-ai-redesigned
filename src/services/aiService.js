import { restaurantMenus } from '../data/mockData';

export const aiService = {
  async generateResponse(prompt) {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

    if (!apiKey || apiKey.trim() === '') {
      return {
        type: 'recommendations',
        items: [{
          mealName: "Error: API Key Missing",
          restaurant: "System",
          price: "₹0",
          deliveryTime: "0 min",
          protein: "0g",
          calories: "0 kcal",
          rating: "0",
          img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80",
          reason: "The VITE_OPENROUTER_API_KEY is not defined. Please add it to your .env file and restart the server.",
        }]
      };
    }

    const menuContext = Object.entries(restaurantMenus).map(([restaurant, items]) => {
      const itemList = items.map(i => `${i.name} (₹${i.price})`).join(', ');
      return `${restaurant}: ${itemList}`;
    }).join(' | ');

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": "http://localhost:5173", 
          "X-Title": "Zomato AI Concierge",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash", 
          max_tokens: 1500, 
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content: `You are the Zomato AI Meal Concierge. The user's food profile includes: Budget around ₹280, prefers North Indian, and avoids Peanuts. 
Here is the real-time database of available restaurants and their menus: ${menuContext}

Analyze the user's prompt. Then, respond with a JSON object containing a meal recommendation that perfectly matches their request. If the user asks to build a meal for multiple people or specifies a budget constraint for a group from a specific restaurant, act as a calculator and pick items from the menu database to perfectly fit their budget. Do NOT wrap the response in markdown code blocks like \`\`\`json. Return ONLY the raw JSON object.

The JSON must follow ONE of these two exact structures based on the context:

Structure 1 (For standard individual recommendations):
{
  "type": "recommendations",
  "items": [
    {
      "mealName": "Name of the meal",
      "restaurant": "Name of a realistic restaurant",
      "price": "₹250",
      "deliveryTime": "25 min",
      "protein": "30g",
      "calories": "500 kcal",
      "rating": "4.4",
      "img": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80",
      "reason": "Explain why this matches their specific request, goals, or budget"
    }
  ]
}

Structure 2 (For group orders or multi-item carts from a specific restaurant):
{
  "type": "group_cart",
  "restaurant": "Name of restaurant",
  "deliveryTime": "30 min",
  "totalCost": "₹950",
  "perPerson": "₹237",
  "items": [
    { "quantity": 2, "name": "McChicken Burger", "for": "Person 1 & 2", "price": "₹240" },
    { "quantity": 2, "name": "Veg Aloo Tikki", "for": "Person 3 & 4", "price": "₹120" }
  ]
}`
            },
            {
              role: "user",
              content: prompt
            }
          ]
        })
      });

      if (!response.ok) {
        const errData = await response.text();
        throw new Error(`API request failed with status ${response.status}: ${errData}`);
      }

      const data = await response.json();
      
      let text = data.choices[0].message.content;
      text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
      const jsonResponse = JSON.parse(text);
      
      // Ensure type is normalized so UI doesn't break
      if (jsonResponse.type !== 'group_cart') {
        jsonResponse.type = 'recommendations';
      }

      // Handle the array structure, providing fallback if AI returned single object
      if (jsonResponse.items && Array.isArray(jsonResponse.items)) {
        jsonResponse.items.forEach(item => {
          if (!item.img) item.img = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80";
        });
        return jsonResponse;
      } else if (jsonResponse.mealName) {
         return {
           type: 'recommendations',
           items: [{...jsonResponse, img: jsonResponse.img || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80"}]
         };
      }

      return jsonResponse;
      
    } catch (error) {
      console.error("OpenRouter API Error:", error);
      return {
        type: 'recommendations',
        items: [{
          mealName: "API Request Failed",
          restaurant: "System",
          price: "₹0",
          deliveryTime: "0 min",
          protein: "0g",
          calories: "0 kcal",
          rating: "0",
          img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80",
          reason: `Failed to fetch from OpenRouter API. Error details: ${error.message}`,
        }]
      };
    }
  }
};
