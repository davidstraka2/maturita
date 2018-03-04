const doc = {};

const query = () => {
    doc.menu = document.querySelector('nav .menu');
    doc.menuToggle = document.querySelector('nav .menu-toggle');
    doc.modal = document.querySelector('.modal');
};

query();

export default doc;
