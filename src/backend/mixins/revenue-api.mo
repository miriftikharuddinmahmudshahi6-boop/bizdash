import List "mo:core/List";
import Queue "mo:core/Queue";
import Time "mo:core/Time";
import RevenueLib "../lib/revenue";
import DashboardLib "../lib/dashboard";
import RevenueTypes "../types/revenue";
import DashboardTypes "../types/dashboard";
import Common "../types/common";

mixin (
  transactions : List.List<RevenueTypes.Transaction>,
  nextTransactionId : { var val : Nat },
  activityLog : Queue.Queue<DashboardTypes.ActivityEvent>,
  nextActivityId : { var val : Nat },
) {
  public func addTransaction(
    amount : Nat,
    category : RevenueTypes.TransactionCategory,
    status : RevenueTypes.TransactionStatus,
    description : Text,
  ) : async RevenueTypes.Transaction {
    let now = Time.now();
    let (tx, newId) = RevenueLib.addTransaction(
      transactions,
      nextTransactionId.val,
      amount,
      category,
      status,
      description,
      now,
    );
    nextTransactionId.val := newId;
    nextActivityId.val := DashboardLib.recordActivity(
      activityLog,
      nextActivityId.val,
      #transaction_added,
      "New transaction: " # description # " ($" # debug_show(amount / 100) # ")",
      now,
    );
    tx;
  };

  public query func getTransaction(id : Common.TransactionId) : async ?RevenueTypes.Transaction {
    RevenueLib.getTransaction(transactions, id);
  };

  public query func listTransactions(offset : Nat, limit : Nat) : async RevenueTypes.TransactionPage {
    RevenueLib.listTransactions(transactions, offset, limit);
  };

  public query func getRevenueAggregates() : async RevenueTypes.RevenueAggregates {
    RevenueLib.getAggregates(transactions, Time.now());
  };
};
