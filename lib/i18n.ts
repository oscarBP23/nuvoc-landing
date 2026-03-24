export type Lang = 'es' | 'en'

export const translations = {
  es: {
    nav: {
      howItWorks: 'Cómo funciona',
      pricing: 'Precios',
      cta: 'Empezar gratis',
      langToggle: 'EN',
    },
    hero: {
      recording: 'GRABANDO',
      headline1: 'Tú hablas.',
      headline2: 'WhatsApp entrega.',
      headlineAccent: 'NUVOC documenta.',
      subheadline:
        'La nota de evolución, el resumen para tu paciente y la próxima cita — todo por WhatsApp, en 30 segundos.',
      cta1: 'Prueba gratis por 1 mes',
      cta2: 'Ver cómo funciona',
      micro: 'Sin tarjeta de crédito · Cancela cuando quieras · Funciona en tu celular',
      phone: {
        label: 'NUVOC',
        msg1: 'Hola, aquí tu resumen de consulta de hoy 📋',
        msg2: 'Diagnóstico: Hipertensión arterial controlada. Continúa con Losartán 50mg cada 24h.',
        msg3: 'Próxima cita: Martes 8 de Abril, 10:00 AM. ¿Confirmas asistencia?',
        btn: 'Ver resumen completo →',
        reply: '¡Muchas gracias doctora! 🙏',
        time1: '10:32 AM',
        time2: '10:32 AM',
        time3: '10:33 AM',
        timeReply: '10:34 AM',
      },
    },
    marquee: [
      'Notas de evolución con IA',
      'WhatsApp Integrado',
      'Español Nativo',
      'Cualquier Especialidad',
      'Agenda Inteligente',
      'Historial Completo',
      'PWA Instalable',
      'Cifrado Extremo a Extremo',
    ],
    stats: {
      label: 'La documentación clínica que no te roba tiempo.',
      items: [
        { value: '30s', label: 'por consulta documentada' },
        { value: '100%', label: 'en español' },
        { value: '$0', label: 'para tu paciente' },
        { value: '∞', label: 'consultas incluidas' },
      ],
    },
    howItWorks: {
      sectionLabel: 'CÓMO FUNCIONA',
      title: 'Tres pasos. 30 segundos. Listo.',
      subtitle: 'Sin escribir. Sin dictar. Sin perder tiempo.',
      steps: [
        {
          number: '01',
          icon: 'mic',
          time: '~10 segundos',
          title: 'Graba tu voz',
          description:
            'Al terminar la consulta, abre NUVOC y habla. Describe lo que encontraste como si le contaras a un colega — natural, rápido, en español.',
        },
        {
          number: '02',
          icon: 'document',
          time: '~15 segundos',
          title: 'IA genera tu nota de evolución',
          description:
            'La transcripción se convierte en una nota de evolución estructurada. Revisa en segundos, ajusta si quieres, y aprueba con un toque.',
        },
        {
          number: '03',
          icon: 'chat',
          time: '~5 segundos',
          title: 'Paciente recibe por WhatsApp',
          description:
            'Tu paciente recibe automáticamente un resumen claro: diagnóstico, medicamentos con dosis, instrucciones y próxima cita.',
        },
      ],
    },
    bento: {
      sectionLabel: 'LO QUE INCLUYE',
      title: 'Todo lo que necesitas. Sin complicaciones.',
      subtitle: 'Diseñado para la realidad clínica de Latinoamérica.',
      features: [
        {
          id: 'whatsapp',
          title: 'WhatsApp nativo',
          description:
            'El 93% de tus pacientes ya lo tiene instalado. No les pidas que descarguen nada.',
          wide: true,
          icon: 'whatsapp',
        },
        {
          id: 'spanish',
          title: 'Español médico real',
          description:
            'Nombres comerciales de medicamentos, terminología clínica local y jerga médica preservados.',
          wide: false,
          icon: 'language',
        },
        {
          id: 'pwa',
          title: 'Tu celular es tu herramienta',
          description:
            'PWA progresiva. Sin App Store. Sin Play Store. Se instala en segundos.',
          wide: false,
          icon: 'mobile',
        },
        {
          id: 'agenda',
          title: 'Agenda inteligente',
          description:
            'Gestiona tu horario, bloquea conflictos y envía recordatorios automáticos a tus pacientes.',
          wide: true,
          icon: 'calendar',
        },
        {
          id: 'specialty',
          title: 'Cualquier especialidad',
          description: 'Odontología, cardiología, pediatría, medicina general y más.',
          wide: false,
          icon: 'stethoscope',
        },
        {
          id: 'security',
          title: 'Privado y seguro',
          description: 'Cifrado extremo a extremo. Cumplimiento normativo LATAM.',
          wide: false,
          icon: 'shield',
        },
        {
          id: 'history',
          title: 'Historial completo',
          description: 'Cada consulta guardada, buscable, accesible desde cualquier dispositivo.',
          wide: false,
          icon: 'history',
        },
      ],
    },
    beforeAfter: {
      title: 'Sin NUVOC vs. Con NUVOC',
      before: {
        label: 'Sin NUVOC',
        items: [
          '15–20 min escribiendo notas después de cada consulta',
          'Pacientes llaman para preguntar sus medicamentos',
          'Notas incompletas al final del día agotador',
          'Información en papel, difícil de recuperar',
          'Sin tiempo para actualizar el historial clínico',
        ],
      },
      after: {
        label: 'Con NUVOC',
        items: [
          '30 segundos por consulta, nota de evolución lista al instante',
          'WhatsApp entrega instrucciones claras y automáticas',
          'Documentación precisa desde el primer momento',
          'Historial digital, buscable y siempre disponible',
          'Terminas a tiempo. Cada día.',
        ],
      },
    },
    pricing: {
      sectionLabel: 'PRECIOS',
      title: 'Simple. Transparente. Sin sorpresas.',
      subtitle: 'Primer mes completamente gratis.',
      plans: [
        {
          name: 'Plan Médico',
          price: '$37',
          period: '/mes',
          description: 'Para el médico individual que quiere recuperar su tiempo.',
          featured: false,
          cta: 'Empezar gratis',
          features: [
            'Notas de evolución ilimitadas',
            'WhatsApp para pacientes',
            'Transcripción en español',
            'Agenda integrada',
            'Historial completo',
            'Soporte prioritario',
          ],
        },
        {
          name: 'Plan Clínica',
          price: '$400',
          period: '/mes',
          description: 'Para clínicas con múltiples médicos en una sola sede.',
          featured: true,
          badge: 'MÁS POPULAR',
          cta: 'Empezar gratis',
          features: [
            'Todos los médicos de la sede',
            'Panel administrativo central',
            'Reportes de productividad',
            'Agenda multi-doctor',
            'Soporte dedicado 24/7',
            'Onboarding personalizado',
          ],
        },
        {
          name: 'Grupo Médico',
          price: 'A medida',
          period: '',
          description: 'Para grupos médicos con múltiples sedes y necesidades enterprise.',
          featured: false,
          cta: 'Contactar',
          features: [
            'Múltiples sedes',
            'SSO e integración con HIS',
            'SLA garantizado',
            'Contrato personalizado',
            'Equipo de implementación',
            'Precio por volumen',
          ],
        },
      ],
    },
    finalCta: {
      title: 'Deja de perder tiempo documentando.',
      subtitle:
        'Tus pacientes merecen un resumen claro. Tú mereces terminar a tiempo.',
      cta: 'Empezar ahora — es gratis',
    },
    footer: {
      tagline: 'Hecho por un médico, para médicos.',
      copyright: '© 2026 NUVOC',
      links: ['Contacto', 'Términos', 'Privacidad'],
    },
  },

  en: {
    nav: {
      howItWorks: 'How it works',
      pricing: 'Pricing',
      cta: 'Start free',
      langToggle: 'ES',
    },
    hero: {
      recording: 'RECORDING',
      headline1: 'You talk.',
      headline2: 'WhatsApp delivers.',
      headlineAccent: 'NUVOC documents.',
      subheadline:
        "The clinical note, your patient's summary, and the next appointment — all via WhatsApp, in 30 seconds.",
      cta1: 'Try free for 1 month',
      cta2: 'See how it works',
      micro: 'No credit card · Cancel anytime · Works on your phone',
      phone: {
        label: 'NUVOC',
        msg1: 'Hi, here is your consultation summary from today 📋',
        msg2: 'Diagnosis: Controlled arterial hypertension. Continue with Losartan 50mg every 24h.',
        msg3: 'Next appointment: Tuesday April 8th, 10:00 AM. Can you confirm attendance?',
        btn: 'View full summary →',
        reply: 'Thank you so much, doctor! 🙏',
        time1: '10:32 AM',
        time2: '10:32 AM',
        time3: '10:33 AM',
        timeReply: '10:34 AM',
      },
    },
    marquee: [
      'AI-Powered Clinical Notes',
      'WhatsApp Integrated',
      'Native Spanish',
      'Any Specialty',
      'Smart Scheduling',
      'Complete History',
      'PWA Installable',
      'End-to-End Encrypted',
    ],
    stats: {
      label: 'Clinical documentation that does not steal your time.',
      items: [
        { value: '30s', label: 'per documented visit' },
        { value: '100%', label: 'in Spanish' },
        { value: '$0', label: 'for your patient' },
        { value: '∞', label: 'visits included' },
      ],
    },
    howItWorks: {
      sectionLabel: 'HOW IT WORKS',
      title: 'Three steps. 30 seconds. Done.',
      subtitle: 'No typing. No dictating. No wasted time.',
      steps: [
        {
          number: '01',
          icon: 'mic',
          time: '~10 seconds',
          title: 'Record your voice',
          description:
            "When the visit ends, open NUVOC and speak. Describe what you found as if telling a colleague — natural, fast, in Spanish.",
        },
        {
          number: '02',
          icon: 'document',
          time: '~15 seconds',
          title: 'AI generates your clinical note',
          description:
            'The transcription becomes a structured clinical note. Review in seconds, adjust if needed, and approve with one tap.',
        },
        {
          number: '03',
          icon: 'chat',
          time: '~5 seconds',
          title: 'Patient receives via WhatsApp',
          description:
            'Your patient automatically receives a clear summary: diagnosis, medications with dosage, instructions, and next appointment.',
        },
      ],
    },
    bento: {
      sectionLabel: 'WHAT IS INCLUDED',
      title: 'Everything you need. Zero complexity.',
      subtitle: 'Designed for the clinical reality of Latin America.',
      features: [
        {
          id: 'whatsapp',
          title: 'Native WhatsApp',
          description: '93% of your patients already have it installed. No app downloads needed.',
          wide: true,
          icon: 'whatsapp',
        },
        {
          id: 'spanish',
          title: 'Real medical Spanish',
          description:
            'Commercial medication names, local clinical terminology, and medical jargon preserved.',
          wide: false,
          icon: 'language',
        },
        {
          id: 'pwa',
          title: 'Your phone is your tool',
          description: 'Progressive PWA. No App Store. No Play Store. Installs in seconds.',
          wide: false,
          icon: 'mobile',
        },
        {
          id: 'agenda',
          title: 'Smart scheduling',
          description:
            'Manage your schedule, block conflicts, and send automatic reminders to your patients.',
          wide: true,
          icon: 'calendar',
        },
        {
          id: 'specialty',
          title: 'Any specialty',
          description: 'Dentistry, cardiology, pediatrics, general medicine and more.',
          wide: false,
          icon: 'stethoscope',
        },
        {
          id: 'security',
          title: 'Private and secure',
          description: 'End-to-end encryption. LATAM regulatory compliance.',
          wide: false,
          icon: 'shield',
        },
        {
          id: 'history',
          title: 'Complete history',
          description: 'Every visit saved, searchable, accessible from any device.',
          wide: false,
          icon: 'history',
        },
      ],
    },
    beforeAfter: {
      title: 'Without NUVOC vs. With NUVOC',
      before: {
        label: 'Without NUVOC',
        items: [
          '15–20 min writing notes after every visit',
          'Patients call asking about their medications',
          'Incomplete notes at the end of an exhausting day',
          'Information on paper, hard to retrieve',
          'No time to update the clinical history',
        ],
      },
      after: {
        label: 'With NUVOC',
        items: [
          '30 seconds per visit, clinical note ready instantly',
          'WhatsApp delivers clear, automatic instructions',
          'Accurate documentation from the very first moment',
          'Digital history, searchable and always available',
          'You finish on time. Every day.',
        ],
      },
    },
    pricing: {
      sectionLabel: 'PRICING',
      title: 'Simple. Transparent. No surprises.',
      subtitle: 'First month completely free.',
      plans: [
        {
          name: 'Doctor Plan',
          price: '$37',
          period: '/mo',
          description: 'For the individual doctor who wants to reclaim their time.',
          featured: false,
          cta: 'Start free',
          features: [
            'Unlimited clinical notes',
            'WhatsApp for patients',
            'Spanish transcription',
            'Integrated scheduling',
            'Complete history',
            'Priority support',
          ],
        },
        {
          name: 'Clinic Plan',
          price: '$400',
          period: '/mo',
          description: 'For clinics with multiple doctors at a single location.',
          featured: true,
          badge: 'MOST POPULAR',
          cta: 'Start free',
          features: [
            'All doctors at the location',
            'Central admin panel',
            'Productivity reports',
            'Multi-doctor scheduling',
            '24/7 dedicated support',
            'Personalized onboarding',
          ],
        },
        {
          name: 'Medical Group',
          price: 'Custom',
          period: '',
          description: 'For medical groups with multiple locations and enterprise needs.',
          featured: false,
          cta: 'Contact us',
          features: [
            'Multiple locations',
            'SSO and HIS integration',
            'Guaranteed SLA',
            'Custom contract',
            'Implementation team',
            'Volume pricing',
          ],
        },
      ],
    },
    finalCta: {
      title: 'Stop losing time on documentation.',
      subtitle: 'Your patients deserve a clear summary. You deserve to finish on time.',
      cta: 'Start now — it is free',
    },
    footer: {
      tagline: 'Made by a doctor, for doctors.',
      copyright: '© 2026 NUVOC',
      links: ['Contact', 'Terms', 'Privacy'],
    },
  },
} as const

export type Translations = typeof translations.es
