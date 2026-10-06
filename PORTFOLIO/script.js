/* =========================================================
   ABBAS ALI — DATA SCIENTIST PORTFOLIO
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. ELEMENTS
    ===================================================== */

    const siteHeader = document.getElementById("siteHeader");
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    const sections = document.querySelectorAll("main section[id]");

    const currentYear = document.getElementById("currentYear");

    const animatedElements = document.querySelectorAll(".reveal");

    const clickableButtons = document.querySelectorAll(
        ".btn, .hero-socials a, .contact-card, .nav-social, .footer-socials a"
    );


    /* =====================================================
       02. CURRENT YEAR
    ===================================================== */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       03. MOBILE NAVIGATION
    ===================================================== */

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navMenu.classList.toggle("open");

            document.body.classList.toggle("menu-open", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            const icon = menuToggle.querySelector("i");

            if (icon) {

                if (isOpen) {

                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");

                    menuToggle.setAttribute(
                        "aria-label",
                        "Close navigation menu"
                    );

                } else {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                    menuToggle.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );
                }
            }

        });

    }


    /* =====================================================
       04. CLOSE MOBILE MENU AFTER NAVIGATION
    ===================================================== */

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            if (!navMenu || !menuToggle) {
                return;
            }

            navMenu.classList.remove("open");

            document.body.classList.remove("menu-open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            const icon = menuToggle.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });


    /* =====================================================
       05. CLOSE MENU WITH ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key !== "Escape") {
            return;
        }

        if (!navMenu || !menuToggle) {
            return;
        }

        navMenu.classList.remove("open");

        document.body.classList.remove("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        const icon = menuToggle.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    });


    /* =====================================================
       06. HEADER SCROLL EFFECT
    ===================================================== */

    const updateHeader = () => {

        if (!siteHeader) {
            return;
        }

        if (window.scrollY > 50) {

            siteHeader.classList.add("scrolled");

        } else {

            siteHeader.classList.remove("scrolled");

        }

    };


    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =====================================================
       07. ACTIVE NAVIGATION
    ===================================================== */

    const updateActiveNavigation = () => {

        let currentSection = "home";

        const scrollPosition =
            window.scrollY + 180;


        sections.forEach((section) => {

            const sectionTop = section.offsetTop;

            const sectionHeight = section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {

                currentSection = section.id;

            }

        });


        navLinks.forEach((link) => {

            const linkTarget =
                link.getAttribute("href");


            link.classList.toggle(
                "active",
                linkTarget === `#${currentSection}`
            );

        });

    };


    updateActiveNavigation();

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );


    /* =====================================================
       08. SMOOTH SCROLL
    ===================================================== */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );


    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#" ||
                targetId.length <= 1
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (!target) {
                return;
            }


            event.preventDefault();


            const headerHeight =
                siteHeader
                    ? siteHeader.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;


            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       09. SCROLL REVEAL
    ===================================================== */

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        entry.target.classList.add(
                            "reveal-visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );


        animatedElements.forEach((element) => {

            revealObserver.observe(element);

        });

    } else {

        animatedElements.forEach((element) => {

            element.classList.add(
                "reveal-visible"
            );

        });

    }


    /* =====================================================
       10. STAGGER CARD ANIMATIONS
    ===================================================== */

    const staggerGroups = [
        ".skills-grid .skill-card",
        ".projects-grid .project-card",
        ".certifications-grid .certification-card",
        ".contact-grid .contact-card"
    ];


    staggerGroups.forEach((selector) => {

        const items =
            document.querySelectorAll(selector);


        items.forEach((item, index) => {

            item.style.transitionDelay =
                `${index * 70}ms`;

        });

    });


    /* =====================================================
       11. BUTTON CLICK ANIMATION
    ===================================================== */

    clickableButtons.forEach((button) => {

        button.addEventListener("click", () => {

            button.classList.remove(
                "button-clicked"
            );


            /*
             * Force browser reflow so animation
             * can restart on every click.
             */
            void button.offsetWidth;


            button.classList.add(
                "button-clicked"
            );

        });

    });


    /* =====================================================
       12. HERO IMAGE LOAD CHECK
    ===================================================== */

    const heroBackground =
        document.querySelector(".hero-background");


    if (heroBackground) {

        const heroImage =
            new Image();


        heroImage.onload = () => {

            heroBackground.classList.add(
                "image-loaded"
            );

        };


        heroImage.onerror = () => {

            console.warn(
                "Portfolio image could not be loaded. Check: assets/profile.png"
            );

            heroBackground.classList.add(
                "image-error"
            );

        };


        heroImage.src =
            "assets/profile.png";

    }


    /* =====================================================
       13. HERO PARALLAX EFFECT
    ===================================================== */

    const heroSection =
        document.querySelector(".hero-section");


    if (
        heroSection &&
        heroBackground &&
        window.matchMedia("(min-width: 851px)").matches
    ) {

        let ticking = false;


        const updateParallax = () => {

            const scrollY =
                window.scrollY;


            if (scrollY <= window.innerHeight) {

                const movement =
                    scrollY * 0.08;


                heroBackground.style.transform =
                    `scale(1.03) translateY(${movement}px)`;

            }


            ticking = false;

        };


        window.addEventListener(
            "scroll",
            () => {

                if (!ticking) {

                    window.requestAnimationFrame(
                        updateParallax
                    );

                    ticking = true;

                }

            },
            { passive: true }
        );

    }


    /* =====================================================
       14. PROJECT CARD POINTER EFFECT
    ===================================================== */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    if (
        projectCards.length &&
        window.matchMedia("(hover: hover)").matches
    ) {

        projectCards.forEach((card) => {

            card.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const centerX =
                        rect.width / 2;


                    const centerY =
                        rect.height / 2;


                    const rotateX =
                        ((y - centerY) / centerY) * -1.5;


                    const rotateY =
                        ((x - centerX) / centerX) * 1.5;


                    card.style.transform =
                        `translateY(-8px) perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        });

    }


    /* =====================================================
       15. CONTACT CARD KEYBOARD ACCESS
    ===================================================== */

    const contactCards =
        document.querySelectorAll(
            ".contact-card"
        );


    contactCards.forEach((card) => {

        card.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    card.click();

                }

            }
        );

    });


    /* =====================================================
       16. PAGE LOAD
    ===================================================== */

    window.addEventListener(
        "load",
        () => {

            document.body.classList.add(
                "page-loaded"
            );

            updateHeader();
            updateActiveNavigation();

        }
    );


    /* =====================================================
       17. CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "Abbas Ali Portfolio — Loaded Successfully."
    );

});