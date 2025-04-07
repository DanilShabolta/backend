import { CallbackError, model, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";

interface IUser {
  login: string;
  password: string;
  firstname: string;
  lastname: string;
  role: string;
}

interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

type userModel = Model<IUser, object, IUserMethods>;

const userSchema = new Schema<IUser, userModel, IUserMethods>({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  role: { type: String, required: false, enum: ["student", "teacher"] },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (err) {
    return next(err as CallbackError);
  }
});

userSchema.method(
  "comparePassword",
  async function (candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.password);
  }
);

export const userModel = model<IUser, userModel>("User", userSchema);
