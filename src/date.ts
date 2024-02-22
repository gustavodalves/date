import { OperationDate } from "./types/operations";

export class DateTime {
    private constructor(
        private _year: number,
        private _month: number,
        private _day: number,
        private _hours: number,
        private _minutes: number,
        private _seconds: number
    ) {}

    static now() {
        return DateTime.fromJsDate(new Date())
    }

    static fromObject({ day, month, year }: { day: number, month: number, year: number }) {
        return DateTime.fromJsDate(new Date(year, month, day))
    }

    static fromISO(iso: string) {
        return DateTime.fromJsDate(new Date(iso))
    }

    static fromJsDate(date: Date) {
        return new DateTime(
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds()
        );
    }

    static fromFormat(format: string, dateString: string) {
        const yearIndex = format.indexOf('yyyy');
        const monthIndex = format.indexOf('MM');
        const dayIndex = format.indexOf('dd');
        const hoursIndex = format.indexOf('hh');
        const minutesIndex = format.indexOf('mm');
        const secondsIndex = format.indexOf('ss');
    
        const parse = (date: string, initIndex: number, amount: number) => (
            parseInt(date.substring(initIndex, initIndex + amount))
        );
    
        const year = parse(dateString, yearIndex, 4);
        const month = parse(dateString, monthIndex, 2);
        const day = parse(dateString, dayIndex, 2);
        const hours = parse(dateString, hoursIndex, 2);
        const minutes = parse(dateString, minutesIndex, 2);
        const seconds = parse(dateString, secondsIndex, 2);
    
        return new DateTime(year, month, day, hours, minutes, seconds);
    }
    
    format(format: string) {
        return format
            .replace('yyyy', this._year.toString())
            .replace('MM', this._month.toString().padStart(2, '0'))
            .replace('dd', this._day.toString().padStart(2, '0'))
            .replace('hh', this._hours.toString().padStart(2, '0'))
            .replace('mm', this._minutes.toString().padStart(2, '0'))
            .replace('ss', this._seconds.toString().padStart(2, '0'));
    }

    isInSameDate(...dates: DateTime[]) {
        if (!dates.length) return false;
        const lastDate = dates.pop()!;
        return dates.every(date => {
            return (
                date.year === lastDate.year &&
                date.month === lastDate.month &&
                date.day === lastDate.day
            );
        });
    }

    get year() {
        return this._year;
    }

    get month() {
        return this._month;
    }

    get day() {
        return this._day;
    }

    get hours() {
        return this._hours;
    }

    get minutes() {
        return this._minutes;
    }

    get seconds() {
        return this._seconds;
    }

    minus(values: OperationDate = {}) {
        const { years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0 } = values;
        this._year -= years;
        this._month -= months;
        this._day -= days;
        this._hours -= hours;
        this._minutes -= minutes;
        this._seconds -= seconds;

        return this;
    }

    plus(values: OperationDate = {}) {
        const { years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0 } = values;
        this._year += years;
        this._month += months;
        this._day += days;
        this._hours += hours;
        this._minutes += minutes;
        this._seconds += seconds;

        return this;
    }
}
