class IngamePanelCustomPanel extends TemplateElement {
    constructor() {
        super();
    }
    get templateID() {
        return "HelloWorldDisplay_ID";
    }
    Init() {
		
		
    }
	
    connectedCallback() {
        super.connectedCallback();
		
		// initialisaties nieuwe stijl
		let dayDawnNight = 0;						// 0 = dawn/dusk, 1 = day, 3 is nacht
		let dayDawnNightDisplay = "null";
		let dayNightBoolean = 0;					// 0 = dag, 1 = nacht.
		//
		
		const myTable01Element = document.getElementById("myTable01");
			const Table01Element = document.createElement("table");
			Table01Element.setAttribute("id", "myTable01");
			setInterval(function() {
				// ophalen simvars, afronding en eventueel een berekening
				//
				// Bovenste blok, primary flight data
				// ==================================
				//
				let currentHeading =
				SimVar.GetSimVarValue("PLANE HEADING DEGREES MAGNETIC", "degrees");
				let currentHeadingDisplay = currentHeading.toFixed(0);
				//
				let currentAltitudeAsl =
				SimVar.GetSimVarValue("INDICATED ALTITUDE", "meter");
				currentAltitudeAsl = currentAltitudeAsl.toFixed(0);
				//
				let currentAltitudeAgl =
				SimVar.GetSimVarValue("PLANE ALT ABOVE GROUND", "meter") - 0.2953;
				currentAltitudeAgl = currentAltitudeAgl.toFixed(0);
				//				
				let indicatedAirSpeed = 
				SimVar.GetSimVarValue("AIRSPEED INDICATED", "kilometer per hour");
				indicatedAirSpeed = indicatedAirSpeed.toFixed(0);
				//
				let verticalSpeed = 
				SimVar.GetSimVarValue("VERTICAL SPEED", "meter per minute");
				verticalSpeed = verticalSpeed.toFixed(0);
				//
				let verticalSpeedPerSec =
				SimVar.GetSimVarValue("VERTICAL SPEED", "m/s");
				verticalSpeedPerSec = verticalSpeedPerSec.toFixed(1);
				//
				// Tweede blok met de gegevens van NAV1
				// ====================================
				//
				// Ophalen van de simvars van het navigatie blok
				// voor de relative heading nog een stukje code om de richting
				// om te rekenen naar een waarde tussen de 0 en 360 graden.
				//								
				let nav1Ident = SimVar.GetSimVarValue("NAV IDENT:1", "string");
				let nav1Freq = SimVar.GetSimVarValue("NAV ACTIVE FREQUENCY:1", "MHz");
				let nav1HasNav = SimVar.GetSimVarValue("NAV HAS NAV:1", "bool");
				let nav1DME = SimVar.GetSimVarValue("NAV DME:1", "kilometer");
				let nav1Code = SimVar.GetSimVarValue("NAV CODES:1", "flags");
				
				let relativeHeadingToNav1 =
				SimVar.GetSimVarValue("NAV RELATIVE BEARING TO STATION:1", "degrees");
					let headingToNav1 = currentHeading + relativeHeadingToNav1;
					if (headingToNav1 < 0) {
						headingToNav1 = headingToNav1 + 360; 
						}
					if (headingToNav1 > 360) {
						headingToNav1 = headingToNav1 - 360;
						}

				//
				// Initialisatie van de weer te geven variabelen
				//
				//===========================================
				let nav1IdentDisplay = "null";
				let headingToNav1Display = "null";
				let nav1DmeDisplay = "null";
				let nav1CodeDecimalDisplay = "null";
				let nav1CodeBinaryDisplay = "null";
				//===============================================
				//
				// de volgende gegevens altijd weergeven
				let nav1FreqDisplay = nav1Freq.toFixed(2);
				nav1CodeDecimalDisplay = nav1Code.toFixed(0);
				nav1CodeBinaryDisplay = nav1Code.toString(2);
				//
				// de volgende gegevens alleen weergeven onder condities.
				//
				if (nav1Code == 32) {
					if (nav1HasNav == 1) {
						nav1IdentDisplay = nav1Ident;
						headingToNav1Display = headingToNav1.toFixed(0);
						nav1DmeDisplay = "noDME";
					}
				}
				if (nav1Code == 33) {
					if (nav1HasNav == 1) {
						nav1IdentDisplay = nav1Ident;
						headingToNav1Display = headingToNav1.toFixed(0);
						nav1DmeDisplay = nav1DME.toFixed(1);
					}
				}
				if (nav1Code == 35) {
					if (nav1HasNav == 1) {
						nav1IdentDisplay = nav1Ident;
						headingToNav1Display = headingToNav1.toFixed(0);
						nav1DmeDisplay = nav1DME.toFixed(1);
					}
				}
				if (nav1Code == 41) {
					if (nav1DME > 0.1) {
						nav1IdentDisplay = nav1Ident;
						headingToNav1Display = "no_Nav";
						nav1DmeDisplay = nav1DME.toFixed(1);
					}
				}
				if (nav1Code == 43) {
					if (nav1DME > 0.1) {
						nav1IdentDisplay = nav1Ident;
						headingToNav1Display = "no_Nav";
						nav1DmeDisplay = nav1DME.toFixed(1);
					}
				}
				//
				// Derde blok met extra gegevens
				// =============================
				//
				let elevatorTrimPercent =
				SimVar.GetSimVarValue("ELEVATOR TRIM PCT", "percent");
				elevatorTrimPercent = elevatorTrimPercent.toFixed(1);
				//
				let pitchNoseUp =
				SimVar.GetSimVarValue("ATTITUDE INDICATOR PITCH DEGREES", "degree");
				pitchNoseUp = pitchNoseUp * -1;
				pitchNoseUp = pitchNoseUp.toFixed(1);
				/*
				let aileronTrimPercent =
				SimVar.GetSimVarValue("AILERON TRIM PCT", "percent");
				aileronTrimPercent = aileronTrimPercent.toFixed(1);
				//
				let rudderTrimPercent =
				SimVar.GetSimVarValue("RUDDER TRIM PCT", "percent");
				rudderTrimPercent = rudderTrimPercent.toFixed(1);
				*/
				let trueAirSpeed =
				SimVar.GetSimVarValue("AIRSPEED TRUE", "kilometer per hour");
				trueAirSpeed = trueAirSpeed.toFixed(0);
				//
				let groundSpeed =
				SimVar.GetSimVarValue("GPS GROUND SPEED", "kilometer per hour");
				groundSpeed = groundSpeed.toFixed(0);
				// berekening van de VS voor een 2.4 degr descent path
				let verticalSpeed2_4DegreeDescent = "xxx";
				let verticalSpeed2_4DegreeDescentMtrSec = "xxx"
				// OLD: berekening van de VS voor een 3 degr descent path
				// if (verticalSpeed < -80) {					
				//	verticalSpeed3DegreeDescent = -0.9 * groundSpeed;
				//	verticalSpeed3DegreeDescent = verticalSpeed3DegreeDescent / 10;
				//	verticalSpeed3DegreeDescent = Math.round(verticalSpeed3DegreeDescent);
				//	verticalSpeed3DegreeDescent = verticalSpeed3DegreeDescent * 10;
				//	}
				if (verticalSpeed < -60) {					
					verticalSpeed2_4DegreeDescent = -0.6933 * groundSpeed;
					verticalSpeed2_4DegreeDescent = verticalSpeed2_4DegreeDescent.toFixed(0);
					verticalSpeed2_4DegreeDescentMtrSec = -0.6933 / 60 * groundSpeed;
					verticalSpeed2_4DegreeDescentMtrSec = verticalSpeed2_4DegreeDescentMtrSec.toFixed(1)
					}
				/*
				let fuelFlow_1 =
				SimVar.GetSimVarValue("ENG FUEL FLOW GPH:1", "gallon per hour");
				let fuelFlow_2 =
				SimVar.GetSimVarValue("ENG FUEL FLOW GPH:2", "gallon per hour");
				let fuelFlow_3 =
				SimVar.GetSimVarValue("ENG FUEL FLOW GPH:3", "gallon per hour");
				let fuelFlow_4 =
				SimVar.GetSimVarValue("ENG FUEL FLOW GPH:4", "gallon per hour");
				let fuelFlow_5 =
				SimVar.GetSimVarValue("ENG FUEL FLOW GPH:5", "gallon per hour");
				let fuelFlow_6 =
				SimVar.GetSimVarValue("ENG FUEL FLOW GPH:6", "gallon per hour");
				let	fuelFlow =
				fuelFlow_1 + fuelFlow_2 + fuelFlow_3 + fuelFlow_4 + fuelFlow_5 + fuelFlow_6
				fuelFlow = fuelFlow * 3.78541;
				fuelFlow = fuelFlow.toFixed(0);
				*/
				/*
				let litersPer100KMDisplay = "xxx";
				let litersPer100KM = 0
				if (trueAirSpeed > 120) {					
					litersPer100KM = fuelFlow / trueAirSpeed * 100;
					litersPer100KMDisplay = litersPer100KM.toFixed(0);
					}
				*/
				/*
				let engHrs_1 =
				SimVar.GetSimVarValue("GENERAL ENG HOBBS ELAPSED TIME:1", "hours");
				let engHrs_2 =
				SimVar.GetSimVarValue("GENERAL ENG HOBBS ELAPSED TIME:2", "hours");
				let engHrs_3 =
				SimVar.GetSimVarValue("GENERAL ENG HOBBS ELAPSED TIME:3", "hours");
				let engHrs_4 =
				SimVar.GetSimVarValue("GENERAL ENG HOBBS ELAPSED TIME:4", "hours");
				let engHrs_5 =
				SimVar.GetSimVarValue("GENERAL ENG HOBBS ELAPSED TIME:5", "hours");
				let engHrs_6 =
				SimVar.GetSimVarValue("GENERAL ENG HOBBS ELAPSED TIME:6", "hours");
				let engHrs =
				(engHrs_1 + engHrs_2 + engHrs_3 + engHrs_4 + engHrs_5 + engHrs_6) / 6;
				engHrs = engHrs.toFixed(1);
				*/
				let engMP_1 =
				SimVar.GetSimVarValue("ENG MANIFOLD PRESSURE:1", "centimeters of mercury");
				engMP_1 = engMP_1.toFixed(0);
				//
				let engRPM_1 =
				SimVar.GetSimVarValue("GENERAL ENG RPM:1", "rpm");
				engRPM_1 = engRPM_1.toFixed(0);
				//				
				// Controle van de variabele om te bepalen of het dag of nacht is.
				//
				dayDawnNight = SimVar.GetSimVarValue("E:TIME OF DAY", "enum");
					if (dayDawnNight == 1) {
						dayNightBoolean = 0;	//day
					} else {
						dayNightBoolean = 1;	//night
					}
				if (dayNightBoolean == 1) {
					//dayDawnNightDisplay = "Night";
					document.getElementById("Mainframe").style.backgroundColor = "#272727";
					document.getElementById("Mainframe").style.color = "#c83333";
				} else {
					//dayDawnNightDisplay = "Day";
					document.getElementById("Mainframe").style.backgroundColor = "#0000ff";
					document.getElementById("Mainframe").style.color = "#ffffff";
				}
				//
				//
				// Opbouwen van de string die de tabel vormt
				// =========================================
				//
				Table01Element.innerHTML =
				"<tr>" + 
					"<td>" + "HDG (gr_mgn): "  + "</td>" +
					"<td>" + currentHeadingDisplay + "</td>" +
					"<td>" + "|" + "</td>" +
				"</tr>" +
				"<tr>" + 
					"<td>" + "ALT&ensp;(mtr ASL): "  + "</td>" +
					"<td>" + currentAltitudeAsl + "</td>" +
					"<td>" + "|" + "</td>" +
					"<td>" + "(mtr AGL): "  + "</td>" +
					"<td>" + currentAltitudeAgl + "</td>" +
				"</tr>" +
				"</tr>" +
					"<td>" + "IAS&ensp;&nbsp;(km_hr): "  + "</td>" +
					"<td>" + indicatedAirSpeed + "</td>" +
					"<td>" + "|" + "</td>" +
				"</tr>" +	
				"<tr>" + 
					"<td>" + "VS&emsp;(mtr_min): "  + "</td>" +
					"<td>" + verticalSpeed + "</td>" +
					"<td>" + "|" + "</td>" +
					"<td>" + "VS 2.4d GS: "  + "</td>" +
					"<td>" + verticalSpeed2_4DegreeDescent + "</td>" +	
				"</tr>" +
				"<tr>" + 
					"<td>" + "VS&emsp;(mtr_sec): "  + "</td>" +
					"<td>" + verticalSpeedPerSec + "</td>" +
					"<td>" + "|" + "</td>" +
					"<td>" + "VS 2.4d GS: "  + "</td>" +
					"<td>" + verticalSpeed2_4DegreeDescentMtrSec + "</td>" +	
				"</tr>" +			
				"<tr>" + 
					"<td>" + "========="  + "</td>" +
					"<td>" + "====="  + "</td>" +
					"<td>" + "=" + "</td>" +
					"<td>" + "==="  + "</td>" +
				"</tr>" +
				"</tr>" +
					"<td>" + "NAV1 ID:"  + "</td>" +
					"<td>" + nav1IdentDisplay + "</td>" +
					"<td>" + "|" + "</td>" +
					"<td>" + "MHz:"  + "</td>" +
					"<td>" + nav1FreqDisplay + "</td>" +
				"</tr>" +
				"<tr>" + 
					"<td>" + "BRG to NAV1:"  + "</td>" +
					"<td>" + headingToNav1Display + "</td>" +
					"<td>" + "|" + "</td>" +
					"<td>" + "Code:"  + "</td>" +
					"<td>" + nav1CodeDecimalDisplay + "</td>" +
				"</tr>" +	
				"<tr>" + 
					"<td>" + "NAV1 DME (km):"  + "</td>" +
					"<td>" + nav1DmeDisplay + "</td>" +
					"<td>" + "|" + "</td>" +
					// "<td>" + "Binair:"  + "</td>" +
					// "<td>" + nav1CodeBinaryDisplay + "</td>" +
				"</tr>" +		
				"<tr>" + 
					"<td>" + "========="  + "</td>" +
					"<td>" + "====="  + "</td>" +
					"<td>" + "=" + "</td>" +
					"<td>" + "==="  + "</td>" +
				"</tr>" +
				"<tr>" + 
					"<td>" + "ELE&ensp;Trim (perc):"  + "</td>" +
					"<td>" + elevatorTrimPercent + "</td>" +
					"<td>" + "|" + "</td>" +
					"<td>" + "Pitch (degr)"  + "</td>" +
					"<td>" + pitchNoseUp + "</td>" +
				"</tr>" +
				"<tr>" +
					"<td>" + "TAS (km_hr):"  + "</td>" +
					"<td>" + trueAirSpeed + "</td>" +
					"<td>" + "|" + "</td>" +
					"<td>" + "GS (km_hr):"  + "</td>" +
					"<td>" + groundSpeed + "</td>" +
				"</tr>" +		
				"<tr>" + 
					"<td>" + "RPM1:"  + "</td>" +
					"<td>" + engRPM_1 + "</td>" +
					"<td>" + "|" + "</td>" +
					"<td>" + "MP1 (cmHg):"  + "</td>" +
					"<td>" + engMP_1 + "</td>" +
				"</tr>"
				/*
				"</tr>" +
				"<tr>" + 
					"<td>" + "Day_Night:"  + "</td>" +
					"<td>" + dayDawnNightDisplay + "</td>" +
					"<td>" + "|" + "</td>" +
				"</tr>"
				*/
				;
			}, 100);
			myTable01Element.appendChild(Table01Element);
			
	//
	// =================================================================
	// de onderstaande acollade hoort bij de functie connectedCallback()
    }
}
window.customElements.define("ingamepanel-custom", IngamePanelCustomPanel);
checkAutoload();