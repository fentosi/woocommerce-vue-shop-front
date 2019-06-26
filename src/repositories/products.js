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
  getUrl(id) {
    let url = this.baseUrl + '/' + this.basePath;

    return url + (id ? '/' + id : '');
  }
};
