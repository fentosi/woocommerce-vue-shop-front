import axios from 'axios';

export default {
  baseUrl: process.env.VUE_APP_WOOCOMMERCE_URL,
  basePath: 'api/orders',
  getAll() {
    return axios.get(this.baseUrl + '/' + this.basePath);
  }
};
