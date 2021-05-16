const coachActions = {
    async registerCoach(context, data) {
        const userId = context.rootGetters.userId// new Date().toISOString(),
        const coachData = {
            firstName: data.firstName,
            lastName: data.lastName,
            areas: data.areas,
            description: data.description,
            hourlyRate: data.hourlyRate
        };

        const response = await fetch(
            `https://vue-https-demo-e4c37-default-rtdb.firebaseio.com/coaches/${userId}.json`,{
            method: 'PUT',
            body: JSON.stringify(coachData)
        });

        //const responseData = await response.json();

        if(!response.ok){
            //error
        }

        context.commit('registerCoach', {
            ...coachData,
            id: userId
        });
    },
    async loadCoaches(context, payload){
        if(!payload.forcedRefresh && !context.getters.shouldUpdate){
            return;
        }

        const response = await fetch(
            'https://vue-https-demo-e4c37-default-rtdb.firebaseio.com/coaches.json'
        );
        const responseData = await response.json();
        
        if(!response.ok){
            const error = new Error(responseData.message || "Failed to load!");
            throw error;
        }

        const coaches = [];

        for( const key in responseData){
            const coach = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                areas: responseData[key].areas,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate
            }

            coaches.push(coach);
        }

        context.commit('setCoaches', coaches);
        context.commit('setFetchTimestamp');
    }
}

export default coachActions;