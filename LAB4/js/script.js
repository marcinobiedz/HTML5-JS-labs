var URL = 'http://private-96a2-marcin199595.apiary-mock.com';
var classesTable = document.getElementById('classesTableId');
classesTable = classesTable.children[1];
var currentClasses;
//-------------------------------------
var modifiedRow;

function bodyLoad(){
	alert("In Chrome browser timepicker works much better :)");
	loadClassrooms();
	loadCurrentClasses();
};

function loadCurrentClasses(){
	var httpRequest = new XMLHttpRequest();
	httpRequest.open('GET',URL+'/classes',true);
	httpRequest.send(null);
	httpRequest.onreadystatechange = function (){
		if(httpRequest.readyState === 4 && httpRequest.status === 200){
			var resp = JSON.parse(httpRequest.responseText);
			currentClasses = resp.classes;
			refreshClassesTable(currentClasses,classesTable);
		}
	}
};

function removeClass(e){
	var Request = new XMLHttpRequest();
	var id = e.target.id;
	var tbody = e.target.parentElement.parentElement.parentElement;
	for (var i = 0; i < tbody.rows.length; i++) {
		if(id==tbody.rows[i].lastElementChild.firstElementChild.id){
			var toDelete = i;
			Request.open('DELETE',URL+'/classes');
			Request.setRequestHeader('Content-Type', 'application/json');
			Request.onreadystatechange = function () {
				if (this.readyState === 4 && this.status == 200) {
					var resp = JSON.parse(this.responseText);
					if(resp.server_response==1){
						tbody.deleteRow(toDelete);
						alert("Classes deleted");
					}
				}
			};
			var body = {
				'id': 1
			};
			Request.send(JSON.stringify(body));
		}
	}
};

function modifyClass(e){
	var row = e.target.parentElement.parentElement;
	modifiedRow = row;
	var dropdown = document.getElementById('modClassroom');
	var start = document.getElementById('modStart');
	var end = document.getElementById('modEnd');
	var subject = document.getElementById('modSubName');
	var button = document.getElementById('modSub');
	dropdown.value=row.children[0].innerHTML;
	dropdown.disabled=false;
	start.value=row.children[1].innerHTML;
	start.disabled=false;
	end.value=row.children[2].innerHTML;
	end.disabled=false;
	subject.value=row.children[3].innerHTML;
	subject.disabled=false;
	button.disabled=false;
};

function refreshClassesTable(classes, table){
	for (var i = 0; i < classes.length; i++) {
		var singleClass = classes[i];
		var row = table.insertRow();
		var cell1 = row.insertCell();
		var cell2 = row.insertCell();
		var cell3 = row.insertCell();
		var cell4 = row.insertCell();
		var cell5 = row.insertCell();
		var cell6 = row.insertCell();
		cell1.innerHTML = singleClass["classroom"];
		cell2.innerHTML = singleClass["start"];
		cell3.innerHTML = singleClass["end"];
		cell4.innerHTML = singleClass["subject"];
		var delButton = document.createElement("button");
		delButton.id=i;
		delButton.innerHTML="Delete";
		delButton.addEventListener("click", removeClass);
		var modifyButton = document.createElement("button");
		modifyButton.id=i;
		modifyButton.innerHTML="Modify";
		modifyButton.addEventListener("click", modifyClass);
		cell5.appendChild(modifyButton);
		cell6.appendChild(delButton);
	}
};

function loadClassrooms(){
	var httpRequest = new XMLHttpRequest();
	var classroomSelect = document.getElementById('classroomSelectId');
	var modClassroom = document.getElementById('modClassroom');
	httpRequest.open('GET',URL+'/classrooms',true);
	httpRequest.send(null);
	httpRequest.onreadystatechange = function (){
		if(httpRequest.readyState === 4 && httpRequest.status === 200){
			var resp = JSON.parse(httpRequest.responseText);
			for (var i = 0; i < resp.classrooms.length; i++) {
				var option = document.createElement("option");
				option.text="Classroom #"+resp.classrooms[i];
				option.value=resp.classrooms[i];
				classroomSelect.add(option);
			}
			for (var i = 0; i < resp.classrooms.length; i++) {
				var option = document.createElement("option");
				option.text="Classroom #"+resp.classrooms[i];
				option.value=resp.classrooms[i];
				modClassroom.add(option);
			}
		}
	}
};

function newClassSubmit(form){
	var classroom = form.firstElementChild.value;
	var startTime = form.children[2].value;
	var endTime = form.children[4].value;
	var subName = form.children[6].value;
	var lastId = classesTable.lastElementChild.lastElementChild.firstElementChild.id;
	var Request = new XMLHttpRequest();
	Request.open('POST', URL+'/classes');
	Request.setRequestHeader('Content-Type', 'application/json');
	Request.onreadystatechange = function () {
	  if (this.readyState === 4 && this.status===200) {
	  	var newRow = classesTable.insertRow();
		var cell1 = newRow.insertCell();
		cell1.innerHTML = classroom;
		var cell2 = newRow.insertCell();
		cell2.innerHTML = startTime;
		var cell3 = newRow.insertCell();
		cell3.innerHTML = endTime;
		var cell4 = newRow.insertCell();
		cell4.innerHTML = subName;
		var cell5 = newRow.insertCell();
		var modifyButton = document.createElement("button");
		modifyButton.id=lastId;
		modifyButton.innerHTML="Modify";
		modifyButton.addEventListener("click", modifyClass);
		cell5.appendChild(modifyButton);
		var cell6 = newRow.insertCell();
		var delButton = document.createElement("button");
		delButton.id=lastId;
		delButton.innerHTML="Delete";
		delButton.addEventListener("click", removeClass);
		cell6.appendChild(delButton);
	  }
	};
	var body = {
	  'classroom': 4,
	  'start': '14:00',
	  'end': '16:00',
	  'subject': 'English language'
	};
	Request.send(JSON.stringify(body));
	//----------------------------
	return false;
};

function modifySubmit(form){
	var Request = new XMLHttpRequest();
	Request.open('PUT', URL+'/classes');
	Request.setRequestHeader('Content-Type', 'application/json');
	Request.onreadystatechange = function () {
  	if (this.readyState === 4 && this.status === 200) {
			var resp = JSON.parse(this.responseText);
			if(resp.server_response==1){
				modifiedRow.children[0].innerHTML=form[0].value;
				modifiedRow.children[1].innerHTML=form[1].value;
				modifiedRow.children[2].innerHTML=form[2].value;
				modifiedRow.children[3].innerHTML=form[3].value;
				modifiedRow = undefined;
				var dropdown = document.getElementById('modClassroom');
				var start = document.getElementById('modStart');
				var end = document.getElementById('modEnd');
				var subject = document.getElementById('modSubName');
				var button = document.getElementById('modSub');
				dropdown.disabled=true;
				start.disabled=true;
				end.disabled=true;
				subject.disabled=true;
				button.disabled=true;
				alert("Classes modified!");
			}
  	}
	};
	var body = {
	  'id': 1,
	  'classroom': 4,
	  'start': '14:00',
	  'end': '16:00',
	  'subject': 'English language'
	};
	Request.send(JSON.stringify(body));
	//-----------------------------
	return false;
};
