import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Experience from "../views/Experience.vue";
import Projects from "../views/Projects.vue";
import Music from "../views/Music.vue";
import NotFound from "../views/NotFound.vue";
import Research from "../views/Research.vue";
import CV from "../views/CV.vue";
import Blog from "../views/Blog.vue";
import BlogPost from "../views/BlogPost.vue";
import Gallery from "../views/Gallery.vue";
import GalleryPost from "../views/GalleryPost.vue";
import About from "../views/About.vue";

const routes = [
  {
    path: "/",
    name: "/",
    component: Home,
    meta: {
      title: "Colin's Homepage",
    },
  },
  {
    path: "/research",
    name: "Research",
    component: Research,
    meta: {
      title: "Publications",
    },
  },
  {
    path: "/experience",
    name: "Experience",
    component: Experience,
    meta: {
      title: "Experience",
    },
  },
  {
    path: "/projects",
    name: "Projects",
    component: Projects,
    meta: {
      title: "Projects",
    },
  },
  {
    path: "/music",
    name: "Music",
    component: Music,
    meta: {
      title: "Lyenz Music",
    },
  },
  {
    path: "/cv",
    name: "CV",
    component: CV,
    meta: {
      title: "My CV",
    },
  },
  {
    path: "/blog",
    name: "Blog",
    component: Blog,
    meta: {
      title: "Blog",
    },
  },
  {
    path: "/blog/:slug",
    name: "BlogPost",
    component: BlogPost,
    meta: { title: "Blog" }, // gets overridden per-post by useHead above
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      title: "About Me",
    },
  },
  {
    path: "/gallery",
    name: "Gallery",
    component: Gallery,
    meta: {
      title: "Gallery",
    },
  },
  {
    path: "/gallery/:year/:slug",
    name: "GalleryPost",
    component: GalleryPost,
    meta: { title: "Gallery", hideFooter: true },
  },
  // {
  //   path: "/other",
  //   name: "Other",
  //   component: Other,
  // },
  {
    path: "/:pathMatch(.*)*",
    name: "Not Found",
    component: NotFound,
    meta: {
      title: "Page Not Found",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Default Title";
  next();
});

export default router;
