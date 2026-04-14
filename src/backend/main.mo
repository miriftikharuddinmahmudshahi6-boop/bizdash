import List "mo:core/List";
import Queue "mo:core/Queue";
import Time "mo:core/Time";
import UserTypes "types/users";
import RevenueTypes "types/revenue";
import DashboardTypes "types/dashboard";
import UsersLib "lib/users";
import RevenueLib "lib/revenue";
import RevenueApiMixin "mixins/revenue-api";
import UsersApiMixin "mixins/users-api";
import DashboardApiMixin "mixins/dashboard-api";

actor {
  let users = List.empty<UserTypes.User>();
  let transactions = List.empty<RevenueTypes.Transaction>();
  let activityLog = Queue.empty<DashboardTypes.ActivityEvent>();
  let nextUserId = { var val : Nat = 1 };
  let nextTransactionId = { var val : Nat = 1 };
  let nextActivityId = { var val : Nat = 1 };
  let seeded = { var val : Bool = false };

  // Seed sample data on first deploy
  if (not seeded.val) {
    let now = Time.now();
    UsersLib.seedSampleData(users, nextUserId, now);
    RevenueLib.seedSampleData(transactions, nextTransactionId, now);
    seeded.val := true;
  };

  include RevenueApiMixin(transactions, nextTransactionId, activityLog, nextActivityId);
  include UsersApiMixin(users, nextUserId, activityLog, nextActivityId);
  include DashboardApiMixin(users, transactions, activityLog);
};
