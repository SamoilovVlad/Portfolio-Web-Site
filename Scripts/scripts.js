const toogleIcon = document.querySelector('.toggle-icon');
const navMenu = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.menu-link');
const closeIcon = document.querySelector('.close-icon');

toogleIcon.addEventListener('click', function(){
    navMenu.classList.toggle('active');
});

closeIcon.addEventListener('click', function(){
    navMenu.classList.remove('active');
});

menuLinks.forEach(function(menuLink){
    menuLink.addEventListener('click', function(){
        navMenu.classList.remove('active');
    })
});

function scrollHeader(){
    const header = document.querySelector('#header');
    this.scrollY >= 20 ? header.classList.add('active') : header.classList.remove('active');
}

window.addEventListener('scroll', scrollHeader);

const typedLabel = document.querySelector('.typed');
if(typedLabel){
var typedWords = typedLabel.getAttribute('data-typed-items');
typedWords = typedWords.split(',');
new Typed('.typed', {
    strings: typedWords,
    loop: true,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000
});
}

const slider = document.querySelector('.splide');
if(slider){
    var splide = new Splide( '.splide', {
        type   : 'loop',
        perPage: 5,
        focus  : 'center',
        autoplay: 'play',
        interval: 5000,
        resetProgress: false,
      } );
      
      splide.mount();
  window.addEventListener('resize', function(){
    if (window.innerWidth > 1150) {
        splide.options = {
            focus: 'center',
            perPage: 5,
        };
    } else if (window.innerWidth < 1150 && this.window.innerWidth > 950) {
        splide.options = {
            focus: 'left',
            perPage: 4,
        };
    }
    else if (window.innerWidth < 950 && this.window.innerWidth > 731) {
        splide.options = {
            focus: 'center',
            perPage: 3,
        };
    }
    else if (window.innerWidth < 731 && this.window.innerWidth > 500) {
        splide.options = {
            focus: 'left',
            perPage: 2,
        };
    }
    else {
        splide.options = {
            focus: 'center',
            perPage: 1,
        };
    }
  });
}

function updateCharCount() {
    var textarea = document.querySelector('textarea');
    var counterElement = textarea.getAttribute('data-counter');
    var maxLength = parseInt(textarea.getAttribute('data-max'));
    var currentLength = textarea.value.length;

    textarea.setAttribute('data-counter', currentLength);
    if(currentLength <= maxLength)
    {
        var counterElement = document.querySelector('.counter');
        counterElement.textContent = currentLength + '/' + maxLength;
    }
}

function ValidateEmail(email) {
    return email.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)
}
function ValidateName(name){
    if(name.length > 1) return true
    return false;
}
function ValidateEmailText(emailText){
    if(emailText.length < 20) return false;
    return true;
}

function ValidateAndSendEmail(){
    var name = document.querySelector('#name').value;
    var email = document.querySelector('#email').value;
    var emailText = document.querySelector('#emailText').value;
    var errorCount = 0;
    if(!ValidateEmail(email))
    {
        var emailErrorSpan = document.querySelector('#emailVal');
        emailErrorSpan.textContent = 'Please, give correct email.';
        emailErrorSpan.style.display = 'block';
        errorCount++;
    }
    if(!ValidateName(name)){
        var nameErrorSpan = document.querySelector('#nameVal');
        nameErrorSpan.textContent = 'Please, give correct name.';
        nameErrorSpan.style.display = 'block';
        errorCount++;
    }
    if(!ValidateEmailText(emailText)){
        var emailTextErrorSpan = document.querySelector('#emailTextVal');
        emailTextErrorSpan.textContent = 'Your list should contain at least 20 symbols.';
        emailTextErrorSpan.style.display = 'block';
        errorCount++;
    }
    if(errorCount === 0){
        SendEmail(name, email, emailText);
    }
}

function InputOnFocus(event){
    var errorSpan = document.querySelector('#'+event.target.id+'Val');
    if(errorSpan){
        errorSpan.textContent = '';
        errorSpan.style.display = 'none';
    }
}

const sections = document.querySelectorAll('.section[id]');

function ScrollActive(){
    const scrollY = window.pageYOffset;

    sections.forEach(section =>{
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 50;

        var sectionId = section.id;

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.menu a[href *=' + sectionId + ']').classList.add('active-link');
        }
        else{
            document.querySelector('.menu a[href *=' + sectionId + ']').classList.remove('active-link');
        }
    });
}

function scrollToSection(event) {
    var targetSection = document.querySelector('.section#' + event.target.id);
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }

window.addEventListener('scroll', ScrollActive)

const inputs = document.querySelectorAll('.service-counter-input');

function SetInputs(){
    inputs.forEach(input => {
        id = input.id.substring(5);
        const span = document.getElementById('span'+id);
        input.addEventListener('input', function(){
            if(input.value < 0 || input.value == '')
            {
                input.value = 0;
                span.textContent = 0;
            }
            else{
                input.value = parseInt(input.value);
                span.textContent = input.value;
            }
            PriceCount();
        });
    });
}
window.addEventListener('DOMContentLoaded', SetInputs);

