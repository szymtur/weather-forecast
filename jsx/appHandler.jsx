class AppHandler {

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

        function removeDuplicates(array) {
            if(array[0].indexOf(array[array.length-1]) != -1) {
                return array[0];
            }
            else {
                return array.join(" ");
            }
        }

        for (let i=0; i<placeAndAreaNames.length; i++) {
            if(placeAndAreaNames[i] != undefined && romanNumeral.test(placeAndAreaNames[i]) === false) {
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
}

const handler = new AppHandler();

const unitsChanger = handler.unitsChanger;
const nameChooser = handler.nameChooser;

export {unitsChanger, nameChooser};