var timeDisplayEl = $('#current-time');
var projectDisplayEl = $('#project-list');
var projectModalEl = $('#project-modal');
var projectFormEl = $('#project-form');
var projectNameInputEl = $('#project-name-input');
var projectTypeInputEl = $('#project-type-input');
var hourlyRateInputEl = $('#hourly-rate-input');
var dueDateInputEl = $('#due-date-input');


function displayTime() {
  var rightNow = moment().format('DD MMM YYYY [at] hh:mm:ss a');
  timeDisplayEl.text(rightNow);
}


function printProjectData(name, type, hourlyRate, dueDate) {
  var projectRowEl = $('<tr>');

  var projectNameTdEl = $('<td>').addClass('p-2').text(name);

  var projectTypeTdEl = $('<td>').addClass('p-2').text(type);

  var rateTdEl = $('<td>').addClass('p-2').text(hourlyRate);

  var dueDateTdEl = $('<td>').addClass('p-2').text(dueDate);
/*
  var daysToDate = moment(dueDate, 'DD/MM/YY').diff(moment(), 'days');
  var daysLeftTdEl = $('<td>').addClass('p-2').text(daysToDate);

  var totalEarnings = calculateTotalEarnings(hourlyRate, daysToDate);


  var totalTdEl = $('<td>')
    .addClass('p-2')
    .text('$' + totalEarnings);
*/
  var deleteProjectBtn = $('<td>')
    .addClass('text-center m-3')
    .text('Delete');


  projectRowEl.append(
    projectNameTdEl,
    projectTypeTdEl,
    rateTdEl,
    dueDateTdEl,
    deleteProjectBtn
  );

  projectDisplayEl.append(projectRowEl);

  projectModalEl.modal('hide');
}

function calculateTotalEarnings(rate, days) {
  var dailyTotal = rate * 8;
  var total = dailyTotal * days;
  return total;
}

function handleDeleteProject(event) {
  console.log(event.target);
  var btnClicked = $(event.target);
  btnClicked.parent('tr').remove();
}


function handleProjectFormSubmit(event) {
  event.preventDefault();


  var projectName = projectNameInputEl.val().trim();
  var projectType = projectTypeInputEl.val().trim();
  var hourlyRate = hourlyRateInputEl.val().trim();
  var dueDate = dueDateInputEl.val().trim();


  var projectData = {
    name: projectName,
    type: projectType,
    hourlyRate: hourlyRate,
    dueDate: dueDate
  };
  
  var storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
  storedProjects.push(projectData);
  localStorage.setItem('projects', JSON.stringify(storedProjects));


  printProjectData(projectName, projectType, hourlyRate, dueDate);

  projectFormEl[0].reset();
}



projectFormEl.on('submit', handleProjectFormSubmit);

projectDisplayEl.on('click', '.delete-project-btn', handleDeleteProject);

dueDateInputEl.datepicker({ minDate: 1 });

setInterval(displayTime, 1000);



// get the projects data from local storage
var storedProjects = JSON.parse(localStorage.getItem('projects'));

// loop through the storedProjects array
for (var i = 0; i < storedProjects.length; i++) {
  var project = storedProjects[i];

  // extract the data from each project object
  var projectName = project.name;
  var projectType = project.type;
  var hourlyRate = project.hourlyRate;
  var dueDate = project.dueDate;

  // call the printProjectData function to display the data in the table
  printProjectData(projectName, projectType, hourlyRate, dueDate);
}
