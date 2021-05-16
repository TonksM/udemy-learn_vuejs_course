const coachGetters = {
    getCoaches: (state) => {
        return state.coaches;
    },
    hasCoaches: (state) => {
        return state.coaches && state.coaches.length > 0;
    },
    getCoachByID: (state) => (id) => {
        // /console.log("getter",id)
        return state.coaches.find(c => c.id === id);
    },
    isCoach: (state, _, _2, rootGetters) => {
        const userId = rootGetters.userId; 
        return state.coaches.find(c => c.id === userId);
    },
    shouldUpdate: (state) => {
        const lastFetch = state.lastFetch;
        if(!lastFetch){
            return true;
        }
        const currentTimestamp = new Date().getTime();
        return ((currentTimestamp - lastFetch) / 1000 > 120)
    }
}

export default coachGetters;