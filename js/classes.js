/* To be included in MODULE later */
class Draw{
	
	/* Only accept node with Class attrib */
	search_btn(searchBtn,itemSelected){
		let btn = document.querySelector("."+searchBtn);
		let itemSelect = document.querySelector("."+itemSelected);
		btn.addEventListener("click", (e)=>{
			
			if(btn.classList.contains("open")){
				btn.classList.remove("open");
				itemSelect.classList.remove("open");
			}else{
				btn.classList.add("open");
				itemSelect.classList.add("open");
			}
			// console.log(e.target);
		})
	}
	
}


/* POP is used to contain backround of menu button popout to avoid clicking inside elements */
class Pop{
	popContainer(popElement){
		let popNode = document.querySelector(".pop-container") === undefined ? undefined : document.querySelector(".pop-container");
		let popElementItem = document.querySelector("."+popElement);
		if(popNode != undefined){
			// console.log("popNode is not null",popNode);
			popElementItem.classList.remove("open");
			popNode.remove();
		}else{
			// console.log("popNode is Null");
			this._popTemplate(popElementItem);
			popElementItem.classList.add("open");
		}
	}
	
	_popTemplate(elementParam){
		let bodyContainer = document.querySelector(".main-container");
		let newDiv = document.createElement("DIV");
		newDiv.setAttribute("class","pop-container");
		bodyContainer.appendChild(newDiv);
		
		newDiv.addEventListener("click",(e) => {
			elementParam.classList.remove("open");
			e.target.remove();
			// console.log(e.target);
		})
	}
}

/* Checkbox  */
class Check{
	
	selectAll(){
		const allChk = document.querySelector(".all-checkbox");
		const tdChk = document.querySelectorAll(".td-check-btn");
		const editBtn = document.querySelector(".btn-edit");
		allChk.addEventListener("click", (e)=>{
			if(e.target.checked){
				tdChk.forEach((eachCheck)=>{
					eachCheck.checked = true;
				});
				// editBtn.classList.add("show");
				this._editBtnUpdate();
			}else{
				tdChk.forEach((eachCheck)=>{
					eachCheck.checked = false;
				});
				// editBtn.classList.remove("show"); 
				this._editBtnUpdate();
			}
		});

		tdChk.forEach((eachCheck)=>{
			eachCheck.addEventListener("click",(e)=>{
				if(!e.checked){
					allChk.checked = false;
				}
				this._editBtnUpdate();
			});
			
		});
	}
	
	
	controlSelect(){
		const allTrData = document.querySelectorAll(".tbody1 tr");
		allTrData.forEach((allTr) => {
			allTr.addEventListener("click", (e) => {
				if(event.ctrlKey){
					if(e.target.tagName === "TR") return;
					
					if(e.target.tagName === "A" || e.target.tagName === "INPUT"){
						// console.log(e.target.parentNode.parentNode);
						_controlCheck(e.target.parentNode);
					}
					
					if(e.target.tagName === "TD"){
						// console.log(e.target.parentNode);
						_controlCheck(e.target);
					}
					
					/* call editBtnUpdate */
					this._editBtnUpdate();
				}
			});
			/* CALL THIS function inside this controlSelect, to check first ChildNode input (CheckBox)*/
			function _controlCheck(targetElement){
				// console.log(targetElement.parentNode.firstElementChild.firstElementChild);
				const checkChild = targetElement.parentNode.firstElementChild.firstElementChild
				if(checkChild.checked){
					checkChild.checked = false;
				}else{
					checkChild.checked = true;
				}
				
			}
			
		});
		
		
	}
	
	
	/* call to update btnEdit state if at least one checkbox is checked show editBtn */
	_editBtnUpdate(){
		const tdChk = document.querySelectorAll(".td-check-btn");
		const editBtn = document.querySelector(".btn-edit");
		let checkCount = 0;
		tdChk.forEach((eachCheckTest)=>{
			if(eachCheckTest.checked){
				checkCount++;
			}
		});
		if(checkCount > 0){
			editBtn.classList.add("show");
		}else{
			editBtn.classList.remove("show");
		}
	}
	
}


/* DRAW MODAL pop up */
class DrawModal{
	
	modalOpen(mode){
		// const mainContainer = document.querySelector(".main-container");
		const mainContainer = document.body;
		/* Create element DIV with modal-container class*/
		let newModalContainer = document.createElement("DIV");
		newModalContainer.setAttribute("class","modal-container");
		/* Create element DIV with modal-body class */
		let newModalBody = document.createElement("DIV");
		newModalBody.setAttribute("class","modal-body");
		/* Appened modal-body to modal-container */
		newModalContainer.appendChild(newModalBody);
		/* Append modal-body to mainContainer */
		mainContainer.appendChild(newModalContainer);
		/* Invoke close function when clicking modalBody */
		this._modalClose(mode);
		/* toggle Panel Table */
		this._hidePanelTable();
	}
	
	/*  */
	_modalClose(mode = 1){
		const modalContainer = document.querySelector(".modal-container");
		modalContainer.addEventListener("click",(e) => {
			if(!e.target.classList.contains("modal-container")) return;
			
			if(mode === 1){
				modalContainer.remove();
				/* toggle Panel Table */
				this._hidePanelTable();
				
				
			}else{
				if(confirm("Are you wan't to cancel?")){
					modalContainer.remove();
					/* toggle Panel Table */
					this._hidePanelTable();
				}
			}
			
			/* Remove  localStorage Edit*/
			if(!(localStorage.getItem("edit") == null)){
				localStorage.clear("edit");
			}
			/* confirm close */
			
			
		});
	}
	
	/* Create toggleble method to hide background from selected */
	_hidePanelTable(){
		const tableContainer = document.querySelector(".content-table");
		tableContainer.classList.contains("modalOpen") ? tableContainer.classList.remove("modalOpen") : tableContainer.classList.add("modalOpen");
	}
	
	
}


/* +++++++++++++++++CUSTOM CONFIRM POP-UP */
class CustomConfirm{
	customConfirm(){
		/* Function pop up */
		let confirmCustom = document.querySelector('.confirm-container');
		const ui = {
		  confirm : async (msg) => createConfirm(msg)
		};

		const createConfirm = (msg) => {
		  let template = `
			<p>${msg}</p>
			<div class="btn-confirm-container">
			  <button class="yesConfirm">Yes</button>
			  <button class="noConfirm">No</button>
			</div>
		  `;
		  confirmCustom.classList.add('active');
		  confirmCustom.firstElementChild.innerHTML = template;

		  return new Promise((resolve,reject) => {
			document.querySelector('.yesConfirm').addEventListener('click',function(){
			  resolve(true);
			});
			document.querySelector('.noConfirm').addEventListener('click',function(){
			  resolve(false);
			});
		  });
		}
		
		/* Custom Confirm pop up for item remove */
		const confirmAnswer = async (msg)=> {
		  const resolve = await ui.confirm(msg);
		  if(resolve){
			// console.log(newData);
		  }else{
			console.log("Clicked No!");
		  }
		  confirmCustom.classList.remove('active');
		  confirmCustom.firstElementChild.innerHTML = '';
		}
	}
	
	customConfirmSure(){
		/* Custom Confirm pop up for item remove */
		const confirmAnswer = async (msg)=> {
		  const resolve = await ui.confirm(msg);
		  if(resolve){
			// console.log(newData);
		  }else{
			console.log("Clicked No!");
		  }
		  confirmCustom.classList.remove('active');
		  confirmCustom.firstElementChild.innerHTML = '';
		}
	}
}


/* +++++++++++++++++++++++++++EDIT  MODAL*/
class EditModal{
	
