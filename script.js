// alert('welcome')

// Fixed values
const categories = ['Food', 'Transportation', 'Housing', 'Entertainment'];

// Expenses array
let expenses = [];

// Function to add an expense
function addExpense() {
  const descriptionInput = document.getElementById('description-input');
  const categoryInput = document.getElementById('category-input');
  const amountInput = document.getElementById('amount-input');
  const dateInput = document.getElementById('date-input');

  const description = descriptionInput.value.trim();
  const category = categoryInput.value;
  const amount = parseFloat(amountInput.value);
  const date = dateInput.value;
   if (!amount){
    alert('Please enter an amount');
    return
   }
  else if (amount > 0) {
    const expense = {
      description,
      category,
      amount,
      date
    };

    expenses.push(expense);
    updateSummary();
    updateExpensesTable();
  }

  descriptionInput.value = '';
  categoryInput.value = '';
  amountInput.value = '';
  dateInput.value = '';
}

// Function to calculate totals per category
function calculateTotals() {
  const totals = {};

  categories.forEach(category => {
    totals[category] = expenses.reduce((acc, expense) => {
      if (expense.category === category) {
        return acc + expense.amount;
      }
      return acc;
    }, 0);
  });

  return totals;
}

// Function to update the summary section
function updateSummary() {
  const totals = calculateTotals();
  const summaryHtml = categories.map(category => {
    return `<p>${category}: $${totals[category].toFixed(2)}</p>`;
  }).join('');

  document.getElementById('summary').innerHTML = summaryHtml;

  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  document.getElementById('total-expenses').innerText = `Total Expenses: $${totalExpenses.toFixed(2)}`;
}

// Function to update the expenses table
function updateExpensesTable() {
  const expensesHtml = expenses.map((expense, index) => {
    return `
      <tr>
        <td>${expense.description}</td>
        <td>${expense.category}</td>
        <td>$${expense.amount.toFixed(2)}</td>
        <td>${expense.date}</td>
        <td><button onclick="deleteExpense(${index})">Delete</button></td>
      </tr>
    `;
  }).join('');

  document.getElementById('expenses-table').querySelector('tbody').innerHTML = expensesHtml;
}

// Function to delete an expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  updateSummary();
  updateExpensesTable();
}


document.getElementById('add-expense-btn').addEventListener('click', addExpense);

