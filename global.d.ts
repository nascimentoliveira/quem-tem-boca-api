type LoggedInUser = {
  id: number;
  isAdmin: boolean;
};

declare namespace Express {
  interface Request {
    user: LoggedInUser;
  }
}
