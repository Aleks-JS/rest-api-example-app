import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

Vue.component('loader', {
  template: `
    <div class='d-flex justify-content-center'>
      <div class='spinner-border' role='status'>
        <span class='sr-only'>Loading...</span>
      </div>
    </div>`,
});

new Vue({
  el: '#app',
  data() {
    return {
      loading: false,
      form: {
        name: '',
        value: '',
      },
      contacts: [],
    };
  },
  computed: {
    canCreate() {
      return this.form.value.trim() && this.form.name.trim();
    },
  },
  methods: {
    async createContact() {
      const { ...contact } = this.form;

      await request('/api/contacts', 'POST', contact);

      // this.contacts.push({ ...contact, id: Date.now(), marked: false });

      this.form.name = '';
      this.form.value = '';
    },
    markContact(id) {
      const contact = this.contacts.find((c) => c.id === id);
      contact.marked = true;
    },
    removeContact(id) {
      this.contacts = this.contacts.filter((c) => c.id !== id);
    },
  },
  async mounted() {
    this.loading = true;
    this.contacts = await request('/api/contacts');
    this.loading = false;
  },
});

async function request(url, method = 'GET', data = null) {
  try {
    const headers = {};
    let body;

    if (data) {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(data);
    }

    const response = await fetch(url, {
      method,
      headers,
      body,
    });
    return await response.json();
  } catch (e) {
    console.warn('Error', e.message);
  }
}
