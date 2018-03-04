const doc = {};

const query = () => {
    doc.lazyOnlyImgs = document.querySelectorAll('img.lazy:not(.zoom)');
    doc.lazyZoomImgs = document.querySelectorAll('img.lazy.zoom');
    doc.menu = document.querySelector('nav .menu');
    doc.menuToggle = document.querySelector('nav .menu-toggle');
    doc.modal = document.querySelector('.modal');
    doc.modalCvs = document.querySelector('.modal-cvs');
    doc.zoomOnlyImgs = document.querySelectorAll('img.zoom:not(.lazy)');
};

query();

export default doc;
