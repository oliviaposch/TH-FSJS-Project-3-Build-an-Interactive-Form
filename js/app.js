window.addEventListener('load', function(){

/*****************
	GLOBAL VARAIBLES
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
const submitButton = document.getElementsByTagName('button')[0];//form Validation

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
						"fill in correct your Credit Card Number", 
						"Zip must to be just 5 digits numbers", 
						"CVV accept just 3 digits Numbers",
						"Please fill in the require(*) Information"
						];

	function submitBtnEnable(){
		submitButton.disabled = false;
		submitButton.addClass = '';
		submitButton.nextElementSibling.textContent = '';
	}
	function submitBtnDisable(){
		submitButton.disabled = true;
		submitButton.className = 'disable';
		submitButton.nextElementSibling.textContent = errorMessages[6];
	}
		//check name Input
			valName.addEventListener('blur', function(e){
				e.preventDefault();
				if(this.value !== ''){
					this.nextElementSibling.textContent = '';
					this.className = '';
					submitBtnEnable();
				}else{
					
					this.nextElementSibling.textContent = errorMessages[0];
					this.className = 'errorborder';
					submitBtnDisable();
				}
			});
			// proof email if it has @ and .com exmple
			valEmail.addEventListener('keyup', function(e){
				e.preventDefault();
				if(this.value.indexOf('@') != -1 && this.value.indexOf('.') != -1){
					this.nextElementSibling.textContent = '';
					this.className = '';
					submitBtnEnable();
				}else{
					this.nextElementSibling.textContent = errorMessages[1];
					this.className = 'errorborder';
					submitBtnDisable();
				}
			});

			const reg = /^\d+$/;
			//credit card numbers between 13 and 16 digits
			valCCNum.addEventListener('keyup', function(e){
				e.preventDefault();
				if (this.value.length <= 16 && this.value.length >= 13 && this.value != -1 && this.value.match(reg)) {
					this.nextElementSibling.textContent = '';
					this.className = '';
					submitBtnEnable();
				}
				else{
					this.nextElementSibling.textContent = errorMessages[3];
					this.className = 'errorborder';
					submitBtnDisable();
				}
			});
			//5 digit number
			valZip.addEventListener('keyup', function(e){
				e.preventDefault();
				if (this.value.length === 5 && this.value.match(reg)) {
					this.nextElementSibling.textContent = '';
					this.className = ''; 
					submitBtnEnable();
				}else{
					this.nextElementSibling.textContent = errorMessages[4];
					this.className = 'errorborder';
					submitBtnDisable();
				}
			}) 
			//cvv only 3 digits numbers
			valCvv.addEventListener('keyup', function(e){
				e.preventDefault();
				if (this.value.length === 3 && this.value.match(reg)) {
					this.nextElementSibling.textContent = '';
					this.className = '';
					submitBtnEnable();
				}else{
					this.nextElementSibling.textContent = errorMessages[5];
					this.className = 'errorborder';
					submitBtnDisable();
				}
			})
			
			submitButton.addEventListener('click', function(e){
				submitButton.disabled = false;
				if (output.innerHTML >= '100') {
					document.getElementsByTagName('h2')[0].nextElementSibling.textContent = '';
					submitBtnEnable();
				}else{
					document.getElementsByTagName('h2')[0].nextElementSibling.textContent = errorMessages[2];
					submitBtnDisable();
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

