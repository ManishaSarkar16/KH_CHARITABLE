(function() {
  "use strict";

  function handleScroll() {
      const body = document.body;
      const header = document.getElementById('header');
      if (!header.classList.contains('scroll-up-sticky') && !header.classList.contains('sticky-top') && !header.classList.contains('fixed-top')) return;
      window.scrollY > 100 ? body.classList.add('scrolled') : body.classList.remove('scrolled');
  }

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('load', handleScroll);

  const mobileNavButton = document.querySelector('.mobile-nav-toggle');

  function toggleMobileNav() {
      document.body.classList.toggle('mobile-nav-active');
      mobileNavButton.classList.toggle('bi-list');
      mobileNavButton.classList.toggle('bi-x');
  }

  if (mobileNavButton) {
      mobileNavButton.addEventListener('click', toggleMobileNav);
  }

  document.querySelectorAll('#navmenu a').forEach(link => {
      link.addEventListener('click', () => {
          if (document.body.classList.contains('mobile-nav-active')) {
              toggleMobileNav();
          }
      });
  });

  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(dropdownButton => {
      dropdownButton.addEventListener('click', function(event) {
          event.preventDefault();
          this.parentElement.classList.toggle('active');
          this.parentElement.nextElementSibling.classList.toggle('dropdown-active');
          event.stopImmediatePropagation();
      });
  });

  const pagePreloader = document.getElementById('preloader');
  if (pagePreloader) {
      window.addEventListener('load', () => {
          pagePreloader.remove();
      });
  }

  const scrollToTopButton = document.querySelector('.scroll-top');

  function toggleScrollTopVisibility() {
      if (scrollToTopButton) {
          window.scrollY > 100 ? scrollToTopButton.classList.add('active') : scrollToTopButton.classList.remove('active');
      }
  }

  if(scrollToTopButton){
      scrollToTopButton.addEventListener('click', (event) => {
          event.preventDefault();
          window.scrollTo({
              top: 0,
              behavior: 'smooth'
          });
      });

      window.addEventListener('load', toggleScrollTopVisibility);
      window.addEventListener('scroll', toggleScrollTopVisibility);
  }

  window.addEventListener('load', () => {
      if (window.location.hash) {
          const targetSection = document.querySelector(window.location.hash);
          if (targetSection) {
              setTimeout(() => {
                  const scrollMargin = parseInt(getComputedStyle(targetSection).scrollMarginTop);
                  window.scrollTo({
                      top: targetSection.offsetTop - scrollMargin,
                      behavior: 'smooth'
                  });
              }, 100);
          }
      }
  });

  const navLinks = document.querySelectorAll('.navmenu a');

  function updateNavHighlight() {
      navLinks.forEach(navLink => {
          if (!navLink.hash) return;
          const section = document.querySelector(navLink.hash);
          if (!section) return;
          const scrollPosition = window.scrollY + 200;
          if (scrollPosition >= section.offsetTop && scrollPosition <= (section.offsetTop + section.offsetHeight)) {
              document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
              navLink.classList.add('active');
          } else {
              navLink.classList.remove('active');
          }
      });
  }

  window.addEventListener('load', updateNavHighlight);
  window.addEventListener('scroll', updateNavHighlight);
})();