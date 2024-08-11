/*
    n = navbar
    nm = navMobile
    af = aboutUs footer
*/


const At = document.querySelector('.aboutusTitle');
const Ac = document.querySelector('.aboutusContent');
const Wt = document.querySelector('.weddingTitle');
const Wc = document.querySelector('.weddingContent');
const Et = document.querySelector('.eventTitle');
const Ec = document.querySelector('.eventContent');
const Mt = document.querySelector('.miceTitle');
const Mc = document.querySelector('.miceContent');
const Tt = document.querySelector('.tourTitle');
const Tc = document.querySelector('.tourContent');
const ds = document.querySelector('.dessub');

const langBTN = document.querySelector('.langua');
let lang = 0; // true = Vietnamese / false = English

async function languageChange() {
    const response = await fetch("content.json");
    const res = await response.json();

    if (lang === 0) lang = 1;
    else lang = 0;

    if (At) {
        At.textContent = res.Title.AboutUs[lang];
        Wt.textContent = res.Title.WeddingPlanning[lang];
        Et.textContent = res.Title.Event[lang];
        Tt.textContent = res.Title.Tour[lang];
        Mt.textContent = res.Title.Mice[lang];

        Ac.innerHTML = res.Content.AboutUs[lang];
        Wc.innerHTML = res.Content.WeddingPlanning[lang];
        Ec.innerHTML = res.Content.Event[lang];
        Tc.innerHTML = res.Content.Tour[lang];
        Mc.innerHTML = res.Content.Mice[lang];

        document.querySelector('.guitn').value = res.Title.SendMessage[lang];
        ds.textContent = res.Content.Destination[lang];
    }

    document.querySelector('.nA').textContent = res.Navbar.AboutUs[lang];
    document.querySelector('.nH').textContent = res.Navbar.Home[lang];
    document.querySelector('.nC').textContent = res.Navbar.Contact[lang];
    document.querySelector('.nT').textContent = res.Navbar.DecorationRental[lang];
    document.querySelector('.lienhe').textContent = res.Navbar.BookNow[lang];

    document.querySelector('.nmA').textContent = res.Title.AboutUs[lang];
    document.querySelector('.nmH').textContent = res.Title.Home[lang];
    document.querySelector('.nmC').textContent = res.Title.Contact[lang];

    document.querySelector('.aftitle').textContent = res.Title.AboutUs[lang];
    document.querySelector('.afcontent').textContent = res.Content.AboutUsFooter[lang];
    document.querySelector('.cf').textContent = res.Title.Contact[lang];

    if (lang) {
        document.querySelector('.langbtn').style.backgroundColor = 'rgb(55, 130, 251)';
        document.querySelector('.langbtn').style.color = 'white';
        document.querySelector('.langbtn').textContent = "EN";
    } else {
        document.querySelector('.langbtn').style.backgroundColor = 'rgb(253, 94, 94)';
        document.querySelector('.langbtn').style.color = 'rgb(230, 255, 0)';
        document.querySelector('.langbtn').textContent = "VI";
    }
}

langBTN.addEventListener('click', () => {
    languageChange();
});

languageChange();

const sections = document.querySelectorAll('.slide-in, .slide-in-right');

if (sections)
    window.addEventListener('scroll', () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight * 0.8) {
                section.classList.add('active');
            }
        });
    });



