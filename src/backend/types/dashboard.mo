module {
  public type ActivityEventKind = {
    #user_created;
    #transaction_added;
    #user_deactivated;
  };

  public type ActivityEvent = {
    id : Nat;
    kind : ActivityEventKind;
    description : Text;
    timestamp : Int;
  };

  public type DashboardKPIs = {
    totalUsers : Nat;
    activeUsers : Nat;
    totalRevenue : Nat;
    revenueThisWeek : Nat;
    revenueToday : Nat;
    revenueYesterday : Nat;
  };
};
