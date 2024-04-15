import axios from "axios";
import Swal from "sweetalert2";

let Axios=axios.create({
    baseURL:"http://localhost:8080/",
    timeout:15000
});
Axios.interceptors.response.use(function (config) {
    if(config.status ===200 || config.status===201){
        return config;
      }
},function (error){
    if(error.response.status === 500 || error.response.status===400){
        Swal.fire(
            error.response.data.message,
             'Please try again '
          )
          return error.response;
      }
      else{
        return error.response;
      }
      
})
export default Axios