const requestGetters = {
    getRequestByCoachID: (state) => (id) => {
        // /console.log("getter",id)
        return state.coaches.find(c => c.id === id);
    },
}

export default requestGetters;