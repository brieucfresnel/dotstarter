import clientsGrid from '../../dotstarter/layouts/clients-grid/clients-grid';
import homeProductsGrid from '../../dotstarter/layouts/home-products-grid/home-products-grid';
import imageTextImage from '../../dotstarter/layouts/image-text-image/image-text-image';
import pageHeader from '../../dotstarter/layouts/page-header/page-header';
import productsGrid from '../../dotstarter/layouts/products-grid/products-grid';
import productsSlider from '../../dotstarter/layouts/products-slider/products-slider';
import textImageImage from '../../dotstarter/layouts/text-image-image/text-image-image';
import fullWidthContent from '../../dotstarter/layouts/full-width-content/full-width-content';

import newsletter from "../../dotstarter/components/newsletter/newsletter";
import servicesGrid from "../../dotstarter/components/services-grid/services-grid";

export default function() {
    // Layouts
    pageHeader();
    clientsGrid();
    homeProductsGrid();
    imageTextImage();
    productsGrid();
    productsSlider();
    textImageImage();
    fullWidthContent();

    // Components
    newsletter();
    servicesGrid();
}