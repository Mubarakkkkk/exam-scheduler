import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function formatTime(timeString) {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minutes} ${ampm}`;
}

export function addHoursToTime(timeString, hoursToAdd) {
  const [hours, minutes] = timeString.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes + (hoursToAdd * 60);
  const newHours = Math.floor(totalMinutes / 60) % 24;
  const newMinutes = totalMinutes % 60;
  return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
}

export function checkTimeOverlap(start1, duration1, start2, duration2) {
  const start1Minutes = timeToMinutes(start1);
  const end1Minutes = start1Minutes + (duration1 * 60);
  const start2Minutes = timeToMinutes(start2);
  const end2Minutes = start2Minutes + (duration2 * 60);
  
  return start1Minutes < end2Minutes && end1Minutes > start2Minutes;
}

function timeToMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function getSubjectColor(courseCode) {
  const courseCodeToUpper = courseCode.toUpperCase();
  if (courseCodeToUpper.includes('COM')) return 'com';
  if (courseCodeToUpper.includes('CYS')) return 'cys';
  if (courseCodeToUpper.includes('NCC')) return 'ncc';
  if (courseCodeToUpper.includes('AIT')) return 'ait';
  if (courseCodeToUpper.includes('SWD')) return 'swd';
}

export function getCurrentWeekRange() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const start = new Date(today);
  start.setDate(today.getDate() - dayOfWeek);
  const end = new Date(today);
  end.setDate(today.getDate() + (6 - dayOfWeek));
  
  return {
    start: start.toISOString().split('T')[0],
    end: end.toISOString().split('T')[0]
  };
}