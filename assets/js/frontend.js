import { registerGsapPlugins } from "./config/gsap";
import Menu from "./components/menu";

jQuery(function ($) {
    registerGsapPlugins();
    Menu();
})