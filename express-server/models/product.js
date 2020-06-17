const mongoose = require("mongoose");
const ReviewStatus = require("./enums/review-status");
const Schema = mongoose.Schema;
const config = require('../config.json');

const productSchema = new Schema({
  title: { type: String },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
  price: { type: Number },
  imageName: { type: String },
  description: { type: String },
  sellerId: { type: Schema.Types.ObjectId, ref: "Seller", required: true },
  reviews: [
    {
      status: {
        type: String,
        enum: [
          ReviewStatus.PENDING,
          ReviewStatus.POSTED,
          ReviewStatus.REJECTED,
        ],
      },
      buyerId: { type: Schema.Types.ObjectId, required: true, ref: "Buyer" },
      createdDate: { type: Date },
      stars: { type: Number },
      comment: { type: String },
      decisionDate: { type: Date },
    },
  ],
});

productSchema.set('toObject', { virtuals: true })
productSchema.set('toJSON', { virtuals: true })

productSchema.virtual('imageUrl').get(function(){
  return `${config.productImageUrl}/${this.imageName}`;
})

//collection name => products
module.exports = mongoose.model("Product", productSchema);
