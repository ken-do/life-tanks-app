export default class Converter {

    static pointsToStatus(points) {
        if (points >= 75) {
            return 'excellent'
        }

        if (points >= 60) {
            return 'good'
        }

        if (points >= 40) {
            return 'okay'
        }

        return 'poor'
    }

    static toSentenceCase(text){
        return text[0].toUpperCase() + text.slice(1);
    }

    static arrayToObject(list){
        const obj = {};
        for (let item of list){
            obj[item.id] = item;
        }
        return obj;
    }
}