import doc from '../_parts-babel/doc';
import fav from '../_parts-babel/fav';
import lazy from '../_parts-babel/lazy';
import nav from '../_parts-babel/nav';

const docReady = () => {
    nav();
    fav(doc.favToggles, doc.products);
    lazy(doc.lazyOnlyImgs);
};

window.addEventListener('load', docReady);
