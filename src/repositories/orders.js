import axios from 'axios';

export default {
  baseUrl: process.env.VUE_APP_WOOCOMMERCE_URL,
  basePath: 'api/orders',
  getAll() {
    return axios.get(this.getUrl());
  },
  get(orderID) {
    return axios.get(this.getUrl(orderID));
  },
  create(data) {
    return axios.post(this.getUrl(), data);
  },
  getUrl(id) {
    let url = this.baseUrl + '/' + this.basePath;

    return url + (id ? '/' + id : '');
  }
};
