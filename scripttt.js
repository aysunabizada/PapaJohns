const main = document.querySelector("main");
const zehrimar = document.querySelector("#zehrimar");
const cards = document.querySelector(".cards");
const bonus = document.querySelector(".bonus");
const message = document.querySelector(".message");
const prokod = document.querySelector("#prokod");
const pizzaCategory = document.querySelector(".pizzaCategory");

//kampaniyalara geden sey
const dataKampaniya = [
    {id: 1, img: "img/sl1mobil.jpg"},
    {id: 2, img: "img/sl2mobil.jpg"},
    {id: 3, img: "img/sl3mobil.png"},
    {id: 4, img: "img/sl4mobil.png"},
    {id: 5, img: "img/sl5mobil.png"},
    {id: 6, img: "img/sl6mobil.png"},
    {id: 7, img: "img/sl7mobil.jpg"},
    {id: 8, img: "img/sl8mobil.png"}
]
function getKampaniya() {
    cards.innerHTML = ''
    zehrimar.style.display = 'none';
    dataKampaniya.forEach((item) => {
        cards.innerHTML += `<div class="card">
                                <a href=""><img src="${item.img}" alt=""></a>
                                <button class="m30">ətraflı məlumat</button>
                            </div>`
    })
}
let data
async function dataGet() {
    const res = await fetch('data/data.json')
    data = await res.json()
    // console.log(data);
}
async function show(arg, a) {
    // a.style.color = '#cfcaca';
    await dataGet();
    pizzaCategory.style.display = (arg === 'Pizzalar') ? 'block' : 'none';
    bonus.style.display = (arg === 'Bonus') ? 'block' : 'none';
    zehrimar.style.display = 'none'
    const filteredCard = data.filter(item => item.category === arg).map(item => {
        return `<div class="card">
                    <a href="#"><img src="${item.img}" alt="${item.name}"></a>
                    <div class="sum">
                        <h3>${item.name}</h3>
                        <button onclick="bunuSec()">BUNU SEC</button>
                    </div>
                    <p>${item.composition}</p>
                    <span>${item.price} ₼</span>
                </div>`
    }).join('')
    cards.innerHTML = filteredCard
}

prokod.value == 'aysu20'
// function getPromokod() {
//     if(prokod.value == 'aysu20'){
//         data.price - ((data.price * 20) / 100)
//         message.innerHTML = `<h2>'${prokod.value}' promo kodu tətbiq edildi!</h2>`
//     } else{
//         message.innerHTML = `<h2>'${prokod.value}' promo kodu mövcud deyil!</h2>`
//     }
// }

function applyDiscountToData(discount) {
    return data.map(item => ({
        ...item,
        discountedPrice: item.price - ((item.price * discount) / 100)
    }));
}

function getPromokod() {
    if(prokod.value === 'aysu20') {
        const discountedData = applyDiscountToData(20);
        message.innerHTML = `<h2>'${prokod.value}' promo kodu tətbiq edildi!</h2>`;
        const filteredCard = discountedData.map(item => {
            return `<div class="card">
                        <a href="#"><img src="${item.img}" alt="${item.name}"></a>
                        <div class="sum">
                            <h3>${item.name}</h3>
                            <button onclick="bunuSec()">BUNU SEC</button>
                        </div>
                        <p>${item.composition}</p>
                        <span><del>${item.price} ₼</del> ${item.discountedPrice} ₼</span>
                    </div>`;
        }).join('');
        cards.innerHTML = filteredCard;
    } else {
        message.innerHTML = `<h2>'${prokod.value}' promo kodu mövcud deyil!</h2>`;
    }
}