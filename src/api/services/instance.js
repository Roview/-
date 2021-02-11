import axios from 'axios'
import config from "../config";
const  { api_base_url} =config

let instance=axios.create({
  timeout:1000 * 60,
  baseURL:api_base_url
    }
)

//请求拦截器
instance.interceptors.request.use(
    config=>{
       return config
    },
    error => {
      this.$message.error('请求超时');
      return Promise.reject(error);
    }
)
instance.interceptors.response.use(
    response=>{
      // let data=response.data
      // // 获取响应码
      // let status=response.status
      return response;
    }
)
// let ajaxMethod=['get','post'];
 export  default instance;