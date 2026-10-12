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
            throw new Error(data.message || data.mensaje || data.error || 'Error en la solicitud');
        }
        return data;
    }

    get(path, token) {
        return this.request(path, { headers: { Authorization: `Bearer ${token}` } });
    }

    send(path, method, body, token) {
        return this.request(path, {
            method,
            body: JSON.stringify(body),
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    delete(path, token) {
        return this.request(path, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        });
    }
}

class AuthService {
    constructor(apiClient) {
        this.apiClient = apiClient;
        this.storageKey = 'aprendo_contigo_admin_token';
    }

    async login(email, password) {
        const result = await this.apiClient.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        const payload = JSON.parse(atob(result.token.split('.')[1]));
        if (payload.rol !== 'admin') {
            throw new Error('Esta cuenta no tiene permisos de administrador');
        }
        sessionStorage.setItem(this.storageKey, result.token);
        return payload;
    }

    async register(nombre, email, password) {
        return this.apiClient.request('/users', {
            method: 'POST',
            body: JSON.stringify({ nombre, email, password })
        });
    }

    token() {
        return sessionStorage.getItem(this.storageKey);
    }

    logout() {
        sessionStorage.removeItem(this.storageKey);
    }

    isAdmin() {
        const token = this.token();
        if (!token) return false;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.rol === 'admin' && payload.exp * 1000 > Date.now();
        } catch {
            return false;
        }
    }
}

class AdminPanel {
    constructor(apiClient, authService) {
        this.api = apiClient;
        this.auth = authService;
        this.activeResource = 'products';
        this.editingId = null;
        this.resources = {
            products: {
                label: 'Servicios', endpoint: '/products',
                fields: [
                    ['nombre', 'Nombre', 'text', true], ['categoria', 'Categoría', 'text', true],
                    ['precio', 'Precio', 'number'], ['descripcion', 'Descripción', 'textarea', true],
                    ['cantidadClases', 'Cantidad de clases', 'number'], ['clasesVirtuales', 'Clases virtuales', 'number'],
                    ['clasesPresenciales', 'Clases presenciales', 'number']
                ]
            },
            promotions: {
                label: 'Promociones', endpoint: '/promotions',
                fields: [
                    ['nombre', 'Nombre', 'text', true], ['descripcion', 'Descripción', 'textarea', true],
                    ['precio', 'Precio', 'number'], ['precioAnterior', 'Precio anterior', 'number'],
                    ['fechaInicio', 'Fecha inicial', 'date'], ['fechaFin', 'Fecha final', 'date'],
                    ['activa', 'Activa', 'checkbox']
                ]
            },
            recognitions: {
                label: 'Reconocimientos', endpoint: '/recognitions',
                fields: [
                    ['nombre', 'Nombre', 'text', true], ['descripcion', 'Descripción', 'textarea', true],
                    ['clasesRequeridas', 'Clases requeridas', 'number'], ['beneficio', 'Beneficio', 'text', true],
                    ['precioPresencial', 'Precio presencial', 'number'], ['precioVirtual', 'Precio virtual', 'number'],
                    ['condiciones', 'Condiciones', 'textarea'], ['activo', 'Activo', 'checkbox']
                ]
            },
            users: { label: 'Usuarios', endpoint: '/users', fields: [] }
        };
    }

    async start() {
        if (!this.auth.isAdmin()) return this.showLogin();
        document.querySelector('#login-view').hidden = true;
        document.querySelector('#dashboard-view').hidden = false;
        this.renderTabs();
        this.renderResource();
    }

    showLogin() {
        document.querySelector('#login-view').hidden = false;
        document.querySelector('#dashboard-view').hidden = true;
    }

    renderTabs() {
        const tabs = document.querySelector('#resource-tabs');
        tabs.innerHTML = Object.entries(this.resources).map(([key, resource]) =>
            `<button class="tab ${key === this.activeResource ? 'active' : ''}" data-resource="${key}">${resource.label}</button>`
        ).join('');
        tabs.querySelectorAll('.tab').forEach(tab => tab.addEventListener('click', () => {
            this.activeResource = tab.dataset.resource;
            this.editingId = null;
            this.renderTabs();
            this.renderResource();
        }));
    }

