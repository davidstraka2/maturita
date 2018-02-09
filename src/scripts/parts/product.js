let doc = {},
    navMenuState = false;

const navMenuToggle = () => {
    if (navMenuState) {
        document.body.classList.remove('modal-on');
        doc.nav.classList.remove('menu-on');
        navMenuState = false;
    } else {
        document.body.classList.add('modal-on');
        doc.nav.classList.add('menu-on');
        navMenuState = true;
    }
};

const prepDoc = () => {
    doc.nav = document.querySelector('nav');
    doc.navMenuToggle = document.querySelector('nav .menu-toggle');
    doc.navMenuToggle.addEventListener('click', navMenuToggle);
};

const ready = () => {
    prepDoc();
};

export default ready;