	drawEditModal() {
		let modalBody = document.querySelector(".modal-body");
		modalBody.classList.add("modal-edit");
		
		modalBody.innerHTML = `
			<!-- MODAL DATA CONTAINER -->
				<div class="modal-data-container">
					<h2>Edit selected</h2>
					<div class="modal-data-edit-table">
					<!-- edit data table -->
						<table>
							<thead class="thead1">
								<tr>
									<th></th>
									<th class="th-hostname">Hostname</th>
									<th class="th-location">Location</th>
									<th class="th-department">Department</th>
									<th class="th-ip">IP Address</th>
									<th class="th-serial">Serial Number</th>
									<th class="th-mac">Mac Address</th>
									<th class="th-lastname">Lasname</th>
									<th class="th-firstname">Firstname</th>
									<th class="th-middlename">Middlename</th>
									<th class="th-unit">Unit</th>
									<th class="th-ownership">Ownership</th>
									<th class="th-email">Email</th>
									<th class="th-employmentstatus">Employee Status</th>
									<th class="th-assetstatus">Asset Status</th>
									<th class="th-minworkstation">w/ min work</th>
									<th class="th-os">O.S</th>
									<th class="th-cpu">CPU</th>
									<th class="th-ram">RAM</th>
									<th class="th-hdd">HDD</th>
									<th class="th-sdd">SDD</th>
									<th class="th-brand">Brand</th>
									
									<th class="th-apexperm">Apex Perm</th>
									<th class="th-apexcloud">Apex Cloud</th>
									<th class="th-checkpoint">Checkpoint</th>
									<th class="th-cynet">Cynet</th>
									<th class="th-officescan">Office Scan</th>
									<th class="th-rapid">Rapid 7 Agent</th>
									<th class="th-verified">Verified</th>
									<th class="th-cyber">Checked by Cybersec</th>
									<th class="th-datereleased">Date Released</th>
									<th class="th-datereturn">Date Returned</th>
									
								</tr>
							</thead>
						<!-- TBODY -->
							<tbody class="tbody1 edit-tbody1">
				
								<tr>
									<input type="hidden" name="id" value="1">
									<td class="check-box td-check-select"><a href="javascript:void(0);" class="edit-remove-tr" title="Remove selecte item">&minus;</a></td>
									<td class="td-hostname"><input type="text" name="edit_hostname" value="BCLCOM-201"></td>
									<td class="td-location">
										<select name="edit_location">
											<option value="1">-</option>
											<option value="2">BSC</option>
											<option value="3">OCC</option>
											<option value="4">NRTH-LZN</option>
											<option value="5">VIZ-MIN</option>
											<option value="6">Others</option>
										</select>
									</td>
									<td class="td-department">
										<select name="edit_department">
											<option value="1">-</option>
											<option value="2">ITSD</option>
											<option value="3">G.A.D</option>
											<option value="4">Finance</option>
										</select>
									</td>
									<td class="td-ip"><input type="text" name="edit_ip" value="192.168.1.212"></td>
									<td class="td-serial"><input type="text" name="edit_serial" value="NXVP23FJLKAJD"></td>
									<td class="td-mac"><input type="text" name="edit_mac" value="F0-D2-20-DF-FF"></td>
									<td class="td-lastname"><input type="text" name="edit_lastname" value="Dela Cruz"></td>
									<td class="td-firstname"><input type="text" name="edit_firstname" value="Pedro"></td>
									<td class="td-middlename"><input type="text" name="edit_middlename" value="Amorsolo"></td>
									<td class="td-unit">
										<select name="edit_unit">
											<option value="1">-</option>
											<option value="2">Laptop</option>
											<option value="3">Desktop</option>
											<option value="4">Macbook</option>
											<option value="5">Android</option>
											<option value="6">Ipad/Iphone</option>
										</select>
									</td>
									<td class="td-ownership">
										<select name="edit_ownership">
											<option value="1">-</option>
											<option value="2">CBCI</option>
											<option value="3">CFS</option>
										</select>
									</td>
									<td class="td-email"><input type="text" name="edit_email" value="pdcruz@bayad.com"></td>
									<td class="td-employmentstatus">
										<select name="edit_employmentstatus">
											<option value="1">Active</option>
											<option value="2">Resigned</option>
										</select>
									</td>
									<td class="td-assetstatus">
										<select name="edit_assetstatus">
											<option value="1">Active</option>
											<option value="2">Resigned</option>
										</select>
									</td>
									<td class="td-minworkstation"></td>
									<td class="td-os">
										<select name="edit_os">
											<option value="1">-not set-</option>
											<option value="2">WINDOWS 10</option>
											<option value="3">WINDOWS 8.1</option>
											<option value="4">WINDOWS 8</option>
											<option value="5">WINDOWS 7</option>
											<option value="6">WINDOWS XP</option>
											<option value="7">MAC OS</option>
										</select>
									</td>
									<td class="td-cpu"><input type="text" name="edit_cpu" value="i5 599k"></td>
									<td class="td-ram">
										<select name="edit_ram">
											<option>-not set-</option>
											<option value="1GB">1GB</option>
											<option value="2GB">2GB</option>
											<option value="3GB">3GB</option>
											<option value="4GB">4GB</option>
											<option value="6GB">6GB</option>
											<option value="8GB">8GB</option>
											<option value="16GB">16GB</option>
											<option value="32GB">32GB</option>
										</select>
									</td>
									<td class="td-hdd">
										<select name="edit_hdd">
											<option>-not set-</option>
											<option value="120GB">120GB</option>
											<option value="250GB">250GB</option>
											<option value="500GB">500GB</option>
											<option value="1TB">1TB</option>
											<option value="2TB">2TB</option>
										</select>
									</td>
									<td class="td-ssd">
										<select name="edit_ssd">
											<option>-not set-</option>
											<option value="120GB">120GB</option>
											<option value="250GB">250GB</option>
											<option value="500GB">500GB</option>
											<option value="1TB">1TB</option>
											<option value="2TB">2TB</option>
										</select>
									</td>
									<td class="td-brand">
										<select name="edit_brand">
											<option>-not set-</option>
											<option value="Acer">Acer</option>
											<option value="Toshiba">Toshiba</option>
											<option value="Dell">Dell</option>
											<option value="Mac">Mac</option>
											<option value="Samsung">Samsung</option>
											<option value="LG">LG</option>
											<option value="Others">Others</option>
										</select>
									</td>
									
									
									<td class="td-apexperm check-box"><input name="apexperm" class="td-check" type="checkbox" checked></td>
									<td class="td-apexcloud check-box"><input name="apexcloud" class="td-check" type="checkbox" checked></td>
									<td class="td-checkpoint check-box"><input name="checkpoint" class="td-check" type="checkbox" ></td>
									<td class="td-cynet check-box"><input name="cynet" class="td-check" type="checkbox" ></td>
									<td class="td-officescan check-box"><input name="officescan" class="td-check" type="checkbox" checked></td>
									<td class="td-rapid check-box"><input name="rapid" class="td-check" type="checkbox" checked></td>
									<td class="td-verified check-box"><input name="verified" class="td-check" type="checkbox" checked></td>
									<td class="td-cyber"><input name="cyber" class="td-check" type="checkbox" checked></td>
									<td class="td-datereleased"><input type="date" name="edit_datereleased" value="1990-01-20"></td>
									<td class="td-datereturn"><input type="date" name="edit_datereturn" value="2001-02-27"></td>
									
								
								</tr>
								
								
								
								<tr>
									<input type="hidden" name="id" value="2">
									<td class="check-box td-check-select"><a href="javascript:void(0);" class="edit-remove-tr" title="Remove selecte item">&minus;</a></td>
									<td class="td-hostname"><input type="text" name="edit_hostname" value="BCLCOM-201"></td>
									<td class="td-location">
										<select name="edit_location">
											<option value="1">-</option>
											<option value="2">BSC</option>
											<option value="3">OCC</option>
											<option value="4">NRTH-LZN</option>
											<option value="5">VIZ-MIN</option>
											<option value="6">Others</option>
										</select>
									</td>
									<td class="td-department">
										<select name="edit_department">
											<option value="1">-</option>
											<option value="2">ITSD</option>
											<option value="3">G.A.D</option>
											<option value="4">Finance</option>
										</select>
									</td>
									<td class="td-ip"><input type="text" name="edit_ip" value="192.168.1.212"></td>
									<td class="td-serial"><input type="text" name="edit_serial" value="NXVP23FJLKAJD"></td>
									<td class="td-mac"><input type="text" name="edit_mac" value="F0-D2-20-DF-FF"></td>
									<td class="td-lastname"><input type="text" name="edit_lastname" value="Dela Cruz"></td>
									<td class="td-firstname"><input type="text" name="edit_firstname" value="Pedro"></td>
									<td class="td-middlename"><input type="text" name="edit_middlename" value="Amorsolo"></td>
									<td class="td-unit">
										<select name="edit_unit">
											<option value="1">-</option>
											<option value="2">Laptop</option>
											<option value="3">Desktop</option>
											<option value="4">Macbook</option>
											<option value="5">Android</option>
											<option value="6">Ipad/Iphone</option>
										</select>
									</td>
									<td class="td-ownership">
										<select name="edit_ownership">
											<option value="1">-</option>
											<option value="2">CBCI</option>
											<option value="3">CFS</option>
										</select>
									</td>
									<td class="td-email"><input type="text" name="edit_email" value="pdcruz@bayad.com"></td>
									<td class="td-employmentstatus">
										<select name="edit_employmentstatus">
											<option value="1">Active</option>
											<option value="2">Resigned</option>
										</select>
									</td>
									<td class="td-assetstatus">
										<select name="edit_assetstatus">
											<option value="1">Active</option>
											<option value="2">Resigned</option>
										</select>
									</td>
									<td class="td-minworkstation"></td>
									<td class="td-os">
										<select name="edit_os">
											<option value="1">-not set-</option>
											<option value="2">WINDOWS 10</option>
											<option value="3">WINDOWS 8.1</option>
											<option value="4">WINDOWS 8</option>
											<option value="5">WINDOWS 7</option>
											<option value="6">WINDOWS XP</option>
											<option value="7">MAC OS</option>
										</select>
									</td>
									<td class="td-cpu"><input type="text" name="edit_cpu" value="i5 599k"></td>
									<td class="td-ram">
										<select name="edit_ram">
											<option>-not set-</option>
											<option value="1GB">1GB</option>
											<option value="2GB">2GB</option>
											<option value="3GB">3GB</option>
											<option value="4GB">4GB</option>
											<option value="6GB">6GB</option>
											<option value="8GB">8GB</option>
											<option value="16GB">16GB</option>
											<option value="32GB">32GB</option>
										</select>
									</td>
									<td class="td-hdd">
										<select name="edit_hdd">
											<option>-not set-</option>
											<option value="120GB">120GB</option>
											<option value="250GB">250GB</option>
											<option value="500GB">500GB</option>
											<option value="1TB">1TB</option>
											<option value="2TB">2TB</option>
										</select>
									</td>
									<td class="td-ssd">
										<select name="edit_ssd">
											<option>-not set-</option>
											<option value="120GB">120GB</option>
											<option value="250GB">250GB</option>
											<option value="500GB">500GB</option>
											<option value="1TB">1TB</option>
											<option value="2TB">2TB</option>
										</select>
									</td>
									<td class="td-brand">
										<select name="edit_brand">
											<option>-not set-</option>
											<option value="Acer">Acer</option>
											<option value="Toshiba">Toshiba</option>
											<option value="Dell">Dell</option>
											<option value="Mac">Mac</option>
											<option value="Samsung">Samsung</option>
											<option value="LG">LG</option>
											<option value="Others">Others</option>
										</select>
									</td>
									
									
									<td class="td-apexperm check-box"><input name="apexperm" class="td-check" type="checkbox" checked></td>
									<td class="td-apexcloud check-box"><input name="apexcloud" class="td-check" type="checkbox" checked></td>
									<td class="td-checkpoint check-box"><input name="checkpoint" class="td-check" type="checkbox" ></td>
									<td class="td-cynet check-box"><input name="cynet" class="td-check" type="checkbox" ></td>
									<td class="td-officescan check-box"><input name="officescan" class="td-check" type="checkbox" checked></td>
									<td class="td-rapid check-box"><input name="rapid" class="td-check" type="checkbox" checked></td>
									<td class="td-verified check-box"><input name="verified" class="td-check" type="checkbox" checked></td>
									<td class="td-cyber"><input name="cyber" class="td-check" type="checkbox" checked></td>
									<td class="td-datereleased"><input type="date" name="edit_datereleased" value="1990-01-20"></td>
									<td class="td-datereturn"><input type="date" name="edit_datereturn" value="2001-02-27"></td>
									
								
								</tr>
								
								
								
							
							
							
							
							</tbody>
							<!-- END OF TBODY -->
						</table>
					</div>
					
					<div class="modal-data-edit-button">
						<input type="button" class="edit-button-confirm" value="Confirm edit">
						<input type="button" class="edit-button-cancel" value="Cancel">
					</div>
					
					
					
				</div>
				<!-- END OF MODAL DATA CONTAINER -->
		`;
		
		this._removeItem();
		/* activateBtn */
		this._activateButton();
		/* activate listen for changes  */
		this._onChangeEvent();
	}
	
	
	_removeItem(){
		const allRemoveItem = document.querySelectorAll(".edit-remove-tr");
		allRemoveItem.forEach( e => {
			e.addEventListener("click", e => {
				e.target.parentNode.parentNode.remove();
				/* Count remaining nodes if 0 close modal */
				if((document.querySelectorAll(".edit-remove-tr").length) === 0){
					document.querySelector(".modal-container").remove();
					
					/* toggle Panel Table */
					const tableContainer = document.querySelector(".content-table");
					tableContainer.classList.contains("modalOpen") ? tableContainer.classList.remove("modalOpen") : tableContainer.classList.add("modalOpen");
					/* Remove  localStorage Edit*/
					if(!(localStorage.getItem("edit") == null)){
						localStorage.clear("edit");
					}
				}else{
					/* if remaining nodes > 0 Remove currently Selected localStorage Edit*/
					if(!(localStorage.getItem("edit") == null)){
						// declare targs
						let targs = e.target;
						// localStorage.clear("edit");
						for(let i = 0; i < 5; i++){
							/* condition if targs.tagName = TR break */
							if(targs.tagName === "TR"){	
								break;
							}
							targs = targs.parentNode;
						}
						/* declare id */
						let id_id = targs.firstElementChild.value;
						/* getLocal data */
						let localStorageData = JSON.parse(localStorage.getItem("edit"));
						/* check if selecteID existed deleted */
						if(("id_"+id_id) in localStorageData){
							delete localStorageData["id_"+id_id];
						}
						/* Stringify to JSON and save to localStorage */
						localStorage.setItem("edit", JSON.stringify(localStorageData));
						// console.log(localStorageData);
						
					}
				
				}
				
				
			});
		});
	}
	
