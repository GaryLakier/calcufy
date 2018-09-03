var sampleCan = {
  name: 'James Bond',
  jobTitle: 'Sr. Intelligence Analyst',
  client: 'Google',
  discountRate: '5',
  billRate: '55',
  compType: 'hourly',
  compRate: '20',
  vacDays: '10',
  empHealth: 'on',
  empDOB: 'July 1, 1977',
  spoHealth: 'off',
  // spoDOB: 'July 4, 1999',
  chiHealth: 'off',
  children: '4',
  dental: 'dentEmpSpo',
  vision: 'visFamily'
}

if (can === "") {
    $( '[name="can[name]"').val(sampleCan.name);
    $( '[name="can[jobTitle]"').val(sampleCan.jobTitle);
    $( '[name="can[client]"]').dropdown('set selected', sampleCan.client);
    $( '[name="can[discountRate]"').val(sampleCan.discountRate);
    $( '[name="can[billRate]"').val(sampleCan.billRate);
    $( '[value="hourly"]').prop('checked', true);
    $( '[name="can[compRate]"').val(sampleCan.compRate);
    $( '[name="can[vacDays]"').val(sampleCan.vacDays);
    $( '[name="can[empDOB]"').val(sampleCan.empDOB);
    $( '[name="can[spoDOB]"').val(sampleCan.spoDOB);
    
    $( '[name="can[chiHealth]"').val(sampleCan.chiHealth);
    $( '[name="can[children]"').val(sampleCan.children);
    $( '[name="can[dental]"]').dropdown('set selected', sampleCan.dental);
    $( '[name="can[vision]"]').dropdown('set selected', sampleCan.vision);
    
    //if else
    if (sampleCan.empHealth == "on") {
    	$( '[name="can[empHealth]"').prop('checked', true);
    	$( '[name="can[empHealth]"').parent().parent().next('.disabled.field.disabled-field').removeClass("disabled");
    }
    
    if (sampleCan.spoHealth == "on") {
    	$( '[name="can[spoHealth]"').prop('checked', true);
    	$( '[name="can[spoHealth]"').parent().parent().next('.disabled.field.disabled-field').removeClass("disabled");
    }
    
    if (sampleCan.chiHealth == "on") {
    	$( '[name="can[chiHealth]"').prop('checked', true);
    	$( '[name="can[chiHealth]"').parent().parent().next('.disabled.field.disabled-field').removeClass("disabled");
}
  
}
