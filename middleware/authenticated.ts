const authenticated =  defineNuxtRouteMiddleware((to, from, ) => {
    const auth = useAuthStore()
    if(process.client){
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('type');
    const uid = localStorage.getItem('uid');
    const isAuth = true
    if(token && type && uid){
      auth.loginFromStorage(token,type,uid, isAuth)
      navigateTo(to.fullPath);
      return
    }
    return navigateTo('/login')
    }


    
})
export default authenticated