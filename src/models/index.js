// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Message, User } = initSchema(schema);

export {
  Message,
  User
};