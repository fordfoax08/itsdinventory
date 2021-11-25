let btnSearch = new Draw;
btnSearch.search_btn("p-search","text-search");

/* Edit button pop up */
let btnEdit = document.querySelectorAll(".selector-edit");
btnEdit.forEach((btn)=>{
	btn.addEventListener("click",(e)=>{
	if(e.target.classList.contains("pop-edit")) return;
	
	let btnEditClass = new Pop;
	btnEditClass.popContainer("pop-edit");
	})
})



/* FIlter Btn popup */
let btnFilter = document.querySelector(".selector-filter"),
popFilterBtn = document.querySelector(".pop-filter-btn");
//add events
btnFilter.addEventListener("click", filterPop)
popFilterBtn.addEventListener("click", filterPop)

function filterPop(e){
	if(e.target.classList.contains("pop-filter")) return;
	
	let btnFilterClass = new Pop;
	btnFilterClass.popContainer("pop-filter");
}


/* Column Btn popup */
// let btnColumn = document.querySelector(".btn-column");
let btnColumn = document.querySelector(".selector-column"),
popApplyEditBtn = document.querySelector(".pop-column-btn");
btnColumn.addEventListener("click", editPop);
popApplyEditBtn.addEventListener("click", editPop);

function editPop(e){
	let btnColumnClass = new Pop;
	btnColumnClass.popContainer("pop-column");
}



/* ++++++++++++++++++++++++++++++++++++++HOLD  */
function updateCheckBox(){
	let invokeSelect = new Check;
	invokeSelect.selectAll();
	invokeSelect.controlSelect();
}
updateCheckBox();




/* +++++++++++++TEST removelater */
const tdCheck = document.querySelectorAll(".td-check");
tdCheck.forEach( (e) => {
	if(e.checked){
		e.parentNode.classList.add("color-checked");
	}else{
		e.parentNode.classList.remove("color-checked");
	}
});


/*=================================MODAL CONTAINER*/

/* ========================EDIT MODAL */
const btnPopEdit = document.querySelector(".pop-edit-write");
btnPopEdit.addEventListener("click",() => {
	/* Draw modal container */
	let newModal = new DrawModal();
	newModal.modalOpen();
	/* Remove pop-container */
	let btnEditClass = new Pop;
	btnEditClass.popContainer("pop-edit");
	
	/* ADD EDIT DETAILS INSIDE MODAL POP UP */
	let newEditModal = new EditModal();
	newEditModal.drawEditModal();
});


/* +++++++++++++++++++++++ mouse hover to display hostname */
const selectedTr = document.querySelectorAll(".tbody1 tr");
selectedTr.forEach(e => {
	e.onmouseover = () => {
		let newDisplay = new DisplayHostname(e);
		newDisplay.hoverDisplay();
		//console.log("clicked");
	}
});

const selectedTbody = document.querySelector(".tbody1");
selectedTbody.addEventListener("mouseleave", () => {
	let newDisplay = new DisplayHostname;
	newDisplay.removeHostnameDisplay();
});



/* IEFE */
/* (() => {
	let newModal = new DrawModal();
	newModal.modalOpen();
	// Remove pop-container 
	let btnEditClass = new Pop;
	btnEditClass.popContainer("pop-edit");
	
	// ADD EDIT DETAILS INSIDE MODAL POP UP
	let newEditModal = new EditModal();
	newEditModal.drawEditModal();
}
)();
 */
 
 
 (() => {
	 if(!(localStorage.getItem("edit") == null)){
		localStorage.clear("edit");
	 }
	 
	
	/* ====== to be invoked after list is loaded, test only remove later*/
	 const hostNames = document.querySelectorAll(".td-hostname-view");
	 hostNames.forEach(e => {
		 e.addEventListener("click",e => {
			 
			/* Draw modal container */
			let newModal = new DrawModal();
			newModal.modalOpen();
			/* Now modal container exist, insert details */
			let newDetailsModal = new DetailsModal();
			newDetailsModal.drawDetailsModal();
		 });
	 });
	 
 })();
 
 
 

/* =============================== FOR NEW ENTRY / Add items */
const addEntryButton = document.querySelector(".add-entry-button");
addEntryButton.addEventListener("click", e => {
	/* Draw modal container */
	let newModal = new DrawModal();
	newModal.modalOpen(2);
	
	/* Add entry modal */
	let newAddEntry = new AddEntryModal;
	newAddEntry.drawAddEntry();
	
	/* Invoke function for remarks pop modal */
	// newAddEntry.popRemarksEdit();
});


function myFunction(e){
	console.log(e);
}