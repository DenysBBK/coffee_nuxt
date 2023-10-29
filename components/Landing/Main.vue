<template>
    <div class="main">
        <div class="base_back">
        <div class="base_info">
          <h1>Your coffee, your way, your choice. Order online and pick up a taste on the way!</h1>
          <BaseRedirectButton
            text="JOIN AND ORDER ->"
            url="/login"
          ></BaseRedirectButton>
        </div>
      </div> 
   </div>
</template>
<style scoped lang="scss">
// .main{
//     max-width:1600px;
//     margin:0 auto;
//     display:flex;
//     justify-content:space-between;
//     height:90vh;
//     align-items:center;
//     padding-left:20px;
//     padding-right:20px;
//     @media screen and (max-width:1200px){
//         flex-direction:column;
//         text-align:center;
//         justify-content:space-around;
//         gap:30px
//     }
  
    // &_title{
    // color: yellow;
    // max-width: 50%;
    // font-family: KARLA;
    // font-size: 70px;
    // font-weight: 900;
    // line-height: 90px;
    // max-width:1200px;
    // @media screen and (max-width:1600px){
    //     font-size:60px;
    // } 
    // @media screen and (max-width:991px){
    //     font-size:60px;
    //     line-height:70px
    // }
    // @media screen and (max-width:814px){
    //     font-size:60px;
    //     line-height:60px
    // }
    // }
    // &_img{
    //     max-height:600px;
    // @media screen and (max-width:1600px){
    //     max-height:400px;
    // }  

    // }
    // &_text{
    //     display: flex;
    //     flex-direction: column;
    // }

// }

  
  .base_back{
    background-image: url('../../public/images/test.jpg');
    background-size: cover;
    background-position: center;
    min-height: 90vh;
    width: 100%;
    
  
 
    
  }
  .base_info{
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding-left: 20px;
    padding-right: 20px;
    
    margin: 0 auto;
    max-width: 1600px;
    height: 100%;
    width: 100%;
    padding-top: 150px;
    padding-bottom: 170px;
    gap: 20px;
    @media  screen and (max-width: 768px) {
        align-items: center;
        
    }
    
  }
  .base_info h1{
    color: yellow;
    max-width: 50%;
    font-family: KARLA;
    font-size: 60px;
    font-weight: 900;
    line-height: 70px;
    background-color: black;
    border: 1px solid white;
    border-radius: 10px 10px;
    padding: 15px;
    @media  screen and (max-width: 814px) {
       max-width: 100%;
       text-align: center;
        
    }
    @media  screen and (max-width: 414px) {
        font-size: 50px;
    font-weight: 900;
    line-height: 50px;
        
    }
    
  }


</style>