export default class Expense {
    public id: Number = 0;
    public transactionDate: Date = new Date();
    public amount: Number = 0;
    public currency: String = "";
    public recipient: String = "";
    public type: String = "";
}