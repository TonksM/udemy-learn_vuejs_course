const requestMutations = {
    addRequest(state, payload) {
        state.requests.push(payload);
        console.log("payload", payload);
    }
}

export default requestMutations;