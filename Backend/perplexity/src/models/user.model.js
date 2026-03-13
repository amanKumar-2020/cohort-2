import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// 🔐 Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return ;

  this.password = await bcrypt.hash(this.password, 10);

});

// 🔑 Compare password during login
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// 🚫 Remove password from API responses
userSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;

  return user;
};

// Prevent model overwrite
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
