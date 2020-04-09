/**
 * Returns the number of seconds' difference between the UTC offsets of two time
 * zones, at a particular moment in time.
 *
 * @param {Temporal.Absolute} instant - A moment in time
 * @param {Temporal.TimeZone} sourceTimeZone - A time zone to examine
 * @param {Temporal.TimeZone} targetTimeZone - A second time zone to examine
 * @returns {number} The number of seconds difference between the time zones'
 *   UTC offsets
 */
function getUtcOffsetDifferenceSecondsAtInstant(instant, sourceTimeZone, targetTimeZone) {
  const sourceWallTime = instant.inTimeZone(sourceTimeZone);
  const targetWallTime = instant.inTimeZone(targetTimeZone);
  const difference = sourceWallTime.difference(targetWallTime, { largestUnit: 'seconds' });
  const sign = Temporal.DateTime.compare(targetWallTime, sourceWallTime) < 0 ? -1 : 1;
  return (
    sign *
    (difference.seconds +
      difference.milliseconds * 1e-3 +
      difference.microseconds * 1e-6 +
      difference.nanoseconds * 1e-9)
  );
}

const instant = Temporal.Absolute.from('2020-01-09T00:00Z');
const nyc = Temporal.TimeZone.from('America/New_York');
const chicago = Temporal.TimeZone.from('America/Chicago');

// At this instant, Chicago is 3600 seconds earlier than New York
assert.equal(getUtcOffsetDifferenceSecondsAtInstant(instant, nyc, chicago), -3600);
