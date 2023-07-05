import { Schema, model } from "mongoose";
import {
  AddressDocI,
  AddressModelI,
} from "../interface_address/interface.address";
import { APP_ERROR } from "../../../../utilities/custom_error";
import { time_stamps } from "../../../general_factory/interface/general_factory";

const addressSchema = new Schema<AddressDocI, AddressModelI>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "USER" },
    address: { type: String, required: true },
    country: { type: String, required: true, uppercase: true },
    local_government: { type: String, required: true, uppercase: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    state: { type: String, required: true, uppercase: true },
    zip_code: { type: String, minlength: 5, required: true },
    is_default: { type: Boolean, default: false },
  },
  { timestamps: time_stamps }
);

addressSchema.pre("save", async function () {
  try {
    if (Boolean(this.is_default) === true) {
      const get_address = await ADDRESS.findOne({
        user: this.user,
        is_default: true,
      });
      if (get_address) {
        get_address.is_default = false;
        get_address.save();
      }
    }
  } catch (error: any) {
    throw APP_ERROR(error);
  }
});

// addressSchema.post("save", async function () {
//   try {
//   } catch (error: any) {
//     throw APP_ERROR(error);
//   }
// });

export const ADDRESS = model("ADDRESS", addressSchema);
