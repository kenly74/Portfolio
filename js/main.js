document.addEventListener("DOMContentLoaded", function (){

	let body = document.querySelector("body")
	let html = document.querySelector("html")
	var val=0;
	console.log("scrolltop: "+html.scrollTop);

	/*Animation etoile ____________________________________________________*/
	var test=true;
	var n=500;//nombre d'étoile
	var w=0;//largeur
	var h=0;//hauteur
	var x=0;
	var y=0;
	var z=0;
	var etoile_color_ratio=0;
	var etoile_x_save,etoile_y_save;
	var etoile_ratio=250;
	var etoile_speed=2;
	var etoile=new Array(n);//chaque étoile est un tableau
	var opacity=0.11;
	var context;
	var timeout;

	function start_anim_home()
	{
		depart();
		anim();
	}

	function depart
	()
	{
		w=document.getElementById("anim-etoile").clientWidth;
		h=document.getElementById("anim-etoile").clientHeight;
		x=Math.round(w/2);
		y=Math.round(h/2);
		z=(w+h)/2;
		etoile_color_ratio=1/z;
		for(var i=0;i<n;i++)
		{
			etoile[i]=new Array(5);
			etoile[i][0]=Math.random()*w*2-x*2;
			etoile[i][1]=Math.random()*h*2-y*2;
			etoile[i][2]=Math.round(Math.random()*z);	
			etoile[i][3]=0;
			etoile[i][4]=0;		
		}
		var etoilefield=document.getElementById('etoilefield');
		etoilefield.width=w;
		etoilefield.height=h;
		context=etoilefield.getContext('2d');
		context.lineCap='round';
		context.fillStyle='rgba(0,0,0,'+opacity+')';
		context.strokeStyle='rgb(255,255,255)';
	}

	function anim()
	{
		context.fillRect(0,0,w,h);
		for(var i=0;i<n;i++)
		{
			test=true;
			etoile_x_save=etoile[i][3];
			etoile_y_save=etoile[i][4];
			
			etoile[i][2]-=etoile_speed; 
			etoile[i][3]=x+(etoile[i][0]/etoile[i][2])*etoile_ratio;
			etoile[i][4]=y+(etoile[i][1]/etoile[i][2])*etoile_ratio;

			//Test pour réinitialiser la profondeur de l'étoile
			if(etoile[i][2]>z) 
			{ 
				etoile[i][2]-=z; 
				test=false; 
			} 
			if(etoile[i][2]<0) 
			{ 
				etoile[i][2]+=z; 
				test=false; 
			}			
			
			if(etoile_x_save>0&&etoile_x_save<w&&etoile_y_save>0&&etoile_y_save<h&&test)
			{
				context.lineWidth=(1-etoile_color_ratio*etoile[i][2])*2;
				context.beginPath();
				context.moveTo(etoile_x_save,etoile_y_save);
				context.lineTo(etoile[i][3],etoile[i][4]);
				context.stroke();
				context.closePath();
			}
		}
		timeout=setTimeout(anim,0);
	}
	start_anim_home();
	window.onresize = depart; // réinitialise quand on change la taille par exemple avec F12

	/*____________________________________________________*/
	/*Event scroll*/
	window.addEventListener("scroll", function() {

		if (html.scrollTop > 80)
			document.querySelector("#up").style.display="block";//affiche bouton up
		else
		{
			document.querySelector("#up").style.display="none";//enleve bouton up
			clearcolorMenuD();
		}

		if (document.querySelector("#competence").getBoundingClientRect().y >= -60 && 
			val==0 &&
			document.querySelector("#competence").getBoundingClientRect().y <= 300)
		{
			val=1;
			skillBar();// dessine les skills bar	
		}

		for(let scroll of scrollsMenu)
		{
			if(document.querySelector(scroll.divDest).getBoundingClientRect().y>=-300 &&
				document.querySelector(scroll.divDest).getBoundingClientRect().y <=300)
			{
				clearcolorMenuD();

				document.querySelector(scroll.divetoilet).classList.add("activeM");
			}
		}
	});
	/*____________________________________________________*/
	var scrollsMenu = [
	{"divetoilet" : "#godesc","divDest" : "#description"},
	{"divetoilet" : "#gocomp","divDest" : "#competence"},
	{"divetoilet" : "#goExpForm","divDest" : "#experiences"},
	{"divetoilet" : "#goCont","divDest" : "#projects"}
	];

	/*bouton scroll vers le haut*/

	let scrollDestination = null;
	var limenu = document.querySelectorAll("#menu ul li");

	document.querySelector("#up").addEventListener("click", function() {
		scrollDestination = 0;
		
		var xx =setInterval(function() {

			if (Math.abs(html.scrollTop - scrollDestination) < 1)
				clearInterval(xx);

			if (scrollDestination != null)
				html.scrollTop -= (html.scrollTop - scrollDestination)/20;


		}, 10)
	});
	/*resize menu (pour le prof) =)*/
	window.addEventListener("resize", function() {
		if(window.matchMedia("(max-width: 1000px)").matches)
			document.querySelector("#menu").style.display="none";
		else
			document.querySelector("#menu").style.display="block";
	});
	/*bouton scroll menu*/
	for(let scroll of scrollsMenu)
	{
		document.querySelector(scroll.divetoilet).addEventListener("click", function() {

			document.documentElement.style.overflow = 'visible';

			if(window.matchMedia("(max-width: 1000px)").matches)
				document.querySelector("#menu").style.display="none";

			scrollDestination = document.querySelector(scroll.divDest).getBoundingClientRect().y + html.scrollTop - 60;
			var yy =setInterval(function() {

				if (Math.abs(html.scrollTop - scrollDestination) < 20)
					clearInterval(yy);

				if (scrollDestination != null)
					html.scrollTop -= (html.scrollTop - scrollDestination)/20;
			}, 10)
		});
	}
	//réinitialise les couleur du menu
	function clearcolorMenuD()
	{
		for (i = 0; i < limenu.length; i++) {
			limenu[i].classList.remove("activeM");
		}
	}
	//event bouton menu pour les petit ecran
	document.querySelector("#menuPhone").addEventListener("click", function() {
		document.documentElement.style.overflow = 'hidden';
		document.querySelector("#menu").style.display="block";
	});
	/*Skill Animation____________________________________________________*/


	var skills = [{
		"title" : "Web skills",
		"couleur" : "#798390",
		"tab" : [
		{"name" : "HTML", "percent" : "90"},
		{"name" : "CSS" , "percent" : "90"},
		{"name" : "PHP" , "percent" : "60"},
		{"name" : "JavaScript" , "percent" : "75"},
		{"name" : "JQuery" , "percent" : "70"},
		],
	},
	{
		"title" : "Software skills",
		"couleur" : "#32455D",
		"tab" : [
		{"name" : "C#" , "percent" : "65"},
		{"name" : "Java" , "percent" : "65"},
		{"name" : "python" , "percent" : "55"}
		],
	},
	{
		"title" : "Design and video skills",
		"couleur" : "#4E6B90",
		"tab" : [
		{"name" : "Photoshop" , "percent" : "80"},
		{"name" : "Premier Pro" , "percent" : "75"},
		{"name" : "Illustrator" , "percent" : "80"}
		],
	}];
	
	var technical_article = document.querySelector("#skills");

	function skillBar()
	{
		skillsBarDisplayedYet = true;
		var canvasWidth = 150;
		var canvasHeight = 150;
		for(let branch of skills)
		{
			let branchDiv = document.createElement("div");
			branchDiv.classList.add("branch");
			let title = document.createElement("p");
			title.classList.add("title");
			title.innerHTML = branch.title;

			technical_article.appendChild(branchDiv);
			branchDiv.appendChild(title);

			branchDiv.style.marginTop = "1%";
			branchDiv.style.width = "100%";

			for(let skill of branch.tab)
			{
				let skillDiv = document.createElement("div");

				let canvas = document.createElement("canvas");
				canvas.width = canvasWidth;
				canvas.height = canvasHeight;

				let percent = document.createElement("span");
				percent.classList.add("percent");

				let name = document.createElement("p");
				name.innerHTML = skill.name;
				name.classList.add("name");

				branchDiv.appendChild(skillDiv);
				skillDiv.appendChild(name);
				skillDiv.appendChild(canvas);
				skillDiv.appendChild(percent);
				skillDiv.style.display = "inline-block";
				skillDiv.style.marginRight = "1%";
				skillDiv.style.marginTop = "1%";



				//Dessin canvas
				drawSkillBar(canvas,skill.percent,percent,branch.couleur);
			}
			
		}
	}

	function drawSkillBar(canvas,percent,text,couleur)
	{
		var width = canvas.width;
		var height = canvas.height;

		var degrees = 0;
		var onePercent = 2/100;
		var r = 70;

		var ctx = canvas.getContext("2d");
		//Animation draw
		var arcInterval = setInterval(function(){
			degrees +=1;
			let coef =  degrees*onePercent;
			text.innerHTML = Math.round(degrees);
			
			ctx.clearRect( 0, 0, width, height );

			ctx.beginPath();
			ctx.strokeStyle=couleur;
			ctx.lineWidth="8";
			ctx.lineCap = 'round';			
			ctx.arc(width/2,height/2,r,1.5*Math.PI,(1.5+coef)*Math.PI,false);
			ctx.stroke();

			if(degrees >= percent){
				clearInterval(arcInterval);
			}

		},20)	
	}


})