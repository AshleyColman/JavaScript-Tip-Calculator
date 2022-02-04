// Get elements.
const billInput = document.getElementById('bill-total-inputfield');
const peopleInput = document.getElementById('people-inputfield');
const tipAmountPersonText = document.getElementById('tip-amount-person');
const totalAmountPersonText = document.getElementById('total-amount-person');
const peopleZeroErrorText = document.getElementById('people-zero-error-text');

// Get buttons.
const fiveButton = document.getElementById('five-button');
const tenButton = document.getElementById('ten-button');
const fifteenButton = document.getElementById('fifteen-button');
const twentyFiveButton = document.getElementById('twentyfive-button');
const fiftyButton = document.getElementById('fifty-button');
const seventyFiveButton = document.getElementById('seventyfive-button');
const resetButton = document.getElementById('reset-button');

// Call.
AddButtonEvents();
AddInputEvents();
Reset();

// Add button on click events.
function AddButtonEvents()
{
  fiveButton.addEventListener('click', ApplyPercentage.bind(null, 5));
  tenButton.addEventListener('click', ApplyPercentage.bind(null, 10));
  fifteenButton.addEventListener('click', ApplyPercentage.bind(null, 15));
  twentyFiveButton.addEventListener('click', ApplyPercentage.bind(null, 25));
  fiftyButton.addEventListener('click', ApplyPercentage.bind(null, 50));
  seventyFiveButton.addEventListener('click', ApplyPercentage.bind(null, 75));
  resetButton.addEventListener('click', Reset);
}

// Add inputfield input events.
function AddInputEvents()
{
  billInput.addEventListener('input', CheckNullInputField.bind(null, billInput));
  peopleInput.addEventListener('input', CheckNullInputFieldAndErrorText.bind(null,
     peopleInput, peopleZeroErrorText));
}

// Apply percentage on button.
function ApplyPercentage(_percentage)
{
  // Exit if values are zero.
  if (parseFloat(billInput.value) <= 0 || billInput.value.length == 0 ||
   parseInt(peopleInput.value) <= 0 || peopleInput.value.length == 0)
    return;

  // Get bill and people input field values.
  let billTotalValue = parseFloat(billInput.value);
  let totalPeopleCount = parseInt(peopleInput.value);

  // Calculate x percent of total bill.
  let billPercentageCost = billTotalValue * (_percentage / 100);

  // Split bill by x people.
  let tipAmountPerPerson = (billPercentageCost / totalPeopleCount);
  let billPerPerson = (billTotalValue / totalPeopleCount);
  let totalAmountPerPerson = (billPerPerson + tipAmountPerPerson);

  // Update text.
  UpdateText(tipAmountPerPerson, totalAmountPerPerson);
}

// Check inputfield for null values.
function CheckNullInputField(_inputfield)
{
  if (parseInt(_inputfield.value) <= 0 || _inputfield.value.length == 0)
  {
    AddErrorOutlineClass(_inputfield);
  } else
  {
    RemoveErrorOutlineClass(_inputfield);
  }
}

// Check inputfield for null values and toggle error text.
function CheckNullInputFieldAndErrorText(_inputfield, _errorText)
{
  if (parseInt(_inputfield.value) <= 0 || _inputfield.value.length == 0)
  {
    AddErrorOutlineClass(_inputfield);
    RemoveDisplayNone(_errorText);
  } else
  {
    RemoveErrorOutlineClass(peopleInput);
    AddDisplayNone(_errorText);
  }
}

// Check all input fields for null values.
function CheckNullInputFields()
{
  CheckNullInputField(billInput);
  CheckNullInputFieldAndErrorText(peopleInput, peopleZeroErrorText);
}

// Add error outline class to element passed.
function AddErrorOutlineClass(_element)
{
  if (_element.classList.contains('inputfield-error-outline') == false)
  {
    _element.classList.add('inputfield-error-outline');
  }
}

// Remove error outline class to element passed.
function RemoveErrorOutlineClass(_element)
{
  if (_element.classList.contains('inputfield-error-outline') == true)
  {
    _element.classList.remove('inputfield-error-outline');
  }
}

// Remove display none class to element passed.
function RemoveDisplayNone(_element)
{
  if (_element.classList.contains('display-none') == true)
  {
    _element.classList.remove('display-none');
  }
}

// Add display none class to element passed.
function AddDisplayNone(_element)
{
  if (_element.classList.contains('display-none') == false)
  {
    _element.classList.add('display-none');
  }
}

// Update text.
function UpdateText(tipAmountPerPerson, totalAmountPerPerson)
{
  tipAmountPersonText.innerText = tipAmountPerPerson.toFixed(2);
  totalAmountPersonText.innerText = totalAmountPerPerson.toFixed(2);
}

// Reset app.
function Reset()
{
  peopleInput.value = '';
  billInput.value = '';
  tipAmountPersonText.innerText = '0';
  totalAmountPersonText.innerText = '0';
  CheckNullInputFields();
}
