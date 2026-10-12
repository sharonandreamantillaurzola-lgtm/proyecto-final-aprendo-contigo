const API_URL = 'http://localhost:3000/api';

class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async request(path, options = {}) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || data.mensaje || 'No se pudo completar la solicitud');
    }

    return data;
  }

  get(path) {
    return this.request(path);
  }

  post(path, body) {
    return this.request(path, {
      method: 'POST',
      body: JSON.stringify(body)
    });
  }
}

class NavigationController {
  constructor() {
    this.button = document.querySelector('.menu-hamburguesa');
    this.menu = document.querySelector('.menu');
  }

  init() {
    if (!this.button || !this.menu) return;
    this.button.addEventListener('click', () => this.menu.classList.toggle('activo'));
  }
}

class ContactForm {
  constructor(apiClient) {
    this.apiClient = apiClient;
    this.form = document.querySelector('.formulario-contacto form');
    this.fields = {
      guardian: document.getElementById('acudiente'),
      email: document.getElementById('correo'),
      phone: document.getElementById('telefono'),
      student: document.getElementById('estudiante'),
      age: document.getElementById('edad'),
      grade: document.getElementById('grado'),
      modality: document.getElementById('modalidad'),
      area: document.getElementById('area'),
      message: document.getElementById('mensaje')
    };
  }

  init() {
    if (!this.form) return;

    this.fields.guardian.addEventListener('input', () => this.validateRequired(this.fields.guardian, 'El nombre es obligatorio'));
    this.fields.phone.addEventListener('input', () => this.validatePhone());
    this.fields.age.addEventListener('input', () => this.validateAge());
    ['email', 'grade', 'area', 'message'].forEach(name => {
      this.fields[name].addEventListener('input', () => this.validateRequired(this.fields[name]));
    });
    this.fields.modality.addEventListener('change', () => this.validateRequired(this.fields.modality));
    this.form.addEventListener('submit', event => this.submit(event));
  }

  showMessage(field, text, isValid) {
    let message = field.nextElementSibling;
    if (!message || !message.classList.contains('mensaje-error')) {
      message = document.createElement('small');
      message.classList.add('mensaje-error');
      field.parentNode.insertBefore(message, field.nextSibling);
    }

    message.textContent = text;
    message.style.color = isValid ? 'green' : 'red';
    field.style.border = isValid ? '2px solid green' : '2px solid red';
    return isValid;
  }

  validateRequired(field, errorText = 'Este campo es obligatorio') {
    const isValid = field.value.trim() !== '';
    return this.showMessage(field, isValid ? '' : errorText, isValid);
  }

  validatePhone() {
    const isValid = /^[0-9]{10}$/.test(this.fields.phone.value);
    return this.showMessage(this.fields.phone, isValid ? '' : 'Debe tener exactamente 10 números', isValid);
  }

  validateAge() {
    const age = Number(this.fields.age.value);
    const isValid = Number.isInteger(age) && age >= 3 && age <= 18;
    return this.showMessage(this.fields.age, isValid ? '' : 'Ingrese una edad válida', isValid);
  }

  isValid() {
    return [
      this.validateRequired(this.fields.guardian, 'El nombre es obligatorio'),
      this.validateRequired(this.fields.email),
      this.validatePhone(),
      this.validateAge(),
      this.validateRequired(this.fields.grade),
      this.validateRequired(this.fields.modality),
      this.validateRequired(this.fields.area),
      this.validateRequired(this.fields.message)
    ].every(Boolean);
  }

  getData() {
    const { guardian, email, phone, student, age, grade, modality, area, message } = this.fields;
    return {
      nombre: guardian.value.trim(),
      correo: email.value.trim(),
      telefono: phone.value.trim(),
      edad: Number(age.value),
      servicioInteresado: `${student.value.trim()} - ${grade.value.trim()} - ${modality.value} - ${area.value.trim()}`,
      mensaje: message.value.trim()
    };
  }

  async submit(event) {
    event.preventDefault();
    if (!this.isValid()) {
      alert('Por favor completa correctamente el formulario');
      return;
    }

    const submitButton = this.form.querySelector("button[type='submit']");
    submitButton.disabled = true;
    try {
      await this.apiClient.post('/contactos', this.getData());
      alert('Solicitud enviada correctamente');
      this.form.reset();
    } catch (error) {
      console.error('Error al guardar la solicitud:', error);
      alert(`No se pudo guardar la solicitud: ${error.message}`);
    } finally {
      submitButton.disabled = false;
    }
  }
}

