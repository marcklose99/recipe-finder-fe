import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import RecipeView from "@/views/RecipeView.vue";
import RecipeCreationView from "@/views/RecipeCreationView.vue";
import RecipeOverview from "@/components/RecipeOverview.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeView,
      children: [
        {
          path: "",
          component: RecipeOverview,
  
        },
        {
          path: "/recipe/:id",
          name: "recipe",
          component: RecipeView,
        },
        {
          path: "create",
          name: "create",
          component: RecipeCreationView,
        },
      ],
    },
  ],
});

export default router;
