export default defineNuxtRouteMiddleware((to, from, ) => {
    const auth = useAuthStore()
    
    if(auth.isAuthenticated === true){
        navigateTo(to.fullPath)
      
        return 
    }
  return navigateTo('/login')
    
})
 
