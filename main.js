// `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`
// api.openweathermap.org/data/2.5/weather?q=tehran&appid=edc228562ac0a8aa3116d41c0687cf56&units=metric
// b55927bf031bb4c51614bbec7f5668fd

const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");

const apiKey="b55927bf031bb4c51614bbec7f5668fd";

form.addEventListener("submit", e=>{
    e.preventDefault();
    let inputValue= input.value;
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;
    fetch(url)
            .then(response => response.json())
            .then(data => {
                const {name,sys,main,weather}=data;
                const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
                const li = document.createElement("li");
                li.classList.add("city");
                const markup=`
                <h2  class="city-name">
                <span>${name}</span>
                <span>${sys.country}</span>
                </h2>
                <div class="city-temp">${Math.round(main.temp)}</div>
                <figure>
                <img class="city-icon" src="${icon}"
                <figurecaption>${weather[0].description}</figurecaption>
                </figure>`;

                li.innerHTML=markup;
                list.appendChild(li);
                msg.innerText="";
            })
            .catch(()=>{
                msg.innerText="Search for a valid city";
            })
            input.value="";
})