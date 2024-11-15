console.log("Starting my Node JS application");
console.log("--------------------------------");

const service = require("./Sofia_SchoolFacilityBooking.js");

//Search for list of facilities by Location ID
console.log(service.searchFacilities("SF1"));
console.log("--------------------------------");

//Check if facility is available by facility ID and timeslot ID
console.log(service.checkAvailability("F2", "T1"));
console.log(service.checkAvailability("F4", "T4"));
console.log("--------------------------------");

//Book facility by entering facility ID and timeslot ID with student ID
console.log(service.bookFacility("123456A", "F4", "T4"));
console.log(service.bookFacility("123456A", "F5", "T4"));
console.log("--------------------------------");

//Cancel facility booking with student ID, facility ID and timeslot ID
console.log(service.cancelBooking("456789D", "F4", "T4"));
console.log(service.cancelBooking("567890E", "F2", "T1"));
console.log("--------------------------------");

//Users can see a list of their past bookings
console.log(service.getUserBookingHistory("123456A"));
console.log("--------------------------------");

//Moderators can view a list of all bookings
console.log(service.viewBookings());


