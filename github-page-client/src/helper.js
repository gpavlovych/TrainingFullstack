const helper = {
    getMonday (d) {
        d = new Date(d);
        let day = d.getDay();
        let diff = d.getDate() - day; // adjust when day is sunday
        return new Date(d.setDate(diff));
    },
    addDays (d, days) {
        d = new Date(d);
        let diff = d.getDate() + days; // adjust when day is sunday

        return new Date(d.setDate(diff));
    },
    toISODate (date) {
        return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().substring(0,10);
    }
};

export default helper;