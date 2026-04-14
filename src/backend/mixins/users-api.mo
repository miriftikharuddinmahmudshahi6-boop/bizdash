import List "mo:core/List";
import Queue "mo:core/Queue";
import Time "mo:core/Time";
import UsersLib "../lib/users";
import DashboardLib "../lib/dashboard";
import UserTypes "../types/users";
import DashboardTypes "../types/dashboard";
import Common "../types/common";

mixin (
  users : List.List<UserTypes.User>,
  nextUserId : { var val : Nat },
  activityLog : Queue.Queue<DashboardTypes.ActivityEvent>,
  nextActivityId : { var val : Nat },
) {
  public func createUser(req : UserTypes.CreateUserRequest) : async UserTypes.UserPublic {
    let now = Time.now();
    let (userPublic, newId) = UsersLib.createUser(users, nextUserId.val, req, now);
    nextUserId.val := newId;
    nextActivityId.val := DashboardLib.recordActivity(
      activityLog,
      nextActivityId.val,
      #user_created,
      "New user joined: " # req.name,
      now,
    );
    userPublic;
  };

  public query func getUser(id : Common.UserId) : async ?UserTypes.UserPublic {
    UsersLib.getUser(users, id);
  };

  public query func listUsers() : async [UserTypes.UserPublic] {
    UsersLib.listUsers(users);
  };

  public func updateUser(id : Common.UserId, req : UserTypes.UpdateUserRequest) : async ?UserTypes.UserPublic {
    let now = Time.now();
    let result = UsersLib.updateUser(users, id, req);
    // Emit deactivation event if status was set to inactive
    switch (req.status) {
      case (? #inactive) {
        switch (result) {
          case (?u) {
            nextActivityId.val := DashboardLib.recordActivity(
              activityLog,
              nextActivityId.val,
              #user_deactivated,
              "User deactivated: " # u.name,
              now,
            );
          };
          case null {};
        };
      };
      case _ {};
    };
    result;
  };

  public func deleteUser(id : Common.UserId) : async Bool {
    UsersLib.deleteUser(users, id);
  };

  public query func searchUsers(searchTerm : Text) : async [UserTypes.UserPublic] {
    UsersLib.searchUsers(users, searchTerm);
  };
};
