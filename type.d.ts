import { AxiosInstance } from 'axios';
interface registerType {
  name: string;
  email: string;
  password: string;
  agencyName: string;
  agencyUrl: string;
  userType: string;
  registerAs: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code;
}
interface loginType {
  email: string;
  password: string;
}

interface userInfo {
  token: string;
  customer_id: Stripe.customer;
}
interface addLeadType {
  leadTitle: string;
  leadDescription: string;
  approxBudget: string;
  preferredLocation: string;
  leadEmail: string;
  leadPhone: string;
  clientLocation: string;
  country: string;
  leadCost: string;
  numberApplication: string;
  leadProof: null;
}

declare module 'axios' {
  interface AxiosInstance {
    makeRequest(
      method: string,
      url: string,
      data?: any,
      customHeaders?: Record<string, string> | undefined
    ): Promise<any>;
  }
}

interface File {
  file: Blob | null | File | Files[] | string;
}
// stripe.d.ts

interface CustomerCreateParams {
  email: string;
  // Add any other customer creation parameters you need
}

interface Stripe {
  customers: {
    create: (params: { email: string }) => Promise<Stripe.Customer>;
  };
}

interface StripeValues {
  name: string;
  email: string;
  card: number;
  date: Date;
  cvc: number;
}
interface JwtPayload {
  customer_id: Stripe.customer;
}

interface singleLead {
  id: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  isActive: boolean | null;
  createdBy: number | null;
  updatedBy: number | null;
  title: string | null;
  description: string | null;
  price: number | null;
  max_number_applicant: number | null;
  email: string | null;
  phone_number: string | null;
  client_location: string | null;
  purchase_count: number | null;
}
interface ApiResponse {
  success: boolean;
  message: string;
  leads: [];
  currentPage: number | null;
  totalPages: number | null;
  nextPage: boolean;
  prevPage: boolean;
  totalCount: number | null;
}

interface LeadsState {
  leads: ApiResponse;
  singleLead: singleLead | null; // Adjust the type based on the properties of a single lead
  leadProof: string;
}

interface proof {
  audio_url: [] | null;
  image_url: [] | null;
  video_url: [] | null;
}

interface email {
  email: string;
}

interface resetPass {
  password: string;
  confirmPassword: string;
}

interface purchaseHistory {
  purchase_history: [];
}

interface updateUser {
  userName: string | null;
  userAddress: string | null;
  userType: string | null;
  userAgencyName: string | null;
  userAgencyUrl: string | null;
  userPassword: string | null;
  newPassword: string | null;
}
