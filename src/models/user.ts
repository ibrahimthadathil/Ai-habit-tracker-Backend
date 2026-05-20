import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "@/interfaces/user.interface";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 6 },
    avatar: { type: String, default: "" },
    morningMotivation: { type: Boolean, default: false },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.matchPassword = function(plain:string){
    return bcrypt.compare(plain,this.password)
} 

userSchema.methods.toJson = function (){
    const obj = this.toObject()
    delete obj.password
    return obj
}


export const UserModel = mongoose.model<IUser>("User", userSchema);
