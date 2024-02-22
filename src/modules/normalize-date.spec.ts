import { normalizeDate } from "./normalize-date";


describe('normalizeDate function', () => {
    it('should normalize the date components correctly', () => {
        expect(normalizeDate(2024, 2, 22, 10, 30, 45)).toEqual([2024, 2, 22, 10, 30, 45]);
        expect(normalizeDate(2024, 0, 0, -10, -30, -45)).toEqual([2023, 11, 30, 13, 29, 15]);
        expect(normalizeDate(2024, 13, 35, 30, 90, 100)).toEqual([2024, 13, 36, 7, 31, 40]);
    });
});