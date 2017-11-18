import helper from "./helper";

const server={
    getContributions(){
        return new Promise(function (resolve, reject) {
            // If the username isn't used, hash the password with bcrypt to store it in localStorage
            //if (!this.doesUserExist(username)) {
            let result = [];
            let now = new Date();
            for (let day = 0; day < 365; day++) {
                let dat = helper.addDays(now, day);
                let dateInIso = helper.toISODate(dat);
                result.push({date: dateInIso, value: Math.random()});
            }
            setTimeout(function () {
                resolve(result)
            }, 1000);
        });
    }
};

export default server;