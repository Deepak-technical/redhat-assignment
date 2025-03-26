import {calculateAge, formatDisplayDate } from "./utils";

describe("calculateAge function", () => {
  test("returns correct age when born and died dates are provided", () => {
    expect(calculateAge("2000-01-01", "2020-06-15")).toBe("20y 5m ");
  });
  
  test("returns correct age when only born date is provided", () => {
    const currentYear = new Date().getFullYear();
    expect(calculateAge("2000-01-01")).toMatch(new RegExp(`^${currentYear - 2000}y \\d+m$`));
  });
  
  test("returns '-' if born date is missing or invalid", () => {
    expect(calculateAge()).toBe("-");
    expect(calculateAge("invalid-date")).toBe("-");
  });
  
  test("returns '-' if died date is invalid", () => {
    expect(calculateAge("2000-01-01", "invalid-date")).toBe("-");
  });
});

describe("formatDisplayDate function", () => {
  test("correctly formats a valid date", () => {
    expect(formatDisplayDate("2000-01-01")).toBe("Jan 1, 2000");
  });
  
  test("returns '-' for an invalid or missing date", () => {
    expect(formatDisplayDate()).toBe("-");
    expect(formatDisplayDate("invalid-date")).toBe("-");
  });
});
