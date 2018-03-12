let favs,
    products;

const getStorage = () => {
    try {
        favs = JSON.parse(localStorage.getItem('favs')) || [];
    } catch (err) {
        console.log(err);
        favs = [];
    }
};

const setStorage = () => {
    try {
        localStorage.setItem('favs', JSON.stringify(favs));
    } catch (err) {
        console.log(err);
    }
};

const toggleFav = e => {
    const toggleEl = e.target;
    const productId = toggleEl.getAttribute('data-product-id');
    const idx = favs.indexOf(productId);
    if (idx >= 0) {
        favs.splice(idx, 1);
        toggleEl.classList.remove('on');
    } else {
        favs.push(productId);
        toggleEl.classList.add('on');
    }
    setStorage();
    products.forEach(el => toggleFavClass(el));
};

const toggleFavClass = el => {
    if (favs.indexOf(el.getAttribute('data-product-id')) >= 0)
        el.classList.add('fav');
    else
        el.classList.remove('fav');
};

const prepDoc = toggleEls => {
    products.forEach(el => toggleFavClass(el));
    toggleEls.forEach(el => {
        if (favs.indexOf(el.getAttribute('data-product-id')) >= 0)
            el.classList.add('on');
        el.addEventListener('click', toggleFav);
    });
};

const init = (toggleEls, productEls) => {
    products = productEls || [];
    getStorage();
    prepDoc(toggleEls);
};

export default init;