class ServicePlanner {
  constructor() {
    this.serviceSelect = document.getElementById('servicio');
    this.serviceList = document.getElementById('listaServicios');
    this.totalElement = document.getElementById('precio');
    this.addButton = document.getElementById('agregarServicio');
    this.total = 0;
  }

  init() {
    if (!this.serviceSelect || !this.serviceList || !this.totalElement || !this.addButton) return;
    this.addButton.addEventListener('click', () => this.addSelectedService());
  }

  addSelectedService() {
    const selectedOption = this.serviceSelect.options[this.serviceSelect.selectedIndex];
    const price = Number(this.serviceSelect.value);
    if (price <= 0) {
      alert('Selecciona un servicio');
      return;
    }

    const item = document.createElement('li');
    item.textContent = selectedOption.text;
    this.serviceList.appendChild(item);
    this.total += price;
    this.totalElement.textContent = `$${this.total.toLocaleString('es-CO')}`;
  }

  loadServices(services) {
    if (!this.serviceSelect) return;
    this.serviceSelect.innerHTML = '<option value="0">-- Elige un servicio --</option>';
    services.forEach(service => {
      const option = document.createElement('option');
      option.value = service.precio || 0;
      option.textContent = `${service.nombre} - $${Number(service.precio || 0).toLocaleString('es-CO')}`;
      this.serviceSelect.appendChild(option);
    });
  }
}

class LandingCatalog {
  constructor(apiClient, servicePlanner) {
    this.apiClient = apiClient;
    this.servicePlanner = servicePlanner;
    this.productsContainer = document.getElementById('productos-dinamicos');
    this.promotionsContainer = document.querySelector('#promociones-dinamicas .promociones-lista');
  }

  async init() {
    await Promise.all([this.loadProducts(), this.loadPromotions()]);
  }

  async loadProducts() {
    try {
      const products = await this.apiClient.get('/products');
      this.servicePlanner.loadServices(products);
      if (!this.productsContainer || products.length === 0) return;

      this.productsContainer.innerHTML = products.map(product => `
        <article class="tarjeta">
          <h3>${this.escape(product.nombre)}</h3>
          <h4>$${Number(product.precio || 0).toLocaleString('es-CO')}</h4>
          <p>${this.escape(product.descripcion || 'Servicio de refuerzo académico personalizado.')}</p>
          ${product.categoria ? `<strong>${this.escape(product.categoria)}</strong>` : ''}
        </article>
      `).join('');
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  }

  async loadPromotions() {
    if (!this.promotionsContainer) return;

    try {
      const promotions = await this.apiClient.get('/promotions');
      const activePromotions = promotions.filter(promotion => promotion.activa !== false);
      this.promotionsContainer.innerHTML = activePromotions.length > 0
        ? activePromotions.map(promotion => `
            <article class="promocion-item">
              <div class="promocion-cabecera">
                <span class="promocion-etiqueta">Oferta especial</span>
                <span class="promocion-icono" aria-hidden="true">✦</span>
              </div>
              <h3>${this.escape(promotion.nombre)}</h3>
              <p>${this.escape(promotion.descripcion)}</p>
              ${promotion.precio ? `<div class="promocion-precio"><span>Desde</span><strong>$${Number(promotion.precio).toLocaleString('es-CO')}</strong></div>` : ''}
            </article>
          `).join('')
        : '<p>Próximamente publicaremos nuevas promociones.</p>';
    } catch (error) {
      this.promotionsContainer.innerHTML = '<p>No fue posible cargar las promociones.</p>';
      console.error('Error al cargar promociones:', error);
    }
  }

  escape(value) {
    return String(value ?? '').replace(/[&<>'"]/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    })[character]);
  }
}

class LandingPage {
  constructor() {
    const apiClient = new ApiClient(API_URL);
    const servicePlanner = new ServicePlanner();
    this.components = [
      new NavigationController(),
      new ContactForm(apiClient),
      servicePlanner,
      new LandingCatalog(apiClient, servicePlanner)
    ];
  }

  async init() {
    this.components.slice(0, -1).forEach(component => component.init?.());
    await this.components.at(-1).init();
  }
}

document.addEventListener('DOMContentLoaded', () => new LandingPage().init());
