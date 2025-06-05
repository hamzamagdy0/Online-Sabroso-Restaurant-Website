const mongoose = require('mongoose');
const ReservationsSchema=mongoose.Schema(
    {
        User: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: [true]
        },
        ReservationDate: {
          type: Date,
          required: [true]
        },
        ReservationTime:{
          type:String,
          required: [true]
        },
        NumberOfGuests: {
          type: Number,
          required: [true] 
        },
        createdAt: {
            type: Date,
            default: Date.now 
        },
        status: {
          type: String,
          enum: ['active', 'old'],
        },
      },
      { timestamps: true }
    );
    
    // Pre-save hook to set the status based on ReservationDate
    ReservationsSchema.pre('save', function (next) {
      const reservation = this;
      const currentDate = new Date();
    
      // Compare dates without considering the time part
      const reservationDateOnly = reservation.ReservationDate.setHours(0, 0, 0, 0);
      const currentDateOnly = currentDate.setHours(0, 0, 0, 0);
    
      reservation.status = reservationDateOnly >= currentDateOnly ? 'active' : 'old';
    
      next();
    });
    
const Reservations = mongoose.model("Reservations",ReservationsSchema);
module.exports=Reservations;