import Common "common";

module {
  public type TransactionStatus = { #pending; #completed; #refunded };
  public type TransactionCategory = { #sales; #subscription; #service; #other };

  public type Transaction = {
    id : Common.TransactionId;
    amount : Nat; // in cents
    date : Common.Timestamp;
    category : TransactionCategory;
    status : TransactionStatus;
    description : Text;
  };

  public type RevenueAggregates = {
    totalRevenue : Nat;
    revenueThisWeek : Nat;
    revenueToday : Nat;
    revenueYesterday : Nat;
  };

  public type TransactionPage = {
    items : [Transaction];
    total : Nat;
    offset : Nat;
    limit : Nat;
  };
};
