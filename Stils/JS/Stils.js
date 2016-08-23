var Stils = function()
{
	let loadScript = function(url)
	{
		return new Promise(function(resolve, reject){
			// Adding the script tag to the head as suggested before
			let head = document.getElementsByTagName('head')[0];
			let script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = url;

			// Then bind the event to the callback function.
			// There are several events for cross browser compatibility.
			let callback = function(retour)
			{
				resolve(retour);
			}
			script.onreadystatechange = callback;
			script.onload = callback;

			// Fire the loading
			head.appendChild(script);
		});
	}

	let toast = function(content, delay)
	{
		return new Promise(function(resolve, reject)
		{
			document.getElementById("toast-container").innerHTML += '<li><div>'+content+'</div></li>';
			let Id = document.querySelectorAll("#toast-container li").length - 1;
			showToast(Id);
			setTimeout(hideToast, delay-500, Id, function(retour){
				resolve(retour);
			});
		});
	}

	let removeToast = function(Id)
	{
		console.log(Id);
		document.getElementById('toast-container').removeChild(document.getElementById('toast-container').getElementsByTagName('li')[Id]);
	}

	let showToast = function(Id)
	{
		document.getElementById('toast-container').getElementsByTagName('li')[Id].style.opacity = 1;
	}

	let hideToast = function(Id, callback)
	{
		document.getElementById('toast-container').getElementsByTagName('li')[Id].style.opacity = 0;
		let texte = document.getElementById('toast-container').getElementsByTagName('li')[Id].innerHTML;
		setTimeout(function(){
			removeToast(Id);
			callback(texte);
		}, 2000);
	}

	this.loadScript = function(url){
		//Add current folder root
		return new Promise(function(resolve, reject)
		{
			loadScript("Stils/JS/" +url).then(function(retour){
				resolve(retour);
			});
		});
	};
	this.toast = toast;
};

const stils = new Stils();

stils.loadScript("components/autoloaders.js").then(function(retour)
{
	console.log(retour);
})