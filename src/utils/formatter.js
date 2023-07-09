export default {
    format_date(date) {
        function addZero(num) {
            return num < 10 ? '0' + num : '' + num;
        }

        if (typeof date === 'string') {
            date = new Date(date + '-01');
        }
        let year = date.getFullYear();
        let month = addZero(date.getMonth() + 1);
        let day = addZero(date.getDate());
        let hour = addZero(date.getHours());
        let minute = addZero(date.getMinutes());
        let second = addZero(date.getSeconds());
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    },
};