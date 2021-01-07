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

  // we will get 0,0 when we are in center
  // extremities are [-.5,.5]
  const xPos = offsetX / clientWidth - 0.5
  const yPos = offsetY / clientHeight - 0.5
  const leftImages = gsap.utils.toArray(".hg__image")
  const modifier = index => index * 2 + .5
  leftImages.forEach((image, index) => {
    gsap.to(image,
      {
        duration: 1.2,
        x: xPos * 20 * modifier(index * 0.5),
        y: yPos * 30 * modifier(index * 0.5),
        rotationX: yPos * 10,
        rotationY: xPos * 40,
        ease: "Power3.out"
      })
  })
  gsap.to('.decor__circle', {
    duration: 1.7,
    x: 100 * xPos,
    y: 120 * yPos,
    ease: "Power4.out"
  })
}

function init() {

  initNavigation();
  initHeaderTilt()

}

window.addEventListener('load', function () {
  init();
});
