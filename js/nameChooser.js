function locationNameChooser() {

	let self = this;
	let resultArray = [];

	let placeAndAreaNames = [
		self['0']['address']['building'],
		self['0']['address']['public_building'],
		self['0']['address']['museum'],
		self['0']['address']['theatre'],
		self['0']['address']['arts_centre'],
		self['0']['address']['cinema'],
		self['0']['address']['castle'],
		self['0']['address']['attraction'],
		self['0']['address']['industrial'],
		self['0']['address']['hotel'],
		self['0']['address']['mall'],
		self['0']['address']['stadium'],
		self['0']['address']['station'],
		self['0']['address']['address29'],
		self['0']['address']['golf_course'],
		self['0']['address']['park'],
		self['0']['address']['zoo'],
		self['0']['address']['peak'],
		self['0']['address']['water'],
		self['0']['address']['river'],
		self['0']['address']['pedestrian'],
		self['0']['address']['quarter'],
		self['0']['address']['neighbourhood'],
		self['0']['address']['suburb'],
		self['0']['address']['district'],
		self['0']['address']['city_district']
	];

	let cityNames = [
		self['0']['address']['island'],
		self['0']['address']['locality'],
		self['0']['address']['croft'],
		self['0']['address']['hamlet'],
		self['0']['address']['village'],
		self['0']['address']['city'],
		self['0']['address']['town'],
		self['0']['address']['municipality'],
		self['0']['address']['county'],
		self['0']['address']['local_administrative_area'],
		self['0']['address']['state'],
		self['0']['address']['province'],
		self['0']['address']['country'],
		self['0']['address']['country_name']
	];

	for (let i=0; i<placeAndAreaNames.length; i++) {
		if(placeAndAreaNames[i] != undefined) {
			resultArray.push(placeAndAreaNames[i]);

			for (let i=0; i<cityNames.length; i++) {
				if(cityNames[i] != undefined) {
					resultArray.push(cityNames[i]);
					return removeDuplicates(resultArray);
				}
			}
		}
	}

	for (let i=0; i<cityNames.length; i++) {
		if(cityNames[i] != undefined) {
			return cityNames[i];
		}
	}

	function removeDuplicates(array) {
		if(array[0].indexOf(array[array.length-1]) != -1) {
			return array[0];
		}
		else {
			return array.join(" ");
		}
	}
}

export default locationNameChooser;