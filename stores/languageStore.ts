import { defineStore } from "pinia";
import { languageState } from "types/languageTypes";


export const useLanguageStore = defineStore('language', {
    state:():languageState=> ({
        language:'eng',
        login:{
        main:'Login',
        haveAccount:'Don`t have account?',
        toRegistration:'Registration',
        email:'Email',
        password:'Password',
        toCafeAccount:'To cafe account',
        toUserAccount:'To user account',
        btn:'Login'
        },
        header:{
            login:'Login',
            registration:'Registration',
            order:'Order',
            activeOrders:'Active orders',
            profile:'Profile',
            history:'History',
            logout:'Logout',
            orders:'Orders'
        },
        registration:{
            main:'Registration',
            haveAccount:'Already have account?',
            toLogin:'Login',
            toUser:'User',
            toCaffe:'Cafe',
            name:'Name',
            cafeName:'Coffee-shop name',
            email:'Email',
            password:'Password',
            confirmPassword:'Confirm password',
            agree:'I agree with',
            terms:'Terms of Service',
            and:'and',
            register:'Registration',
            policy:'Privacy Policy',
            city:'Choose your city'
        },
        userProfile:{
            title:'Profile',
            name:'Name',
            phone:'Phone',
            bank:'Bank',
            cardNumber:'Card number',
            update:'Update profile',
            makeOrder:'Make order',
            chooseBank:'Choose you bank',
            updateTitle:'Update profile',
            chooseAvatar:'Choose your avatar',
            makeDefault:'Default',
            save:'Save changes'
        },
        cafeProfile:{
            title:'Profile',
            name:'Name',
            city:'City',
            address:'Address',
            phone:'Contact phone',
            positions:'Available positions',
            item:'Item',
            price:'Price',
            update:'Update profile',
            updateTitle:'Update profile',
            chooseAvatar:'Choose cafe avatar',
            default:'Default',
            updatePositions:'Positions',
            delete:'Delete',
            addNew:'Add new positions',
            saveBtn:'Save',
            posItem:'Position name',
            posPrice:'Price UAH'
        },
        pageTitles:{
            acitveOrders:'Active orders',
            cafeProfile:'Profile',
            history:'History',
            mainPage:'Main',
            login:'Login',
            orderPage:'Order',
            ordersPage:'Orders',
            privacyPolicy:'Privacy Policy',
            userProfile:'Profile',
            registration:'Registration',
            terms:'Terms of Services'
        },
        alerts:{
            successReg:'Successful registration',
            orderInWork:'Order preparing',
            orderIsFinished:'Order is finished',
            orderIsDone:'Order is done',
            successOrder:'Success order',
            profileUpdated:'Profile updated',
            user:'User',
            cafe:'Caffe',
            notFound:'is not found'
        },
        history:{
            title:'Orders history',
            noItems:'You dont have items in history',
            coffeeName:'Coffee-shop name',
            userName:'User name',
            positions:'Positions',
            date:'Date'
        },
        order:{
            title:'Make an order',
            chooseSity:'Choose your sity',
            chooseAddress:'Choose the address',
            noShops:'There are no coffee shops in this city',
            makeOrder:'Order',
            positions:'Positions',
            modalTitle:'Order your coffee',
            modalSubtitle:'Choose your drink',
            chooseDrink:'Choose drink',
            add:'Add',
            orderList:'Your order list',
            confirmOrder:'Confirm order',
            closeModal:'Close',
            emptyList:'Order list is empty',
            totalPrice:'Total price',
            noItems:'No item to order'
        },
        mainPage:{
            title:'Take&Go philosophy',
            card1:'Do you like to drink coffee very much, but are you already tired of constant queues?',
            card2:'Would you like your coffee to be prepared as you walk to the coffee shop so that when you arrive, you can pick up your coffee and continue on your way?',
            card3:'All you need to do is 4 simple things:',
            card3First:'Register',
            card3Second:'Find a coffee shop along the way',
            card3Third:'Order coffee',
            card3Four:'Pick up a drink on the way when it is ready',
            card4:'Enjoy your favorite coffee that you now have without queuing!'
        },
        regValidators:{
            emailNotEmpty:'Email must be not empty',
            emailMoreLetters:'Need more than 3 letters',
            invalidEmail:'Invalid email address',
            passwordMoreLetters:'Password must include at least 6 characters',
            confirmPassword:'Field should match Password',
            nameValidator:'At least 3 characters',
            cityValidator:'Need to choose the city',
            termsValidator:'Need to agree with terms'
        },
        loginValidators:{
            email:'Email must be not empty',
            password:'Password must be not empty',
            toAccount:'Need to choose one option'
        }
    }),
    actions:{
       async getLanguage(type:string):Promise<void>{
        const responce = await fetch(`https://coffee-app-fc81b-default-rtdb.europe-west1.firebasedatabase.app/languages/${type}.json`);
        const data = await responce.json();
        console.log(data)
        //PAGE TITLES
        this.$state.pageTitles.acitveOrders = data.pageTitles.activeOrders;
        this.$state.pageTitles.cafeProfile = data.pageTitles.cafeProfile;
        this.$state.pageTitles.history = data.pageTitles.history;
        this.$state.pageTitles.mainPage = data.pageTitles.mainPage;
        this.$state.pageTitles.login = data.pageTitles.login;
        this.$state.pageTitles.orderPage = data.pageTitles.orderPage;
        this.$state.pageTitles.ordersPage = data.pageTitles.ordersPage;
        this.$state.pageTitles.privacyPolicy = data.pageTitles.privacyPolicy;
        this.$state.pageTitles.userProfile = data.pageTitles.userProfile;
        this.$state.pageTitles.registration = data.pageTitles.registration;
        this.$state.pageTitles.terms = data.pageTitles.terms;

        //LOGIN
        this.$state.language = data.language;
        this.$state.login.btn = data.login.btn;
        this.$state.login.email = data.login.email;
        this.$state.login.main = data.login.main;
        this.$state.login.haveAccount = data.login.haveAccount;
        this.$state.login.toRegistration = data.login.toRegistration;
        this.$state.login.password = data.login.password;
        this.$state.login.toUserAccount = data.login.toUserAccount;
        this.$state.login.toCafeAccount = data.login.toCafeAccount;

        //HEADER
        this.$state.header.login = data.header.login;
        this.$state.header.registration = data.header.registration;
        this.$state.header.order = data.header.order;
        this.$state.header.activeOrders = data.header.activeOrders;
        this.$state.header.profile = data.header.profile;
        this.$state.header.history = data.header.history;
        this.$state.header.logout = data.header.logout;
        this.$state.header.orders = data.header.orders
        
        //REGISTRATION
        this.$state.registration.main = data.registration.main;
        this.$state.registration.haveAccount = data.registration.haveAccount;
        this.$state.registration.toLogin = data.registration.toLogin;
        this.$state.registration.toUser = data.registration.toUser;
        this.$state.registration.toCaffe = data.registration.toCaffe;
        this.$state.registration.name = data.registration.name;
        this.$state.registration.cafeName = data.registration.cafeName
        this.$state.registration.email = data.registration.email;
        this.$state.registration.password = data.registration.password;
        this.$state.registration.confirmPassword = data.registration.confirmPassword;
        this.$state.registration.agree = data.registration.agree;
        this.$state.registration.terms = data.registration.terms;
        this.$state.registration.and = data.registration.and;
        this.$state.registration.policy = data.registration.policy;
        this.$state.registration.register = data.registration.register;
        this.$state.registration.city = data.registration.city

        //USER PROFILE
        this.$state.userProfile.title = data.userProfile.title;
        this.$state.userProfile.name = data.userProfile.name;
        this.$state.userProfile.phone = data.userProfile.phone;
        this.$state.userProfile.bank = data.userProfile.bank;
        this.$state.userProfile.cardNumber = data.userProfile.cardNumber;
        this.$state.userProfile.update = data.userProfile.update;
        this.$state.userProfile.makeOrder = data.userProfile.makeOrder;
        this.$state.userProfile.chooseBank = data.userProfile.chooseBank;
        this.$state.userProfile.updateTitle = data.userProfile.updateTitle;
        this.$state.userProfile.chooseAvatar = data.userProfile.chooseAvatar;
        this.$state.userProfile.makeDefault = data.userProfile.makeDefault;
        this.$state.userProfile.save = data.userProfile.save

        //CAFE PROFILE
        this.$state.cafeProfile.title = data.cafeProfile.title;
        this.$state.cafeProfile.name = data.cafeProfile.name;
        this.$state.cafeProfile.city = data.cafeProfile.city;
        this.$state.cafeProfile.address = data.cafeProfile.address;
        this.$state.cafeProfile.phone = data.cafeProfile.phone;
        this.$state.cafeProfile.positions = data.cafeProfile.positions;
        this.$state.cafeProfile.item = data.cafeProfile.item;
        this.$state.cafeProfile.price = data.cafeProfile.price;
        this.$state.cafeProfile.update = data.cafeProfile.update;
        this.$state.cafeProfile.updateTitle = data.cafeProfile.updateTitle;
        this.$state.cafeProfile.chooseAvatar = data.cafeProfile.chooseAvatar;
        this.$state.cafeProfile.default = data.cafeProfile.default;
        this.$state.cafeProfile.updatePositions = data.cafeProfile.updatePositions;
        this.$state.cafeProfile.delete = data.cafeProfile.delete;
        this.$state.cafeProfile.addNew = data.cafeProfile.addNew;
        this.$state.cafeProfile.saveBtn = data.cafeProfile.saveBtn;
        this.$state.cafeProfile.posItem = data.cafeProfile.posItem;
        this.$state.cafeProfile.posPrice = data.cafeProfile.posPrice

        //ALERTS
        this.$state.alerts.orderInWork = data.alerts.orderInWork;
        this.$state.alerts.orderIsDone = data.alerts.orderIsDone;
        this.$state.alerts.orderIsFinished = data.alerts.orderIsFinished;
        this.$state.alerts.successOrder = data.alerts.successOrder;
        this.$state.alerts.successReg = data.alerts.successReg;
        this.$state.alerts.profileUpdated = data.alerts.profileUpdated;
        this.$state.alerts.user = data.alerts.user;
        this.$state.alerts.cafe = data.alerts.cafe;
        this.$state.alerts.notFound = data.alerts.notFound;

        //HISTORY
        this.$state.history.coffeeName = data.history.coffeeName;
        this.$state.history.date = data.history.date;
        this.$state.history.noItems = data.history.noItems;
        this.$state.history.positions = data.history.positions;
        this.$state.history.title = data.history.title;
        this.$state.history.userName = data.history.userName

        //ORDER
        this.$state.order.add = data.order.add;
        this.$state.order.chooseAddress = data.order.chooseAddress;
        this.$state.order.chooseDrink = data.order.chooseDrink;
        this.$state.order.chooseSity = data.order.chooseSity;
        this.$state.order.closeModal = data.order.closeModal;
        this.$state.order.confirmOrder = data.order.confirmOrder;
        this.$state.order.makeOrder = data.order.makeOrder;
        this.$state.order.modalSubtitle = data.order.modalSubtitle;
        this.$state.order.modalTitle = data.order.modalTitle;
        this.$state.order.noShops = data.order.noShops;
        this.$state.order.orderList = data.order.orderList;
        this.$state.order.positions = data.order.positions;
        this.$state.order.title = data.order.title;
        this.$state.order.emptyList = data.order.emptyList;
        this.$state.order.totalPrice = data.order.totalPrice;
        this.$state.order.noItems = data.order.noItems

        //MAIN PAGE
        this.$state.mainPage.card1 = data.mainPage.card1;
        this.$state.mainPage.card2 = data.mainPage.card2;
        this.$state.mainPage.card3 = data.mainPage.card3;
        this.$state.mainPage.card3First = data.mainPage.card3First;
        this.$state.mainPage.card3Four = data.mainPage.card3Four;
        this.$state.mainPage.card3Second = data.mainPage.card3Second;
        this.$state.mainPage.card3Third = data.mainPage.card3Third;
        this.$state.mainPage.card4 = data.mainPage.card4;
        this.$state.mainPage.title = data.mainPage.title;

         //REGISTRATION VALIDATION
        this.$state.regValidators.cityValidator = data.regValidators.cityValidator;
        this.$state.regValidators.confirmPassword = data.regValidators.confirmPassword;
        this.$state.regValidators.emailMoreLetters = data.regValidators.emailMoreLetters;
        this.$state.regValidators.emailNotEmpty = data.regValidators.emailNotEmpty;
        this.$state.regValidators.invalidEmail = data.regValidators.invalidEmail;
        this.$state.regValidators.nameValidator = data.regValidators.nameValidator;
        this.$state.regValidators.passwordMoreLetters = data.regValidators.passwordMoreLetters;
        this.$state.regValidators.termsValidator = data.regValidators.termsValidator;

        //LOGIN VALIDATORS
        this.$state.loginValidators.email = data.loginValidators.email;
        this.$state.loginValidators.password = data.loginValidators.password;
        this.$state.loginValidators.toAccount = data.loginValidators.toAccount
        },

       
    },
    getters:{
        lang:(state:languageState) => state
    }
})