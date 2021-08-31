const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: "Your full name is required",
    },
    username: {
      type: String,
      required: "User name is required",
    },
    avatar: {
      type: String,
    },
    email: {
      unique: true,
      type: String,
      required: "A valid email is required",
      match: [EMAIL_PATTERN, "the email is invalid"],
    },
    password: {
      type: String,
      required: "A valid password is required",
      match: [PASSWORD_PATTERN, "the password is invalid"],
    },
    author: {
      type: Boolean,
      default: false,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;

        return ret;
      },
    },
    toObject: {
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, 10).then((hash) => {
      this.password = hash;
      next();
    });
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;