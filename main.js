const loanAmtInput = document.querySelector(".loan_amount");
const intRateInput = document.querySelector(".interest_rate");
const loanTenureInput = document.querySelector(".tenure_month");

const loanEMIValue = document.querySelector(".loan_emi .value");
const totalIntValue = document.querySelector(".total_int .value");
const totalAmtValue = document.querySelector(".total_amt .value");

const calcBtn = document.querySelector(".calc_button");

let loanAmt = parseFloat(loanAmtInput.value);
let intRate = parseFloat(intRateInput.value);
let loanTenure = parseFloat(loanTenureInput.value);

let interest = intRate / 12 / 100;
let mychart;

//******* input should be validated */

const checkValues = () => {
  let loanAmtValue = loanAmtInput.value;
  let intRateValue = intRateInput.value;
  let loanTenureValue = loanTenureInput.value;

  let regexNumber = /^[0-9]+$/;
  if (!loanAmtValue.match(regexNumber)) {
    loanAmtInput.value = "10000";
  }
  if (!loanTenureValue.match(regexNumber)) {
    loanTenureInput.value = "12";
  }

  let regexDecimalNumber = /^(\d*\.)?\d+$/;
  if (!intRateValue.match(regexDecimalNumber)) {
    intRateInput.value = "7.5";
  }
};
const displayChart = (totalInterestPayable) => {
  const ctx = document.getElementById("myChart");

  mychart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Total Interest", "Principle Loan Amount"],
      datasets: [
        {
          data: [totalInterestPayable, loanAmt],
          backgoundColor: ["#e63964", "#13213d"],
          borderWidth: 0,
        },
      ],
    },
  });
};

// if not updated Error : Uncaught Error: Canvas is already in use. Chart with ID '0' must be destroyed before the canvas with ID 'myChart' can be reused.

const updChart = (totalInterestPayable) => {
  mychart.data.datasets[0].data[0] = totalInterestPayable;
  mychart.data.datasets[0].data[1] = loanAmt;
  mychart.update(); //default with charjs lib
};

const calcEMI = () => {
  checkValues();
  refreshInputValue();
  let emi =
    loanAmt *
    interest *
    (Math.pow(1 + interest, loanTenure) /
      (Math.pow(1 + interest, loanTenure) - 1));

  return emi;
};

const updData = (emi) => {
  loanEMIValue.innerHTML = Math.round(emi);

  let totalAmt = Math.round(emi * loanTenure);
  totalAmtValue.innerHTML = totalAmt;

  let totalInterestPayable = Math.round(totalAmt - loanAmt);
  totalIntValue.innerHTML = totalInterestPayable;

  if (mychart) {
    updChart(totalInterestPayable);
  } else {
    displayChart(totalInterestPayable);
  }
};

const refreshInputValue = () => {
  loanAmt = parseFloat(loanAmtInput.value);
  intRate = parseFloat(intRateInput.value);
  loanTenure = parseFloat(loanTenureInput.value);
  interest = intRate / 12 / 100;
};

const init = () => {
  let emi = calcEMI();
  updData(emi);
};
init();

calcBtn.addEventListener("click", init);
