const coachActions = {
    registerCoach(context, data) {
        const coachData = {
            id: new Date().toISOString(),
            firstName: data.firstName,
            lastName: data.lastName,
            areas: data.areas,
            description: data.description,
            hourlyRate: data.hourlyRate
        };

        context.commit('registerCoach', coachData);
    }
}

export default coachActions;