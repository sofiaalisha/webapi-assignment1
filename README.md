# Assignment 1

This is a **School Facility Booking API** for managing the reservation, availability, and usage of various school facilities. It allows users to search for school facilities, check the availability of the facility, book the facility, cancel the booking, view their booking history, and allows moderators to view all bookings.

## Set-up
1. Clone this repository
2. Install Node.js
3. Run this node project in this folder's integrated terminal
```
node app.js
```

## API Functions
1. Users can search for the list school facilities
2. Users can check for the availability of a school facility
3. Users can book a school facility
4. Users can cancel their booking
5. Users can see a list of their past bookings
6. Moderators can view a list of all bookings

# Search for Facilities
The searchFacilities function is designed to find and list all the existing school facilities. The .find method in JavaScript is used to search through an array to locate the first element that meets a specific condition.

Firstly, this function checks if the location ID that the user entered exists. 
```
    const location = this.locations.find(l => l.id === locationID);
    if (!location) {
        return `Location with ID does not exist. `;
    }
```
The function then uses the .filter method to create an array of elements from the original array that meets the specified condition.
```
const facilityList = this.facilities.filter(f => f.location === locationID);
```












You will only need one file, ie, your node module, for this assignment.

In this readme file, describe how to use your node module. It could be similar to **app.js** from Lab2, where you call some functions in your node module and display the output. Describe how to setup your node module, if any. Describe how to call the functions, what parameters required and so on.

You can press **Ctrl+Shift+V** in this file in Visual Studio Code to see a live preview of the readme file.

For some tips in formatting text in readme file, refer to https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax

# References
Provide the references that you have used to support your assignment

https://www.w3schools.com/nodejs/nodejs_mongodb_find.asp