	_activateButton(){
		const buttonCancel = document.querySelector(".edit-button-cancel");
		buttonCancel.addEventListener("click", this._buttonCancel);
		
		const buttonConfirm = document.querySelector(".edit-button-confirm");
		buttonConfirm.addEventListener("click", this._buttonConfirm);
	}
	
	_buttonCancel() {
		if(confirm("Are you sure you wan't to cancel edit? Unsaved changes will not be retrieved")){
			document.querySelector(".modal-container").remove();
			/* toggle Panel Table */
			const tableContainer = document.querySelector(".content-table");
			tableContainer.classList.contains("modalOpen") ? tableContainer.classList.remove("modalOpen") : tableContainer.classList.add("modalOpen");
			
			/* Remove  localStorage Edit*/
			if(!(localStorage.getItem("edit") == null)){
				localStorage.clear("edit");
			}
		}
		
	}
	
	_buttonConfirm() {
		if(confirm("Are you sure you wan't save changes?")){
			document.querySelector(".modal-container").remove();
			
			/* toggle Panel Table */
			const tableContainer = document.querySelector(".content-table");
			tableContainer.classList.contains("modalOpen") ? tableContainer.classList.remove("modalOpen") : tableContainer.classList.add("modalOpen");
			/* Remove  localStorage Edit*/
			if(!(localStorage.getItem("edit") == null)){
				localStorage.clear("edit");
			}
			
			/* Refresh checked box */
			const allChk = document.querySelector(".all-checkbox"),
				tdChk = document.querySelectorAll(".td-check-btn");
			allChk.checked = false;
			tdChk.forEach(e => {
				e.checked = false;
			});
				
		}
	}
	
	




