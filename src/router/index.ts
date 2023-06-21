import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import RecipeView from "@/views/RecipeView.vue";
import RecipeCreationView from "@/views/RecipeCreationView.vue";
import IngredientCreation from "@/components/popup/IngredientCreation.vue";
import InstructionCreation from "@/components/InstructionCreation.vue";
import ImageCreation from "@/components/ImageCreation.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/recipe/:id',
      component: RecipeView
    },
    {
      path: '/create',
      name: 'creation',
      component: RecipeCreationView,
      children: [
        {
          path: 'ingredient',
          name: 'ingredient-creation',
          component: IngredientCreation
        },
        {
          path: 'instruction',
          name: 'instruction-creation',
          component: InstructionCreation
        },
        {
          path: 'image',
          name: 'image-creation',
          component: ImageCreation
        }
      ],
    }
  ]
})

export default router
