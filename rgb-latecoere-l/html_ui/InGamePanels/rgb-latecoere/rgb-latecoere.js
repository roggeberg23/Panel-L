class IngamePanelCustomPanel extends TemplateElement {
    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
		
		// initialisation
		//
		let currentHeading = 0;
		let currentHeadingDisplay = "null";
		let currentAltitudeAsl = 0;
		let currentAltitudeAslDisplay = "null";
		let currentAltitudeAgl = 0;
		let currentAltitudeAglDisplay = "null";
		let indicatedAirSpeed = 0;
		let indicatedAirSpeedDisplay = "null";
		let verticalSpeedPerMin = 0;
		let verticalSpeedPerMinDisplay = "null";
		let verticalSpeedPerSec = 0;
		let verticalSpeedPerSecDisplay = "null";
		//
		let nav1Ident = "null";
		let nav1IdentDisplay = "null";
		let nav1Freq = 0;
		let nav1FreqDisplay = "null";
		let nav1HasNav = 0;				// internal only, no "display" counterpart
		let nav1DME = 0;
		let nav1DmeDisplay = "null";
		let relativeHeadingToNav1 = 0;	// internal only, no "display" counterpart
		let headingToNav1 = 0;
		let headingToNav1Display = "null";
		let nav1Code = 0;
		let nav1CodeDecimalDisplay = "null";
		let nav1CodeBinaryDisplay = "null";
		//
		let elevatorTrimPercent = 0;
		let elevatorTrimPercentDisplay = "null";
		let pitchNoseUp = 0;
		let pitchNoseUpDisplay = "null";
		let trueAirSpeed = 0;
		let trueAirSpeedDisplay = "null";
		let groundSpeed = 0;
		let groundSpeedDisplay = "null";
		//
		let vertSpd2_4DegrDescPerMin = 0;
		let vertSpd2_4DegrDescPerSec = 0;
		let vertSpd2_4DegrDescPerMinDisplay = "null";
		let vertSpd2_4DegrDescPerSecDisplay = "null";
		//
		let engMP_4 = 0;
		let engMP_4_Display = "null";
		let engRPM_4 = 0;
		let engRPM_4_Display = "null";
		
		let tableStringDisplay = "null";
		//
		let dayDawnNight = 0;						// 0 = dawn/dusk, 1 = day, 3 is night
		let dayDawnNightDisplay = "null";
		let dayNightBoolean = 0;					// 0 = day colors, 1 = night colors
		//
		setInterval(function() {
			// Retrieve MSFS simulation variables;
			// if necessary perform calculations;
			// create the output table.
			//
			// Primary flight data
			// ===================
			//
			currentHeading =
			SimVar.GetSimVarValue("PLANE HEADING DEGREES MAGNETIC", "degrees");
			currentHeadingDisplay = currentHeading.toFixed(0);
			//
			currentAltitudeAsl =
			SimVar.GetSimVarValue("INDICATED ALTITUDE", "meter");
			currentAltitudeAslDisplay = currentAltitudeAsl.toFixed(0);
			//
			currentAltitudeAgl =
			SimVar.GetSimVarValue("PLANE ALT ABOVE GROUND", "meter") - 0.2953;
			currentAltitudeAglDisplay = currentAltitudeAgl.toFixed(0);
			//				
			indicatedAirSpeed = 
			SimVar.GetSimVarValue("AIRSPEED INDICATED", "kilometer per hour");
			indicatedAirSpeedDisplay = indicatedAirSpeed.toFixed(0);
			//
			verticalSpeedPerMin = 
			SimVar.GetSimVarValue("VERTICAL SPEED", "meter per minute");
			verticalSpeedPerMinDisplay = verticalSpeedPerMin.toFixed(0);
			//
			verticalSpeedPerSec =
			SimVar.GetSimVarValue("VERTICAL SPEED", "m/s");
			verticalSpeedPerSecDisplay = verticalSpeedPerSec.toFixed(1);
			//
			// NAV1 data
			// =========
			//
			// Retrieve NAV1 related simulation variables.
			// Calculation to normalize the relative heading
			// to a value between 000 and 360 degrees.
			// At every cycle NAV1 may become "out-of reach",
			// so at every interval the "display" variables are
			// set to "null".
			//								
			nav1Ident = SimVar.GetSimVarValue("NAV IDENT:1", "string");
			nav1Freq = SimVar.GetSimVarValue("NAV ACTIVE FREQUENCY:1", "MHz");
			nav1HasNav = SimVar.GetSimVarValue("NAV HAS NAV:1", "bool");
			nav1DME = SimVar.GetSimVarValue("NAV DME:1", "kilometer");
			nav1Code = SimVar.GetSimVarValue("NAV CODES:1", "flags");
			
			relativeHeadingToNav1 =
			SimVar.GetSimVarValue("NAV RELATIVE BEARING TO STATION:1", "degrees");
				headingToNav1 = currentHeading + relativeHeadingToNav1;
				if (headingToNav1 < 0) {
					headingToNav1 = headingToNav1 + 360; 
					}
				if (headingToNav1 > 360) {
					headingToNav1 = headingToNav1 - 360;
					}

			//
			// Initialisation of the "display" variables
			// at every new interval
			//===========================================
			nav1IdentDisplay = "null";
			nav1DmeDisplay = "null";
			headingToNav1Display = "null";
			nav1CodeDecimalDisplay = "null";
			nav1CodeBinaryDisplay = "null";
			//
			// Always show these
			nav1FreqDisplay = nav1Freq.toFixed(2);
			nav1CodeDecimalDisplay = nav1Code.toFixed(0);
			// nav1CodeBinaryDisplay = nav1Code.toString(2);
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
			// Extra flight related data
			// =========================
			//
			elevatorTrimPercent =
			SimVar.GetSimVarValue("ELEVATOR TRIM PCT", "percent");
			elevatorTrimPercentDisplay = elevatorTrimPercent.toFixed(1);
			//
			pitchNoseUp =
			SimVar.GetSimVarValue("ATTITUDE INDICATOR PITCH DEGREES", "degree");
			pitchNoseUp = pitchNoseUp * -1;
			pitchNoseUpDisplay = pitchNoseUp.toFixed(1);
			//
			trueAirSpeed =
			SimVar.GetSimVarValue("AIRSPEED TRUE", "kilometer per hour");
			trueAirSpeedDisplay = trueAirSpeed.toFixed(0);
			//
			groundSpeed =
			SimVar.GetSimVarValue("GPS GROUND SPEED", "kilometer per hour");
			groundSpeedDisplay = groundSpeed.toFixed(0);
			//
			// Use the GroundSpeed to calculate the 
			// VS needed to maintain a 2.4 degr descent path
			// Rule of thumb: descent 250 meters every 6 kilometer
			// - Divide Ground Speed by 60 minutes to get Distance Covered in one minute.
			// - Divide Distance Covered by 6 kilometer,  multiply with 250 meters
			// - Gives the vertical distance the aircraft has to descent at that GS.
			// Formula: -1 * ((GS/60) / 6) * 250 = -0.69444
			//
			vertSpd2_4DegrDescPerMinDisplay = "xxx";
			vertSpd2_4DegrDescPerSecDisplay = "xxx"
			if (verticalSpeedPerMin < -60) {					
				vertSpd2_4DegrDescPerMin = -0.69444 * groundSpeed;
				vertSpd2_4DegrDescPerMinDisplay = vertSpd2_4DegrDescPerMin.toFixed(0);
				vertSpd2_4DegrDescPerSec = -0.69444 / 60 * groundSpeed;
				vertSpd2_4DegrDescPerSecDisplay = vertSpd2_4DegrDescPerSec.toFixed(1)
				}
			//
			engMP_4 =
			SimVar.GetSimVarValue("ENG MANIFOLD PRESSURE:4", "centimeters of mercury");
			engMP_4_Display = engMP_4.toFixed(0);
			//
			engRPM_4 =
			SimVar.GetSimVarValue("GENERAL ENG RPM:4", "rpm");
			engRPM_4_Display = engRPM_4.toFixed(0);
			//				
			// Logic to check if panel must be shown in day colors
			// or night colors.
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
			// Creating the HTML string
			// ========================
			//
			
			tableStringDisplay =
			"<tr>" + 
				"<td>" + "HDG (gr_mgn): "  + "</td>" +
				"<td>" + currentHeadingDisplay + "</td>" +
				"<td>" + "|" + "</td>" +
			"</tr>" +
			"<tr>" + 
				"<td>" + "ALT&ensp;(mtr ASL): "  + "</td>" +
				"<td>" + currentAltitudeAslDisplay + "</td>" +
				"<td>" + "|" + "</td>" +
				"<td>" + "(mtr AGL): "  + "</td>" +
				"<td>" + currentAltitudeAglDisplay + "</td>" +
			"</tr>" +
			"</tr>" +
				"<td>" + "IAS&ensp;&nbsp;(km_hr): "  + "</td>" +
				"<td>" + indicatedAirSpeedDisplay + "</td>" +
				"<td>" + "|" + "</td>" +
			"</tr>" +	
			"<tr>" + 
				"<td>" + "VS&emsp;(mtr_min): "  + "</td>" +
				"<td>" + verticalSpeedPerMinDisplay + "</td>" +
				"<td>" + "|" + "</td>" +
				"<td>" + "VS 2.4d GS: "  + "</td>" +
				"<td>" + vertSpd2_4DegrDescPerMinDisplay + "</td>" +	
			"</tr>" +
			"<tr>" + 
				"<td>" + "VS&emsp;(mtr_sec): "  + "</td>" +
				"<td>" + verticalSpeedPerSecDisplay + "</td>" +
				"<td>" + "|" + "</td>" +
				"<td>" + "VS 2.4d GS: "  + "</td>" +
				"<td>" + vertSpd2_4DegrDescPerSecDisplay + "</td>" +	
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
				"<td>" + elevatorTrimPercentDisplay + "</td>" +
				"<td>" + "|" + "</td>" +
				"<td>" + "Pitch (degr)"  + "</td>" +
				"<td>" + pitchNoseUpDisplay + "</td>" +
			"</tr>" +
			"<tr>" +
				"<td>" + "TAS (km_hr):"  + "</td>" +
				"<td>" + trueAirSpeedDisplay + "</td>" +
				"<td>" + "|" + "</td>" +
				"<td>" + "GS (km_hr):"  + "</td>" +
				"<td>" + groundSpeedDisplay + "</td>" +
			"</tr>" +		
			"<tr>" + 
				"<td>" + "RPM4:"  + "</td>" +
				"<td>" + engRPM_4_Display + "</td>" +
				"<td>" + "|" + "</td>" +
				"<td>" + "MP4 (cmHg):"  + "</td>" +
				"<td>" + engMP_4_Display + "</td>" +
			"</tr>"
			/* Commented out. Only for testing purposes.
			"</tr>" +
			"<tr>" + 
				"<td>" + "Day_Night:"  + "</td>" +
				"<td>" + dayDawnNightDisplay + "</td>" +
				"<td>" + "|" + "</td>" +
			"</tr>"
			*/
			;
			document.getElementById("myTable01").innerHTML = tableStringDisplay;	
		}, 100);
		
			
	//
	// =================================================================
	// the curley bracket below belongs to the connectedCallback()
	// at line 6
    }
}
window.customElements.define("ingamepanel-custom", IngamePanelCustomPanel);
checkAutoload();