    async renderResource() {
        const resource = this.resources[this.activeResource];
        const view = document.querySelector('#resource-view');
        view.innerHTML = `<div class="loading">Cargando ${resource.label.toLowerCase()}...</div>`;
        try {
            const records = await this.api.get(resource.endpoint, this.auth.token());
            view.innerHTML = this.activeResource === 'users'
                ? this.renderUsers(records)
                : this.renderCrud(resource, records);
            this.bindResourceEvents();
        } catch (error) {
            view.innerHTML = `<p class="message error">${error.message}</p>`;
        }
    }

    renderCrud(resource, records) {
        return `<div class="resource-heading"><div><p class="eyebrow">Gestión</p><h2>${resource.label}</h2></div><button id="new-record">Nuevo</button></div>
            <form id="record-form" class="record-form" hidden>${this.renderFields(resource.fields)}<div class="form-actions"><button type="submit">Guardar</button><button type="button" id="cancel-edit" class="button-secondary">Cancelar</button></div><p id="form-message" class="message"></p></form>
            <div class="table-wrap"><table><thead><tr><th>Nombre</th><th>Descripción</th><th>Acciones</th></tr></thead><tbody>${records.map(record => `<tr><td>${this.escape(record.nombre)}</td><td>${this.escape(record.descripcion || record.beneficio || '')}</td><td><button class="small-button edit-record" data-id="${record._id}">Editar</button><button class="small-button danger delete-record" data-id="${record._id}">Eliminar</button></td></tr>`).join('')}</tbody></table></div>`;
    }

    renderUsers(users) {
        return `<div class="resource-heading"><div><p class="eyebrow">Control de acceso</p><h2>Usuarios</h2></div></div><div class="table-wrap"><table><thead><tr><th>Nombre</th><th>Correo</th><th>Rol</th><th>Acciones</th></tr></thead><tbody>${users.map(user => `<tr><td>${this.escape(user.nombre)}</td><td>${this.escape(user.email)}</td><td><span class="role">${this.escape(user.rol)}</span></td><td><button class="small-button danger delete-user" data-id="${user._id}">Eliminar</button></td></tr>`).join('')}</tbody></table></div>`;
    }

    renderFields(fields, record = {}) {
        return fields.map(([name, label, type, required]) => {
            const value = record[name] ?? '';
            if (type === 'textarea') return `<label>${label}<textarea name="${name}" ${required ? 'required' : ''}>${this.escape(value)}</textarea></label>`;
            if (type === 'checkbox') return `<label class="check-field"><input type="checkbox" name="${name}" ${record[name] !== false ? 'checked' : ''}> ${label}</label>`;
            return `<label>${label}<input type="${type}" name="${name}" value="${this.escape(value)}" ${required ? 'required' : ''}></label>`;
        }).join('');
    }

    bindResourceEvents() {
        const resource = this.resources[this.activeResource];
        const form = document.querySelector('#record-form');
        document.querySelector('#new-record')?.addEventListener('click', () => {
            this.editingId = null;
            form.innerHTML = `${this.renderFields(resource.fields)}<div class="form-actions"><button type="submit">Guardar</button><button type="button" id="cancel-edit" class="button-secondary">Cancelar</button></div><p id="form-message" class="message"></p>`;
            form.hidden = false;
            document.querySelector('#cancel-edit').addEventListener('click', () => { form.hidden = true; });
        });
        form?.addEventListener('submit', event => this.saveRecord(event));
        document.querySelectorAll('.delete-record').forEach(button => button.addEventListener('click', () => this.removeRecord(button.dataset.id)));
        document.querySelectorAll('.edit-record').forEach(button => button.addEventListener('click', () => this.editRecord(button.dataset.id)));
        document.querySelectorAll('.delete-user').forEach(button => button.addEventListener('click', () => this.removeUser(button.dataset.id)));
    }

