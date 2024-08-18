
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
  projectId: 'ijg9tmq2',
  dataset: 'production',
  apiVersion: '2023-08-18',
  useCdn: false
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;


