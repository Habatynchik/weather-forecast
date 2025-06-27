const userRepository = require('../model/userRepository');

const favoritService = {
    addFavorit: async (user_id, city) => {
        try{
            const favoriteCities = await userRepository.getAllFavoritesCities(user_id);
            const cities = favoriteCities.map(c => c.city);
            const exist = cities.includes(city)
            console.log(exist)
            if(exist){
                throw new Error("THIS CITY IS ALREADY ADD");
            } else {
               return await userRepository.addFavorites(user_id, city);
            }

        } catch(err) {
            console.error("Failed to add favorite:", err.message);
            throw err;
        }
    }
};

module.exports = favoritService;