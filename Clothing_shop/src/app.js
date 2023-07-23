

const productContainers = [...document.querySelectorAll('.carousel')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];

productContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    })

    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    })
})
const img = document.querySelectorAll('.class')
img.forEach(element => element.addEventListener('click', e => {
  const source = e.target.src;
  const win = window.open('about:blank', 'new image'); 
  win.document.write("<img src=' " + src + "' alt='new image' />"); 
}));



const submit_button = document.querySelectorAll(".button");
submit_button.onclick = (e) => {
    e.preventDefault();
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;
    const cpass = document.getElementById("cpass").value;

    localStorage.setItem('FirstName', fname);
    localStorage.setItem('LastName', lname);
    localStorage.setItem('Email', email);
    localStorage.setItem('Password', pass);
    localStorage.setItem('Cpassword', cpass);
    if(fname == "" && lname == "" && email == "" && pass == "" && cpass == ""){
        Swal.fire(
            'input field has no value!',  
        );
    }
    else
    {
        if(pass.length >= 6 && pass.length <= 20)
        {
            if( pass !== cpass){
                Swal.fire(
                    'Password not matching!', 
                );
            }
            else
            {
                Swal.fire(
                    'Register successful!',
                );
                setTimeout(()=>{
                    location.href='LoginBox.html';
                    },5000)
            }
        }
        else
        {
            Swal.fire(
                'error'
            );
        }
    }


}


let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');


    


openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
}) 
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})




let products = [
    {
        id: 1,
        name: 'JACQUEMUS',
        image: 'dress1.webp',
        price: 525
    },
    {
        id: 2,
        name: 'ZIMMERMANN',
        image: 'dress2.webp',
        price: 1765
    },
    {
        id: 3,
        name: 'LORO PIANA',
        image: 'dress3.webp',
        price: 1599
    },
    {
        id: 4,
        name: 'STELLA MCCARTNEY KIDS',
        image: 'clothing4.webp',
        price: 85
    },
    {
        id: 5,
        name: 'STELLA MCCARTNEY KIDS',
        image: 'clothing5.webp',
        price: 55
    },
    {
        id: 6,
        name: 'Lemaire',
        image: 'clothing6.webp',
        price: 835
    },
    {
        id: 7,
        name: 'Bottega Veneta',
        image: 'clothing7.webp',
        price: 715
    },
    {
        id: 8,
        name: 'SELF-PORTRAIT',
        image: 'clothing8.jpeg',
        price: 375
    },
    {
        id: 9,
        name: 'OFF-WHITE',
        image: 'shirt1.jpeg',
        price: 525
    },
    {
        id: 10,
        name: 'OFF-WHITE',
        image: 'shirt2.webp',
        price: 525
    },
    {
        id: 11,
        name: 'OFF-WHITE',
        image: 'shirt3.webp',
        price: 525
    },
    {
        id: 12,
        name: 'OFF-WHITE',
        image: 'shirt4.webp',
        price: 525
    },
    {
        id: 13,
        name: 'OFF-WHITE',
        image: 'shirt5.webp',
        price: 525
    },
    {
        id: 14,
        name: 'OFF-WHITE',
        image: 'shirt6.webp',
        price: 525
    },
    {
        id: 15,
        name: 'OFF-WHITE',
        image: 'shirt7.webp',
        price: 525
    },
    {
        id: 16,
        name: 'OFF-WHITE',
        image: 'shirt8.webp',
        price: 525
    },
];



    
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="../images/img/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="../images/img/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
} 