    async editRecord(id) {
        const resource = this.resources[this.activeResource];
        const records = await this.api.get(resource.endpoint, this.auth.token());
        const record = records.find(item => item._id === id);
        const form = document.querySelector('#record-form');
        this.editingId = id;
        form.innerHTML = `${this.renderFields(resource.fields, record)}<div class="form-actions"><button type="submit">Actualizar</button><button type="button" id="cancel-edit" class="button-secondary">Cancelar</button></div><p id="form-message" class="message"></p>`;
        form.hidden = false;
        document.querySelector('#cancel-edit').addEventListener('click', () => { form.hidden = true; });
    }

    async saveRecord(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const resource = this.resources[this.activeResource];
        const body = Object.fromEntries(new FormData(form).entries());
        resource.fields.forEach(([name, , type]) => {
            if (type === 'checkbox') body[name] = form.elements[name].checked;
            if (type === 'number' && body[name] !== '') body[name] = Number(body[name]);
        });
        try {
            await this.api.send(`${resource.endpoint}${this.editingId ? `/${this.editingId}` : ''}`, this.editingId ? 'PUT' : 'POST', body, this.auth.token());
            this.editingId = null;
            this.renderResource();
        } catch (error) {
            document.querySelector('#form-message').textContent = error.message;
        }
    }

    async removeRecord(id) {
        if (!confirm('¿Eliminar este registro?')) return;
        await this.api.delete(`${this.resources[this.activeResource].endpoint}/${id}`, this.auth.token());
        this.renderResource();
    }

    async removeUser(id) {
        if (!confirm('¿Eliminar este usuario?')) return;
        await this.api.delete(`/users/${id}`, this.auth.token());
        this.renderResource();
    }

    escape(value) {
        return String(value).replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);
    }
}

const apiClient = new ApiClient(API_URL);
const authService = new AuthService(apiClient);
const adminPanel = new AdminPanel(apiClient, authService);

document.querySelector('#login-form').addEventListener('submit', async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const message = document.querySelector('#login-message');
    try {
        const payload = await authService.login(form.loginEmail.value, form.loginPassword.value);
        document.querySelector('#admin-identity').textContent = `Sesión activa: ${payload.id}`;
        await adminPanel.start();
    } catch (error) {
        message.textContent = error.message;
    }
});

document.querySelector('#register-form').addEventListener('submit', async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const message = document.querySelector('#register-message');
    message.textContent = '';

    if (form.registerPassword.value !== form.confirmPassword.value) {
        message.textContent = 'Las contraseñas no coinciden';
        return;
    }

    try {
        await authService.register(form.registerName.value.trim(), form.registerEmail.value.trim(), form.registerPassword.value);
        form.reset();
        message.className = 'message success';
        message.textContent = 'Cuenta creada. Ya puedes iniciar sesión.';
        document.querySelector('[data-auth-view="login"]').click();
        document.querySelector('#login-message').textContent = 'Cuenta creada correctamente.';
    } catch (error) {
        message.className = 'message';
        message.textContent = error.message;
    }
});

document.querySelectorAll('.auth-tab').forEach(tab => tab.addEventListener('click', () => {
    const selectedView = tab.dataset.authView;
    document.querySelectorAll('.auth-tab').forEach(item => item.classList.toggle('active', item === tab));
    document.querySelectorAll('[data-auth-panel]').forEach(panel => {
        panel.hidden = panel.dataset.authPanel !== selectedView;
    });
    document.querySelector('#auth-description').textContent = selectedView === 'login'
        ? 'Ingresa con una cuenta que tenga rol de administrador.'
        : 'Crea una cuenta para solicitar acceso a la plataforma.';
}));

document.querySelector('#logout-button').addEventListener('click', () => {
    authService.logout();
    adminPanel.showLogin();
});

adminPanel.start();
