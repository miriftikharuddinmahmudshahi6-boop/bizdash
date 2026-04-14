import List "mo:core/List";
import Queue "mo:core/Queue";
import Time "mo:core/Time";
import DashboardLib "../lib/dashboard";
import UserTypes "../types/users";
import RevenueTypes "../types/revenue";
import DashboardTypes "../types/dashboard";
import Common "../types/common";

mixin (
  users : List.List<UserTypes.User>,
  transactions : List.List<RevenueTypes.Transaction>,
  activityLog : Queue.Queue<DashboardTypes.ActivityEvent>,
) {
  public query func getDashboardKPIs() : async DashboardTypes.DashboardKPIs {
    DashboardLib.getKPIs(users, transactions, Time.now());
  };

  public query func getRecentActivity() : async [DashboardTypes.ActivityEvent] {
    DashboardLib.getRecentActivity(activityLog);
  };
};
