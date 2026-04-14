import List "mo:core/List";
import Iter "mo:core/Iter";
import Types "../types/revenue";
import Common "../types/common";

module {
  // One day in nanoseconds
  let DAY_NS : Int = 86_400_000_000_000;
  let WEEK_NS : Int = 604_800_000_000_000;

  public func addTransaction(
    transactions : List.List<Types.Transaction>,
    nextId : Nat,
    amount : Nat,
    category : Types.TransactionCategory,
    status : Types.TransactionStatus,
    description : Text,
    now : Common.Timestamp,
  ) : (Types.Transaction, Nat) {
    let tx : Types.Transaction = {
      id = nextId;
      amount;
      date = now;
      category;
      status;
      description;
    };
    transactions.add(tx);
    (tx, nextId + 1);
  };

  public func getTransaction(
    transactions : List.List<Types.Transaction>,
    id : Common.TransactionId,
  ) : ?Types.Transaction {
    transactions.find(func(tx) { tx.id == id });
  };

  public func listTransactions(
    transactions : List.List<Types.Transaction>,
    offset : Nat,
    limit : Nat,
  ) : Types.TransactionPage {
    let total = transactions.size();
    let items = transactions.sliceToArray(offset, offset + limit);
    { items; total; offset; limit };
  };

  public func getAggregates(
    transactions : List.List<Types.Transaction>,
    now : Common.Timestamp,
  ) : Types.RevenueAggregates {
    let startOfToday : Int = now - (now % DAY_NS);
    let startOfYesterday : Int = startOfToday - DAY_NS;
    let startOfWeek : Int = now - WEEK_NS;

    var totalRevenue = 0;
    var revenueThisWeek = 0;
    var revenueToday = 0;
    var revenueYesterday = 0;

    transactions.forEach(func(tx) {
      if (tx.status == #completed) {
        totalRevenue += tx.amount;
        if (tx.date >= startOfWeek) {
          revenueThisWeek += tx.amount;
        };
        if (tx.date >= startOfToday) {
          revenueToday += tx.amount;
        } else if (tx.date >= startOfYesterday) {
          revenueYesterday += tx.amount;
        };
      };
    });

    { totalRevenue; revenueThisWeek; revenueToday; revenueYesterday };
  };

  // Seed sample transactions on first deploy
  public func seedSampleData(
    transactions : List.List<Types.Transaction>,
    nextId : { var val : Nat },
    now : Common.Timestamp,
  ) {
    let DAY = DAY_NS;
    let samples : [(Nat, Types.TransactionCategory, Types.TransactionStatus, Text, Int)] = [
      (12000, #sales, #completed, "Enterprise license — Acme Corp", 0),
      (4500, #subscription, #completed, "Monthly SaaS — Pro plan", -DAY),
      (8750, #service, #completed, "Consulting engagement — Q1", -DAY * 2),
      (3200, #subscription, #completed, "Monthly SaaS — Starter plan", -DAY * 3),
      (15000, #sales, #completed, "Annual license — GlobexInc", -DAY * 4),
      (600, #other, #refunded, "Refund — cancelled trial", -DAY * 5),
      (9800, #sales, #pending, "New deal — Initech", -DAY * 6),
      (2100, #subscription, #completed, "Monthly SaaS — Team plan", -DAY * 7),
      (5500, #service, #completed, "Implementation support", -DAY * 8),
      (11000, #sales, #completed, "Upsell — Umbrella Corp", -DAY * 9),
      (3900, #subscription, #completed, "Monthly SaaS — Pro plan", -DAY * 10),
      (700, #other, #pending, "Add-on feature — analytics", -DAY * 11),
      (18500, #sales, #completed, "Enterprise deal — Massive Dynamics", -DAY * 12),
      (4200, #service, #completed, "Custom integration work", -DAY * 13),
      (2800, #subscription, #completed, "Monthly SaaS — Starter plan", -DAY * 14),
    ];
    for ((amount, category, status, description, offset) in samples.values()) {
      let tx : Types.Transaction = {
        id = nextId.val;
        amount;
        date = now + offset;
        category;
        status;
        description;
      };
      transactions.add(tx);
      nextId.val += 1;
    };
  };
};
