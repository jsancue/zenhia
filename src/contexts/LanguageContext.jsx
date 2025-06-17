"use client"

import { createContext, useState, useEffect } from "react"

// Traducciones
export const translations = {
  es: {
    hero: {
      title: "Belleza Natural en Lebrija",
      subtitle:
        "Descubre la armonía entre belleza y bienestar en nuestro espacio dedicado a realzar tu belleza natural",
      cta: "Reserva tu cita",
    },
    nav: {
      home: "Inicio",
      services: "Servicios",
      about: "Nosotros",
      gallery: "Galería",
      testimonials: "Testimonios",
      booking: "Reservas",
      contact: "Contacto",
    },
    services: {
      title: "Nuestros Servicios",
      emptyMessage: "No hay servicios disponibles por el momento.",
      subtitle:
        "Descubre nuestra amplia gama de servicios especializados en belleza y bienestar, diseñados para realzar tu belleza natural.",
      manicure: {
        title: "Manicura y Pedicura",
        description: "Cuidado completo de manos y pies con técnicas profesionales y productos de calidad.",
      },
      depilation: {
        title: "Depilación y Epilación",
        description: "Eliminación del vello no deseado con métodos seguros y duraderos.",
      },
      massage: {
        title: "Masajes",
        description: "Masajes relajantes y terapéuticos para aliviar tensiones y renovar energías.",
      },
      maderoterapia: {
        title: "Maderoterapia",
        description: "Técnica natural con instrumentos de madera para modelar y tonificar el cuerpo.",
      },
      callus: {
        title: "Eliminación de Durezas",
        description: "Tratamiento especializado para eliminar callosidades y durezas de pies y manos.",
      },
      dermapen: {
        title: "Dermapen",
        description: "Microagujas para rejuvenecimiento facial, mejora de textura y reducción de cicatrices.",
      },
      microblading: {
        title: "Microblading",
        description: "Técnica de micropigmentación para cejas perfectas y naturales.",
      },
    },
    about: {
      title: "Sobre Nosotros",
      subtitle: "Conoce la historia y filosofía detrás de Zenhia Belleza",
      description:
        "En Zenhia Belleza creemos en realzar la belleza natural de cada persona. Nuestro equipo de profesionales está dedicado a proporcionar servicios personalizados que te harán sentir renovado/a y con confianza.",
      mission: "Nuestra Misión",
      missionText:
        "Proporcionar servicios de belleza de alta calidad que realcen la belleza natural de nuestros clientes, utilizando productos respetuosos con el medio ambiente.",
      vision: "Nuestra Visión",
      visionText:
        "Ser reconocidos como el salón de belleza líder en Lebrija, conocido por su excelencia, innovación y compromiso con la satisfacción del cliente.",
    },
    gallery: {
      title: "Nuestra Galería",
      subtitle: "Explora algunos de nuestros trabajos más destacados",
    },
    testimonials: {
      title: "Testimonios",
      subtitle: "Lo que nuestros clientes dicen sobre nosotros",
    },
    booking: {
      title: "Reserva tu Cita",
      subtitle: "Selecciona el servicio y la fecha que prefieras",
      name: "Nombre",
      email: "Correo electrónico",
      phone: "Teléfono",
      service: "Servicio",
      date: "Fecha",
      time: "Hora",
      message: "Mensaje (opcional)",
      submit: "Reservar Cita",
      success: "¡Gracias! Tu cita ha sido reservada. Te contactaremos pronto para confirmar.",
    },
    contact: {
      title: "Contacto",
      subtitle: "Estamos aquí para ayudarte",
      address: "Dirección",
      phone: "Teléfono",
      email: "Correo electrónico",
      hours: "Horario",
      form: {
        name: "Nombre",
        email: "Correo electrónico",
        subject: "Asunto",
        message: "Mensaje",
        submit: "Enviar Mensaje",
      },
    },
    footer: {
      rights: "Todos los derechos reservados",
      privacy: "Política de Privacidad",
      terms: "Términos y Condiciones",
    },
  },
  en: {
    hero: {
      title: "Natural Beauty in Lebrija",
      subtitle:
        "Discover the harmony between beauty and wellness in our space dedicated to enhancing your natural beauty",
      cta: "Book an appointment",
    },
    nav: {
      home: "Home",
      services: "Services",
      about: "About",
      gallery: "Gallery",
      testimonials: "Testimonials",
      booking: "Booking",
      contact: "Contact",
    },
    services: {
      title: "Our Services",
      subtitle:
        "Discover our wide range of specialized beauty and wellness services, designed to enhance your natural beauty.",
      emptyMessage: "No hay servicios disponibles por el momento.",
      manicure: {
        title: "Manicure and Pedicure",
        description: "Complete hand and foot care with professional techniques and quality products.",
      },
      depilation: {
        title: "Hair Removal and Epilation",
        description: "Removal of unwanted hair with safe and long-lasting methods.",
      },
      massage: {
        title: "Massages",
        description: "Relaxing and therapeutic massages to relieve tension and renew energy.",
      },
      maderoterapia: {
        title: "Wood Therapy",
        description: "Natural technique with wooden instruments to shape and tone the body.",
      },
      callus: {
        title: "Callus Removal",
        description: "Specialized treatment to remove calluses and hardness from feet and hands.",
      },
      dermapen: {
        title: "Dermapen",
        description: "Microneedling for facial rejuvenation, texture improvement and scar reduction.",
      },
      microblading: {
        title: "Microblading",
        description: "Micropigmentation technique for perfect and natural eyebrows.",
      },
    },
    about: {
      title: "About Us",
      subtitle: "Learn about the history and philosophy behind Zenhia Belleza",
      description:
        "At Zenhia Belleza we believe in enhancing the natural beauty of each person. Our team of professionals is dedicated to providing personalized services that will make you feel renewed and confident.",
      mission: "Our Mission",
      missionText:
        "To provide high-quality beauty services that enhance our clients' natural beauty, using environmentally friendly products.",
      vision: "Our Vision",
      visionText:
        "To be recognized as the leading beauty salon in Lebrija, known for its excellence, innovation, and commitment to customer satisfaction.",
    },
    gallery: {
      title: "Our Gallery",
      subtitle: "Explore some of our most outstanding work",
    },
    testimonials: {
      title: "Testimonials",
      subtitle: "What our clients say about us",
    },
    booking: {
      title: "Book Your Appointment",
      subtitle: "Select the service and date you prefer",
      name: "Name",
      email: "Email",
      phone: "Phone",
      service: "Service",
      date: "Date",
      time: "Time",
      message: "Message (optional)",
      submit: "Book Appointment",
      success: "Thank you! Your appointment has been booked. We will contact you soon to confirm.",
    },
    contact: {
      title: "Contact",
      subtitle: "We're here to help",
      address: "Address",
      phone: "Phone",
      email: "Email",
      hours: "Hours",
      form: {
        name: "Name",
        email: "Email",
        subject: "Subject",
        message: "Message",
        submit: "Send Message",
      },
    },
    footer: {
      rights: "All rights reserved",
      privacy: "Privacy Policy",
      terms: "Terms and Conditions",
    },
  },
}

export const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Intentar obtener el idioma guardado en localStorage
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("zenhia-language")

      // Si no hay idioma guardado, intentar detectar el idioma del navegador
      if (!savedLanguage) {
        const browserLang = navigator.language.split("-")[0]
        return translations[browserLang] ? browserLang : "es" // Español por defecto
      }

      return savedLanguage
    }
    return "es" // Valor por defecto para SSR
  })

  const [texts, setTexts] = useState(translations[language])

  useEffect(() => {
    setTexts(translations[language])
    document.documentElement.lang = language

    // Guardar el idioma en localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("zenhia-language", language)
    }
  }, [language])

  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage)
    }
  }

  return <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, texts }}>{children}</LanguageContext.Provider>
}
