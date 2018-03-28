/* Tento modul má na starost funkci přiblížení obrázků */

import doc from './doc';

let animation,
    modalCtx,
    modalState = 0;

const addClasses = () => {
    document.body.classList.add('modal-big-on');
    doc.modal.classList.add('zoom');
    doc.modalCvs.classList.add('on');
};

const removeClasses = () => {
    document.body.classList.remove('modal-big-on');
    doc.modal.classList.remove('zoom');
    doc.modalCvs.classList.remove('on');
};

const animEnd = () => {
    // Po skončení animace resetuje stav
    if (modalState === 2) {
        doc.modal.removeEventListener('click', modalToggleA);
        removeClasses();
        modalState = 0;
    }
};

const drawImg = img => {
    // Vykreslí zvolený obrázek pro přiblížení na canvas
    const size = [img.naturalWidth, img.naturalHeight];
    [doc.modalCvs.width, doc.modalCvs.height] = size;
    modalCtx.drawImage(img, 0, 0, size[0], size[1]);
};

const modalToggleA = e => {
    // Přepínací funkce zobrazení s animací
    if (modalState === 0) {
        drawImg(e.target);
        doc.modal.addEventListener('click', modalToggleA);
        addClasses();
        animation = doc.modalCvs.animate(
            [
                {transform: 'scale(0)'},
                {transform: 'scale(1)'},
            ], {
                duration: 400,
                easing: 'ease-out',
            },
        );
        animation.addEventListener('finish', animEnd);
        modalState++;
    } else if (modalState === 1) {
        animation.reverse();
        modalState++;
    }
};

const modalToggleB = e => {
    // Přepínací funkce zobrazení bez animace
    if (modalState) {
        doc.modal.addEventListener('click', modalToggleB);
        removeClasses();
        modalState = 0;
    } else {
        drawImg(e.target);
        doc.modal.addEventListener('click', modalToggleB);
        addClasses();
        modalState = 1;
    }
};

const prepDoc = imgs => {
    modalCtx = doc.modalCvs.getContext('2d');
    // Podporuje-li prohlížeč Web Animations API, je použita funkce s animací
    if (typeof Element.prototype.animate === 'undefined')
        imgs.forEach(img => img.addEventListener('click', modalToggleB));
    else
        imgs.forEach(img => img.addEventListener('click', modalToggleA));
};

export default prepDoc;
