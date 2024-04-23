import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const objectIdValidation = ( value, helpers ) => {
  if ( !ObjectId.isValid( value ) ) {
    return helpers.error( 'any.invalid' );
  }
  return value;
};

export default objectIdValidation;