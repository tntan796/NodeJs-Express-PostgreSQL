var express = require('express');
var router = express.Router();
(() => {
    if (typeof localStorage === "undefined" || localStorage === null) {
        const LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }
})();
const products = [
    { id: 1, name: 'Điện thoại OPPO A92', url: 'https://cdn.tgdd.vn/Products/Images/42/220654/oppo-a92-tim-400x460-400x460.png', description: 'OPPO A92 là mẫu smartphone tầm trung vừa mới được OPPO ra mắt đầu tháng 5/2020. Chiếc điện thoại gây ấn tượng với thiết kế màn hình khoét lỗ tràn viền, cụm 4 camera ấn tượng' },
    { id: 2, name: 'Điện thoại OPPO Reno4', url: 'https://cdn.tgdd.vn/Products/Images/42/222596/oppo-reno4-201120-111135-400x460.png', description: 'OPPO Reno4 - Chiếc điện thoại có thiết kế thời thượng, hiệu năng mạnh mẽ cùng bộ ba camera siêu ấn tượng, tối ưu hóa cho chụp ảnh và quay phim siêu sắc nét, hứa hẹn sẽ' },
    { id: 3, name: 'Điện thoại OPPO Reno3', url: 'https://cdn.tgdd.vn/Products/Images/42/213591/oppo-reno3-trang-400x460-400x460.png', description: 'OPPO Reno3 là một sản phẩm ở phân khúc tầm trung nhưng vẫn sở hữu cho mình ngoại hình bắt mắt, cụm camera chất lượng và cùng nhiều đột phá về màn hình cũng như hiệu năng.' },
    { id: 4, name: 'Điện thoại iPhone 11 64GB', url: 'https://cdn.tgdd.vn/Products/Images/42/153856/iphone-11-red-2-400x460-400x460.png', description: 'Sau bao nhiêu chờ đợi cũng như đồn đoán thì cuối cùng Apple đã chính thức giới thiệu bộ 3 siêu phẩm iPhone 11 mạnh mẽ nhất của mình vào tháng 9/2019. Có mức giá rẻ nhất' },
    { id: 5, name: 'Điện thoại iPhone 11 Pro Max 64GB', url: 'https://cdn.tgdd.vn/Products/Images/42/200533/iphone-11-pro-max-black-400x460.png', description: 'Trong năm 2019 thì chiếc smartphone được nhiều người mong muốn sở hữu trên tay và sử dụng nhất không ai khác chính là iPhone 11 Pro Max 64GB tới từ nhà Apple.' },
    { id: 6, name: 'Điện thoại Samsung Galaxy A21s (6GB/64GB)', url: 'https://cdn.tgdd.vn/Products/Images/42/220654/oppo-a92-tim-400x460-400x460.png', description: 'Samsung Galaxy A21s là chiếc điện thoại tầm trung mới của Samsung, mang trong mình có thiết kế màn hình nốt ruồi thời thượng, cùng cụm 4 camera sau độ phân giải' },
]

router.get('/', function (req, res, next) {
    const productsLocalStorage = JSON.parse(localStorage.getItem('node-products'));
    if (productsLocalStorage) {
        res.json(productsLocalStorage);
    } else {
        localStorage.setItem('node-products', JSON.stringify(products));
        res.json(products);
    }
});

router.get('/:id', function (req, res, next) {
    const productsLocalStorage = JSON.parse(localStorage.getItem('node-products'));
    const id = req.params.id;
    if (productsLocalStorage) {
        const productIndex = productsLocalStorage.findIndex(product => product.id == id);
        if (productIndex !== -1) {
            res.json(productsLocalStorage[productIndex + 1]);
        } else {
            res.json(null);
        }
    } else {
        res.json(null);
    }
});


router.post('/add', function (req, res, next) {
    const productsLocalStorage = JSON.parse(localStorage.getItem('node-products'));
    console.log('add:',productsLocalStorage);
    const data = req.body;
    console.log('add:',data);
    if (productsLocalStorage.length == 0) {
        data.id = 1;
    } else {
        data.id = productsLocalStorage.reduce((prev, current) => prev.id > current.id ? prev.id : current.id) + 1;
    }
    productsLocalStorage.push(data);
    localStorage.setItem('node-products', JSON.stringify(productsLocalStorage));
    res.json(data);
});

router.delete('/delete/:id', function (req, res, next) {
    const productsLocalStorage = JSON.parse(localStorage.getItem('node-products'));
    const id = req.params.id;
    if (productsLocalStorage && productsLocalStorage.length > 0) {
        const index = productsLocalStorage.findIndex(product => product.id == id);
        if (index !== -1) {
            productsLocalStorage.splice(index, 1);
            localStorage.setItem('node-products', JSON.stringify(productsLocalStorage));
        }
    }
    res.json(productsLocalStorage);
});


router.post('/edit', function (req, res, next) {
    const productsLocalStorage = JSON.parse(localStorage.getItem('node-products'));
    const productUpdate = req.body;
    if (productsLocalStorage && productsLocalStorage.length > 0) {
        const product = productsLocalStorage.find(product => product.id == productUpdate.id);
        if (product) {
            product.name = productUpdate.name;
            product.description = productUpdate.description;
            product.url = productUpdate.url;
            localStorage.setItem('node-products', JSON.stringify(productsLocalStorage));
        }
    }
    localStorage.setItem('node-products', JSON.stringify(productsLocalStorage));
    res.json(productsLocalStorage);
});

module.exports = router;
