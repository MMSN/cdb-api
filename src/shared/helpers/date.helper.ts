import { DateTime, Interval } from 'luxon';

export function* days(interval: Interval): Generator<DateTime> {
  let cursor = interval.start.startOf('day');

  while (cursor <= interval.end) {
    yield cursor;
    cursor = cursor.plus({ days: 1 });
  }
}