	_onChangeEvent() {
		/* ALL INPUT */
		const allInputText = document.querySelectorAll(".edit-tbody1 > tr > td > input");
		allInputText.forEach(e => {
			e.addEventListener("change" ,e => {
				/* Loop parentNode and stop in TR tag */
				let newObj = {};
				let targs = e.target;
				for(let i = 0; i < 5; i++){
					if(targs.tagName === 'TR'){					
						let id_id = targs.firstElementChild.value;
						let varName = e.target.name.replace("edit_","");
						let data;
						/* input check if checkbox or text */
						if(e.target.type === "checkbox"){
							data = e.target.checked;
						}else{
							data =  e.target.value;
						}
						
						/* insert into Obj */
						newObj["id"] = id_id;
						newObj["name"] = varName.toLowerCase();
						newObj["dataValue"] = data;
						break;
					}else{
						targs = targs.parentNode;
					}
				} 
				
				// console.log(newObj);
				_saveToLocalData(newObj);
						
			});
		});
		
		
		/* ALL SELECT */
		const allSelect = document.querySelectorAll(".edit-tbody1 > tr > td > select");
		allSelect.forEach(e => {
			e.addEventListener("change", e => {
				
				let targs = e.target;
				let newObj = {};
				
				for(let i = 0; i < 10; i++){
					if(targs.tagName === "TR"){
						let id_id = targs.firstElementChild.value;
						let varName = e.target.name.replace("edit_","").toLowerCase();
						let data = e.target.value;
						/* Insert to object */
						newObj["id"] = id_id;
						newObj["name"] = varName;
						newObj["dataValue"] = data;
						break;
					}else{
						targs = targs.parentNode;
					}
				}
				
				// console.log(newObj);
				
				_saveToLocalData(newObj);
			});
		});
		/* END ALL SELECT */
		
		

		
		function _saveToLocalData(obj){
			
			let data = {};
			data["id_"+obj.id] = {
				name: [obj.name],
				dataValue: [obj.dataValue]
			};
			
			if(localStorage.getItem("edit") == null){
				// console.log("save to local: ", JSON.stringify(data));
				localStorage.setItem("edit",JSON.stringify(data));
				//console.log("Saved");
			}else{
				let localStorageData = JSON.parse(localStorage.getItem("edit"));
				// console.log("Data from Local Storage:  ", localStorageData);
				
				/* check if ID does not exist then insert new data */
				if(!(("id_"+obj.id) in localStorageData)){
					localStorageData["id_"+obj.id] = {
						name: [obj.name],
						dataValue: [obj.dataValue]
					}
					/* Insert new data to localStorage */
					localStorage.setItem("edit", JSON.stringify(localStorageData));
				}else{
					/* UPDATE data of existing id */
					
					/* search index of existing array and remove */
					if(localStorageData["id_"+obj.id].name.includes(obj.name)){
						let indexPos = localStorageData["id_"+obj.id].name.indexOf(obj.name);
						
						/* Remove existing for later insertion of update / selected value */
						localStorageData["id_"+obj.id].name.splice(indexPos, 1);
						localStorageData["id_"+obj.id].dataValue.splice(indexPos, 1);
					}
					
					/* Insert fresh */
					localStorageData["id_"+obj.id].name.push(obj.name)
					localStorageData["id_"+obj.id].dataValue.push(obj.dataValue)
					
					/* Save to localStorage */
					localStorage.setItem("edit", JSON.stringify(localStorageData));
					
					
				}
				
			}
			
			console.log(JSON.parse(localStorage.getItem("edit")));
			
		}
		
	}
	
	
	
	
	
}


class DetailsModal{
	
	drawDetailsModal() {
		let modalBody = document.querySelector(".modal-body");
		modalBody.classList.add("modal-view-details");
		
		modalBody.innerHTML = `
				<div class="modal-data-container">
					<div class="view-details-section1">
						<h1>BCLCOM-201</h1>
						<p>Acer Mini Cloudren</p>
						<p title="Serialnumber">NCMXLJ3485009</p>
					</div>
					<div class="view-details-section2">
						<table class="view-details-table-user-details">
							<tbody>
								<tr>
									<td class="plc">Name:</td>
									<td class="td-user-details">Yomaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</td>
									<td class="plc">Email:</td>
									<td class="td-user-details">yjonwaps@bayad.com</td>
									<td class="plc">Status:</td>
									<td class="td-user-details">Active</td>
								</tr>
								
								<tr>
									<td class="plc">Position:</td>
									<td class="td-user-details">Nurse Head II</td>
									<td class="plc">Department:</td>
									<td class="td-user-details">Department de Nurse Assoc</td>
									<td class="plc">Date release:</td>
									<td>06/23/2020</td>
								</td>
								
							</tbody>
						</table>
					</div>
					<div class="view-details-section3">
						
						<div class="details-sec-a">
							<table class="view-details-table-asset-details">
								<tbody>
								
									<tr>
										<td class="plc">Model:</td>
										<td>Acer Mini Cloudren</td>
										<td class="plc">Released:</td>
										<td>09/23/24</td>
									</tr>
								
									<tr>
										<td class="plc">Unit:</td>
										<td>Laptop</td>
										<td class="plc">Returned:</td>
										<td>09/23/25</td>
									</tr>
								
									<tr>
										<td class="plc">OS:</td>
										<td>Windows10</td>
										<td class="plc">Status:</td>
										<td>Active</td>
									</tr>
								
									<tr>
										<td class="plc">SSD:</td>
										<td>120GB</td>
										<td class="plc">Apex (on Prem):</td>
										<td>Yes</td>
									</tr>
								
									<tr>
										<td class="plc">HDD:</td>
										<td>1TB</td>
										<td class="plc">Apex (on Cloud):</td>
										<td>Yes</td>
									</tr>
								
									<tr>
										<td class="plc">RAM:</td>
										<td>16GB</td>
										<td class="plc">Rapid7:</td>
										<td>Yes</td>
									</tr>
								
									<tr>
										<td class="plc">IP add:</td>
										<td>192.168.1.235</td>
										<td class="plc">LanGuard:</td>
										<td>Yes</td>
									</tr>
								
									<tr>
										<td class="plc">MAC:</td>
										<td>AE-D0-32-25-AA</td>
										<td class="plc">OfficeScan:</td>
										<td>Yes</td>
									</tr>
								
									<tr>
										<td class="plc">Owner:</td>
										<td>CBCI</td>
										<td class="plc"></td>
										<td></td>
									</tr>
								
								</tbody>
							</table>
						</div>
						<div class="details-sec-b">
						
						<!-- Comment section -->
							<div class="remarks-container">
								<div class="details-remarks-buttons">
									<input class="details-comment-button active" type="button" value="Comment">
									<input class="details-remarks-button" type="button" value="Remarks">
									<input class="details-notes-buttons" type="button" value="Notes">
								</div>
								<div class="details-remarks-content">
									<textarea class="comment">This is comment area</textarea>
									<textarea class="remarks hide">This is remarks area</textarea>
									<textarea class="notes hide">This is notes area</textarea>
								</div>
							</div>
						
						</div>
						 <!--<table class="view-details-table-asset-details">
						</table> -->
					
					</div>
					<div class="view-details-section4"></div>
				</div>
		`;
		
		/* Invoke comment / remarks functionality */
		this._remarks();
		
	}
	
	
	_remarks() {
		const remarksButton = document.querySelectorAll(".details-remarks-buttons > input");
		const remarksTextarea = document.querySelectorAll(".details-remarks-content > textarea");
		/* comment */
		const commentBtn = document.querySelector(".details-comment-button");
		commentBtn.addEventListener("click", e => {
			/* reset btn and textarea state */
			_resetItem();
			/* add effect on this button */
			e.target.classList.add("active");
			/* active textarea for comment */
			document.querySelector(".comment").classList.remove("hide");
			
		});
		
		/* Remarks */
		const remarksBtn = document.querySelector(".details-remarks-button");
		remarksBtn.addEventListener("click", e => {
			_resetItem();
			e.target.classList.add("active");
			document.querySelector(".remarks").classList.remove("hide");
		});
		
		/* Notes */
		const notesBtn = document.querySelector(".details-notes-buttons");
		notesBtn.addEventListener("click", e => {
			_resetItem();
			e.target.classList.add("active");
			document.querySelector(".notes").classList.remove("hide");
		});
		
		
		// console.log(remarksTextarea);
		const _resetItem = function (){
			remarksButton.forEach(f => f.classList.remove("active"));
			remarksTextarea.forEach(f => f.classList.add("hide"));
		}
	}
	
}


