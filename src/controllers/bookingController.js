let bookings = [];
let nextRoomNumber = 1;

// Booking Room API
exports.bookRoom = (req, res) => {
  const { guestName, email, checkInDate, checkOutDate } = req.body;

  const roomNumber = nextRoomNumber++;
  const booking = { roomNumber, guestName, email, checkInDate, checkOutDate };
  bookings.push(booking);

  res.status(201).json({ message: 'Room booked successfully', booking });
};

// View Booking Details API
exports.viewBooking = (req, res) => {
  const { email } = req.query;

  const booking = bookings.find(b => b.email === email);
  if (booking) {
    res.status(200).json(booking);
  } else {
    res.status(404).json({ message: 'Booking not found' });
  }
};

// View All Guests API
exports.viewAllGuests = (req, res) => {
  res.status(200).json(bookings);
};

// Cancel Room Booking API
exports.cancelBooking = (req, res) => {
  const { email, roomNumber } = req.body;

  bookings = bookings.filter(b => b.email !== email || b.roomNumber !== parseInt(roomNumber));
  res.status(200).json({ message: 'Booking canceled successfully' });
};

// Modify Booking API
exports.modifyBooking = (req, res) => {
    const { email, roomNumber, newCheckInDate, newCheckOutDate } = req.body;
    console.log('Request Body:', req.body); // Debugging log
  
    const booking = bookings.find(b => b.email === email && b.roomNumber === parseInt(roomNumber));
    if (booking) {
      booking.checkInDate = newCheckInDate;
      booking.checkOutDate = newCheckOutDate;
      res.status(200).json({ message: 'Booking updated successfully', booking });
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  };
  
  
