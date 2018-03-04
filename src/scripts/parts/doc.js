const doc = {};

const query = () => {
    doc.menu = document.querySelector('nav .menu');
    doc.menuToggle = document.querySelector('nav .menu-toggle');
    doc.modal = document.querySelector('.modal');
    doc.lazyImgs = document.querySelectorAll('img.lazy');
};

query();

export default doc;
