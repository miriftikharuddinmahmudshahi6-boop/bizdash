import List "mo:core/List";
import Queue "mo:core/Queue";
import DashboardTypes "../types/dashboard";
import UserTypes "../types/users";
import RevenueTypes "../types/revenue";
import Common "../types/common";
import RevenueLib "revenue";

module {
  let MAX_ACTIVITY = 50;

  public func getKPIs(
    users : List.List<UserTypes.User>,
    transactions : List.List<RevenueTypes.Transaction>,
    now : Common.Timestamp,
  ) : DashboardTypes.DashboardKPIs {
    let totalUsers = users.size();
    let activeUsers = users.filter(func(u) { u.status == #active }).size();
    let agg = RevenueLib.getAggregates(transactions, now);
    {
      totalUsers;
      activeUsers;
      totalRevenue = agg.totalRevenue;
      revenueThisWeek = agg.revenueThisWeek;
      revenueToday = agg.revenueToday;
      revenueYesterday = agg.revenueYesterday;
    };
  };

  public func getRecentActivity(
    activityLog : Queue.Queue<DashboardTypes.ActivityEvent>,
  ) : [DashboardTypes.ActivityEvent] {
    // Queue stores oldest-first; reverse to get newest-first
    activityLog.reverseValues().toArray();
  };

  public func recordActivity(
    activityLog : Queue.Queue<DashboardTypes.ActivityEvent>,
    nextId : Nat,
    kind : DashboardTypes.ActivityEventKind,
    description : Text,
    now : Common.Timestamp,
  ) : Nat {
    let event : DashboardTypes.ActivityEvent = {
      id = nextId;
      kind;
      description;
      timestamp = now;
    };
    activityLog.pushBack(event);
    // Cap at 50 events — remove oldest if over limit
    if (activityLog.size() > MAX_ACTIVITY) {
      ignore activityLog.popFront();
    };
    nextId + 1;
  };
};
