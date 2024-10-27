function isMeetingWithinWorkHours(workStart, workEnd, meetingStart, meetingDuration) {
  function timeToMinutes(time){
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  const workStartMinutes = timeToMinutes(workStart);
  const workEndMinutes = timeToMinutes(workEnd);
  const meetingStartMinutes = timeToMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return meetingStartMinutes >= workStartMinutes && meetingEndMinutes <= workEndMinutes;
}
isMeetingWithinWorkHours('08:00', '17:30', '14:00', 90);
isMeetingWithinWorkHours('08:00', '14:30', '14:00', 90);
