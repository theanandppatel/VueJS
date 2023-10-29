export default {
    async registerCoach(context, payload){
        const userId = context.rootGetters.userId
        const coachData = {
            firstName: payload.first,
            lastName: payload.last,
            description: payload.desc,
            hourlyRate: payload.rate,
            areas: payload.areas
        };
        const token = context.rootGetters.token;

        const response = await fetch(`https://fir-243cd-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`,{
            method: 'PUT',
            body: JSON.stringify(coachData)
        });

        // const responseData = await response.json();
        if(!response.ok){
            console.log('Error');
            return ;
        }

        context.commit('registerCoach', {
            ...coachData,
            id: userId
        });
    },
    async fetchCoaches(context, payload){
        if(!payload.forceRefresh && !context.getters.shouldUpdate){
            return ;
        }
        const response = await fetch('https://fir-243cd-default-rtdb.firebaseio.com/coaches.json');

        const responseData = await response.json();

        if(!response.ok){
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }

        const coaches = [];
        for(const key in responseData){
            const coach = {
                id: key,
                firstName: responseData[key].firstName,
            lastName: responseData[key].lastName,
            description: responseData[key].description,
            hourlyRate: responseData[key].hourlyRate,
            areas: responseData[key].areas};

            coaches.push(coach);
        }
        context.commit('setCoaches', coaches);
        context.commit('setFetchTimeStamp');
    }
};