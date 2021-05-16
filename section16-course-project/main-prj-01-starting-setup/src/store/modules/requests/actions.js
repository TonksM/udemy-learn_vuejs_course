const requestActions = {
    async addRequest(context, data) {
        const requestData = {
            email: data.email,
            msg: data.msg,
        };
        const response = await fetch(
            `https://vue-https-demo-e4c37-default-rtdb.firebaseio.com/requests/${data.coachId}.json`,{
            method: 'POST',
            body: JSON.stringify(requestData)
        });

        const responseData = await response.json();

        if(!response.ok){
            const error = new Error(responseData.message || "Failed to send request to database");
            throw error;
        }

        requestData.id = responseData.name;
        requestData.coachId = data.coachId;

        context.commit('addRequest', requestData);
    }, 
    async fetchRequests(context){
        const coachId = context.rootGetters.userId;

        const response = await fetch(`https://vue-https-demo-e4c37-default-rtdb.firebaseio.com/requests/${coachId}.json`);

        const responseData = await response.json();

        if(!response.ok){
            const error = new Error(responseData.message || "Failed to fetch requests.");
            throw error;
        }

        const requests = [];

        for( const key in responseData){
            const request = {
                id: key,
                coachId: coachId,
                email: responseData[key].email,
                msg: responseData[key].msg
            };
        requests.push(request);
        }

        context.commit('setRequests', requests);
    }
}

export default requestActions;