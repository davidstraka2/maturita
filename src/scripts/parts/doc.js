/* Tento modul má za úkol najít prvky dokumentu potřebné pro další moduly */

const doc = {};

const query = () => {
    doc.favToggles = document.querySelectorAll('.fav-toggle');
    doc.lazyOnlyImgs = document.querySelectorAll('img.lazy:not(.zoom)');
    doc.lazyZoomImgs = document.querySelectorAll('img.lazy.zoom');
    doc.menu = document.querySelector('nav .menu');
    doc.menuToggle = document.querySelector('nav .menu-toggle');
    doc.modal = document.querySelector('.modal');
    doc.modalCvs = document.querySelector('.modal-cvs');
    doc.products = document.querySelectorAll('.product');
    doc.zoomOnlyImgs = document.querySelectorAll('img.zoom:not(.lazy)');
};

query();

export default doc;
