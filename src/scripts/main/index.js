import doc from '../_parts-babel/doc';
import lazy from '../_parts-babel/lazy';
import nav from '../_parts-babel/nav';

const docReady = () => {
    nav();
    lazy(doc.lazyOnlyImgs);
};

window.addEventListener('load', docReady);
