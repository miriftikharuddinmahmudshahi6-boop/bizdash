import List "mo:core/List";
import Types "../types/users";
import Common "../types/common";
import Text "mo:core/Text";

module {
  public func toPublic(user : Types.User) : Types.UserPublic {
    {
      id = user.id;
      name = user.name;
      email = user.email;
      role = user.role;
      status = user.status;
      joinDate = user.joinDate;
    };
  };

  public func createUser(
    users : List.List<Types.User>,
    nextId : Nat,
    req : Types.CreateUserRequest,
    now : Common.Timestamp,
  ) : (Types.UserPublic, Nat) {
    let user : Types.User = {
      id = nextId;
      var name = req.name;
      var email = req.email;
      var role = req.role;
      var status = #active;
      joinDate = now;
    };
    users.add(user);
    (toPublic(user), nextId + 1);
  };

  public func getUser(
    users : List.List<Types.User>,
    id : Common.UserId,
  ) : ?Types.UserPublic {
    switch (users.find(func(u) { u.id == id })) {
      case (?u) ?toPublic(u);
      case null null;
    };
  };

  public func listUsers(
    users : List.List<Types.User>,
  ) : [Types.UserPublic] {
    users.map<Types.User, Types.UserPublic>(toPublic).toArray();
  };

  public func updateUser(
    users : List.List<Types.User>,
    id : Common.UserId,
    req : Types.UpdateUserRequest,
  ) : ?Types.UserPublic {
    switch (users.find(func(u) { u.id == id })) {
      case null null;
      case (?user) {
        switch (req.name) { case (?n) { user.name := n }; case null {} };
        switch (req.email) { case (?e) { user.email := e }; case null {} };
        switch (req.role) { case (?r) { user.role := r }; case null {} };
        switch (req.status) { case (?s) { user.status := s }; case null {} };
        ?toPublic(user);
      };
    };
  };

  public func deleteUser(
    users : List.List<Types.User>,
    id : Common.UserId,
  ) : Bool {
    let before = users.size();
    let filtered = users.filter(func(u) { u.id != id });
    users.clear();
    users.append(filtered);
    users.size() < before;
  };

  public func searchUsers(
    users : List.List<Types.User>,
    searchTerm : Text,
  ) : [Types.UserPublic] {
    let lower = searchTerm.toLower();
    users
      .filter(func(u) {
        u.name.toLower().contains(#text lower) or
        u.email.toLower().contains(#text lower)
      })
      .map<Types.User, Types.UserPublic>(toPublic)
      .toArray();
  };

  // Seed sample users on first deploy
  public func seedSampleData(
    users : List.List<Types.User>,
    nextId : { var val : Nat },
    now : Common.Timestamp,
  ) {
    let DAY_NS : Int = 86_400_000_000_000;
    let samples : [(Text, Text, Types.UserRole, Types.UserStatus, Int)] = [
      ("Alice Chen", "alice.chen@example.com", #admin, #active, 0),
      ("Bob Martinez", "bob.martinez@example.com", #viewer, #active, -DAY_NS * 5),
      ("Carol Johnson", "carol.johnson@example.com", #viewer, #active, -DAY_NS * 10),
      ("David Kim", "david.kim@example.com", #admin, #active, -DAY_NS * 15),
      ("Eva Rodriguez", "eva.rodriguez@example.com", #viewer, #active, -DAY_NS * 20),
      ("Frank Nguyen", "frank.nguyen@example.com", #viewer, #inactive, -DAY_NS * 25),
      ("Grace Liu", "grace.liu@example.com", #viewer, #active, -DAY_NS * 30),
      ("Henry Patel", "henry.patel@example.com", #viewer, #active, -DAY_NS * 35),
      ("Iris Thompson", "iris.thompson@example.com", #admin, #active, -DAY_NS * 40),
      ("James Wilson", "james.wilson@example.com", #viewer, #inactive, -DAY_NS * 45),
    ];
    for ((name, email, role, status, offset) in samples.values()) {
      let user : Types.User = {
        id = nextId.val;
        var name;
        var email;
        var role;
        var status;
        joinDate = now + offset;
      };
      users.add(user);
      nextId.val += 1;
    };
  };
};
