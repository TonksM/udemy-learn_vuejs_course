const coachMutations = {
    registerCoach(state, payload) {
        state.coaches.push(payload);
    }
}

export default coachMutations;