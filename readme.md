# DateTime Class

This class provides functionalities for handling dates and times flexibly in TypeScript/JavaScript applications.

## Installation

To use the `DateTime` class, you can simply copy the provided code and include it in your project. There's no need for installation via npm or similar package manager.

## Usage

### Creating a new DateTime instance

You can create a new instance of `DateTime` in several ways:

```typescript
import { DateTime } from './DateTime';

// Create an instance representing the current date and time
const now = DateTime.now();

// Create an instance from an object of date and time
const customDateTime = DateTime.fromObject({
    year: 2024,
    month: 2,
    day: 22,
    hours: 10,
    minutes: 30,
    seconds: 15
});

// Create an instance from a string in ISO format
const isoDateTime = DateTime.fromISO('2024-02-22T10:30:15');

// Create an instance from a custom format string
const formattedDateTime = DateTime.fromFormat('yyyy-MM-dd hh:mm:ss', '2024-02-22 10:30:15');