function validateInput(inputElement) {
    inputElement.value = inputElement.value.replace(/\D/g, '').slice(0, 3);
  }

function OnInputBlur(input){
    if(input.value === '') {
        id = input.id.substring(5);
        const span = document.getElementById('span'+id);
        input.value = '0';
        span.textContent = '0';
        PriceCount();
    }
}

function PriceCount() {
    var sum = 0;
    var totalPrice = document.querySelector('.total-price p');
    inputs.forEach(input => {
        id = input.id.substring(5);
        const service = document.querySelector('#service'+id);
        var pricePerHour = service.getAttribute('price');
        var currentPrice = pricePerHour * input.value;
        sum += currentPrice; 
    });
    totalPrice.textContent = parseFloat(sum).toFixed(2)+'$';
}

function Plus(id){
    const input = document.querySelector('#input'+id);
    const span = document.querySelector('#span'+id);
    if(input.value < 999){
        input.value -= -1;
        span.textContent = input.value;
        PriceCount();
    }
}
function Minus(id){
    const input = document.querySelector('#input'+id);
    const span = document.querySelector('#span'+id);
    if(input.value > 0){
        if(input.value != 0){
            input.value -= 1;
            span.textContent = input.value;
            PriceCount();
        }
    }
}

function EmailGeneration(){
    var inputs = document.getElementsByClassName('service-counter-input');
    inputs = Array.from(inputs);
    var email = 'Hi, I`m __________!\n\nI read your resume and your services. I am currently looking for a programmer to implement my project.\n\nHere is my list of preferred services\n\n';
    var count = 0;
    for(var i = 0; i < inputs.length; i++)
    {
        if(inputs[i].value > 0){
            count++;
            const id = inputs[i].id.substring(5);
            const service = document.getElementById('service'+id).textContent.trim();
            email += `${count}. ${service} - ${inputs[i].value}hours\n`;
        }
    }
    if(count > 0){
        email += '\nLook forward to your answer!\n\nBest wishes,\n________!';
        const textEmail = document.getElementById('emailText');
        textEmail.value = email;
        const title = document.querySelector('#title');
        title.value = `Hiring`;
        const counter = document.querySelector('.counter');
        counter.textContent = `${email.length}/500`;

        var targetSection = document.querySelector('.section#contact');
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function SendEmail(name, email, text){
    (function(){
        emailjs.init("ezRy9-VIO4IKj1o3d");
    })();

    text = text + `\n Contact Email - ${email} - ${name}`;

    var params = {
        sendername: name,
        to: "noreplynovus547@gmail.com",
        subject: document.getElementById('title').value,
        replyto: "noreplynovus547@gmail.com",
        message: text,
        from_name: name,
    };

    var serviceId = "service_vxc3bh6";
    var templateId = "template_36x3kb8";

    emailjs.send(serviceId, templateId, params)
    .then(response => {
        alert("Email Sent Successfully!");
    })
    .catch(error => {
        console.error("Email sending failed:", error);
    });
}
function PopUp(label){
    body = document.querySelector('body');
    var src = '';
    var text = '';

    if(label.tagName === 'IMG'){
        src = label.src;
        label = label.parentNode;
        text = label.querySelector('span').textContent;
        label = label.querySelector('h1').textContent;
    }
    else if(label.tagName === 'DIV'){
        text = label.querySelector('span').textContent;
        src = label.querySelector('img').src;
        label = label.querySelector('h1').textContent;
    }
    else{
        label = label.parentNode;
        label = label.parentNode;
        src = label.querySelector('img').src;
        text = label.querySelector('span').textContent;
        label = label.querySelector('h1').textContent;
    }
    var overlay = document.querySelector('.overlay');
    var documentHeight = Math.max(
        document.body.scrollHeight, document.body.offsetHeight,
        document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight
    );
    overlay.style.height = documentHeight + 'px';
    var card = document.querySelector('.card');
    var cardText = card.querySelector('p');
    var cardLabel = card.querySelector('h1');
    cardImg = card.querySelector('img');
    cardImg.src = src;
    cardLabel.textContent = label;
    cardText.textContent = text;
    overlay.style.display = 'block';
    overlay.style.opacity = '0.3';
    card.style.display = 'flex';
    card.scrollIntoView({
        behavior: 'smooth', 
        block: 'center' 
    });
    card.style.opacity = '1';
    document.querySelector('body').classList.add('static');
}

function ClosePopUp(overlay = null){
    var card = document.querySelector('.card');
    if(overlay === null)
    overlay = document.querySelector('.overlay');
    overlay.style.opacity = '0';
    card.style.opacity = '0';
    setTimeout(function(){
        card.style.display = 'none';
    overlay.style.display = 'none';
    }, 500);
    document.querySelector('body').classList.remove('static');
}