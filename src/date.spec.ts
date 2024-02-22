import { DateTime } from "./date";

describe('DateTime', () => {
  it('should create DateTime using static now method', () => {
    const now = DateTime.now();
    const currentDate = new Date();
    expect(now.year).toBe(currentDate.getFullYear());
    expect(now.month).toBe(currentDate.getMonth() + 1);
    expect(now.day).toBe(currentDate.getDate());
    expect(now.hours).toBe(currentDate.getHours());
    expect(now.minutes).toBe(currentDate.getMinutes());
    expect(now.seconds).toBe(currentDate.getSeconds());
  });

  it('should create DateTime from an object of date', () => {
    const dateObj = { year: 2024, month: 2, day: 22 };
    const dateTime = DateTime.fromObject(dateObj);
    expect(dateTime.year).toBe(2024);
    expect(dateTime.month).toBe(2);
    expect(dateTime.day).toBe(22);
  });

  it('should create DateTime from ISO string', () => {
    const isoString = '2024-02-22T08:00:00Z';
    const dateTime = DateTime.fromISO(isoString);
    expect(dateTime.year).toBe(2024);
    expect(dateTime.month).toBe(2);
    expect(dateTime.day).toBe(22);
    expect(dateTime.hours).toBe(5);
    expect(dateTime.minutes).toBe(0);
    expect(dateTime.seconds).toBe(0);
  });

  it('should create DateTime from custom format', () => {
    const dateString = '20240222T080000';
    const dateTime = DateTime.fromFormat('yyyyMMddThhmmss', dateString);
    expect(dateTime.year).toBe(2024);
    expect(dateTime.month).toBe(2);
    expect(dateTime.day).toBe(22);
    expect(dateTime.hours).toBe(8);
    expect(dateTime.minutes).toBe(0);
    expect(dateTime.seconds).toBe(0);
  });

  it('should format DateTime', () => {
    const dateTime = DateTime.fromObject({ year: 2024, month: 2, day: 22, hours: 8, minutes: 30, seconds: 45 });
    const formattedDateTime = dateTime.format('yyyy-MM-dd hh:mm:ss');
    expect(formattedDateTime).toBe('2024-02-22 08:30:45');
  });

  it('should subtract values from DateTime', () => {
    const dateTime = DateTime.fromObject({ year: 2024, month: 2, day: 22 });
    dateTime.minus({ days: 1, hours: 2, minutes: 30 });
    expect(dateTime.year).toBe(2024);
    expect(dateTime.month).toBe(2);
    expect(dateTime.day).toBe(20);
    expect(dateTime.hours).toBe(21);
    expect(dateTime.minutes).toBe(30);
  });

  it('should add values to DateTime', () => {
    const dateTime = DateTime.fromObject({ year: 2024, month: 2, day: 22 });
    dateTime.plus({ days: 1, hours: 2, minutes: 30 });
    expect(dateTime.year).toBe(2024);
    expect(dateTime.month).toBe(2);
    expect(dateTime.day).toBe(23);
    expect(dateTime.hours).toBe(2);
    expect(dateTime.minutes).toBe(30);
  });

  it('should determine if multiple DateTimes are in the same date', () => {
    const dateTime1 = DateTime.fromObject({ year: 2024, month: 2, day: 22 });
    const dateTime2 = DateTime.fromObject({ year: 2024, month: 2, day: 22 });
    const dateTime3 = DateTime.fromObject({ year: 2023, month: 2, day: 22 });
    expect(dateTime1.isInSameDate(dateTime2, dateTime3)).toBe(false);
    expect(dateTime1.isInSameDate(dateTime3)).toBe(false);
    expect(dateTime1.isInSameDate(dateTime2)).toBe(true);
  });
});