class AddEntryModal{
	
	drawAddEntry(){
		let modalBody = document.querySelector(".modal-body");
		modalBody.classList.add("modal-add-entry");
		
		/* insert template */
		modalBody.innerHTML = `
			<div class="modal-data-container">
				<h2>Add new Item</h2>
				<p class="add-disp-hostname"></p>
				<div class="modal-data-edit-table">
				<!-- edit data table -->
					<table>
						<thead class="thead1">
							<tr>
								<th></th>
								<th class="th-hostname">Hostname</th>
								<th class="th-location">Location</th>
								<th class="th-department">Department</th>
								<th class="th-ip">IP Address</th>
								<th class="th-serial">Serial Number</th>
								<th class="th-mac">Mac Address</th>
								<th class="th-lastname">Lasname</th>
								<th class="th-firstname">Firstname</th>
								<th class="th-middlename">Middlename</th>
								<th class="th-unit">Unit</th>
								<th class="th-ownership">Ownership</th>
								<th class="th-email">Email</th>
								<th class="th-employmentstatus">Employee Status</th>
								<th class="th-assetstatus">Asset Status</th>
								<th class="th-os">O.S</th>
								<th class="th-cpu">CPU</th>
								<th class="th-ram">RAM</th>
								<th class="th-hdd">HDD</th>
								<th class="th-sdd">SDD</th>
								<th class="th-brand">Brand</th>
								
								<th class="th-apexperm">Apex Perm</th>
								<th class="th-apexcloud">Apex Cloud</th>
								<th class="th-checkpoint">Checkpoint</th>
								<th class="th-cynet">Cynet</th>
								<th class="th-officescan">Office Scan</th>
								<th class="th-rapid">Rapid 7 Agent</th>
								<th class="th-verified">Verified</th>
								<th class="th-cyber">Checked by Cybersec</th>
								<th class="th-datereleased">Date Released</th>
								<th class="th-add-remarks">Remarks</th>
								
							</tr>
						</thead>
					<!-- TBODY -->
						<tbody class="tbody1 add-tbody1">
			
							<tr>
								<td class="check-box td-check-select"><a href="javascript:void(0);" class="edit-remove-tr" title="Remove selecte item">&times;</a></td>
								<td class="td-hostname"><input type="text" class="add_hostname" name="edit_hostname" value="" placeholder="Hostname"></td>
								<td class="td-location">
									<select class="add_location" name="edit_location">
										<option value="" selected disabled>-</option>
										<option value="1">BSC</option>
										<option value="2">OCC</option>
										<option value="3">NRTH-LZN</option>
										<option value="4">VIZ-MIN</option>
										<option value="5">Others</option>
									</select>
								</td>
								<td class="td-department">
									<select class="add_department" name="edit_department">
										<option value="" selected disabled>-</option>
										<option value="1">ITSD</option>
										<option value="2">G.A.D</option>
										<option value="3">Finance</option>
									</select>
								</td>
								<td class="td-ip"><input type="text" class="add_ip" name="edit_ip" value="" placeholder="IP address"></td>
								<td class="td-serial"><input type="text" class="add_serial" name="edit_serial" value="" placeholder="Serial number"></td>
								<td class="td-mac"><input type="text" class="add_mac" name="edit_mac" value="" placeholder="Mac address"></td>
								<td class="td-lastname"><input type="text" class="add_lastname" name="edit_lastname" value="" placeholder="Lastname"></td>
								<td class="td-firstname"><input type="text" class="add_firstname" name="edit_firstname" value="" placeholder="Firstname"></td>
								<td class="td-middlename"><input type="text" class="add_middlename" name="edit_middlename" value="" placeholder="Middlename"></td>
								<td class="td-unit">
									<select class="add_unit" name="edit_unit">
										<option value="" selected disabled>-</option>
										<option value="1">Laptop</option>
										<option value="2">Desktop</option>
										<option value="3">Macbook</option>
										<option value="4">Android</option>
										<option value="5">Ipad/Iphone</option>
									</select>
								</td>
								<td class="td-ownership">
									<select class="add_ownership" name="edit_ownership">
										<option value="" selected disabled>-</option>
										<option value="1">CBCI</option>
										<option value="2">CFS</option>
									</select>
								</td>
								<td class="td-email"><input type="text" class="add_email" name="edit_email" value="" placeholder="Email address"></td>
								<td class="td-employmentstatus">
									<select class="add_employmentstatus" name="edit_employmentstatus">
										<option value="1">Active</option>
										<option value="2">Resigned</option>
									</select>
								</td>
								<td class="td-assetstatus">
									<select class="add_assetstatus" name="edit_assetstatus">
										<option value="1">Active</option>
										<option value="2">Resigned</option>
									</select>
								</td>
								<td class="td-os">
									<select class="add_os" name="edit_os">
										<option value="" selected disabled>-</option>
										<option value="1">WINDOWS 10</option>
										<option value="2">WINDOWS 8.1</option>
										<option value="3">WINDOWS 8</option>
										<option value="4">WINDOWS 7</option>
										<option value="5">WINDOWS XP</option>
										<option value="6">MAC OS</option>
									</select>
								</td>
								<td class="td-cpu"><input type="text" class="add_cpu" name="edit_cpu" value=""  placeholder="cpu i3,i5,i7 9th"></td>
								<td class="td-ram">
									<select class="add_ram" name="edit_ram">
										<option selected disabled>-</option>
										<option value="1GB">1GB</option>
										<option value="2GB">2GB</option>
										<option value="3GB">3GB</option>
										<option value="4GB">4GB</option>
										<option value="6GB">6GB</option>
										<option value="8GB">8GB</option>
										<option value="16GB">16GB</option>
										<option value="32GB">32GB</option>
									</select>
								</td>
								<td class="td-hdd">
									<select class="add_hdd" name="edit_hdd">
										<option value="" selected disabled>-</option>
										<option value="120GB">120GB</option>
										<option value="250GB">250GB</option>
										<option value="500GB">500GB</option>
										<option value="1TB">1TB</option>
										<option value="2TB">2TB</option>
									</select>
								</td>
								<td class="td-ssd">
									<select class="add_ssd" name="edit_ssd">
										<option value="" selected disabled>-</option>
										<option value="120GB">120GB</option>
										<option value="250GB">250GB</option>
										<option value="500GB">500GB</option>
										<option value="1TB">1TB</option>
										<option value="2TB">2TB</option>
									</select>
								</td>
								<td class="td-brand">
									<select class="add_brand" name="edit_brand">
										<option value="" selected disabled>-</option>
										<option value="Acer">Acer</option>
										<option value="Toshiba">Toshiba</option>
										<option value="Dell">Dell</option>
										<option value="Mac">Mac</option>
										<option value="Samsung">Samsung</option>
										<option value="LG">LG</option>
										<option value="Others">Others</option>
									</select>
								</td>
								
								
								<td class="td-apexperm check-box"><input name="apexperm" class="td-check add_apexperm" type="checkbox" ></td>
								<td class="td-apexcloud check-box"><input name="apexcloud" class="td-check add_apexcloud" type="checkbox" ></td>
								<td class="td-checkpoint check-box"><input name="checkpoint" class="td-check add_checkpoint" type="checkbox" ></td>
								<td class="td-cynet check-box"><input name="cynet" class="td-check add_cynet" type="checkbox" ></td>
								<td class="td-officescan check-box"><input name="officescan" class="td-check add_officescan" type="checkbox" ></td>
								<td class="td-rapid check-box"><input name="rapid" class="td-check add_rapid" type="checkbox" ></td>
								<td class="td-verified check-box"><input name="verified" class="td-check add_verified" type="checkbox" ></td>
								<td class="td-cyber"><input name="cyber" class="td-check add_cyber" type="checkbox" ></td>
								<td class="td-datereleased"><input type="date" class="add_datereleased" name="edit_datereleased" value="1990-01-20"></td>
								<td class="td-add-remarks"><button  class="td-add-remarks-button">...</button></td>
								<td class="td-remarks"><textarea class="td_comments" name="td_comments"></textarea></td>
								<td class="td-remarks"><textarea class="td_remarks" name="td_remarks"></textarea></td>
								<td class="td-remarks"><textarea class="td_notes" name="td_notes"></textarea></td>
							</tr>
							
							
							
							
						
						</tbody>
						<!-- END OF TBODY -->

					</table>
					<!-- FOR ADDING ROWS or ITEM -->
						<div class="add-entry-buttons">
							<button class="add-entry-list-button" title="Add new item">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
								  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
								  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
								</svg>
							</button>
							<button class="add-entry-copy-button" title="Duplicate last row">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-node-plus" viewBox="0 0 16 16">
								  <path fill-rule="evenodd" d="M11 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM6.025 7.5a5 5 0 1 1 0 1H4A1.5 1.5 0 0 1 2.5 10h-1A1.5 1.5 0 0 1 0 8.5v-1A1.5 1.5 0 0 1 1.5 6h1A1.5 1.5 0 0 1 4 7.5h2.025zM11 5a.5.5 0 0 1 .5.5v2h2a.5.5 0 0 1 0 1h-2v2a.5.5 0 0 1-1 0v-2h-2a.5.5 0 0 1 0-1h2v-2A.5.5 0 0 1 11 5zM1.5 7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"/>
								</svg>
							</button>
						</div>
										
				</div>
				
				<div class="add-entry-submit-container">
					<button class="add-entry-submit">
						SUBMIT
					</button>
				</div>
				
				<!--
				<div class="remarks-pop-container">
					<div class="pop-container-remarks">
						<div class="pop-container-remarks-a">
							<ul>
								<li class="comment-pop-button selected">Comment</li>
								<li class="remarks-pop-button">Remarks</li>
								<li class="notes-pop-button">Notes</li>
							</ul>
							<div class="pop-container-remarks-a-details">
								<p>BCLCOM-23</p>
							</div>
						</div>
						<div class="pop-container-remarks-b">
							<textarea class="remarks-pop-comment show" placeholder="Comment here..."></textarea>
							<textarea class="remarks-pop-remarks" placeholder="Remarks here..."></textarea>
							<textarea class="remarks-pop-notes" placeholder="Notes here..."></textarea>
						
						</div>
					</div>
				</div>
				-->
				
			</div>
		
		`;
		
		this._activateAddButtons();
		/* Invoke remarks Button you can callback this*/
		this.popRemarksEdit();
		/* Invoke Submit Button */
		this._submitButton();
		/* Display Hostname */
		this._diplayHostname();
	}
	
	
	/* Activate Buttons for ADDING and DUPPLICATING ROWS */
	_activateAddButtons(){
		/* invoke option */
		this._selectOption();
		/* Invoke remove function */
		this._removeItem();
		const tbody1 = document.querySelector(".add-tbody1");
		const addFresh = document.querySelector(".add-entry-list-button");
		addFresh.addEventListener("click", e => {
			/* create new element TR */
			let newTr = document.createElement("TR");
			newTr.classList.add("hide");
			newTr.innerHTML = `
				<tr>
					<td class="check-box td-check-select"><a href="javascript:void(0);" class="edit-remove-tr" title="Remove selecte item">&times;</a></td>
					<td class="td-hostname"><input type="text" class="add_hostname" name="edit_hostname" value="" placeholder="Hostname"></td>
					<td class="td-location">
						<select class="add_location" name="edit_location">
							<option value="" selected disabled>-</option>
							<option value="1">BSC</option>
							<option value="2">OCC</option>
							<option value="3">NRTH-LZN</option>
							<option value="4">VIZ-MIN</option>
							<option value="5">Others</option>
						</select>
					</td>
					<td class="td-department">
						<select class="add_department" name="edit_department">
							<option value="" selected disabled>-</option>
							<option value="1">ITSD</option>
							<option value="2">G.A.D</option>
							<option value="3">Finance</option>
						</select>
					</td>
					<td class="td-ip"><input type="text" class="add_ip" name="edit_ip" value="" placeholder="IP address"></td>
					<td class="td-serial"><input type="text" class="add_serial" name="edit_serial" value="" placeholder="Serial number"></td>
					<td class="td-mac"><input type="text" class="add_mac" name="edit_mac" value="" placeholder="Mac address"></td>
					<td class="td-lastname"><input type="text" class="add_lastname" name="edit_lastname" value="" placeholder="Lastname"></td>
					<td class="td-firstname"><input type="text" class="add_firstname" name="edit_firstname" value="" placeholder="Firstname"></td>
					<td class="td-middlename"><input type="text" class="add_middlename" name="edit_middlename" value="" placeholder="Middlename"></td>
					<td class="td-unit">
						<select class="add_unit" name="edit_unit">
							<option value="" selected disabled>-</option>
							<option value="1">Laptop</option>
							<option value="2">Desktop</option>
							<option value="3">Macbook</option>
							<option value="4">Android</option>
							<option value="5">Ipad/Iphone</option>
						</select>
					</td>
					<td class="td-ownership">
						<select class="add_ownership" name="edit_ownership">
							<option value="" selected disabled>-</option>
							<option value="1">CBCI</option>
							<option value="2">CFS</option>
						</select>
					</td>
					<td class="td-email"><input type="text" class="add_email" name="edit_email" value="" placeholder="Email address"></td>
					<td class="td-employmentstatus">
						<select class="add_employmentstatus" name="edit_employmentstatus">
							<option value="1">Active</option>
							<option value="2">Resigned</option>
						</select>
					</td>
					<td class="td-assetstatus">
						<select class="add_assetstatus" name="edit_assetstatus">
							<option value="1">Active</option>
							<option value="2">Resigned</option>
						</select>
					</td>
					<td class="td-os">
						<select class="add_os" name="edit_os">
							<option value="" selected disabled>-</option>
							<option value="1">WINDOWS 10</option>
							<option value="2">WINDOWS 8.1</option>
							<option value="3">WINDOWS 8</option>
							<option value="4">WINDOWS 7</option>
							<option value="5">WINDOWS XP</option>
							<option value="6">MAC OS</option>
						</select>
					</td>
					<td class="td-cpu"><input type="text" class="add_cpu" name="edit_cpu" value=""  placeholder="cpu i3,i5,i7 9th"></td>
					<td class="td-ram">
						<select class="add_ram" name="edit_ram">
							<option selected disabled>-</option>
							<option value="1GB">1GB</option>
							<option value="2GB">2GB</option>
							<option value="3GB">3GB</option>
							<option value="4GB">4GB</option>
							<option value="6GB">6GB</option>
							<option value="8GB">8GB</option>
							<option value="16GB">16GB</option>
							<option value="32GB">32GB</option>
						</select>
					</td>
					<td class="td-hdd">
						<select class="add_hdd" name="edit_hdd">
							<option value="" selected disabled>-</option>
							<option value="120GB">120GB</option>
							<option value="250GB">250GB</option>
							<option value="500GB">500GB</option>
							<option value="1TB">1TB</option>
							<option value="2TB">2TB</option>
						</select>
					</td>
					<td class="td-ssd">
						<select class="add_ssd" name="edit_ssd">
							<option value="" selected disabled>-</option>
							<option value="120GB">120GB</option>
							<option value="250GB">250GB</option>
							<option value="500GB">500GB</option>
							<option value="1TB">1TB</option>
							<option value="2TB">2TB</option>
						</select>
					</td>
					<td class="td-brand">
						<select class="add_brand" name="edit_brand">
							<option value="" selected disabled>-</option>
							<option value="Acer">Acer</option>
							<option value="Toshiba">Toshiba</option>
							<option value="Dell">Dell</option>
							<option value="Mac">Mac</option>
							<option value="Samsung">Samsung</option>
							<option value="LG">LG</option>
							<option value="Others">Others</option>
						</select>
					</td>
					
					
					<td class="td-apexperm check-box"><input name="apexperm" class="td-check add_apexperm" type="checkbox" ></td>
					<td class="td-apexcloud check-box"><input name="apexcloud" class="td-check add_apexcloud" type="checkbox" ></td>
					<td class="td-checkpoint check-box"><input name="checkpoint" class="td-check add_checkpoint" type="checkbox" ></td>
					<td class="td-cynet check-box"><input name="cynet" class="td-check add_cynet" type="checkbox" ></td>
					<td class="td-officescan check-box"><input name="officescan" class="td-check add_officescan" type="checkbox" ></td>
					<td class="td-rapid check-box"><input name="rapid" class="td-check add_rapid" type="checkbox" ></td>
					<td class="td-verified check-box"><input name="verified" class="td-check add_verified" type="checkbox" ></td>
					<td class="td-cyber"><input name="cyber" class="td-check add_cyber" type="checkbox" ></td>
					<td class="td-datereleased"><input type="date" class="add_datereleased" name="edit_datereleased" value="1990-01-20"></td>
					<td class="td-add-remarks"><button  class="td-add-remarks-button">...</button></td>
					<td class="td-remarks"><textarea class="td_comments" name="td_comments"></textarea></td>
					<td class="td-remarks"><textarea class="td_remarks" name="td_remarks"></textarea></td>
					<td class="td-remarks"><textarea class="td_notes" name="td_notes"></textarea></td>
				
				</tr>
			`;
			
			setTimeout(() => newTr.classList.remove("hide"),100);
			/* insert new TR to tbody */
			tbody1.appendChild(newTr);
			/* Invoke option function */
			this._selectOption();
			/* Invoke remove function */
			this._removeItem();
			/* Invoke remarks Button */
			this.popRemarksEdit();
			/* Display Hostname */
			this._diplayHostname();
			
		});
		
		
		/* Duplicate Last Row Function */
		const addDuplicate = document.querySelector(".add-entry-copy-button");
		addDuplicate.addEventListener("click", e => {
			const allItemRows = document.querySelectorAll(".add-tbody1 tr");
			let lastRow = tbody1.lastElementChild;
			/* Clone last row */
			tbody1.appendChild(lastRow.cloneNode(true));
			/* Invoke option function */
			this._selectOption();
			/* Invoke remove function */
			this._removeItem();
			/* Invoke remarks Button */
			this.popRemarksEdit();
			/* Display Hostname */
			this._diplayHostname();
		});
		
		
	}
	
