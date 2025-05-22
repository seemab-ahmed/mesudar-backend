import mongoose from 'mongoose';

const suggestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,  // Title should be required
  },
  description: {
    type: String,
    required: true,  // Description should be required
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',  

  },
  createdAt: {
    type: Date,
    default: Date.now,  // Automatically set the current date when the suggestion is created
  },
});

const Suggestion = mongoose.model('suggestion', suggestionSchema);

export default Suggestion;
