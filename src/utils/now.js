export default function now_datetime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
}