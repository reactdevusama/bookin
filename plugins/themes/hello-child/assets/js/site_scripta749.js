window.history.scrollRestoration = "manual";


document.addEventListener('DOMContentLoaded', () => {
// 	  setTimeout(() => {
//     window.scrollTo(0, 0); // Ensure scroll is reset after DOM loads
//   }, 0);


    // Check if there's a hash in the URL
    if (window.location.hash) {
        scrollToHash(window.location.hash);
    }

    // Handle clicks on anchor links
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", (e) => {
            e.preventDefault();
            const targetHash = e.target.getAttribute("href");
            scrollToHash(targetHash);
        });
    });

    // Function to handle smooth scrolling with GSAP
    function scrollToHash(hash) {
		const headerOffset = 200; // Adjust this value for sticky headers or other offsets
        const targetSection = document.querySelector(hash);
        if (targetSection) {
            const offset = targetSection.getBoundingClientRect().top + window.scrollY - headerOffset; // Adjust for header
            gsap.to(window, { scrollTo: offset, duration: 0.3, ease: "power2.out" });
        }
    }



  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  // Create ScrollSmoother instance
  const smoother = ScrollSmoother.create({
    content: ".scrollsmoother-container",
    smooth: 1, // Adjust the smoothness factor as needed
    effects: true,
    preventDefault: true,
  });

  // Recalculate heights after scaling
  window.addEventListener("resize", () => {
    smoother.refresh(); // Updates ScrollSmoother calculations
  });


  // Fade Slide Left to Right
  const animateFadeIn = (selector) => {
    gsap.utils.toArray(selector).forEach((el) => {
      // Set initial properties: invisible, off-screen (x: -100% of its width), and opacity 0
      gsap.set(el, {
        opacity: 0,
        x: -el.offsetWidth, // Start off-screen by its exact width
      });

      // Animate on scroll: slide in from left and fade in
      gsap.to(el, {
        opacity: 1,
        x: 0, // Move to its original position
        duration: 1.5,
        ease: "power4.out",
      });
    });
  };

  animateFadeIn('.slide__in');

  // Fade Slide bottom to top
  const animateSlideUP = (selector) => {
    gsap.utils.toArray(selector).forEach((el) => {
      gsap.set(el, {
        opacity: 0,
        y: '100%',
      });

      // Animate on scroll: slide in from left and fade in
      gsap.to(el, {
        opacity: 1,
        y: 0, // Move to its original position
        duration: 1.5,
        ease: "power4.out",
      });
    });
  };

  animateSlideUP('.slide__up');


  // Check if the animation div exists before proceeding
  const animatedDiv = document.querySelector('.animated__div');

  if (animatedDiv) {
    const mobileOne = document.querySelector('.mobile__one');
    const mobileTwo = document.querySelector('.mobile__two');
	const mobileEight = document.querySelector('.mobile__eight');
    const mobileThree = document.querySelector('.mobile__three');
    const movingDiv = document.querySelector('.moving__mobiles');
    const rightColumn = document.querySelector('.right__content');
    const leftColumn = document.querySelector('.left__content');

    const getRightColumnWidth = () => rightColumn.getBoundingClientRect().width;
    const getLeftToRightDistance = () => leftColumn.getBoundingClientRect().left - rightColumn.getBoundingClientRect().left;

    const initScrollTriggerAnimations = () => {
      // Kill existing ScrollTriggers before creating new ones
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      // Main animation timeline
      gsap.timeline({
          scrollTrigger: {
            trigger: ".animated__div",
            start: "top top",
            end: "bottom 105%",
            scrub: 1,
            pin: movingDiv,
            pinSpacing: true,
            markers:0,
          },
        })
        .to(movingDiv, {
          x: getLeftToRightDistance, // Move horizontally based on dynamic distance
          duration: 1,
        })
        .to(movingDiv, {
          width: getRightColumnWidth, // Adjust width dynamically
          duration: 0.5,
        });
		

      // Animation for mobileTwo
      gsap.to(mobileTwo, {
        scrollTrigger: {
          trigger: ".section__animated",
          start: "top top",
          end: "bottom top",
          onUpdate: (self) => {
            const progress = self.progress;
            mobileTwo.style.transform = `translateX(${progress * -100}%)`;
            mobileTwo.style.opacity = 1 - progress;
          },
        },
      });

gsap.to(movingDiv, {
  top: "6%", // Target top position
  scrollTrigger: {
    trigger: ".our__features",
    start: "top top",
    end: "bottom top",
    markers: 0,
    scrub: true, // Smoothly animates as you scroll
  },
});

      // Animation for mobileOne
        gsap.to(mobileOne, {
        scrollTrigger: {
          trigger: ".section__animated",
          start: "top top",
          end: "bottom top",
		   marker:0,
          onUpdate: (self) => {
            const progress = self.progress;
            mobileOne.style.transform = `translateX(${progress * 53}%)`;
			mobileOne.style.opacity = 1 - progress;
          },
        },
      });
      gsap.to(mobileEight, {
        scrollTrigger: {
          trigger: ".section__animated",
          start: "top top",
          end: "bottom top",
		   marker:0,
          onUpdate: (self) => {
            const progress = self.progress;
			mobileEight.style.opacity = progress;
			mobileEight.style.transform = `translateX(${progress * 53}%)`;
          },
        },
      });

   
      // Animation for mobileThree
      gsap.to(mobileThree, {
        scrollTrigger: {
          trigger: ".section__animated",
          start: "top top",
          end: "bottom top",
          onUpdate: (self) => {
            const progress = self.progress;
            mobileThree.style.transform = `translateX(${progress * -159}%)`;
            mobileThree.style.opacity = progress;
			
          },
        },
      });
    };

    const removeScrollTriggerAnimations = () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

    // Use ScrollTrigger.matchMedia to manage animations for different screen sizes
    ScrollTrigger.matchMedia({
      // For desktop screens
      "(min-width: 768px)": function () {
        initScrollTriggerAnimations();
      },

      // For mobile screens
      "(max-width: 767px)": function () {
        removeScrollTriggerAnimations(); // Stop animations on mobile
      },
    });

    // Refresh ScrollTrigger on window resize to ensure dimensions are recalculated
    window.addEventListener('resize', () => {
      ScrollTrigger.refresh(); // Refresh existing animations
    });
  }





  
  (function () {
    const containerElem = document.querySelector('.our__features__list');
  
    if (containerElem) {
      initOverlappingSlider('.our__features__list');
    }
  
    function initOverlappingSlider(containerSelector) {
      const containerElem = document.querySelector(containerSelector);
  
      if (!containerElem) return;
  
      const track = containerElem.querySelector('.custom__slider');
      const slides = Array.from(track.children);
  
      let slideHeights = [];
      let currentSlideIndex = 0;
      let isAnimating = false;
      let sliderScrollTrigger = null;
  
      // Calculate the height of all slides
      const calculateSlideHeights = () => {
        slideHeights = slides.map((slide) => {
          const slideStyle = window.getComputedStyle(slide);
          return (
            slide.offsetHeight +
            parseInt(slideStyle.marginTop, 10) +
            parseInt(slideStyle.marginBottom, 10)
          );
        });
      };
  
      // Update slide positions based on the current index
      const updateSlidePositions = () => {
        slides.forEach((slide, index) => {
          const translateY =
            index <= currentSlideIndex
              ? -slideHeights.slice(0, index).reduce((sum, height) => sum + height, 0)
              : -slideHeights
                  .slice(0, currentSlideIndex)
                  .reduce((sum, height) => sum + height, 0);
  
          gsap.set(slide, {
            y: translateY,
          });
        });
      };
  
      // Synchronize slides with the current index
      const syncSlidesWithProgress = (newIndex) => {
        slides.forEach((slide, index) => {
          slide.classList.toggle('active', index === newIndex);
          slide.classList.toggle('passed', index < newIndex);
        });
        updateSlidePositions();
      };
  
      // Initialize ScrollTrigger
      const initScrollTrigger = () => {
        const totalHeight =
          slideHeights.reduce((sum, height) => sum + height, 0) - containerElem.offsetHeight;
  
        if (sliderScrollTrigger) sliderScrollTrigger.kill();
  
        sliderScrollTrigger = ScrollTrigger.create({
          trigger: containerElem,
          start: 'top 30%',
          end: `+=${totalHeight + window.innerHeight}`, // Extend slightly to show the last slide
          scrub: true,
          pin: containerElem,
          markers: 0, 
          pinSpacing: false,
          onUpdate: (self) => {
            const progress = self.progress * (slides.length - 1);
            const newIndex = Math.round(progress);
  
            if (newIndex !== currentSlideIndex) {
              currentSlideIndex = newIndex;
              syncSlidesWithProgress(currentSlideIndex);
            }
          },
        });
      };
  
      // Manual Scroll Listener for Minor Scrolls
      const handleManualScroll = () => {
        const scrollTop = containerElem.scrollTop;
        const totalHeight = slideHeights.reduce((sum, height) => sum + height, 0);
  
        const progress = scrollTop / totalHeight;
        const newIndex = Math.round(progress * (slides.length - 1));
  
        if (newIndex !== currentSlideIndex && !isAnimating) {
          currentSlideIndex = newIndex;
          syncSlidesWithProgress(currentSlideIndex);
  
          isAnimating = true;
          setTimeout(() => (isAnimating = false), 300);
        }
      };
  
      // Apply a fade-up animation for mobile
      const applyFadeUpOnMobile = () => {
        if (window.matchMedia('(max-width: 767px)').matches) {
          gsap.set(slides, {
            opacity: 0,
            y: 50,
          });
          gsap.to(slides, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power4',
            stagger: 0.2,
            scrollTrigger: {
              trigger: '.our__features__list',
              start: 'top 100%',
              end: 'bottom 0%',
              scrub: 1,
            },
          });
        }
      };
  
      const initAnimations = () => {
        if (window.matchMedia('(max-width: 767px)').matches) {
          applyFadeUpOnMobile();
        } else {
          calculateSlideHeights();
          updateSlidePositions();
          initScrollTrigger();
  
          containerElem.addEventListener('scroll', handleManualScroll, {
            passive: true,
          });
        }
      };
  
      // Initial setup
      calculateSlideHeights();
      updateSlidePositions();
      initAnimations();
  
      // Recalculate heights and refresh animations on resize
      window.addEventListener('resize', () => {
        calculateSlideHeights();
        updateSlidePositions();
        initAnimations();
        ScrollTrigger.refresh();
      });
  
      // Refresh ScrollTrigger after the page is fully loaded
      window.addEventListener('load', () => {
        ScrollTrigger.refresh();
      });
    }
  })();
  



