/* global anime */

// Sistema de scroll ultra fluido con RAF y interpolación
class UnifiedProductShowcase {
  constructor() {
    this.products = ["smooth", "touch", "estandar"]
    this.currentProduct = 0
    this.isTransitioning = false
    this.sections = []
    this.showcase = null
    this.productInfos = []
    this.productImageSets = []
    this.init()
  }

  init() {
    this.cacheElements()
    this.bindEvents()
    this.updateShowcase() // Llamada inicial
  }

  cacheElements() {
    this.showcase = document.querySelector(".unified-product-section")
    this.productInfos = document.querySelectorAll(".product-info")
    this.productImageSets = document.querySelectorAll(".product-image-set")

    if (!this.showcase) {
      console.log("[v0] Unified product section not found, falling back to original sections")
      this.initOriginalSections()
      return
    }
  }

  bindEvents() {
    if (!this.showcase) return

    window.addEventListener(
      "scroll",
      () => {
        this.updateShowcase()
      },
      { passive: true },
    )

    window.addEventListener("resize", () => {
      this.updateShowcase()
    })
  }

  updateShowcase() {
    if (!this.showcase) return

    const scrollY = window.pageYOffset
    const windowHeight = window.innerHeight
    const showcaseRect = this.showcase.getBoundingClientRect()
    const showcaseTop = showcaseRect.top + scrollY
    const showcaseHeight = showcaseRect.height

    // Calculate progress through the showcase section (0 to 1)
    const showcaseProgress = Math.max(
      0,
      Math.min(1, (scrollY - showcaseTop + windowHeight * 0.5) / (showcaseHeight - windowHeight)),
    )

    // Determine which product should be active based on scroll progress
    const productProgress = showcaseProgress * (this.products.length - 1)
    const targetProduct = Math.floor(productProgress)
    const transitionProgress = productProgress - targetProduct

    // Update active product if changed
    if (targetProduct !== this.currentProduct && !this.isTransitioning) {
      this.transitionToProduct(targetProduct, transitionProgress)
    } else if (targetProduct === this.currentProduct) {
      this.updateTransitionProgress(transitionProgress)
    }
  }

  transitionToProduct(newProduct, progress = 0) {
    if (newProduct < 0 || newProduct >= this.products.length) return

    this.isTransitioning = true
    this.currentProduct = newProduct

    // Update product info
    this.productInfos.forEach((info, index) => {
      if (index === newProduct) {
        info.classList.add("active")
      } else {
        info.classList.remove("active")
      }
    })

    // Update product images
    this.productImageSets.forEach((imageSet, index) => {
      if (index === newProduct) {
        imageSet.classList.add("active")
      } else {
        imageSet.classList.remove("active")
      }
    })

    // Use Anime.js for smooth transitions if available
    if (typeof window !== "undefined" && window.anime) {
      window.anime({
        targets: ".product-info.active",
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        easing: "easeOutCubic",
        complete: () => {
          this.isTransitioning = false
        },
      })

      window.anime({
        targets: ".product-image-set.active",
        opacity: [0, 1],
        scale: [0.95, 1],
        duration: 1000,
        easing: "easeOutCubic",
        delay: 200,
      })
    } else {
      setTimeout(() => {
        this.isTransitioning = false
      }, 800)
    }
  }

  updateTransitionProgress(progress) {
    // Smooth micro-adjustments during transition
    const activeInfo = document.querySelector(".product-info.active")
    const activeImageSet = document.querySelector(".product-image-set.active")

    if (activeInfo) {
      const offset = Math.sin(progress * Math.PI) * 5
      activeInfo.style.transform = `translateY(${offset}px)`
    }

    if (activeImageSet) {
      const scale = 1 + Math.sin(progress * Math.PI) * 0.02
      activeImageSet.style.transform = `scale(${scale})`
    }
  }

  initOriginalSections() {
    this.sections = Array.from(document.querySelectorAll(".product-section")).map((section, index) => {
      const images = section.querySelectorAll(".product-image")
      const contents = section.querySelectorAll(".image-content")

      return {
        element: section,
        index: index,
        images: Array.from(images),
        contents: Array.from(contents),
      }
    })

    window.addEventListener(
      "scroll",
      () => {
        this.updateOriginalSections()
      },
      { passive: true },
    )

    this.updateOriginalSections()
  }

