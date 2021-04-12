const requestActions = {
    addRequest(context, data) {
        const requestData = {
            id: new Date().toISOString(),
            email: data.email,
            msg: data.msg,
            coachId: data.coachId,
        };

        context.commit('addRequest', requestData);
    }
}

export default requestActions;