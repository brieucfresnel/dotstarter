import { registerGsapPlugins } from './config/gsap'
import Menu from './components/menu'

/* eslint-disable */
jQuery(function ($) {
  registerGsapPlugins()
  Menu();
})
