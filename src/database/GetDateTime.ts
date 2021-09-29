class GetDateTime {
    stamp() {
      var now = new Date();
      return (now.getUTCFullYear() + '-' +
              ((now.getUTCMonth() + 1) < 10 
                  ? ('0' + (now.getUTCMonth() + 1)) 
                  : (now.getUTCMonth() + 1)) + '-' +
               ((now.getUTCDate() < 10) 
                    ? ("0" + now.getUTCDate())
                    : (now.getUTCDate())) +  " " +
               now.getUTCHours() + ':' +
               ((now.getUTCMinutes() < 10)
                   ? ("0" + now.getUTCMinutes())
                   : (now.getUTCMinutes())) + ':' +
               ((now.getUTCSeconds() < 10)
                   ? ("0" + now.getUTCSeconds())
                   : (now.getUTCSeconds())));
    }

    date() {
        var now = new Date();
        return (now.getUTCFullYear() + '-' +
                ((now.getUTCMonth() + 1) < 10 
                    ? ('0' + (now.getUTCMonth() + 1)) 
                    : (now.getUTCMonth() + 1)) + '-' +
                 ((now.getUTCDate() < 10) 
                      ? ("0" + now.getUTCDate())
                      : (now.getUTCDate())))
      }

    isPast(date) {
        // Checking if this day is in the future or today
        var dateDay = parseInt(String(date[8]) + String(date[9]));
        var dateMonth = parseInt(String(date[5]) + String(date[6]));
        var dateYear = parseInt(String(date[0]) + String(date[1]) + String(date[2]) + String(date[3]));
        
        var today = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();

        if (dateYear <= year) {
            if (dateMonth <= month) {
                if (dateDay < today) {
                    return true;
                }
                else return false;
            } else return false;
        } else return false;
    }
}

const getDateTime = new GetDateTime

console.log(getDateTime.date())


export {GetDateTime};