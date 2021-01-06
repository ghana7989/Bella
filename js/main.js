gsap.registerPlugin(ScrollTrigger);

function initNavigation() {
  const navLinks = gsap.utils.toArray(".main-nav a");
  const navLinksReversed = gsap.utils.toArray(".main-nav a").reverse();
  navLinks.forEach((link) => {
    link.addEventListener("mouseleave", e => {
      link.classList.add('animate-out')
      setTimeout(() => link.classList.remove('animate-out'), 300)
    })
  })

  // a function to return tween
  function navAnimation(direction) {
    const scrollingDown = direction === 1;
    const links = scrollingDown ? navLinks : navLinksReversed;
    return gsap.to(links, {
      duration: .3,
      stagger: 0.05,
      autoAlpha: () => scrollingDown ? 0 : 1,
      y: () => scrollingDown ? 20 : 0,
      ease: 'Power4.out'
    })
  }

  ScrollTrigger.create({
    start: 60,
    end: 'bottom bottom-=20',
    toggleClass: {
      targets: "body",
      className: "has-scrolled"
    },
    onEnter: ({ direction }) => navAnimation(direction),
    onLeaveBack: ({ direction }) => navAnimation(direction),
    // markers: true
  })

}

function initHeaderTilt() {
  const Header = document.querySelector("header")
  Header.addEventListener('mousemove', moveImages)
}

function moveImages(e) {
  const { offsetX, offsetY, target } = e;
  const { clientWidth, clientHeight } = target
}

function init() {

  initNavigation();
  initHeaderTilt()

}

window.addEventListener('load', function () {
  init();
});
