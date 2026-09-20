const servicios = [

    {
        nombre: 'Clase Impulso Presencial',
        categoria: 'Clases individuales',
        precio: 30000,
        descripcion: 'Una experiencia de aprendizaje personalizada con acompañamiento directo.',
        cantidadClases: 1,
        clasesVirtuales: 0,
        clasesPresenciales: 1,
        beneficios: [
            'Transporte incluido',
            '1 hora de clase personalizada',
            '20 minutos adicionales gratis si lo requiere'
        ]
    },

    {
        nombre: 'Clase Conexión Virtual',
        categoria: 'Clases individuales',
        precio: 15000,
        descripcion: 'Una alternativa flexible para continuar aprendiendo desde cualquier lugar.',
        cantidadClases: 1,
        clasesVirtuales: 1,
        clasesPresenciales: 0,
        beneficios: [
            '1 hora de clase virtual',
            '15 minutos adicionales gratis si lo requiere',
            'Material digital de apoyo'
        ]
    },

    {
        nombre: 'Arranque Brillante',
        categoria: 'Paquetes',
        precio: 90000,
        precioNormal: 96000,
        descripcion: 'Ideal para iniciar refuerzo y construir una base sólida de aprendizaje.',
        cantidadClases: 5,
        clasesVirtuales: 3,
        clasesPresenciales: 2,
        beneficios: [
            '3 clases virtuales',
            '2 clases presenciales'
        ]
    },

    {
        nombre: 'Progreso Activo',
        categoria: 'Paquetes',
        precio: 140000,
        precioNormal: 150000,
        descripcion: 'Más práctica, constancia y refuerzo continuo.',
        cantidadClases: 8,
        clasesVirtuales: 5,
        clasesPresenciales: 3,
        beneficios: [
            '5 clases virtuales',
            '3 clases presenciales'
        ]
    },

    {
        nombre: 'Rendimiento Total',
        categoria: 'Paquetes',
        precio: 250000,
        precioNormal: 270000,
        descripcion: 'Acompañamiento completo, avance acelerado y constante.',
        cantidadClases: 15,
        clasesVirtuales: 10,
        clasesPresenciales: 5,
        beneficios: [
            '10 clases virtuales',
            '5 clases presenciales'
        ]
    },

    {
        nombre: 'Conexión Digital',
        categoria: 'Paquetes',
        precio: 50000,
        precioNormal: 75000,
        descripcion: 'Ideal para refuerzo desde casa, económico y bien estructurado.',
        cantidadClases: 5,
        clasesVirtuales: 5,
        clasesPresenciales: 0,
        beneficios: [
            '1 hora de clase',
            '15 minutos adicionales gratis si lo requiere',
            'Material básico incluido'
        ]
    },

    {
        nombre: 'Aprendizaje Cercano',
        categoria: 'Paquetes',
        precio: 140000,
        precioNormal: 150000,
        descripcion: 'Mayor acompañamiento directo y explicación personalizada.',
        cantidadClases: 5,
        clasesVirtuales: 0,
        clasesPresenciales: 5,
        beneficios: [
            'Transporte incluido',
            '1 hora de clase por sesión',
            '15 minutos adicionales gratis por clase si lo requiere'
        ]
    },

    {
        nombre: 'Ruta Brillante de Aprendizaje',
        categoria: 'Servicios adicionales',
        descripcion: 'Servicio diseñado para implementar planes claros y estructurados para obtener mejores resultados en el proceso de aprendizaje.',
        beneficios: [
            'Concentración',
            'Retención de información',
            'Comportamiento',
            'Desempeño general',
            'Avances y oportunidades de mejora',
            'Seguimiento mensual: $15.000',
            'Paquete de 5 a 8 clases: $5.000',
            'Paquete de 15 clases: $8.000'
        ]
    }

];

module.exports = servicios;