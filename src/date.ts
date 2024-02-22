import { normalizeDate } from "./modules/normalize-date";
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
        return DateTime.fromJsDate(new Date());
    }

    static fromObject({ year, month, day, hours = 0, minutes = 0, seconds = 0 }: { year: number, month: number, day: number, hours?: number, minutes?: number, seconds?: number }) {
        return new DateTime(year, month, day, hours, minutes, seconds);
    }

    static fromISO(iso: string) {
        return DateTime.fromJsDate(new Date(iso));
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

    isInSameDate(date: DateTime) {
        return (
            date.year === this.year &&
            date.month === this.month &&
            date.day === this.day
        )
    }

    isInSameDates(...dates: DateTime[]) {
        if (!dates.length) return false;

        return dates.every((date) => this.isInSameDate(date));
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

    static daysInMonth(month: number, year: number): number {
        return new Date(year, month, 0).getDate();
    }

    private normalizeDate(years: number, months: number, days: number, hours: number, minutes: number, seconds: number): [number, number, number, number, number, number] {
        return normalizeDate(years, months, days, hours, minutes, seconds)
    }

    minus(values: OperationDate = {}) {
        const { years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0 } = values;
        const [totalYears, totalMonths, totalDays, totalHours, totalMinutes, totalSeconds] = this.normalizeDate(this._year - years, this._month - months, this._day - days, this._hours - hours, this._minutes - minutes, this._seconds - seconds);

        this._year = totalYears;
        this._month = totalMonths;
        this._day = totalDays;
        this._hours = totalHours;
        this._minutes = totalMinutes;
        this._seconds = totalSeconds;

        return this;
    }

    plus(values: OperationDate = {}) {
        const { years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0 } = values;
        const [totalYears, totalMonths, totalDays, totalHours, totalMinutes, totalSeconds] = this.normalizeDate(this._year + years, this._month + months, this._day + days, this._hours + hours, this._minutes + minutes, this._seconds + seconds);

        this._year = totalYears;
        this._month = totalMonths;
        this._day = totalDays;
        this._hours = totalHours;
        this._minutes = totalMinutes;
        this._seconds = totalSeconds;

        return this;
    }
}
