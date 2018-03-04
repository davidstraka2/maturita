import doc from '../_parts-babel/doc';
import lazy from '../_parts-babel/lazy';
import nav from '../_parts-babel/nav';
import zoom from '../_parts-babel/zoom';

const docReady = () => {
    nav();
    lazy(doc.lazyOnlyImgs);
    lazy(doc.lazyZoomImgs, img => zoom([img]));
    zoom(doc.zoomOnlyImgs);
};

window.addEventListener('load', docReady);
