//Business Service: School Facility Booking
//Check availability of facilities
//Book a facility
//Cancel booking
//Allow users to view their booking history
//Allow administrators to view all bookings
//Search for existing facilities

module.exports = {
    "locations": [
        {id: "SF1", name: "Student Lounge"},
        {id: "SF2", name: "Library"},
    ],

    "facilities": [
        {id: "F1", name: "Foosball Station 1", location: "SF1"},
        {id: "F2", name: "Foosball Station 2", location: "SF1"},
        {id: "F3", name: "Karaoke Room 1", location: "SF1"},
        {id: "F4", name: "Karaoke Room 2", location: "SF1"},
        {id: "F5", name: "Meeting Room 1", location: "SF2"},
        {id: "F6", name: "Meeting Room 2", location: "SF2"},
        {id: "F7", name: "Meeting Room 3", location: "SF2"},
        {id: "F8", name: "Meeting Room 4", location: "SF2"}
    ],

    "timeslots": [
        {id: "T1", time: "13:00 - 14:00"},
        {id: "T2", time: "14:00 - 15:00"},
        {id: "T3", time: "15:00 - 16:00"},
        {id: "T4", time: "16:00 - 17:00"},
        {id: "T5", time: "17:00 - 18:00"},
        {id: "T6", time: "18:00 - 19:00"}
    ],

    "bookings": [{
        facility: "F2",
        studentID: "567890E",
        timeslot: "T1"
    }],

    "students": [
        {studentID: "123456A", studentName: "Emerald Evergreen"},
        {studentID: "234567B", studentName: "Angelica Sky"},
        {studentID: "345678C", studentName: "Gabriel Greta"},
        {studentID: "456789D", studentName: "Jasmine Loo"},
        {studentID: "567890E", studentName: "Ian Salvatore"},
    ],

    //Check for availability of facility at a specific timeslot
    checkAvailability(facilityID, timeslotID) {
        const facility = this.facilities.find(f => f.id === facilityID);
        if (!facility) {
            return `Facility \"${facilityID}\" does not exist. `;
        }

        const timeslot = this.timeslots.find(t => t.id === timeslotID);
        if (!timeslot) {
            return `Timeslot \"${timeslot}\" does not exist. `;
        }

        const isBooked = this.bookings.some(
            booking => booking.facility === facilityID && booking.timeslot === timeslotID
        );

        if (isBooked) {
            return `${facility.name} is not available at ${timeslot.time}. `;
        }
        else {
            return `${facility.name} is available at ${timeslot.time}. `;
        }
    },

    //Book a facility at a specific timeslot under a studentID
    bookFacility(studentID, facilityID, timeslotID) {
        const isAvailable = this.checkAvailability(facilityID, timeslotID);

        if (isAvailable.includes("not available")) {
            return `Unable to book slot: ${isAvailable}`;
        }

        const student = this.students.find(s => s.studentID === studentID);
        if (!student) {
            return `Student ID \"${studentID}\" does not exist. `;
        }

        const facility = this.facilities.find(f => f.id === facilityID);
        if (!facility) {
            return `Facility \"${facilityID}\" does not exist. `;
        }

        const timeslot = this.timeslots.find(t => t.id === timeslotID);
        if (!timeslot) {
            return `Timeslot \"${timeslotID}\" does not exist. `;
        }

        this.bookings.push({
            facility: facilityID,
            studentID: studentID,
            timeslot: timeslotID
        });

        return `Booking Successful: ${facility.name} for ${student.studentName} (${student.studentID}) at ${timeslot.time}. `;
    },

    //Allow administrators to view list of all bookings
    viewBookings() {
        if (this.bookings.length === 0) {
            return "No bookings avauilable. ";
        }

        return this.bookings.map(booking => {
            const facility = this.facilities.find(f => f.id === booking.facility);
            const facilityName = facility ? facility.name : "This facility does not exist. ";

            const timeslot = this.timeslots.find(t => t.id === booking.timeslot);
            const time = timeslot ? timeslot.time : "This timeslot does not exist. ";

            const student = this.students.find(s => s.studentID === booking.studentID);
            const studentName = student ? student.studentName : "This Student ID does not exist. ";

            const locationName = "This location does not exist. ";

            if (facility) {
                const location = this.locations.find(l => l.id === facility.location);
                const locationName = location ? location.name : "This location does not exist. ";

                return `Booking Details: \nFacility: ${facilityName} \nTimeslot: ${time} \nLocation: ${locationName} \nBooked by: ${studentName} (${student.studentID})`;
            }

            return `Booking Details: \nFacility: ${facilityName} \nTimeslot: ${time} \nLocation: ${locationName} \nBooked by: ${studentName} (${student.studentID})`;


        }).join("\n");
    },

    //Cancel facility booking
    cancelBooking(studentID, facilityID, timeslotID) {
        const student = this.students.find(s => s.studentID === studentID);
        if (!student) {
            return `Student ID \"${studentID}\" does not exist. `;
        }

        const facility = this.facilities.find(f => f.id === facilityID);
        if (!facility) {
            return `Facility \"${facilityID}\" does not exist. `;
        }

        const timeslot = this.timeslots.find(t => t.id === timeslotID);
        if (!timeslot) {
            return `Timeslot \"${timeslotID}\" does not exist. `;
        }

        const bookingIndex = this.bookings.findIndex(
            booking => booking.studentID === studentID &&
            booking.facility === facilityID &&
            booking.timeslot === timeslotID
        );

        if (bookingIndex === -1) {
            return `No booking found for ${student.studentName} at ${facility.name} for the timeslot of ${timeslot.time}. `;
        }

        this.bookings.splice(bookingIndex, 1);
        return `Booking cancelled for ${student.studentName} at ${facility.name} from ${timeslot.time}. `;
    },

    //Allow users to view their booking history
    getUserBookingHistory(studentID) {
        const userBookings = this.bookings.filter(booking => booking.studentID === studentID);

        if (userBookings.length === 0) {
            return `No booking history found for Student ID ${studentID}. `;
        }

        return userBookings.map(booking => {
            const facility = this.facilities.find(f => f.id === booking.facility);
            const facilityName = facility ? facility.name : "This facility does not exist. ";

            const timeslot = this.timeslots.find(t => t.id === booking.timeslot);
            const time = timeslot ? timeslot.time : "This timeslot does not exist. ";

            const student = this.students.find(s => s.studentID === booking.studentID);
            const studentName = student ? student.studentName : "This Student ID does not exist. ";

            const locationName = "This location does not exist. ";

            if (facility) {
                const location = this.locations.find(l => l.id === facility.location);
                const locationName = location ? location.name : "This location does not exist. ";

                return `Booking Details: \nFacility: ${facilityName} \nTimeslot: ${time} \nLocation: ${locationName} \nBooked by: ${studentName} (${student.studentID})`;
            }

            return `Booking Details: \nFacility: ${facilityName} \nTimeslot: ${time} \nLocation: ${locationName} \nBooked by: ${studentName} (${student.studentID})`;
        }).join("\n");
    },

    //Search for existing school facilities
    searchFacilities(locationID) {
        const location = this.locations.find(l => l.id === locationID);

        if (!location) {
            return `Location with ID does not exist. `;
        }

        const facilityList = this.facilities.filter(f => f.location === locationID);

        if (facilityList.length === 0) {
            return `No facilities found in ${location.name}.`;
        }

        return facilityList.map(facility => {
            return `Facility: ${facility.name} (ID: ${facility.id})`;
        }).join("\n");
    }
}










