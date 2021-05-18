let timer;

const authActions = {
    async login(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'signInWithPassword'
        });
    },
    async register(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'signUp'
        });
    },
    async auth(context, payload) {
        const mode = payload.mode;
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${process.env.VUE_APP_FIREBASE_API_KEY}`, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });

        const responseData = await response.json();

        if(!response.ok){
            console.log(responseData);
            const error = new Error(responseData.error || "Failed to authenticate.");
            throw error;
        }

        const expiresIn = responseData.expiresIn*1000;
        const expirationDate = new Date().getTime() + expiresIn;

        localStorage.setItem('token', responseData.idToken);
        localStorage.setItem('userId', responseData.localId);
        localStorage.setItem('expirationDate', expirationDate);

        timer = setTimeout(() => {
            context.dispatch('autoLogout');
        }, expiresIn);

        context.commit('setUser',{
            token: responseData.idToken,
            userId: responseData.localId,
        })
    },
    tryLogin(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const expirationDate = localStorage.getItem('expirationDate');

        const expiresIn = +expirationDate - new Date().getTime();

        if( expiresIn < 10000 ) {
            return;
        }
        
        timer = setTimeout( () => {
            context.dispatch('autoLogout');
        }, expiresIn)

        if(token && userId){
            context.commit('setUser', {
                token: token,
                userId: userId,
                tokenExpiration: null
            })
        }
    },
    logout(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('expirationDate')

        clearTimeout(timer);

        context.commit('setUser', {
            token: null,
            userId: null,
        });
    },
    autoLogout(context) {
        context.dispatch('dispatch');
        context.commit('setAutoLogout');
    }
};

export default authActions;