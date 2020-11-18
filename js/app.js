window.addEventListener('load', function(){

/*****************
	GLOBAL VARAIBLES
	help links: https://www.smashingmagazine.com/2009/07/web-form-validation-best-practices-and-tutorials/#client-side-validation
******************/
const inputTextField = document.querySelector('input[type=text]');// get first element textfield from form

const selectJobRolle = document.getElementById('title');//get #id title Select options
const selectOtherRolleField = document.getElementById('other-rolle');//get id other-rolle

const selectColors = document.getElementById('color');//select color divs options
selectColors.disabled = true;
const newSelectColorsOption = document.createElement('option'); //color divs options
const selectDesign = document.getElementById('design');//color divs optionsdesign

const activityElements = document.querySelector('.activities'); //checkboxes activities
const actElem = activityElements.children; //checkboxes activities 
const checkboxes = document.querySelectorAll('.payment'); console.log(checkboxes.length);
const paymentInputs = Array.from(document.getElementsByClassName('payment'));//checkboxes activities Payment
const output = document.getElementById('total'); //checkboxes activities payment

document.querySelector('#payment [value=select_method]').remove();// payment Options
const selectpayment = document.getElementById('payment');//payment Options
const selectPaymentText = document.querySelectorAll('.payment_description');//payment Options

const valName = document.getElementById('name');//form Validation
const valEmail = document.getElementById('mail');//form Validation
const valActivity = document.getElementsByClassName('activities');//form Validation
const valCCNum = document.getElementById('cc-num');//form Validation accpet 13-16 digits numbers
const valZip = document.getElementById('zip');//form Validation should accept 5 digit numbers
const valCvv = document.getElementById('cvv');//form Validation accept just 3 digits numbers
//const submitButton = document.getElementsByTagName('button')[0];//form Validation
const form = document.getElementsByTagName('form')[0];
/*****************
	STEP 1 : SET FOCUS IN THE FIRST INPUTFELD
******************/
	//add focus() Method	
	inputTextField.focus();

/*****************
	STEP 2 : JOB ROLE
******************/
	//get id other-rolle and hide it
	selectOtherRolleField.style.display = 'none';

/*****************
	STEP 3 : t-SHIRT INFO
******************/
	//create a new blank option for Select colors
	newSelectColorsOption.value = 'empty'; 
	newSelectColorsOption.text = '---';
	newSelectColorsOption.selected = true;
	selectColors.add(newSelectColorsOption, selectColors.options[0]);

/*****************
	STEP 4 : REGISTER FOR ACTIVITIES
******************/
	/*1.- prevent to check same day and Time in selected activities
	disable the checkbox and let a message */
	let total = 0;
	let morningTime = [];
	let afternoonTime = [];

	//sort the first child from same classes (morning, afternoon) 
	for (let i = 0; i < actElem.length; i++){ 
		if(actElem[i].className === 'morning') {
			morningTime.push(actElem[i].firstElementChild);
		}else if (actElem[i].className === 'afternoon') {
			afternoonTime.push(actElem[i].firstElementChild);
		}
	}//end for loop
	
	/*EVENTLISTENER to prevent conflict same Time of activities reservation*/
	activityElements.addEventListener('change', () => {
		const checkbox = event.target;
		const isChecked = checkbox.checked;
		if (morningTime[0] === checkbox) {
			if (isChecked) {
				morningTime[1].disabled = true;
			}else{
				morningTime[1].disabled = false;
			}	
		}else if (morningTime[1] === checkbox) {
			if (isChecked) {
				morningTime[0].disabled = true;
			}else{
				morningTime[0].disabled = false;
			}
		}
		if (afternoonTime[0] === checkbox) {
			if (isChecked) {
				afternoonTime[1].disabled = true;
			}else{
				afternoonTime[1].disabled = false;
			}
		}
	})
/*	TOTAL PAYMENT FOR ACTIVITIES*/
	paymentInputs.forEach(e => {
		e.addEventListener('change', e => {
			if(e.target.checked){
				updateTotal(e.target.value)
			} else{
				updateTotal(-e.target.value)
			}
		})
	})
	function updateTotal(n){
		total += +n;
		output.innerHTML = total;
	}

/*****************
	STEP 5 : PAYMENT INFO
******************/	
 	selectPaymentText[1].style.display = 'none';
 	selectPaymentText[2].style.display = 'none';

 /*****************
	STEP 6 : VALIDATION FORM
******************/	
	let errorMessages = [
						"please fill in your name here", 
						"please, fill in your email correct here", 
						"you have to select at least one activity",
						"fill in correct your Credit Card Number it accept 13 - 16 digits", 
						"Zip must to be just 5 digits numbers", 
						"CVV accept just 3 digits Numbers",
						"Please fill in the require(*) Information"
						];

	const reg = /^\d+$/;

	function isEmailValid(email){
		return email.indexOf('@') != -1 && email.indexOf('.') != -1;
	}
	function isNameValid(name){
		return name != '';
	}
	function isOutPutValid(output){
		return output.innerHTML >= '100';
	}
	function isValCCNumValid(ccnum){

		return ccnum.value.length <= 16 && ccnum.value.length >= 13 && ccnum.value != -1 && ccnum.value.match(reg);
	}
	function isValZipValid(valzip){
		return valzip.value.length === 5 && valzip.value.match(reg);
	}
	function isValCvvValid(valcvv){
		return valcvv.value.length === 3 && valcvv.value.match(reg);
	}
	function setErrorMessage(el, errorMessage){
		el.nextElementSibling.textContent = errorMessage;
		el.className = 'errorborder';
	}
	function clearError(el){
		el.nextElementSibling.textContent = '';
		el.className = '';
	}				
// ON SUBMIT EVENTLISTENER
	form.addEventListener('submit', function(e){
		const validName = isNameValid(valName.value); 
		const validEmail = isEmailValid(valEmail.value);
		const validOutPut = isOutPutValid(output);
		const validValCCNum = isValCCNumValid(valCCNum);
		const validValZip = isValZipValid(valZip);
		const validValCvv = isValCvvValid(valCvv);

		if(!validName){
			setErrorMessage(valName, errorMessages[0]);
		}else{
			clearError(valName); 
		}
		if (!validEmail) {
			setErrorMessage(valEmail, errorMessages[1]);
		}else{
			clearError(valEmail);
		}
		if (!validOutPut) {
			document.getElementsByTagName('h2')[0].nextElementSibling.textContent = errorMessages[2];
		}else{
			document.getElementsByTagName('h2')[0].nextElementSibling.textContent = ''; 
		}
		if (selectpayment[0].selected && !validValCCNum) {
			setErrorMessage(valCCNum, errorMessages[3])
		}else{
			clearError(valCCNum); 
		}
		if (selectpayment[0].selected && !validValZip) {
			setErrorMessage(valZip, errorMessages[4]);
		}else{
			clearError(valZip); 
		}
		if (selectpayment[0].selected && !validValCvv) {
			setErrorMessage(valCvv, errorMessages[5]);
		}else{
			clearError(valCvv); 
		}

		if (!validName || !validEmail || !validOutPut || selectpayment[0].selected && !validValCCNum || selectpayment[0].selected && !validValZip || selectpayment[0].selected && !validValCvv ) {
			e.preventDefault();
			return false;
		} else{
			e.preventDefault();
			inputTextField.value = '';
			valEmail.value = '';
			//uncheck checkboxes after submit
			for(let i = 0; i < checkboxes.length; i++ ){
				//console.log(checkboxes[i]);
				checkboxes[i].checked = false;
			}
			output.innerHTML = '0';
			document.querySelector('.success').textContent = 'Thanks! it has been sent successfully!'
		}
	

	})
	
	/*BEFORE SUBMIT EVENTlisten*/
		valName.addEventListener('blur', function(e){
			if(this.value !== ''){
				clearError(this);
			}else{	
				setErrorMessage(this, errorMessages[0])
			}
		});
		// proof email if it has @ and .com exmple
		valEmail.addEventListener('keyup', function(e){	
			if(this.value.indexOf('@') != -1 && this.value.indexOf('.') != -1){
				clearError(this);
			}else{
				setErrorMessage(this, errorMessages[1])
			}
		});			
		//credit card numbers between 13 and 16 digits
		valCCNum.addEventListener('keyup', function(e){	
			if (this.value.length <= 16 && this.value.length >= 13 && this.value.match(reg)) {
				clearError(this);
			}
			else{
				setErrorMessage(this, errorMessages[3])
			}
		});
		//5 digit number
		valZip.addEventListener('keyup', function(e){		
			if (this.value.length === 5 && this.value.match(reg)) {
				clearError(this);
			}else{
				setErrorMessage(this, errorMessages[4])
				}
			}) 
			//cvv only 3 digits numbers
		valCvv.addEventListener('keyup', function(e){
			if (this.value.length === 3 && this.value.match(reg)) {
				clearError(this);
			}else{
				setErrorMessage(this, errorMessages[5]);
			}
		})		

/*EVENTLISTENER TO PAY OPTIONS*/
 	selectpayment.addEventListener('change', (e) => {
 		if(selectpayment[1].selected){
 			selectPaymentText[1].style.display = '';
 			selectPaymentText[2].style.display = 'none';
 			selectPaymentText[0].style.display = 'none';
 		}else if(selectpayment[2].selected){
 			selectPaymentText[2].style.display ='';
 			selectPaymentText[1].style.display = 'none';
 			selectPaymentText[0].style.display = 'none';
 		}else if(selectpayment[0].selected){
 			selectPaymentText[0].style.display = '';
 			selectPaymentText[2].style.display ='none';
 			selectPaymentText[1].style.display = 'none';
 		}
 	})
	
/*eventhandler for select select JobRolle */
	selectJobRolle.addEventListener('change', (e) => {
		const selectOptLastChild = selectJobRolle[selectJobRolle.length-1].selected;
	  	if ( selectOptLastChild === true) {
				selectOtherRolleField.style.display = '';
	        }else{
	        	selectOtherRolleField.style.display = 'none';
	        }
	        
	});
//eventhandler for select ID Design
	selectDesign.addEventListener('change', (e) => { 
		if(selectDesign[1].selected || selectDesign[2].selected){
			selectColors.disabled = false;
			if(selectDesign[1].selected){
				newSelectColorsOption.selected = true;
				selectColors[1].style.display = '';
				selectColors[2].style.display = '';
				selectColors[3].style.display = ''; 
				selectColors[4].style.display = 'none';
				selectColors[5].style.display = 'none';
				selectColors[6].style.display = 'none';
			}else{
				newSelectColorsOption.selected = true;
				selectColors[4].style.display = '';
				selectColors[5].style.display = '';
				selectColors[6].style.display = '';
				selectColors[1].style.display = 'none';
				selectColors[2].style.display = 'none';
				selectColors[3].style.display = 'none';
			}
		}else{
			newSelectColorsOption.selected = true;
			selectColors.disabled = true;
			}
	}); 

});//end load event

