exports.unitsChanger = (unitsSystem, category, value) => {
    const CONSTS = {
        temperature: 'temperature',
        pressure: 'pressure',
        humidity: 'humidity',
        wind: 'wind',
        metric: 'metric',
        imperial: 'imperial',
        scientific: 'scientific'
    }

    if (unitsSystem === CONSTS.metric) {
        if (category === CONSTS.temperature) {
            return `${Math.round(value)} \u00b0C`;
        }
        if (category === CONSTS.wind) {
            return `${Math.round(Number(value) * 3.6)} km/h`;
        }
    }

    if (unitsSystem === CONSTS.imperial) {
        if (category === CONSTS.temperature) {
            return `${Math.round(value)} \u00b0F`;
        }
        if (category === CONSTS.wind) {
            return `${Number(value).toFixed(2)} mph`;
        }
    }

    if (unitsSystem === CONSTS.scientific) {
        if (category === CONSTS.temperature) {
            return `${Math.round(value)} \u00b0K`;
        }
        if (category === CONSTS.wind) {
            return `${Number(value).toFixed(2)} m/s`;
        }
    }

    if (category === CONSTS.pressure) {
        return `${Math.round(value)} hPa`;
    }

    if (category === CONSTS.humidity) {
        return `${Math.round(value * 100) / 100} %`;
    }
}


exports.nameChooser = (data) => {
    const placeAndAreaNames = [
        data['address']['building'],
        data['address']['public_building'],
        data['address']['museum'],
        data['address']['theatre'],
        data['address']['arts_centre'],
        data['address']['cinema'],
        data['address']['castle'],
        data['address']['attraction'],
        data['address']['industrial'],
        data['address']['hotel'],
        data['address']['mall'],
        data['address']['stadium'],
        data['address']['station'],
        data['address']['address29'],
        data['address']['golf_course'],
        data['address']['park'],
        data['address']['zoo'],
        data['address']['peak'],
        data['address']['river'],
        data['address']['pedestrian'],
        data['address']['quarter'],
        data['address']['neighbourhood'],
        data['address']['suburb'],
        data['address']['district'],
        data['address']['city_district']
    ];

    const cityNames = [
        data['address']['island'],
        data['address']['croft'],
        data['address']['hamlet'],
        data['address']['village'],
        data['address']['city'],
        data['address']['town'],
        data['address']['municipality'],
        data['address']['county'],
        data['address']['locality'],
        data['address']['local_administrative_area'],
        data['address']['state'],
        data['address']['province'],
        data['address']['country'],
        data['address']['country_name']
    ];

    const resultArray = [];
    const romanNumeral = new RegExp('^(?:M*(?:LD|LM|CM|CD|D?C{0,3})(?:VL|VC|XC|XL|L?X{0,3})(?:IX|IV|V?I{0,3}))$', 'i');

    for (let i=0; i<placeAndAreaNames.length; i++) {
        if(placeAndAreaNames[i] && !romanNumeral.test(placeAndAreaNames[i])) {
            resultArray.push(placeAndAreaNames[i]);
            break;
        }
    }

    for (let i=0; i<cityNames.length; i++) {
        if(cityNames[i]) {
            resultArray.push(cityNames[i]);
            break;
        }
    }

    if(!resultArray[0].indexOf(resultArray[resultArray.length-1])) {
        return resultArray[0];
    }

    return resultArray.join(" ");
}
