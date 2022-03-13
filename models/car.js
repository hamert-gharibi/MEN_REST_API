const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let carSchema = new Schema(

    {
        name: {type: String, required: true},
        description: {type:String, required: false},
        price: {type: Number, required: true},
        inStock: {type: Boolean, required: true}
    }
);

carSchema.pre('findOneAndUpdate', function() {
    const update = this.getUpdate();
    if (update.__v != null) {
      delete update.__v;
    }
    const keys = ['$set', '$setOnInsert'];
    for (const key of keys) {
      if (update[key] != null && update[key].__v != null) {
        delete update[key].__v;
        if (Object.keys(update[key]).length === 0) {
          delete update[key];
        }
      }
    }
    update.$inc = update.$inc || {};
    update.$inc.__v = 1;
  });

module.exports = mongoose.model("car", carSchema);