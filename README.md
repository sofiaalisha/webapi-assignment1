# Assignment 1

This is a **School Facility Booking API** for managing the reservation, availability, and usage of various school facilities. Each function is designed to manage the system, helping users and administrators interact with bookings efficiently.

## Set-up
1. Clone this repository
2. Install Node.js
3. Run the project by entering this line of code in this folder's integrated terminal
```
node app.js
```

## API Functions
1. Search for the list school facilities
2. Check for the availability of a school facility
3. Book a school facility
4. Cancel booking
5. Users can view a list of their past bookings
6. Administrators can view a list of all bookings


## Search for Facilities - searchFacilities(locationID)
The searchFacilities function finds and lists all the existing school facilities in a specific location using the locationID.

Firstly, the function verifies if the location ID that the user entered exists.
The .find method in JavaScript is used to search through an array to locate the first element that meets a specific condition.
```
    const location = this.locations.find(l => l.id === locationID);
    if (!location) {
        return `Location with ID does not exist. `;
    }
```
It then retrieves all facilities under the specified location.
The .filter method is used to create an array of elements from the original array that meets the specified condition.
```
const facilityList = this.facilities.filter(f => f.location === locationID);
```
It returns a list of facilities with their IDs and names. If none are found, it returns an appropriate message stating that there are no facilities found in the location entered.

## Check for Availability - checkAvailability(facilityID, timeslotID)
The checkAvailability function checks if a specific facility is available at a given timeslot using the facilityID and timeslotID.

First, it verifies if the facilityID and timeslotID entered exist.

It then checks if there is already a booking for that facility and timeslot.

The .some method is used to check if at least one element in an array satisfies a specified condition. It will return a true if any element meets the condition and false if none meet.
'''
const isBooked = this.bookings.some(
            booking => booking.facility === facilityID && booking.timeslot === timeslotID
        );
'''

It then return a message of whether the facility is available during that timeslot or not.

## Book Facility - bookFacility(studentID, facilityID, timeslotID)
The bookFacility function books a facility for a student at a specific timeslot using the studentID, facilityID and timeslotID.

Firstly, it checks for the availability of the facility.

Then it ensures that the studentID, facilityID and timeslotID are valid.

After validation, the booking will be added to the "bookings" list.
The .push method is used to add a new element to the end of an array. Thus, adding a new booking to the Bookings array.
```
this.bookings.push({
            facility: facilityID,
            studentID: studentID,
            timeslot: timeslotID
        });
```

After successfully booking a slot, it then returns a confirmation message.

## View Bookings - viewBookings()
The viewBookings function lists all the existing bookings.

If there are no bookings, it returns a message stating so.

For each booking, it fetches the facility, timeslot, and student details.

It will then display the booking information including the facility name, time, student name, and location.

The .map method is used to create a new array with the results of calling the function on every element.
```
return this.bookings.map(booking => {
    ...
}).join("\n");
```

## Cancel Booking - cancelBooking(studentID, facilityID, timeslotID)
The cancelBooking function cancels a specific booking for a student using the studentID, facilityID, and timeslotID.

It first verifies that the student, facility, and timeslot IDs are valid.

It will then remove the booking after checking that it exists in the bookings array.

The findIndex method is used to search an array for an element that meets a given condition and returns the index of the first element that matches. If no element is found, it returns -1.
```
const bookingIndex = this.bookings.findIndex(
            booking => booking.studentID === studentID &&
            booking.facility === facilityID &&
            booking.timeslot === timeslotID
        );
```

The splice method here is used to remove elements from an array.
```
this.bookings.splice(bookingIndex, 1);
```

Finally it will return a cancellation confirmation message or an error message if no booking is found.

## Get User's Booking History - getUserBookingHistory(studentID)
The getUserBookingHistory function retrieves all bookings made by a specific student using the studentID.

It filters the bookings list based on the studentID.

If no bookings are found, it returns a message stating so.

It will finally display the details of each booking for that student.


# References
Provide the references that you have used to support your assignment

Learnt the methods used in the functions such as .find and .filter.
https://www.w3schools.com/nodejs/nodejs_mongodb_find.asp

Learnt how to use the methods used in the functions with node.js such as .find, .some etc.
https://chatgpt.com/

For some tips in formatting text in readme file, refer to https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax