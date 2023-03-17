import { createRouter, createWebHistory } from "vue-router";

const HomePage = () => import("@/pages/home/HomePage.vue");
const DirectorsPage = () => import("@/pages/directors/DirectorsPage.vue");
const MoviesPage = () => import("@/pages/movies/MoviesPage.vue");
const NotFoundPage = () => import("@/pages/not-found/NotFound.vue");

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", name: "home", component: HomePage },
  { path: "/directors", name: "directors", component: DirectorsPage },
  { path: "/movies", name: "movies", component: MoviesPage },
  { path: "/:pathMatch(.*)", name: "not-found", component: NotFoundPage },
];

const router = createRouter({
  routes: routes,
  history: createWebHistory(),
});

export default router;
