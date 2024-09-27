const request = require('supertest');
const app = require('../src/app');

describe('Hotel Room Booking System', () => {
  it('should book a room successfully', async () => {
    const response = await request(app)
      .post('/api/book-room')
      .send({
        guestName: 'John Doe',
        email: 'john@example.com',
        checkInDate: '2024-09-30',
        checkOutDate: '2024-10-05'
      });
    
    expect(response.statusCode).toBe(201);
    expect(response.body.booking).toHaveProperty('roomNumber');
  });

  it('should view a booking by email', async () => {
    const response = await request(app)
      .get('/api/view-booking?email=john@example.com');
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('guestName', 'John Doe');
  });

  it('should view all guests', async () => {
    const response = await request(app)
      .get('/api/all-guests');
    
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });


  it('should modify a booking', async () => {
    // Ensure a booking is created
    await request(app)
      .post('/api/book-room')
      .send({
        guestName: 'John Doe',
        email: 'john@example.com',
        checkInDate: '2024-09-30',
        checkOutDate: '2024-10-05'
      });
  
    // Modify the booking
    const response = await request(app)
      .put('/api/modify-booking')
      .send({
        email: 'john@example.com',
        roomNumber: 1,
        newCheckInDate: '2024-10-01',
        newCheckOutDate: '2024-10-06'
      });
  
    expect(response.statusCode).toBe(200);
    expect(response.body.booking).toHaveProperty('checkInDate', '2024-10-01');
  });
    
    it('should cancel a booking', async () => {
    const response = await request(app)
      .delete('/api/cancel-booking')
      .send({
        email: 'john@example.com',
        roomNumber: 1
      });
    
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Booking canceled successfully');
  });
});
