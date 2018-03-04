import doc from './doc';

let menuOn = false;

const menuToggle = () => {
    if (menuOn) {
        document.body.classList.remove('modal-small-on');
        doc.menu.classList.remove('on');
        doc.modal.removeEventListener('click', menuToggle);
        menuOn = false;
    } else {
        document.body.classList.add('modal-small-on');
        doc.menu.classList.add('on');
        doc.modal.addEventListener('click', menuToggle);
        menuOn = true;
    }
};

const prepDoc = () => {
    doc.menuToggle.addEventListener('click', menuToggle);
};

const init = () => {
    prepDoc();
};

export default init;
