export interface CreateVendorInputs {
  name: string;
  ownerName: string;
  foodType: [string];
  pincode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

export interface LoginVendorInputs {
  email: string;
  password: string;
}

export interface EditVendorInputs {
  name: string;
  address: string;
  phone: string;
  foodType: [string];
}

export interface VendorPayload {
  _id: string;
  name: string;
  foodType: [string];
  email: string;
}