	/* Since cloneNode does not include selected option when cloning, I have to put selected in each option to reflect when append */
	_selectOption(){
		const selectOptions = document.querySelectorAll(".add-tbody1 select");
		selectOptions.forEach(option => {
			option.addEventListener("change",e => {
				[...e.target.children].forEach(opt => opt.removeAttribute("selected"));
				e.target.children[e.target.selectedIndex].setAttribute("selected","");
				// console.log(newAr);
			});
		});
	}
	
	
	/* Remove ROW allways call this whenever new row is added */
	_removeItem(){
		const rowItem = document.querySelectorAll(".edit-remove-tr");
		rowItem.forEach(row => {
			//row.addEventListener("click",
			row.onclick = e => {
				let targs = e.target;
				
				/* loop through parentNode and stop when TR tag is selected 
					Timeout set for animation
				*/
				for(let i = 0; i < 5; i++){
					if(targs.tagName === "TR"){
						targs.classList.add("hide")
						/* remove node */
						setTimeout(() => targs.remove() ,300);
						break;
					}
					targs = targs.parentNode;
				}
				setTimeout(() => {
					if((document.querySelectorAll(".edit-remove-tr").length) === 0){
						try{
							document.querySelector(".modal-container").remove();
							/* toggle Panel Table */
							const tableContainer = document.querySelector(".content-table");
							tableContainer.classList.contains("modalOpen") ? tableContainer.classList.remove("modalOpen") : tableContainer.classList.add("modalOpen");
						}catch(err){
							/* Empty */
						}
					}
					/* Display Hostname */
					this._diplayHostname();
				}, 300);
				
			};
			
			
		});
		// console.log(typeof rowItem);
	}
	
	
	/* THE SUBMIT BUTTON, this includes validation, necessary information highlights */
	_submitButton(){
		const submitButton = document.querySelector(".add-entry-submit");
		submitButton.addEventListener("click", e => {
			isNameValid();
			// console.log(isNameValid());
		});
		
		/* returns bool */
		function isNameValid(){
			let errCount = 0;
			/* loop through hostnames  */
			const hostName = document.querySelectorAll(".add_hostname"),
					lastName = document.querySelectorAll(".add_lastname"),
					firstName = document.querySelectorAll(".add_firstname"),
					addLocation = document.querySelectorAll(".add_location"),
					addUnit = document.querySelectorAll(".add_unit"),
					addOwnership = document.querySelectorAll(".add_ownership");
					
			let fieldNodes = [...hostName,...lastName,...firstName,...addLocation,...addUnit,...addOwnership];
			
			fieldNodes.forEach(e => {
				/* if tagName is input */
				if(e.tagName === "INPUT"){
					if(e.value.trim() === "") errCount++;
				}
				if(e.tagName === "SELECT"){
					if(e.value == 0 || e.value === "") errCount++;
				}
			}); 
			
			// return hostName;
			if(errCount > 0){
				console.log(errCount);
				hightlightNecessaryField(fieldNodes);
			}
		}
		
		/* If invalid hightlight field needed to be filled */
		function hightlightNecessaryField(fieldNodes){
			fieldNodes.forEach(e => {
				if(e.tagName === "INPUT"){
					if(e.value.trim() === "") e.setAttribute("style", "background-color: #f7c1c1; transition: .3s all ease-in-out;");
				}
				if(e.tagName === "SELECT"){
					if(e.value == 0 || e.value === "") e.setAttribute("style", "background-color: #f7c1c1; transition: .3s all ease-in-out;");
				}
				
			});
			console.log(fieldNodes);
		}
		
			
	}
	
