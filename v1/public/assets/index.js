//enabled fields if checkbox is checked

$('input:checkbox').change(toggleDisabled);


function toggleDisabled(){
	if ($(this).is(":checked")) {
		$(this).parent().parent().parent().children('.disabled-field').removeClass("disabled");
	} else{
		$(this).parent().parent().parent().children('.disabled-field').addClass("disabled");
	}
};

//semantic dropodowns
$('.select-box')
  .dropdown()
;

//semantic calendar
$('.form-calendar').calendar({
	type:'date'
	});
	
//toggle collapsible sections
$(".expandEntryIcon").click(function(){
	$(this).parent("h3").next(".collapsible").slideToggle("slow", function(){
		$(this).prev("h3").children(".expandEntryIcon").toggleClass("fa-minus");
		$(this).prev("h3").children(".expandEntryIcon").toggleClass("fa-plus");
	})
	// $(this).toggleClass("fa-minus");
	// $(this).toggleClass("fa-plus");
});




//reload form based on original input ('can' comes from backend via ejs)
var can = JSON.parse(can)
console.log(can)

$( '[name="can[name]"').val(can.name);
$( '[name="can[jobTitle]"').val(can.jobTitle);
$( '[name="can[client]"]').dropdown('set selected', can.client);
$( '[name="can[discountRate]"').val(can.discountRate);
$( '[name="can[billRate]"').val(can.billRate);
$( '[name="can[empDOB]"').val(can.empDOB);
$( '[name="can[compRate]"').val(can.compRate);
$( '[name="can[vacDays]"').val(can.vacDays);
$( '[name="can[spoDOB]"').val(can.spoDOB);
$( '[name="can[chiHealth]"').val(can.chiHealth);
$( '[name="can[children]"').val(can.children);
$( '[name="can[dental]"]').dropdown('set selected', can.dental);
$( '[name="can[vision]"]').dropdown('set selected', can.vision);



//if else
if (can.compType === "hourly") {
	$( '[value="hourly"]').prop('checked', true);
} else if (can.compType === "salary"){
	$( '[value="salary"]').prop('checked', true);
}

//if else
if (can.empHealth == "on") {
	$( '[name="can[empHealth]"').prop('checked', true);
	$( '[name="can[empHealth]"').parent().parent().next('.disabled.field.disabled-field').removeClass("disabled");
}

if (can.spoHealth == "on") {
	$( '[name="can[spoHealth]"').prop('checked', true);
	$( '[name="can[spoHealth]"').parent().parent().next('.disabled.field.disabled-field').removeClass("disabled");
}

if (can.chiHealth == "on") {
	$( '[name="can[chiHealth]"').prop('checked', true);
	$( '[name="can[chiHealth]"').parent().parent().next('.disabled.field.disabled-field').removeClass("disabled");
}
