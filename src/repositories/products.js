import axios from 'axios';

export default {
  baseUrl: process.env.VUE_APP_WOOCOMMERCE_URL,
  basePath: 'api/products',
  getAll() {
    return axios.get(this.getUrl());
  },
  get(productID) {
    return axios.get(this.getUrl(productID));
  },
  getUrl(id, parameters) {
    let url = this.baseUrl + '/' + this.basePath;

    if (id) {
      url += '/' + id;
    }

    if (parameters) {
      url += '?';
      for (const key of Object.keys(parameters)) {
        url += encodeURIComponent(key) + '=' + encodeURIComponent(parameters[key]);
      }
    }

    return url;
  }
};
