// Calculate Mortgage function
function calculateMortgage() {
    const loanAmount = parseFloat(document.getElementById('loan-amount').value);
    const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100 / 12;
    const loanTerm = parseFloat(document.getElementById('loan-term').value) * 12;
    
    if (!isNaN(loanAmount) && !isNaN(interestRate) && !isNaN(loanTerm)) {
        const monthlyPayment = (loanAmount * interestRate) / (1 - Math.pow((1 + interestRate), -loanTerm));
        document.getElementById('monthly-payment').innerText = `£${monthlyPayment.toFixed(2)}`;
    } else {
        document.getElementById('monthly-payment').innerText = '£0.00';
    }
}

// Calculate Affordability function
function calculateAffordability() {
    const income = parseFloat(document.getElementById("income").value);
    const debts = parseFloat(document.getElementById("debts").value);
    const downPayment = parseFloat(document.getElementById("downPayment").value);
    const interestRate = parseFloat(document.getElementById("interestRateAfford").value) / 100 / 12;
    const loanTerm = parseFloat(document.getElementById("loanTermAfford").value) * 12;

    if (!isNaN(income) && !isNaN(debts) && !isNaN(downPayment) && !isNaN(interestRate) && !isNaN(loanTerm)) {
        const monthlyIncome = income / 12;
        const monthlyDebtPayments = debts;
        const maxMonthlyPayment = (monthlyIncome * 0.28) - monthlyDebtPayments;

        const loanAmount = (maxMonthlyPayment * (1 - Math.pow(1 + interestRate, -loanTerm))) / interestRate;
        const affordablePrice = parseFloat(loanAmount) + parseFloat(downPayment);
        
        document.getElementById("affordablePrice").innerText = `£${affordablePrice.toFixed(2)}`;
    } else {
        document.getElementById("affordablePrice").innerText = '£0.00';
    }
}

// Calculate Amortization function
function calculateAmortization() {
    const loanAmount = parseFloat(document.getElementById("loanAmountAmort").value);
    const interestRate = parseFloat(document.getElementById("interestRateAmort").value) / 100 / 12;
    const loanTerm = parseFloat(document.getElementById("loanTermAmort").value) * 12;

    if (!isNaN(loanAmount) && !isNaN(interestRate) && !isNaN(loanTerm)) {
        const monthlyPayment = (loanAmount * interestRate) / (1 - Math.pow(1 + interestRate, -loanTerm));
        document.getElementById("monthlyPaymentAmort").innerText = `£${monthlyPayment.toFixed(2)}`;

        const table = document.getElementById("amortizationTable");
        table.innerHTML = `
            <tr>
                <th>Month</th>
                <th>Principal</th>
                <th>Interest</th>
                <th>Balance</th>
            </tr>
        `;

        let balance = loanAmount;
        for (let month = 1; month <= loanTerm; month++) {
            const interestPayment = balance * interestRate;
            const principalPayment = monthlyPayment - interestPayment;
            balance -= principalPayment;

            const row = table.insertRow();
            row.insertCell(0).innerText = month;
            row.insertCell(1).innerText = `£${principalPayment.toFixed(2)}`;
            row.insertCell(2).innerText = `£${interestPayment.toFixed(2)}`;
            row.insertCell(3).innerText = `£${balance.toFixed(2)}`;
        }
    } else {
        document.getElementById("monthlyPaymentAmort").innerText = '£0.00';
    }
}

// Event listener for form submission
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    
    fetch('your-server-endpoint', {
        method: 'POST',
        body: formData
    }).then(response => {
        if (response.ok) {
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        } else {
            alert('There was a problem with your submission. Please try again.');
        }
    }).catch(error => {
        console.error('Error:', error);
        alert('There was a problem with your submission. Please try again.');
    });
});

// Initialize the slider
$(document).ready(function(){
    $('.slider').slick({
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        fade: true,
        cssEase: 'linear'
    });
});


function showTab(tabId) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });

    // Show the selected tab content
    document.getElementById(tabId).classList.add('active');

    // Add active class to the selected button
    document.querySelector(`.tab-button[onclick="showTab('${tabId}')"]`).classList.add('active');
}

// Set default tab
document.addEventListener('DOMContentLoaded', () => {
    showTab('mortgage');
});

