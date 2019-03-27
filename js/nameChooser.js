function locationNameChooser() {

	let self = this;

	let building = self['0']['address']['building'];
	let museum = self['0']['address']['museum'];
	let pedestrian = self['0']['address']['pedestrian'];
	let neighbourhood = self['0']['address']['neighbourhood'];
	let suburb = self['0']['address']['suburb'];
	let hamlet = self['0']['address']['hamlet'];
	let village = self['0']['address']['village'];
	let city = self['0']['address']['city'];
	let town = self['0']['address']['town'];
	let county = self['0']['address']['county'];

	let locationNames = [building, museum, pedestrian, neighbourhood, suburb, hamlet, village, hamlet, city, town, county]

	for (let i=0; i<locationNames.length; i++) {
		if(locationNames[i] != undefined) {
			return locationNames[i];
		}
	}
}

export default locationNameChooser;