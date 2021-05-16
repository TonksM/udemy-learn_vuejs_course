const requestMutations = {
    addRequest(state, payload) {
        state.requests.push(payload);
        console.log("payload", payload);
    },
    setRequests(state, payload) {
        state.requests = payload;
    }
}

export default requestMutations;