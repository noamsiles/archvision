import { ObjectId } from "mongodb";

type documentAdds = {
  _id: ObjectId;
  createdAt: string;
  updatedAt: string;
};

export default documentAdds;
