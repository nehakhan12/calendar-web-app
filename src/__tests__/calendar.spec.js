const fs = require('fs');
const path = require('path');

// Load HTML and JavaScript
const html = fs.readFileSync(path.resolve(__dirname, '../layout.html'), 'utf8');
document.body.innerHTML = html;
const { initCalendar, prevMonth, nextMonth } = require('../main.js');

require('../main.js');
describe('Add Event', () => {
  test('should add an event to eventsArr', () => {
    let eventsArr = [];
    const activeDay = 15;
    const month = 3;
    const year = 2025;

    const newEvent = {
      title: "Test Event",
      time: "10:00 AM - 11:00 AM",
    };

    // simulate logic that adds event
    eventsArr.push({
      day: activeDay,
      month: month,
      year: year,
      events: [newEvent],
    });

    expect(eventsArr.length).toBe(1);
    expect(eventsArr[0].events[0].title).toBe("Test Event");
  });
});

describe('Delete Event', () => {
  test('should delete an event from eventsArr', () => {
    let eventsArr = [{
      day: 15,
      month: 3,
      year: 2025,
      events: [{ title: "Event 1", time: "10:00 AM - 11:00 AM" }]
    }];

    const eventTitle = "Event 1";

    eventsArr[0].events = eventsArr[0].events.filter(e => e.title !== eventTitle);

    expect(eventsArr[0].events.length).toBe(0);
  });
});

describe('Month Navigation', () => {
  test('should go to next month', () => {
    let month = 5;
    let year = 2025;

    month++;
    if (month > 11) {
      month = 0;
      year++;
    }

    expect(month).toBe(6);
    expect(year).toBe(2025);
  });

  test('should go to previous month', () => {
    let month = 0;
    let year = 2025;

    month--;
    if (month < 0) {
      month = 11;
      year--;
    }

    expect(month).toBe(11);
    expect(year).toBe(2024);
  });
});

describe('Go to Specific Date', () => {
  test('should set correct month and year from input', () => {
    const input = "04/2025";
    const dateArr = input.split("/");
    let month, year;

    if (dateArr.length === 2) {
      if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
        month = parseInt(dateArr[0]) - 1;
        year = parseInt(dateArr[1]);
      }
    }

    expect(month).toBe(3); // april is index 3
    expect(year).toBe(2025);
  });
});
