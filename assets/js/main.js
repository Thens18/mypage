/**
* Template Name: iPortfolio - v3.7.0
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  gsap.registerPlugin(MotionPathPlugin);
  MorphSVGPlugin.convertToPath("circle, rect");
  gsap.set("#paperPlaneRoute", { drawSVG: "0% 0%" });
  gsap.set("#rectSentItems", { x: "-=240" });
  const tl = gsap.timeline();
  
  let ranOnce = false;
  
  function onBtnUp() {
    if (ranOnce) {
      tl.restart();
      return;
    }
    ranOnce = true;
    tl.to("#base", { duration: 0.2, scale: 1, transformOrigin: "50% 50%" });
    tl.to(
      "#btnBase",
      { duration: 0.77, morphSVG: "#cBottom", ease: "power1.inOut" },
      "start"
    );
  
    tl.to("#btnBase", { duration: 0.23, morphSVG: "#cTop", ease: "power1.inOut" });
    tl.to("#btnBase", {
      duration: 0.2,
      morphSVG: "#cCenter",
      ease: "power1.inOut"
    });
    tl.to(
      "#btnBase",
      { duration: 0.5, morphSVG: "#cEnd", ease: "power1.inOut" },
      "revealStart"
    );
    tl.to("#rectSentItems", { x: "0", duration: 0.5 }, "revealStart");
    tl.to(
      "#mask1",
      { x: "-=260", duration: 0.5, ease: "power1.inOut" },
      "revealStart"
    );
    tl.to(
      "#paperPlane",
      { x: "-=205", duration: 0.5, ease: "power1.inOut" },
      "revealStart"
    );
    tl.to(
      "#paperPlanePath",
      { duration: 0.43, morphSVG: "#tickMark" },
      "start+=0.77"
    );
  
    tl.to(
      "#txtSend",
      { duration: 0.6, scale: 0, transformOrigin: "50% 50%" },
      "start"
    );
    tl.to(
      "#paperPlaneRoute",
      { drawSVG: "80% 100%", duration: 0.7, ease: "power1.inOut" },
      "start+=0.3"
    );
    tl.to(
      "#paperPlaneRoute",
      { drawSVG: "100% 100%", duration: 0.2, ease: "power1.inOut" },
      "start+=1"
    );
  
    tl.to(
      "#paperPlane",
      {
        duration: 1,
        ease: "power1.inOut",
        immediateRender: true,
        motionPath: {
          path: "#paperPlaneRoute",
          align: "#paperPlaneRoute",
          alignOrigin: [0.5, 0.5],
          autoRotate: 90
        }
      },
      "start"
    );
  
    tl.to(
      "#paperPlanePath",
      { duration: 0.15, attr: { fill: "#ffffff" } },
      "start"
    );
    tl.to(
      "#paperPlanePath",
      { duration: 0.15, attr: { fill: "#4E67E8" } },
      "start+=0.77"
    );
  }
  
  function onBtnDown() {
    gsap.timeline({ defaults: { clearProps: true } });
    gsap.to("#base", { duration: 0.1, scale: 0.9, transformOrigin: "50% 50%" });
  }
  
  const btn = document.getElementById("base");
  btn.addEventListener("mousedown", onBtnDown);
  btn.addEventListener("mouseup", onBtnUp);
  
})()