	/* Invoke modal pop for remarks */
	popRemarksEdit(){
		let btn = document.querySelectorAll(".td-add-remarks-button");
		// console.log("td-add-remarks-button");
		btn.forEach(item => {
			item.onclick = function (e){
						
						/* DISPLAY EXISTING Value when opening remarks */
						const allTd = e.target.parentNode.parentNode.children;
						let _comments = "";
						let _remarks = "";
						let _notes = "";
						let _hostname = "";
						/* convert from object/nodes to array Object.values */
						Object.values(allTd).forEach(dataTd => {
							//only select children with td-remarks classname
							if(dataTd.classList.contains("td-remarks")){
								let _textarea = dataTd.lastElementChild;
								if(_textarea.classList.contains("td_comments")) _comments = _textarea.value;
								if(_textarea.classList.contains("td_remarks")) _remarks = _textarea.value;
								if(_textarea.classList.contains("td_notes")) _notes = _textarea.value;
							}
							
							if(dataTd.classList.contains("td-hostname")){
								_hostname = dataTd.lastElementChild.value;
							}
						});
						/* End display value */
						
						
						let newDiv = document.createElement("DIV");
						newDiv.setAttribute("class","remarks-pop-container");
						newDiv.innerHTML = `
							<div class="pop-container-remarks">
								<div class="pop-container-remarks-a">
									<ul>
										<li class="comment-pop-button c-p-comment selected">Comment</li>
										<li class="remarks-pop-button c-p-remarks">Remarks</li>
										<li class="notes-pop-button c-p-notes">Notes</li>
										<li class="ok-pop-button">OK</li>
									</ul>
									<div class="pop-container-remarks-a-details">
										<p>${_hostname}</p>
									</div>
								</div>
								<div class="pop-container-remarks-b">
									<textarea class="remarks-pop-comment show" placeholder="Comment here...">${_comments}</textarea>
									<textarea class="remarks-pop-remarks" placeholder="Remarks here...">${_remarks}</textarea>
									<textarea class="remarks-pop-notes" placeholder="Notes here...">${_notes}</textarea>
								
								</div>
							</div>
						`;
						
						//e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild(newDiv);
						
						let etargs = e.target;
						for(let i = 0; i < 10 ;i++){
							if(etargs.classList.contains("modal-data-container")){
								//console.log(etargs);
								etargs.appendChild(newDiv);
								break;
							}
							etargs = etargs.parentNode;
						}
						/* Activate activeTab */
						activeTab();
						/* Activate close button */
						closeTab();
						/* Activate ok button */
						submitInput(e.target);
					};
					
					function activeTab(){
						const allBtn = document.querySelectorAll(".pop-container-remarks-a > ul > li");
						const allTextarea = document.querySelectorAll(".pop-container-remarks-b > textarea");
						allBtn.forEach(btn =>{
							btn.onclick = (e) => {
								// console.log(e.target);
								/* remove all btn in */
								allBtn.forEach(f => {
									f.classList.contains("selected") ? f.classList.remove("selected") : null ;
								});
								/* Add selected button class=selected for effects */
								e.target.classList.add("selected");
								
								/* All text area remove classname "show" */
								allTextarea.forEach(g => {
									/* when user clicked close button return */
									if(e.target.classList.contains("ok-pop-button")) return;
									
									g.classList.remove("show");
									
									/* Toggle textarea */
									if(e.target.classList.contains("comment-pop-button")) document.querySelector(".remarks-pop-comment").classList.add("show");
									if(e.target.classList.contains("remarks-pop-button")) document.querySelector(".remarks-pop-remarks").classList.add("show");
									if(e.target.classList.contains("notes-pop-button")) document.querySelector(".remarks-pop-notes").classList.add("show");
									
								}); 
								
							};							
						});
						
						
					}
					
					/* FUnction to close comment */
					function closeTab(){
						const remarksPopContainer = document.querySelector(".remarks-pop-container");
						remarksPopContainer.onclick = (e) => {
							if(!e.target.classList.contains("remarks-pop-container")) return;
							e.target.remove();
						}
					}
					
					/* Function submit input */
					function submitInput(obj){
						const okBtn = document.querySelector(".ok-pop-button");
						const allTextarea = document.querySelectorAll(".pop-container-remarks-b > textarea");
						const objTdata = obj.parentNode.parentNode.children;
						okBtn.onclick = (e) => {							
							//console.log(e.target.parentNode.parentNode.parentNode);
							/* Loop thtrough all TR TD with child textarea */
							Object.values(objTdata).forEach(objData => {
								if(objData.classList.contains("td-remarks")){
									if(objData.lastElementChild.classList.contains("td_comments")){										
										allTextarea.forEach(textareas => {
											if(textareas.classList.contains("remarks-pop-comment")){
												objData.lastElementChild.value = textareas.value;
												//console.log(textareas.value);
											};
										});
									}
								}
								
								if(objData.classList.contains("td-remarks")){
									if(objData.lastElementChild.classList.contains("td_remarks")){										
										allTextarea.forEach(textareas => {
											if(textareas.classList.contains("remarks-pop-remarks")){
												objData.lastElementChild.value = textareas.value;
												//console.log(textareas.value);
											};
										});
									}
								}
								
								if(objData.classList.contains("td-remarks")){
									if(objData.lastElementChild.classList.contains("td_notes")){										
										allTextarea.forEach(textareas => {
											if(textareas.classList.contains("remarks-pop-notes")){
												objData.lastElementChild.value = textareas.value;
												//console.log(textareas.value);
											};
										});
									}
								}
								
							});
							//console.log(Object.values(objTdata));
							document.querySelector(".remarks-pop-container").remove();
						};
					}
					
					
		});

	}
	

