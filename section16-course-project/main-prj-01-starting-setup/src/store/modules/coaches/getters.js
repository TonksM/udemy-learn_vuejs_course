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
}

export default coachGetters;