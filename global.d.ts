type InternalUser = {
  id: number;
  isAdmin: boolean;
};

declare namespace Express {
  interface Request {
    user: InternalUser;
  }
}