	/* inv func Display Hostname */
	_diplayHostname(){
		const allTr = document.querySelectorAll(".modal-data-edit-table > table > tbody > tr");
		Object.values(allTr).forEach(td => {
			td.onmouseenter = (e) => {
				Object.values(td.children).forEach(tdata => {
					if(tdata.classList.contains("td-hostname")){
						document.querySelector(".add-disp-hostname").innerHTML = tdata.lastElementChild.value;
						//console.log(tdata.lastElementChild.value);
					}
				})
			}
		});
	}






}


class DisplayHostname{
	constructor(node){
		this.displayHostname = document.querySelector("#hostname-disp");
		this.selectedNode = node;
	}
	
	hoverDisplay(){
		for(let item of this.selectedNode.children){
			if(item.classList.contains("td-hostname")){
				this.displayHostname.innerHTML = item.firstChild.innerText;
				//console.log(item.firstChild.innerText);
			}
		}
	}
	
	removeHostnameDisplay(){
		this.displayHostname.innerHTML = "";
	}
	
}



/*
	FOR FUNCTIONS IN FILTER
*/




/* 
<div class="remarks-pop-container">
					<div class="pop-container-remarks">
						<div class="pop-container-remarks-a">
							<ul>
								<li class="comment-pop-button selected">Comment</li>
								<li class="remarks-pop-button">Remarks</li>
								<li class="notes-pop-button">Notes</li>
							</ul>
							<div class="pop-container-remarks-a-details">
								<p>BCLCOM-23</p>
							</div>
						</div>
						<div class="pop-container-remarks-b">
							<textarea class="remarks-pop-comment show" placeholder="Comment here..."></textarea>
							<textarea class="remarks-pop-remarks" placeholder="Remarks here..."></textarea>
							<textarea class="remarks-pop-notes" placeholder="Notes here..."></textarea>
						
						</div>
					</div>
				</div>

 */



