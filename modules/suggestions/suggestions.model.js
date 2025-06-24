import mongoose from 'mongoose';

const suggestionSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,  
  },
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',  

  },
  createdAt: {
    type: Date,
    default: Date.now,  
  },
});

const Suggestion = mongoose.model('suggestion', suggestionSchema);

export default Suggestion;
