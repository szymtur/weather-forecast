class appHandler {

	unitsChanger(unitsSystem, category, value) {
		const strings = {
			temperature: 'temperature',
			pressure: 'pressure',
			humidity: 'humidity',
			wind: 'wind',
			metric: 'metric',
			imperial: 'imperial',
			scientific: 'scientific'
		}
		
		if (unitsSystem === strings.metric) {
			if (category === strings.temperature) {
				return `${Math.round(value)} \u00b0C`;
			}
			if (category === strings.wind) {
				return `${Math.round(Number(value) * 3.6)} km/h`;
			}
		}
		if (unitsSystem === strings.imperial) {
			if (category === strings.temperature) {
				return `${Math.round(value)} \u00b0F`;
			}
			if (category === strings.wind) {
				return `${Number(value).toFixed(2)} mph`;
			}
		}
		if (unitsSystem === strings.scientific) {
			if (category === strings.temperature) {
				return `${Math.round(value)} \u00b0K`;
			}
			if (category === strings.wind) {
				return `${Number(value).toFixed(2)} m/s`;
			}
		}
		if (unitsSystem) {
			if (category === strings.pressure) {
				return `${Math.round(value)} hPa`;
			}
			if (category === strings.humidity) {
				return `${value} %`;
			}
		}
	}


	nameChooser(data) {
		const placeAndAreaNames = [
			data['0']['address']['building'],
			data['0']['address']['public_building'],
			data['0']['address']['museum'],
			data['0']['address']['theatre'],
			data['0']['address']['arts_centre'],
			data['0']['address']['cinema'],
			data['0']['address']['castle'],
			data['0']['address']['attraction'],
			data['0']['address']['industrial'],
			data['0']['address']['hotel'],
			data['0']['address']['mall'],
			data['0']['address']['stadium'],
			data['0']['address']['station'],
			data['0']['address']['address29'],
			data['0']['address']['golf_course'],
			data['0']['address']['park'],
			data['0']['address']['zoo'],
			data['0']['address']['peak'],
			data['0']['address']['water'],
			data['0']['address']['river'],
			data['0']['address']['pedestrian'],
			data['0']['address']['quarter'],
			data['0']['address']['neighbourhood'],
			data['0']['address']['suburb'],
			data['0']['address']['district'],
			data['0']['address']['city_district']
		];

		const cityNames = [
			data['0']['address']['island'],
			data['0']['address']['locality'],
			data['0']['address']['croft'],
			data['0']['address']['hamlet'],
			data['0']['address']['village'],
			data['0']['address']['city'],
			data['0']['address']['town'],
			data['0']['address']['municipality'],
			data['0']['address']['county'],
			data['0']['address']['local_administrative_area'],
			data['0']['address']['state'],
			data['0']['address']['province'],
			data['0']['address']['country'],
			data['0']['address']['country_name']
		];

		const resultArray = [];

		function removeDuplicates(array) {
			if(array[0].indexOf(array[array.length-1]) != -1) {
				return array[0];
			}
			else {
				return array.join(" ");
			}
		}
	
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
	}


	isMobile() {
		const mobileCheck = [
			(/Android/i).test(navigator.userAgent),
			(/BlackBerry|RIM|BB|PlayBook/i).test(navigator.userAgent),
			(/iPhone|iPad|iPod/i).test(navigator.userAgent),
			(/Opera Mini/i).test(navigator.userAgent),
			(/IEMobile|WPDesktop|Nokia|Windows Phones/i).test(navigator.userAgent),
			(/webOS/i).test(navigator.userAgent),
			(/Kindle|Silk|KFAPW|KFARWI|KFASWI|KFFOWI|KFJW|KFMEWI|KFOT|KFSAW|KFSOWI|KFTBW|KFTHW|KFTT|WFFOWI/i).test(navigator.userAgent)
		]

		return (
			mobileCheck.indexOf(true) != -1
		)
	}
}


const handler = new appHandler();

const isMobile = handler.isMobile;
const unitsChanger = handler.unitsChanger;
const nameChooser = handler.nameChooser;

export {unitsChanger, nameChooser, isMobile};