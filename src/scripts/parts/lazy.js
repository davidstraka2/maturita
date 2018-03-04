const imgLoaded = (img, fullImg, callback) => {
    img.classList.add('loaded');
    img.setAttribute('src', fullImg.getAttribute('src'));
    img.removeAttribute('data-src');
    if (callback)
        callback(img);
};

const loadImg = (img, callback) => {
    let fullImg = document.createElement('img');
    fullImg.setAttribute('src', img.getAttribute('data-src'));
    fullImg.addEventListener('load', imgLoaded
        .bind(null, img, fullImg, callback));
    let cvs = document.createElement('canvas');
    let ctx = cvs.getContext('2d');
    const size = [img.naturalWidth, img.naturalHeight];
    [cvs.width, cvs.height] = size;
    ctx.filter = 'blur(2px)';
    ctx.drawImage(img, 0, 0, size[0], size[1]);
    if (!img.classList.contains('loaded'))
        img.setAttribute('src', cvs.toDataURL());
};

const loadImgs = (imgs, callback) => imgs
    .forEach(img => loadImg(img, callback));

export default loadImgs;
