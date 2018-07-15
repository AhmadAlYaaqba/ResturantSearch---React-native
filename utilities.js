var api = {
	query : '',
	getRestaurants(){
		
		Key = '1d58e7947bd29dffd64a74004a586b30'
		var url = `https://developers.zomato.com/api/v2.1/search?q=${this.query}&&apikey=${Key}`;
		var options = {
        "method": "GET",
        "contentType": "application/json",
    }; 
		
		return fetch(url,options).then((res) => res.json());
	}
}

module.exports = api;