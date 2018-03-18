import doc from '../_parts-babel/doc';
import fav from '../_parts-babel/fav';
import lazy from '../_parts-babel/lazy';
import nav from '../_parts-babel/nav';
import zoom from '../_parts-babel/zoom';

const docReady = () => {
    nav();
    fav(doc.favToggles, doc.products);
    lazy(doc.lazyOnlyImgs);
    lazy(doc.lazyZoomImgs, img => zoom([img]));
    zoom(doc.zoomOnlyImgs);
};

document.addEventListener('DOMContentLoaded', docReady);
