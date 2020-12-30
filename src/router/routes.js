import MainLayout from "layouts/MainLayout";
import Test from "src/components/Test";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "/", component: () => import("pages/PageHome.vue") },
      { path: "/camera", component: () => import("pages/PageCamera.vue") }
    ]
  },

  { path: "/test", component: Test },

  //? for error
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
