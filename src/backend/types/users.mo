import Common "common";

module {
  public type UserRole = { #admin; #viewer };
  public type UserStatus = { #active; #inactive };

  public type User = {
    id : Common.UserId;
    var name : Text;
    var email : Text;
    var role : UserRole;
    var status : UserStatus;
    joinDate : Common.Timestamp;
  };

  // Shared (immutable) version for API boundary
  public type UserPublic = {
    id : Common.UserId;
    name : Text;
    email : Text;
    role : UserRole;
    status : UserStatus;
    joinDate : Common.Timestamp;
  };

  public type CreateUserRequest = {
    name : Text;
    email : Text;
    role : UserRole;
  };

  public type UpdateUserRequest = {
    name : ?Text;
    email : ?Text;
    role : ?UserRole;
    status : ?UserStatus;
  };
};
