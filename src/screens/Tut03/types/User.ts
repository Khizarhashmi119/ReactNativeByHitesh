export type TUser = {
  gender: string;
  name: { title: string; first: string; last: string };
  location: {
    street: { number: number; name: string };
    city: string;
    state: string;
    country: string;
    postcode: number;
    coordinates: { latitude: string; longitude: string };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  dob: { date: string; age: number };
  registered: { date: string; age: number };
  phone: string;
  cell: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
};