  updateOriginalSections() {
    const scrollY = window.pageYOffset
    const windowHeight = window.innerHeight

    this.sections.forEach((section) => {
      const rect = section.element.getBoundingClientRect()
      const sectionTop = rect.top + scrollY
      const sectionHeight = rect.height

      const sectionCenter = sectionTop + sectionHeight / 2
      const distanceFromCenter = scrollY + windowHeight / 2 - sectionCenter

      let progress = distanceFromCenter / (sectionHeight * 0.8) + 0.5
      progress = Math.max(0, Math.min(1, progress))

      section.images.forEach((image, imageIndex) => {
        const content = section.contents[imageIndex]

        if (imageIndex === 0) {
          const clipValue = progress * 100
          image.style.clipPath = `inset(0 0 ${clipValue}% 0)`
          image.style.opacity = Math.max(0.2, 1 - progress * 0.7)
          image.style.transform = `translateY(${progress * 30}px) scale(${1 - progress * 0.05})`

          if (content) {
            content.style.opacity = Math.max(0, 1 - progress * 1.2)
            content.style.transform = `translateY(${progress * 40}px)`
          }
        } else if (imageIndex === 1) {
          const clipValue = Math.max(0, 100 - progress * 100)
          image.style.clipPath = `inset(${clipValue}% 0 0 0)`
          image.style.opacity = Math.min(1, progress + 0.2)
          image.style.transform = `translateY(${(1 - progress) * 50}px) scale(${0.95 + progress * 0.05})`

          if (content) {
            const contentProgress = Math.max(0, progress - 0.3)
            content.style.opacity = Math.min(1, contentProgress * 1.5)
            content.style.transform = `translateY(${(1 - contentProgress) * 30}px)`
          }
        }
      })
    })
  }

  destroy() {
    // Cleanup code here
  }
}

let productShowcase

// Navbar y parallax optimizados
function handleNavbarAndParallax() {
  const scrolled = window.pageYOffset
  const parallaxText = document.querySelector(".main-text")
  const navbar = document.querySelector(".navbar")

  if (parallaxText) {
    parallaxText.style.transform = `translateY(-${scrolled * 0.3}px)`
  }

  if (navbar) {
    const opacity = scrolled > 50 ? 0.98 : 0.95
    const shadow = scrolled > 50 ? "0 15px 35px rgba(0,0,0,0.15)" : "0 10px 30px rgba(0,0,0,0.1)"

    navbar.style.background = `rgba(255, 255, 255, ${opacity})`
    navbar.style.boxShadow = shadow
  }
}

// Event listener optimizado para navbar
let navbarTicking = false
window.addEventListener(
  "scroll",
  () => {
    if (!navbarTicking) {
      requestAnimationFrame(() => {
        handleNavbarAndParallax()
        navbarTicking = false
      })
      navbarTicking = true
    }
  },
  { passive: true },
)

// Smooth scroll para navegación con Anime.js
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target && typeof window !== "undefined" && window.anime) {
      window.anime({
        targets: "html, body",
        scrollTop: target.offsetTop - 100, // Account for fixed navbar
        duration: 1200,
        easing: "easeInOutCubic",
      })
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  })
})

// CSS optimizations para mejor rendimiento
const addPerformanceStyles = () => {
  const style = document.createElement("style")
  style.textContent = `
        .product-image {
            will-change: transform, opacity, clip-path;
            backface-visibility: hidden;
            perspective: 1000px;
            transform-style: preserve-3d;
        }
        
        .image-content {
            will-change: transform, opacity;
            backface-visibility: hidden;
        }
        
        .product-section {
            contain: layout style paint;
        }
    `
  document.head.appendChild(style)
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  addPerformanceStyles()

  // Initialize the unified product showcase
  productShowcase = new UnifiedProductShowcase()
  handleNavbarAndParallax()

  if (typeof window !== "undefined" && !window.anime) {
    const script = document.createElement("script")
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"
    document.head.appendChild(script)
  }
})

// Cleanup al cambiar de página
window.addEventListener("beforeunload", () => {
  if (productShowcase) {
    productShowcase.destroy()
  }
})
