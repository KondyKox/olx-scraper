export type Offer = {
  id: string;
  title: string;
  price: number;
  location: string;
  date: string;
  url: string;
  image: {
    src: string;
    alt: string;
  };
};