document.querySelectorAll('a[href*="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const url = new URL(this.href); // Parse the URL of the anchor

    // Check if the anchor belongs to the current page
    if (window.location.hostname === url.hostname && window.location.pathname === url.pathname) {
      e.preventDefault(); // Prevent default behavior if the anchor is on the same page
      
      const targetId = url.hash.substring(1); // Extract the target ID (remove "#")
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        smoother.scrollTo(targetElement, true); // Smoothly scroll to the target
      }
    }
  });
});





  // Check if .membership .col-lg-4 exists before applying the animation
  const membershipCols = document.querySelectorAll(".membership .col-lg-4");

  if (membershipCols.length > 0) {
    // Initialize GSAP matchMedia
    let mm = gsap.matchMedia();

    mm.add({
        // Define conditions
        isMobile: "(max-width: 767px)", // For mobile screens
        isDesktop: "(min-width: 768px)", // For larger screens
      },
      (context) => {
        let {
          isMobile,
          isDesktop
        } = context.conditions;

        if (isMobile) {
          // Animation for mobile
          gsap.from(".membership .col-lg-4", {
            scrollTrigger: {
              trigger: ".membership",
              start: "top 80%", // Adjust trigger point for mobile
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
            opacity: 0,
            y: 30, // Smaller vertical animation for mobile
            stagger: 0.3, // Faster stagger for mobile
            duration: 1, // Shorter duration for mobile
          });
        } else if (isDesktop) {
          // Animation for desktop
          gsap.from(".membership .col-lg-4", {
            scrollTrigger: {
              trigger: ".membership",
              start: "top 60%", // Default trigger point for desktop
              end: "bottom 60%",
              toggleActions: "play reverse play reverse",
            },
            opacity: 0,
            y: 50, // Larger vertical animation for desktop
            stagger: 0.5, // Slower stagger for desktop
            duration: 1, // Longer duration for desktop
          });
        }
      }
    );
  }


  // Check if .map__pin__area exists before adding ScrollTrigger behavior
  const mapPinArea = document.querySelector(".map__pin__area");
  if (mapPinArea) {
    ScrollTrigger.create({
      trigger: ".map__pin__area",
      start: "top 60%",
      end: "bottom 20%",
      markers: 0,
      onEnter: () => mapPinArea.classList.add("active"),
      onLeave: () => mapPinArea.classList.remove("active"),
      onEnterBack: () => mapPinArea.classList.add("active"),
      onLeaveBack: () => mapPinArea.classList.remove("active"),
    });
  }
  // Initialize GSAP matchMedia
  let mm = gsap.matchMedia();

  mm.add({
      // Define conditions for mobile and desktop
      isMobile: "(max-width: 767px)", // Mobile
      isDesktop: "(min-width: 768px)", // Desktop
    },
    (context) => {
      let {
        isMobile,
        isDesktop
      } = context.conditions;

      // Animation for .community_img_box
      const communityImgBox = document.querySelector(".community_img_box");
      if (communityImgBox) {
        if (isMobile) {
          // Mobile animation
          gsap.from(".community_img_box", {
            scrollTrigger: {
              trigger: ".community",
              start: "top 30%", // Adjust trigger point for mobile
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
            opacity: 0,
            y: 80, 
            duration: 1,
          });
        } else if (isDesktop) {
          // Desktop animation
          gsap.from(".community_img_box", {
            scrollTrigger: {
              trigger: ".community",
              start: "top 50%",
              end: "bottom 30%",
              toggleActions: "play reverse play reverse",
            },
            opacity: 0,
            y: 150, 
            duration: 1, 
          });
        }
      }

      // Animation for .rotate__right
      const rotateRight = document.querySelector(".rotate__right");
      if (rotateRight) {
        if (isMobile) {
          // Mobile animation
          gsap.from(".rotate__right", {
            scrollTrigger: {
              trigger: ".community",
              start: "top 30%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
            rotation: -10, // Smaller rotation for mobile
            opacity: 0,
            duration: 1, 
          });
        } else if (isDesktop) {
          // Desktop animation
          gsap.from(".rotate__right", {
            scrollTrigger: {
              trigger: ".community",
              start: "top 50%",
              end: "bottom 30%",
              toggleActions: "play reverse play reverse",
            },
            rotation: -20, 
            opacity: 0,
            duration: 1, 
          });
        }
      }

      // Animation for .rotate__left
      const rotateLeft = document.querySelector(".rotate__left");
      if (rotateLeft) {
        if (isMobile) {
          // Mobile animation
          gsap.from(".rotate__left", {
            scrollTrigger: {
              trigger: ".community",
              start: "top 30%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
            rotation: 10, // Smaller rotation for mobile
            opacity: 0,
            duration: 1,
          });
        } else if (isDesktop) {
          // Desktop animation
          gsap.from(".rotate__left", {
            scrollTrigger: {
              trigger: ".community",
              start: "top 50%",
              end: "bottom 30%",
              toggleActions: "play reverse play reverse",
            },
            rotation: 20, // Larger rotation for desktop
            opacity: 0,
            duration: 1, 
          });
        }
      }
    }
  );

  // Loop through all elements with the 'lottie-animation' class
  document.querySelectorAll('.lottie-animation').forEach(function (container) {
    lottie.loadAnimation({
      container: container, // Each Lottie container
      renderer: 'svg', // Render type (svg, canvas, or html)
      loop: true, // Should the animation loop
      autoplay: true, // Should the animation autoplay
      path: container.getAttribute('data-file') // Get the JSON file from the data-file attribute
    });
  });
});

jQuery(document).ready(function () {



  jQuery(".city__item").slice(0, 4).show();
  jQuery(".city__view__more").show();

  // Toggle dropdown
  jQuery(".city__dropdown__header").click(function () {
    const content = jQuery(this).next(".city__dropdown__content");
    content.slideToggle(300);
    // Toggle the active class on the header
    jQuery(this).toggleClass("active");
    // Rotate the arrow icon
    jQuery(this).find(".icon__arrow").toggleClass("rotate");
  });

  // Load more cities on "View More" click
  jQuery(".city__view__more").click(function () {
    const hiddenItems = jQuery(".city__item:hidden");
    hiddenItems.slice(0, 4).slideDown();

    // Hide the "View More" button if no more items are left
    if (hiddenItems.slice(4).length === 0) {
      jQuery(this).hide();
    }
  });









  jQuery('.our__testimonial__slider').owlCarousel({
    loop: true,
    margin: 30,
    responsiveClass: true,
    autoHeight: false,
    autoplay: true,
    items: 3,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      900: {
        items: 3,
      }
    }
  })


});




