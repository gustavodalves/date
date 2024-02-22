export function normalizeDate(years: number, months: number, days: number, hours: number, minutes: number, seconds: number): [number, number, number, number, number, number] {
    let totalSeconds = seconds;
    let totalMinutes = minutes;
    let totalHours = hours;
    let totalDays = days;
    let totalMonths = months;
    let totalYears = years;

    if (totalSeconds < 0) {
        totalMinutes -= 1;
        totalSeconds += 60;
    }
    if (totalMinutes < 0) {
        totalHours -= 1;
        totalMinutes += 60;
    }
    if (totalHours < 0) {
        totalDays -= 1;
        totalHours += 24;
    }

    while (totalDays <= 0) {
        totalMonths -= 1;
        if (totalMonths < 1) {
            totalYears -= 1;
            totalMonths += 12;
        }
        const daysInPreviousMonth = new Date(totalMonths, totalYears, 0).getDate();
        totalDays += daysInPreviousMonth;
    }

    while (totalMonths < 1) {
        totalYears -= 1;
        totalMonths += 12;
    }
    if (totalSeconds >= 60) {
        totalMinutes += Math.floor(totalSeconds / 60);
        totalSeconds %= 60;
    }
    if (totalMinutes >= 60) {
        totalHours += Math.floor(totalMinutes / 60);
        totalMinutes %= 60;
    }
    if (totalHours >= 24) {
        totalDays += Math.floor(totalHours / 24);
        totalHours %= 24;
    }

    return [totalYears, totalMonths, totalDays, totalHours, totalMinutes, totalSeconds];
}