'use strict';

import mongoose from 'mongoose';

var ItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  qty: Number,
  quantity: { type: Number, default: 1 },
  serving: { type: Number, default: 1 },
  delDate: Date,
  age: { type: Number, default: 0 },
  shelfLife: Number
}, { timestamps: true } );

export default mongoose.model('Item', ItemSchema);
