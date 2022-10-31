import { API_URL } from "../config/config";
import Expense from "./types/Expense";

export class Api {

    public static async GetAllExpenses(): Promise<Expense[]> {
        const url = new URL("/api/expenses", API_URL);
        return await (await fetch(url)).json();
    }

    public static async GetExpense(id: Number): Promise<Expense> {
        const url = new URL(`/api/expenses/${id}`, API_URL);
        return await (await fetch(url)).json();
    }

    public static async CreateExpense(expense: Expense): Promise<Expense> {
        const url = new URL("/api/expenses", API_URL);
        return await (await fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expense),
        })).json();
    }

    public static async UpdateExpense(expense: Expense): Promise<void> {
        const url = new URL(`/api/expenses/${expense.id}`, API_URL);
        await fetch(url, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expense)
        });
    }

    public static async DeleteExpense(id: Number): Promise<void> {
        const url = new URL(`/api/expenses/${id}`, API_URL);
        await (await fetch(url, { method: "DELETE" }));
    }
}