// ==========================================
// CONFIGURAÇÕES GERAIS E WHATSAPP
// ==========================================
const WHATSAPP_NUMBER = '5591987416244';

function enviarPerguntaFaq(event) {
    event.preventDefault();
    const pergunta = document.getElementById("pergunta-cliente").value;
    const textoCodificado = encodeURIComponent(`Olá, Dra. Juliana! Tenho uma dúvida: ${pergunta}`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${textoCodificado}`, '_blank');
    document.getElementById("form-faq").reset();
}

// ==========================================
// MENU MOBILE (TOGGLE & FECHAMENTO)
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});

// Fechar menu mobile com tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (navMenu && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// ==========================================
// HEADER - COMPORTAMENTO NO SCROLL
// ==========================================
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    const nav = document.getElementById('nav-menu');
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (header) {
        // Esconder ao rolar para baixo / Mostrar ao rolar para cima
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }

        // Estilização/Sombra no scroll
        if (scrollTop > 100) {
            header.style.padding = '0px 20px';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.12)';
            if (nav) nav.classList.add('nav-top');
        } else {
            header.style.padding = '20px';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            if (nav) nav.classList.remove('nav-top');
        }
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ==========================================
// SCROLL SUAVE PARA ÂNCORAS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        if (href === '#' || href === '') {
            e.preventDefault();
            return;
        }

        const targetElement = document.querySelector(href);

        if (targetElement) {
            e.preventDefault();
            const header = document.querySelector('.header');
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// ACTIVE LINK NO MENU (DESTAQUE SEÇÃO ATUAL)
// ==========================================
const sections = document.querySelectorAll('section[id]');
const navLinksForActive = document.querySelectorAll('.nav-link');

function activateMenuLink() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinksForActive.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', activateMenuLink);
// ==========================================
// CARROSSEIS (SERVIÇOS E DESTAQUES)
// ==========================================
function scrollCarousel(direction) {
    const carousel = document.getElementById('carousel-grid');
    if (carousel) {
        const card = carousel.querySelector('.servico-card');
        const cardWidth = card ? card.offsetWidth + 24 : 300; 
        carousel.scrollBy({
            left: direction * cardWidth,
            behavior: 'smooth'
        });
    }
}

function scrollDestaques(direction) {
    const carousel = document.querySelector('.destaques .destaques-grid');
    if (carousel) {
        const card = carousel.querySelector('.destaque-card');
        const cardWidth = card ? card.offsetWidth + 24 : 300; 
        carousel.scrollBy({
            left: direction * cardWidth,
            behavior: 'smooth'
        });
    }
}

// Função genérica para checar scroll e alternar a classe .hidden
function atualizarVisibilidadeSetas(container, btnPrev, btnNext) {
    if (!container || !btnPrev || !btnNext) return;

    const tolerancia = 5;

    // Início do carrossel (esconde seta da esquerda)
    if (container.scrollLeft <= tolerancia) {
        btnPrev.classList.add('hidden');
    } else {
        btnPrev.classList.remove('hidden');
    }

    // Fim do carrossel (esconde seta da direita)
    if (container.scrollLeft + container.clientWidth >= container.scrollWidth - tolerancia) {
        btnNext.classList.add('hidden');
    } else {
        btnNext.classList.remove('hidden');
    }
}

// Monitoramento: Serviços
const gridServicos = document.getElementById('carousel-grid');
const btnLeftServicos = document.getElementById('btn-left');
const btnRightServicos = document.getElementById('btn-right');

if (gridServicos && btnLeftServicos && btnRightServicos) {
    const checarServicos = () => atualizarVisibilidadeSetas(gridServicos, btnLeftServicos, btnRightServicos);
    window.addEventListener('load', checarServicos);
    window.addEventListener('resize', checarServicos);
    gridServicos.addEventListener('scroll', checarServicos);
}

// Injeta botões e monitora: Destaques
document.addEventListener("DOMContentLoaded", function() {
    const containerDestaques = document.querySelector('.destaques .container');
    const gridDestaques = document.querySelector('.destaques-grid');
    
    if (containerDestaques && gridDestaques) {
        let btnLeft = containerDestaques.querySelector('.carousel-btn.prev');
        let btnRight = containerDestaques.querySelector('.carousel-btn.next');

        if (!btnLeft && !btnRight) {
            btnLeft = document.createElement('button');
            btnLeft.className = 'carousel-btn prev';
            btnLeft.setAttribute('aria-label', 'Voltar');
            btnLeft.onclick = function() { scrollDestaques(-1); };
            
            const imgLeft = document.createElement('img');
            imgLeft.src = 'assets/seta-esquerda-roxa.png';
            imgLeft.alt = '';
            btnLeft.appendChild(imgLeft);

            btnRight = document.createElement('button');
            btnRight.className = 'carousel-btn next';
            btnRight.setAttribute('aria-label', 'Avançar');
            btnRight.onclick = function() { scrollDestaques(1); };
            
            const imgRight = document.createElement('img');
            imgRight.src = 'assets/seta-direita-roxa.png';
            imgRight.alt = '';
            btnRight.appendChild(imgRight);

            containerDestaques.insertBefore(btnLeft, gridDestaques);
            containerDestaques.insertBefore(btnRight, gridDestaques);
        }

        // Atribui os eventos de verificação para o carrossel de destaques
        const checarDestaques = () => atualizarVisibilidadeSetas(gridDestaques, btnLeft, btnRight);

        checarDestaques();
        window.addEventListener('resize', checarDestaques);
        gridDestaques.addEventListener('scroll', checarDestaques);
    }
});

// ==========================================
// FAQ - ACORDEÃO (EXPANDIR/RECOLHER)
// ==========================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
        question.addEventListener('click', function() {
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    }
});

// ==========================================
// BALÃO DO WHATSAPP
// ==========================================
const balaoClose = document.querySelector(".balloon-close");

if (balaoClose) {
    balaoClose.addEventListener("click", function(event) {
        event.stopPropagation();
        const balao = document.getElementById('whatsapp-balloon');
        if (balao) balao.style.display = 'none';
        this.style.display = 'none';
    });
}

// ==========================================
// ANIMAÇÕES DE SCROLL (FADE IN)
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll(`
    .servico-card,
    .destaque-card,
    .beneficio-item,
    .faq-item,
    .info-item
`);

animatedElements.forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});